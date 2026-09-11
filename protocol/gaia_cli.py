#!/usr/bin/env python3
"""gaia_cli.py — Shell entry point for the Gaia Open reference ledger."""
import argparse
import json
import os
import sys

_IMPL = os.path.join(os.path.dirname(os.path.abspath(__file__)), "impl")
if _IMPL not in sys.path:
    sys.path.insert(0, _IMPL)

from gaia_packet import new_packet
from gaia_ledger import Ledger

VALID_STAMPS = ("ANCHORED", "PLAUSIBLE", "IMAGINED", "OPEN_FIELD")

def _ledger(args) -> Ledger:
    return Ledger(args.shelf)

def _short(h: str) -> str:
    return (h or "")[:12]

def cmd_add(args) -> int:
    if args.stamp not in VALID_STAMPS:
        print(f"Unknown stamp '{args.stamp}'. Valid stamps: {', '.join(VALID_STAMPS)}.")
        return 2
    fields = {}
    if args.source:
        fields["source"] = args.source
    if args.observed_at:
        fields["observed_at"] = args.observed_at
    if args.licence:
        fields["licence"] = args.licence
    if args.lore:
        fields["lore"] = args.lore
    packet = new_packet(claim=args.claim, stamp=args.stamp, **fields)
    if args.testimony:
        packet["claim"] = packet["claim"] + " [TESTIMONY — not fact]"
        from gaia_packet import canonical_hash
        packet["hash"] = canonical_hash(packet["claim"])
    led = _ledger(args)
    status, hash_or_reason = led.add(packet, origin=args.origin)
    if status == "added":
        print(f"Filed. hash {_short(hash_or_reason)}  stamp {args.stamp}")
        print(f"  shelf: {args.shelf}")
        return 0
    if status == "duplicate":
        print(f"Already on the shelf — hash {_short(hash_or_reason)}. Nothing duplicated.")
        return 0
    print("Not filed. The field sorts, it does not gate — here is why:")
    reasons = hash_or_reason if isinstance(hash_or_reason, (list, tuple)) else [str(hash_or_reason)]
    for err in reasons:
        print(f"  - {err}")
    return 1

def cmd_import(args) -> int:
    if not os.path.exists(args.file):
        print(f"No such file: {args.file}")
        return 2
    led = _ledger(args)
    report = led.import_snapshot(args.file)
    print(f"Imported from {args.file}:")
    print(f"  arrivals:   {report.get('arrivals', 0)}")
    print(f"  duplicates: {report.get('duplicates', 0)}")
    print(f"  quarantined:{report.get('quarantined', 0)}")
    return 0

def cmd_export(args) -> int:
    from gaia_ledger import snapshot_to_gzip
    led = _ledger(args)
    envelope = led.export_snapshot(peer_label=args.peer)
    snapshot_to_gzip(envelope, args.out)
    print(f"Snapshot written: {args.out}  ({envelope.get('packet_count', '?')} packets)")
    return 0

def cmd_audit(args) -> int:
    led = _ledger(args)
    findings = led.audit()
    ok = (len(findings) == 0)
    print(f"Audit of shelf '{args.shelf}': {'PASS' if ok else 'FINDINGS'}")
    for f in findings[:10]:
        print(f"  - {f}")
    return 0 if ok else 1

def cmd_list(args) -> int:
    import glob
    packets_dir = os.path.join(args.shelf, "packets")
    files = sorted(glob.glob(os.path.join(packets_dir, "*.json")))
    if not files:
        print(f"Shelf '{args.shelf}' is empty.")
        return 0
    print(f"Shelf '{args.shelf}' — {len(files)} packets:")
    for f in files:
        try:
            with open(f, "r", encoding="utf-8") as fh:
                p = json.load(fh)
        except (OSError, json.JSONDecodeError):
            print(f"  {os.path.basename(f)[:12]}  <unreadable>")
            continue
        print(f"  {_short(p.get('hash'))}  {str(p.get('stamp', '?')):<11} {str(p.get('claim', ''))[:64]}")
    return 0

def cmd_resolve(args) -> int:
    led = _ledger(args)
    head = led.resolve(args.hash_prefix)
    if not head:
        print(f"No chain resolves from '{args.hash_prefix}'.")
        return 1
    if isinstance(head, dict):
        print(f"Current head of chain: {_short(head.get('hash', ''))}")
        print(f"  stamp: {head.get('stamp')}")
        print(f"  claim: {head.get('claim')}")
    else:
        print(f"Resolved to: {_short(str(head))}")
    return 0

def main(argv=None) -> int:
    ap = argparse.ArgumentParser(prog="gaia_cli", description="Gaia Open reference ledger CLI")
    ap.add_argument("--shelf", default="shelf", help="shelf directory (default: ./shelf)")
    sub = ap.add_subparsers(dest="cmd", required=True)
    p = sub.add_parser("add", help="validate and file a new packet")
    p.add_argument("--claim", required=True)
    p.add_argument("--stamp", required=True)
    p.add_argument("--source")
    p.add_argument("--observed-at", dest="observed_at")
    p.add_argument("--licence")
    p.add_argument("--lore")
    p.add_argument("--testimony", action="store_true")
    p.add_argument("--origin", default="local")
    p.set_defaults(func=cmd_add)
    p = sub.add_parser("import", help="import a snapshot envelope")
    p.add_argument("file")
    p.set_defaults(func=cmd_import)
    p = sub.add_parser("export", help="export a snapshot envelope")
    p.add_argument("out")
    p.add_argument("--peer", default=None)
    p.set_defaults(func=cmd_export)
    p = sub.add_parser("audit", help="re-validate the whole shelf")
    p.set_defaults(func=cmd_audit)
    p = sub.add_parser("list", help="list packets in the shelf")
    p.set_defaults(func=cmd_list)
    p = sub.add_parser("resolve", help="resolve a supersession chain")
    p.add_argument("hash_prefix")
    p.set_defaults(func=cmd_resolve)
    args = ap.parse_args(argv)
    return args.func(args)

if __name__ == "__main__":
    sys.exit(main())
