"""test_gaia_ledger.py — Test suite for gaia.ledger/v1."""
import sys as _sys, os as _os
_sys.path.insert(0, _os.path.join(_os.path.dirname(_os.path.abspath(__file__)), "..", "impl"))

import gzip, json, os, shutil, tempfile, unittest
from gaia_packet import new_packet, canonical_hash
from gaia_ledger import Ledger, snapshot_to_gzip, FORMAT

def anchored(claim, **kw):
    return new_packet(field_name="gaia_pulse", claim=claim, stamp="ANCHORED",
                      source="field survey, observer notes",
                      observed_at="2026-09-11", licence="CC-BY", **kw)

class LedgerBase(unittest.TestCase):
    def setUp(self):
        self.dir = tempfile.mkdtemp(prefix="gaia_ledger_test_")
    def tearDown(self):
        shutil.rmtree(self.dir, ignore_errors=True)
    def ledger(self, name="shelf"):
        return Ledger(os.path.join(self.dir, name))

class TestAddAndQuarantine(LedgerBase):
    def test_add_stores_by_hash(self):
        led = self.ledger()
        p = anchored("Lichen regrowth on the north slag heap.")
        status, detail = led.add(p)
        self.assertEqual(status, "added")
        self.assertTrue(os.path.exists(os.path.join(led.packets_dir, detail + ".json")))
        self.assertEqual(led.count(), 1)
    def test_duplicate_hash_is_idempotent(self):
        led = self.ledger()
        p = anchored("Same claim twice.")
        self.assertEqual(led.add(p)[0], "added")
        self.assertEqual(led.add(dict(p))[0], "duplicate")
        self.assertEqual(led.count(), 1)
    def test_invalid_packet_is_rejected_not_stored(self):
        led = self.ledger()
        bad = {"format": "gaia.packet/v1", "field_name": "x", "claim": "c",
               "stamp": "ANCHORED", "packet_hash": canonical_hash("c")}
        status, errors = led.add(bad)
        self.assertEqual(status, "rejected")
        self.assertTrue(errors)
        self.assertEqual(led.count(), 0)
    def test_rejected_packet_is_quarantined_with_reason(self):
        led = self.ledger()
        bad = {"format": "gaia.packet/v1", "field_name": "x", "claim": "c",
               "stamp": "ANCHORED", "packet_hash": canonical_hash("c")}
        led.add(bad)
        self.assertEqual(len(os.listdir(led.rejected_dir)), 1)
        entry = json.load(open(os.path.join(
            led.rejected_dir, os.listdir(led.rejected_dir)[0]), encoding="utf-8"))
        self.assertIn("reason", entry)
        self.assertIn("packet", entry)

class TestIndex(LedgerBase):
    def test_index_records_origin(self):
        led = self.ledger()
        led.add(anchored("A claim."), origin="peer_bee")
        line = json.loads(open(led.index_path, encoding="utf-8").readline())
        self.assertEqual(line["origin"], "peer_bee")
        self.assertEqual(line["stamp"], "ANCHORED")
    def test_index_rebuilt_from_files_when_missing(self):
        led = self.ledger()
        led.add(anchored("Rebuild me."))
        os.remove(led.index_path)
        led2 = Ledger(led.path)
        with open(led2.index_path, encoding="utf-8") as f:
            lines = [json.loads(l) for l in f if l.strip()]
        self.assertEqual(len(lines), 1)
        self.assertEqual(lines[0]["origin"], "recovered")

class TestSnapshots(LedgerBase):
    def test_round_trip(self):
        a, b = self.ledger("a"), self.ledger("b")
        p1 = anchored("Claim one for travel.")
        p2 = new_packet(field_name="lore", claim="The tower hums at dusk.",
                        stamp="IMAGINED", lore="A story-shape, not a report.")
        a.add(p1); a.add(p2)
        env = a.export_snapshot(peer_label="shelf_a")
        self.assertEqual(env["format"], FORMAT)
        self.assertEqual(env["packet_count"], 2)
        f = os.path.join(self.dir, "snap.json")
        snapshot_to_gzip(env, f)
        counts = b.import_snapshot(f)
        self.assertEqual(counts["arrivals"], 2)
        self.assertEqual(counts["duplicates"], 0)
        self.assertEqual(counts["quarantined"], 0)
        self.assertEqual(b.count(), 2)
    def test_origin_is_provenance_not_endorsement(self):
        a, b = self.ledger("a"), self.ledger("b")
        a.add(anchored("Travelling claim."))
        env = a.export_snapshot(peer_label="shelf_a")
        f = os.path.join(self.dir, "snap.json")
        snapshot_to_gzip(env, f)
        b.import_snapshot(f)
        line = json.loads(open(b.index_path, encoding="utf-8").readline())
        self.assertEqual(line["origin"], "shelf_a")
    def test_tampered_packet_quarantined_on_import(self):
        a, b = self.ledger("a"), self.ledger("b")
        p = anchored("Untampered at origin.")
        a.add(p)
        env = a.export_snapshot(peer_label="shelf_a")
        env["packets"][0]["claim"] = "TAMPERED wording en route."
        f = os.path.join(self.dir, "evil.json")
        snapshot_to_gzip(env, f)
        counts = b.import_snapshot(f)
        self.assertEqual(counts["quarantined"], 1)
        self.assertEqual(counts["arrivals"], 0)
    def test_boundary_violation_refused_at_import(self):
        b = self.ledger("b")
        bad = new_packet(field_name="x", claim="Scan this face.", stamp="OPEN_FIELD")
        bad["claim"] += " fingerprint of the subject attached"
        env = {"format": FORMAT, "from_peer": "sneaky", "created": "2026-01-01T00:00:00Z",
               "packet_count": 1, "packets": [bad]}
        f = os.path.join(self.dir, "bio.json")
        snapshot_to_gzip(env, f)
        counts = b.import_snapshot(f)
        self.assertEqual(counts["quarantined"], 1)
    def test_malformed_envelope_refused_whole(self):
        b = self.ledger("b")
        f = os.path.join(self.dir, "junk.json")
        with open(f, "w", encoding="utf-8") as out:
            out.write("{not json at all")
        with self.assertRaises(ValueError):
            b.import_snapshot(f)
    def test_wrong_format_refused(self):
        b = self.ledger("b")
        f = os.path.join(self.dir, "wrong.json")
        json.dump({"format": "gaia.snapshot/v9", "packets": []}, open(f, "w"))
        with self.assertRaises(ValueError):
            b.import_snapshot(f)

class TestSupersession(LedgerBase):
    def test_resolve_walks_to_latest(self):
        led = self.ledger()
        old = anchored("Early wording of the finding.")
        led.add(old)
        h_old = old["hash"]
        new = anchored("Corrected wording of the finding.", supersedes=h_old)
        led.add(new)
        latest, chain = led.resolve(h_old)
        self.assertEqual(latest["hash"], new["hash"])
        self.assertEqual(chain, [h_old, new["hash"]])
    def test_resolve_unknown_hash(self):
        led = self.ledger()
        latest, chain = led.resolve("0" * 64)
        self.assertIsNone(latest)
        self.assertEqual(chain, [])

class TestForksAndAudit(LedgerBase):
    def test_fork_labels_round_trip(self):
        a, b = self.ledger("a"), self.ledger("b")
        a.add(anchored("A claim to fork."))
        env = a.export_snapshot(peer_label="shelf_a", fork_of="shelf_origin")
        self.assertEqual(env["fork_of"], "shelf_origin")
        f = os.path.join(self.dir, "fork.json")
        snapshot_to_gzip(env, f)
        counts = b.import_snapshot(f)
        self.assertEqual(counts["arrivals"], 1)
    def test_audit_flags_packets_that_fail_now(self):
        led = self.ledger()
        led.add(anchored("Healthy claim."))
        path = os.path.join(led.packets_dir)
        broken = anchored("Broken stamp rules.")
        broken["stamp"] = "ANCHORED"
        del broken["source"]
        name = broken["hash"] + ".json"
        json.dump(broken, open(os.path.join(path, name), "w"))
        problems = led.audit()
        self.assertEqual(len(problems), 1)
        self.assertIn("source", str(problems[0]["errors"]).lower())
        self.assertEqual(len(os.listdir(led.rejected_dir)), 1)

if __name__ == "__main__":
    unittest.main()
