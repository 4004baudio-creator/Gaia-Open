"""gaia_ledger.py — Reference claim ledger for Gaia Open (gaia.ledger/v1).

Receiving is not endorsing. No central chain, no trust scores, no deletion.
Standard library only. Depends on gaia_packet; gaia_sig is optional.
"""
import gzip
import json
import os
from datetime import datetime, timezone

from gaia_packet import validate, canonical_hash

try:
    import gaia_sig
    from gaia_sig import KeyIndex
    SIG_OK = True
except ImportError:
    SIG_OK = False

FORMAT = "gaia.snapshot/v1"


def _envelope_sig_msg(envelope):
    hashes = sorted(p.get("hash", "") for p in envelope.get("packets", []))
    return gaia_sig.canonical_json(
        {"format": envelope.get("format"), "packet_hashes": hashes})


def _now_iso():
    return datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ")


class Ledger:
    def __init__(self, path):
        self.path = path
        self.packets_dir = os.path.join(path, "packets")
        self.rejected_dir = os.path.join(path, "rejected")
        self.snapshots_dir = os.path.join(path, "snapshots")
        self.index_path = os.path.join(path, "index.jsonl")
        for d in (self.packets_dir, self.rejected_dir, self.snapshots_dir):
            os.makedirs(d, exist_ok=True)
        self._rebuild_index_if_missing()
        self.keys = KeyIndex() if SIG_OK else None

    def _rebuild_index_if_missing(self):
        if os.path.exists(self.index_path):
            return
        with open(self.index_path, "w", encoding="utf-8") as f:
            for name in sorted(os.listdir(self.packets_dir)):
                if not name.endswith(".json"):
                    continue
                p = self._load_packet(os.path.join(self.packets_dir, name))
                if p is None:
                    continue
                f.write(json.dumps(self._index_line(p, "recovered")) + "\n")

    def _index_line(self, packet, origin):
        return {
            "hash": packet["hash"],
            "stamp": packet["stamp"],
            "field": packet.get("field_name", ""),
            "arrived_at": _now_iso(),
            "origin": origin,
        }

    @staticmethod
    def _load_packet(path):
        try:
            with open(path, "r", encoding="utf-8") as f:
                return json.load(f)
        except (json.JSONDecodeError, OSError):
            return None

    def add(self, packet, origin="local"):
        result = validate(packet)
        crypto = self._crypto_status(packet)
        if not result["valid"]:
            self._quarantine(packet, result["errors"], crypto=crypto)
            return ("rejected", result["errors"])
        h = packet["hash"]
        dest = os.path.join(self.packets_dir, h + ".json")
        if os.path.exists(dest):
            return ("duplicate", h)
        with open(dest, "w", encoding="utf-8") as f:
            json.dump(packet, f, ensure_ascii=False, indent=2, sort_keys=True)
        line = self._index_line(packet, origin)
        if crypto is not None:
            line["provenance"] = crypto["status"]
        with open(self.index_path, "a", encoding="utf-8") as f:
            f.write(json.dumps(line) + "\n")
        return ("added", h)

    def _crypto_status(self, packet):
        if not SIG_OK or not isinstance(packet, dict):
            return None
        sig = packet.get("sig")
        if not isinstance(sig, dict):
            return None
        return gaia_sig.verify_packet(packet, str(sig.get("sig", "")),
                                      str(sig.get("pubkey", "")), self.keys)

    def _quarantine(self, packet, reason, crypto=None):
        raw = json.dumps(packet, ensure_ascii=False, indent=2, sort_keys=True)
        try:
            name = (packet.get("packet_hash") or packet.get("hash")
                    or canonical_hash(packet.get("claim", "")))
        except Exception:
            name = "unhashable_" + str(abs(hash(raw)))
        record = {"reason": reason, "packet": packet}
        if crypto is not None:
            record["crypto"] = crypto
        with open(os.path.join(self.rejected_dir, name + ".json"), "w",
                  encoding="utf-8") as f:
            f.write(json.dumps(record, ensure_ascii=False, indent=2))

    def import_snapshot(self, file):
        with open(file, "rb") as probe:
            magic = probe.read(2)
        opener = gzip.open if magic == b"\x1f\x8b" else open
        with opener(file, "rt", encoding="utf-8") as f:
            try:
                envelope = json.load(f)
            except json.JSONDecodeError:
                raise ValueError("malformed snapshot: envelope is not valid JSON")
        if envelope.get("format") != FORMAT:
            raise ValueError("malformed snapshot: expected format %s, got %r"
                             % (FORMAT, envelope.get("format")))
        if not isinstance(envelope.get("packets"), list):
            raise ValueError("malformed snapshot: 'packets' must be a list")
        origin = envelope.get("from_peer") or "unknown"
        counts = {"arrivals": 0, "duplicates": 0, "quarantined": 0,
                  "statements": 0, "revoked": 0}
        for stmt in envelope.get("key_statements") or []:
            if self.keys is None:
                continue
            res, _detail = self.keys.add_statement(stmt)
            if res in ("accepted", "revoked"):
                counts["statements"] += 1
            if res == "revoked":
                counts["revoked"] += 1
        env_sig = envelope.get("sig")
        if env_sig is not None:
            if SIG_OK:
                try:
                    msg = _envelope_sig_msg(envelope)
                    ok = gaia_sig.verify(msg, str(env_sig.get("sig", "")),
                                         str(env_sig.get("pubkey", "")))
                    counts["envelope_sig"] = "verified" if ok else "signature_invalid"
                except Exception:
                    counts["envelope_sig"] = "signature_invalid"
            else:
                counts["envelope_sig"] = "verification_unavailable"
        for packet in envelope["packets"]:
            status, _ = self.add(packet, origin=origin)
            counts[{"added": "arrivals", "duplicate": "duplicates",
                     "rejected": "quarantined"}[status]] += 1
        return counts

    def export_snapshot(self, peer_label=None, fork_of=None, sign=False,
                        private_key=None):
        packets = []
        for name in sorted(os.listdir(self.packets_dir)):
            if name.endswith(".json"):
                p = self._load_packet(os.path.join(self.packets_dir, name))
                if p is not None:
                    packets.append(p)
        envelope = {
            "format": FORMAT,
            "from_peer": peer_label,
            "created": _now_iso(),
            "packet_count": len(packets),
            "packets": packets,
        }
        if fork_of:
            envelope["fork_of"] = fork_of
        if sign:
            if not SIG_OK:
                raise RuntimeError("signing unavailable: gaia_sig not importable")
            if not private_key:
                raise ValueError("sign=True requires private_key")
            msg = _envelope_sig_msg(envelope)
            envelope["sig"] = {
                "schema": gaia_sig.SIG_SCHEMA,
                "pubkey": gaia_sig.public_key_from_private(private_key),
                "sig": gaia_sig.sign(msg, private_key),
            }
            envelope["key_statements"] = [gaia_sig.make_statement(
                {"purpose": "gaia.snapshot signing key"}, private_key)]
        fname = "snapshot-%s-%s.json" % (_now_iso().replace(":", ""), peer_label or "peer")
        with open(os.path.join(self.snapshots_dir, fname), "w", encoding="utf-8") as f:
            json.dump(envelope, f, ensure_ascii=False, indent=2)
        return envelope

    def _all_packets(self):
        out = []
        for name in sorted(os.listdir(self.packets_dir)):
            if name.endswith(".json"):
                p = self._load_packet(os.path.join(self.packets_dir, name))
                if p is not None:
                    out.append(p)
        return out

    def resolve(self, claim_hash):
        chain = []
        current = claim_hash
        seen = set()
        while current and current not in seen:
            seen.add(current)
            packet = self._load_packet(os.path.join(self.packets_dir, current + ".json"))
            if packet is None:
                break
            chain.append(current)
            successor = None
            for candidate in self._all_packets():
                if candidate.get("supersedes") == current:
                    successor = candidate["hash"]
                    break
            current = successor
        if not chain:
            return None, []
        return self._load_packet(os.path.join(self.packets_dir, chain[-1] + ".json")), chain

    def audit(self):
        problems = []
        for name in sorted(os.listdir(self.packets_dir)):
            if not name.endswith(".json"):
                continue
            packet = self._load_packet(os.path.join(self.packets_dir, name))
            if packet is None:
                problems.append({"hash": name[:-5], "errors": ["unreadable packet file"]})
                continue
            result = validate(packet)
            if not result["valid"]:
                self._quarantine(packet, result["errors"])
                problems.append({"hash": packet["hash"], "errors": result["errors"]})
        return problems

    def count(self):
        return sum(1 for n in os.listdir(self.packets_dir) if n.endswith(".json"))


def snapshot_to_gzip(envelope, out_path):
    with gzip.open(out_path, "wt", encoding="utf-8") as f:
        json.dump(envelope, f, ensure_ascii=False)
    return out_path
