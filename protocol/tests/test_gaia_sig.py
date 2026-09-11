"""Tests for gaia_sig.py (gaia.sig/v1)."""
import sys as _sys, os as _os
_sys.path.insert(0, _os.path.join(_os.path.dirname(_os.path.abspath(__file__)), "..", "impl"))

import json, os, shutil, tempfile, unittest
import gaia_sig
import gaia_packet as gp
import gaia_ledger

class TestCanonicalisation(unittest.TestCase):
    def test_canonical_json_sorted_nfc_no_whitespace(self):
        a = gaia_sig.canonical_json({"b": "z", "a": "e\u0301"})
        b = gaia_sig.canonical_json({"a": "\u00e9", "b": "z"})
        self.assertEqual(a, b)
        self.assertEqual(a.decode("utf-8"), '{"a":"\u00e9","b":"z"}')
        self.assertNotIn(b" ", a)
        self.assertNotIn(b"\n", a)
    def test_statement_hash_stable(self):
        kp = gaia_sig.generate_keypair()
        s1 = gaia_sig.make_statement({"purpose": "test"}, kp["private_key"])
        self.assertEqual(gaia_sig.statement_hash(s1), gaia_sig.statement_hash(s1))

class TestSignatures(unittest.TestCase):
    def setUp(self):
        self.kp = gaia_sig.generate_keypair()
        self.pkt = gp.new_packet("Gaia is not an OS.", "PLAUSIBLE",
                                 source="https://example.org/gaia", licence="CC-BY")
    def test_sign_verify_round_trip(self):
        sig = gaia_sig.sign_packet(self.pkt, self.kp["private_key"])
        idx = gaia_sig.KeyIndex()
        idx.add_statement(gaia_sig.make_statement({"purpose": "t"}, self.kp["private_key"]))
        r = gaia_sig.verify_packet({**self.pkt, "sig": sig}, sig["sig"], sig["pubkey"], idx)
        self.assertEqual(r["status"], "verified")
    def test_verify_fails_on_wrong_key(self):
        other = gaia_sig.generate_keypair()
        sig = gaia_sig.sign_packet(self.pkt, self.kp["private_key"])
        r = gaia_sig.verify_packet({**self.pkt, "sig": sig}, sig["sig"],
                                   other["public_key"], gaia_sig.KeyIndex())
        self.assertEqual(r["status"], "signature_invalid")
    def test_tamper_detection_through_signature(self):
        sig = gaia_sig.sign_packet(self.pkt, self.kp["private_key"])
        bad = dict(self.pkt)
        bad["claim"] = "Gaia is not an OS, honestly."
        bad["hash"] = gp.canonical_hash(bad["claim"])
        r = gaia_sig.verify_packet(bad, sig["sig"], sig["pubkey"], gaia_sig.KeyIndex())
        self.assertEqual(r["status"], "signature_invalid")
    def test_claim_hash_mismatch_flagged_even_with_known_key(self):
        idx = gaia_sig.KeyIndex()
        idx.add_statement(gaia_sig.make_statement({"purpose": "t"}, self.kp["private_key"]))
        sig = gaia_sig.sign_packet(self.pkt, self.kp["private_key"])
        bad = dict(self.pkt)
        bad["claim"] = "Changed."
        bad["hash"] = "0" * 64
        r = gaia_sig.verify_packet(bad, sig["sig"], sig["pubkey"], idx)
        self.assertEqual(r["status"], "signature_invalid")
    def test_key_unknown_when_not_introduced(self):
        sig = gaia_sig.sign_packet(self.pkt, self.kp["private_key"])
        r = gaia_sig.verify_packet({**self.pkt, "sig": sig}, sig["sig"],
                                   sig["pubkey"], gaia_sig.KeyIndex())
        self.assertEqual(r["status"], "key_unknown")
    def test_verification_unavailable_state(self):
        gaia_sig.set_verification_available(False)
        try:
            sig = gaia_sig.sign_packet(self.pkt, self.kp["private_key"])
            r = gaia_sig.verify_packet({**self.pkt, "sig": sig}, sig["sig"],
                                       sig["pubkey"], gaia_sig.KeyIndex())
            self.assertEqual(r["status"], "verification_unavailable")
        finally:
            gaia_sig.set_verification_available(True)

class TestStatements(unittest.TestCase):
    def test_statement_verifies(self):
        kp = gaia_sig.generate_keypair()
        stmt = gaia_sig.make_statement({"purpose": "test"}, kp["private_key"])
        self.assertEqual(gaia_sig.verify_statement(stmt)["status"], "verified")
    def test_statement_tamper_detected(self):
        kp = gaia_sig.generate_keypair()
        stmt = gaia_sig.make_statement({"purpose": "test"}, kp["private_key"])
        stmt["purpose"] = "forged"
        self.assertEqual(gaia_sig.verify_statement(stmt)["status"], "signature_invalid")
    def test_wrong_signer_detected(self):
        kp1, kp2 = gaia_sig.generate_keypair(), gaia_sig.generate_keypair()
        stmt = gaia_sig.make_statement({"purpose": "test"}, kp1["private_key"])
        stmt["pubkey"] = kp2["public_key"]
        self.assertEqual(gaia_sig.verify_statement(stmt)["status"], "signature_invalid")

class TestKeyIndex(unittest.TestCase):
    def test_one_statement_per_key(self):
        kp = gaia_sig.generate_keypair()
        idx = gaia_sig.KeyIndex()
        self.assertEqual(idx.add_statement(
            gaia_sig.make_statement({"purpose": "a"}, kp["private_key"]))[0], "accepted")
        self.assertEqual(idx.add_statement(
            gaia_sig.make_statement({"purpose": "b"}, kp["private_key"]))[0], "rejected")
    def test_self_revocation_outranks_one_per_key(self):
        kp = gaia_sig.generate_keypair()
        idx = gaia_sig.KeyIndex()
        idx.add_statement(gaia_sig.make_statement({"purpose": "a"}, kp["private_key"]))
        self.assertEqual(idx.add_statement(
            gaia_sig.make_statement({"revoked": True}, kp["private_key"]))[0], "revoked")
        self.assertTrue(idx.is_revoked(kp["public_key"]))
    def test_revoked_key_spam_rejected(self):
        kp = gaia_sig.generate_keypair()
        idx = gaia_sig.KeyIndex()
        idx.add_statement(gaia_sig.make_statement({"revoked": True}, kp["private_key"]))
        for _ in range(20):
            res, _ = idx.add_statement(
                gaia_sig.make_statement({"purpose": "spam"}, kp["private_key"]))
            self.assertEqual(res, "rejected")
        self.assertEqual(len(idx._statements), 1)
    def test_invalid_statement_never_stored(self):
        kp = gaia_sig.generate_keypair()
        idx = gaia_sig.KeyIndex()
        stmt = gaia_sig.make_statement({"purpose": "x"}, kp["private_key"])
        stmt["sig"] = "00" * 64
        self.assertEqual(idx.add_statement(stmt)[0], "rejected")
        self.assertFalse(idx.is_known(kp["public_key"]))
    def test_rotation_resolution(self):
        kA, kB = gaia_sig.generate_keypair(), gaia_sig.generate_keypair()
        idx = gaia_sig.KeyIndex()
        idx.add_statement(gaia_sig.make_statement({"purpose": "old"}, kA["private_key"]))
        idx.add_statement(gaia_sig.make_statement(
            {"purpose": "new", "supersedes": kA["public_key"]}, kB["private_key"]))
        self.assertEqual(idx.resolve_key(kA["public_key"]), kB["public_key"])
        self.assertEqual(idx.resolve_key(kB["public_key"]), kB["public_key"])
    def test_revoked_chain_resolves_none(self):
        k = gaia_sig.generate_keypair()
        idx = gaia_sig.KeyIndex()
        idx.add_statement(gaia_sig.make_statement({"purpose": "n"}, k["private_key"]))
        idx.add_statement(gaia_sig.make_statement({"revoked": True}, k["private_key"]))
        self.assertIsNone(idx.resolve_key(k["public_key"]))

class TestLedgerIntegration(unittest.TestCase):
    def setUp(self):
        self.dirs = []
        self.kp = gaia_sig.generate_keypair()
        self.pkt = gp.new_packet("Gaia is not an OS.", "PLAUSIBLE",
                                 source="https://example.org/gaia", licence="CC-BY")
        self.signed = dict(self.pkt)
        self.signed["sig"] = gaia_sig.sign_packet(self.pkt, self.kp["private_key"])
    def tearDown(self):
        for d in self.dirs:
            shutil.rmtree(d, ignore_errors=True)
    def _ledger(self):
        d = tempfile.mkdtemp()
        self.dirs.append(d)
        return gaia_ledger.Ledger(d)
    def _write(self, env, name="snap.json"):
        p = os.path.join(tempfile.mkdtemp(), name)
        with open(p, "w", encoding="utf-8") as f:
            json.dump(env, f)
        return p
    def test_signature_never_bypasses_sorting(self):
        led = self._ledger()
        bnd = gp.new_packet("I feel something private about the field.", "OPEN_FIELD")
        bnd["sig"] = gaia_sig.sign_packet(bnd, self.kp["private_key"])
        self.assertEqual(led.add(bnd)[0], "rejected")
        self.assertEqual(led.add(self.signed)[0], "added")
    def test_quarantine_records_crypto_status(self):
        led = self._ledger()
        bnd = gp.new_packet("I feel something private about the field.", "OPEN_FIELD")
        bnd["sig"] = gaia_sig.sign_packet(bnd, self.kp["private_key"])
        led.add(bnd)
        recs = os.listdir(led.rejected_dir)
        self.assertTrue(recs)
        q = json.load(open(os.path.join(led.rejected_dir, recs[0])))
        self.assertIn("crypto", q)
        self.assertEqual(q["crypto"]["status"], "key_unknown")
    def test_signed_snapshot_round_trip(self):
        a, b = self._ledger(), self._ledger()
        a.add(self.signed)
        env = a.export_snapshot(peer_label="A", sign=True, private_key=self.kp["private_key"])
        self.assertIn("sig", env)
        self.assertEqual(len(env["key_statements"]), 1)
        counts = b.import_snapshot(self._write(env))
        self.assertEqual(counts["arrivals"], 1)
        self.assertEqual(counts["envelope_sig"], "verified")
        self.assertTrue(b.keys.is_known(self.kp["public_key"]))
        self.assertEqual(b.audit(), [])
    def test_v1_snapshot_still_imports(self):
        a, b = self._ledger(), self._ledger()
        a.add(gp.new_packet("Yarn stays yarn.", "IMAGINED", lore="What is this? A field-story."))
        env = a.export_snapshot(peer_label="A")
        self.assertNotIn("sig", env)
        counts = b.import_snapshot(self._write(env))
        self.assertEqual(counts["arrivals"], 1)
        self.assertNotIn("envelope_sig", counts)
    def test_tampered_envelope_signature_recorded(self):
        a, b = self._ledger(), self._ledger()
        a.add(self.signed)
        env = a.export_snapshot(peer_label="A", sign=True, private_key=self.kp["private_key"])
        env["sig"]["sig"] = "ff" * 64
        counts = b.import_snapshot(self._write(env))
        self.assertEqual(counts["envelope_sig"], "signature_invalid")
    def test_provenance_recorded_on_index(self):
        led = self._ledger()
        led.add(self.signed)
        line = json.loads(open(led.index_path).read().strip().splitlines()[-1])
        self.assertEqual(line["provenance"], "key_unknown")
        led.keys.add_statement(gaia_sig.make_statement({"purpose": "t"}, self.kp["private_key"]))
        pkt2 = gp.new_packet("Sorting is structural.", "OPEN_FIELD")
        pkt2["sig"] = gaia_sig.sign_packet(pkt2, self.kp["private_key"])
        self.assertEqual(led.add(pkt2)[0], "added")
        line2 = json.loads(open(led.index_path).read().strip().splitlines()[-1])
        self.assertEqual(line2["provenance"], "verified")

if __name__ == "__main__":
    unittest.main(verbosity=2)
