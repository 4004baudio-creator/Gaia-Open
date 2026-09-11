"""Gaia Open — Validator test vectors (Packet Schema v1.0)."""

import sys as _sys, os as _os
_sys.path.insert(0, _os.path.join(_os.path.dirname(_os.path.abspath(__file__)), "..", "impl"))

import unittest, uuid
import gaia_packet as gp

A = gp.new_packet('The 2022 Tonga eruption injected about 146 Tg of water vapour into the stratosphere.',
    'ANCHORED', source='NASA Earth Observatory, 2023', observed_at='2022-01-15', licence='CC-BY')

class TestHash(unittest.TestCase):
    def test_spec_vector(self):
        self.assertTrue(gp.canonical_hash('Gaia is not an OS.').startswith('f52edbaeb8c65015'))
    def test_whitespace_collapse(self):
        self.assertEqual(gp.canonical_hash('Gaia is not an OS.'),
                         gp.canonical_hash('  Gaia  is not an OS.\n'))
    def test_wording_change_visible(self):
        self.assertNotEqual(gp.canonical_hash('Gaia is not an OS.'),
                            gp.canonical_hash('Gaia is not an OS'))

class TestStamps(unittest.TestCase):
    def test_valid_anchored(self):
        r = gp.validate(A); self.assertTrue(r['valid'])
    def test_anchored_needs_source(self):
        r = gp.validate(gp.new_packet('x', 'ANCHORED'))
        self.assertIn('MISSING_SOURCE', [e['code'] for e in r['errors']])
    def test_imagined_needs_lore(self):
        r = gp.validate(gp.new_packet('y', 'IMAGINED'))
        self.assertIn('MISSING_LORE', [e['code'] for e in r['errors']])
    def test_open_field_minimal(self):
        r = gp.validate(gp.new_packet('z', 'OPEN_FIELD')); self.assertTrue(r['valid'])

class TestTestimony(unittest.TestCase):
    def test_testimony_cannot_be_anchored(self):
        p = gp.new_packet('I felt it', 'ANCHORED', source='me', observed_at='2022-01-01',
                          licence='unknown', testimony=True)
        self.assertIn('TESTIMONY_AS_ANCHORED', [e['code'] for e in gp.validate(p)['errors']])
    def test_testimony_tag(self):
        p = gp.new_packet('I felt it', 'PLAUSIBLE', testimony=True)
        self.assertEqual(gp.validate(p)['rendered_tag'], '[TESTIMONY — not fact]')

class TestIntegrity(unittest.TestCase):
    def test_tamper_detected(self):
        bad = dict(A); bad['claim'] = A['claim'] + ' (altered)'
        self.assertIn('HASH_MISMATCH', [e['code'] for e in gp.validate(bad)['errors']])
    def test_non_json(self):
        self.assertIn('NOT_JSON', [e['code'] for e in gp.validate('garbage')['errors']])

class TestWarnings(unittest.TestCase):
    def test_missing_hash_warns_and_computes(self):
        p = {'schema': gp.SCHEMA, 'id': str(uuid.uuid4()),
             'claim': 'Rain smells stronger before storms.', 'stamp': 'OPEN_FIELD'}
        r = gp.validate(p)
        self.assertTrue(r['valid'])
        self.assertIn('HASH_MISSING', [w['code'] for w in r['warnings']])
        self.assertTrue(r['packet_hash'])
    def test_plausible_without_source_warns_not_errors(self):
        r = gp.validate(gp.new_packet('Some reasoned guess.', 'PLAUSIBLE'))
        self.assertTrue(r['valid'])
        self.assertIn('SOURCE_RECOMMENDED', [w['code'] for w in r['warnings']])

class TestBoundaries(unittest.TestCase):
    def test_biometrics(self):
        r = gp.validate(gp.new_packet('A new DNA sequence database launched.', 'OPEN_FIELD'))
        self.assertIn('INGEST_PRIVATE_BIOMETRICS', [e['code'] for e in r['errors']])
    def test_child_data(self):
        r = gp.validate(gp.new_packet('The child lives at the corner house.', 'OPEN_FIELD'))
        self.assertIn('INGEST_CHILD_DATA', [e['code'] for e in r['errors']])
    def test_inner_states(self):
        r = gp.validate(gp.new_packet('I am depressed and I hear a voice.', 'OPEN_FIELD'))
        self.assertIn('INGEST_INNER_STATES', [e['code'] for e in r['errors']])
    def test_art_describing_inner_life_passes(self):
        r = gp.validate(gp.new_packet('The poem describes a quiet grief that sits like weather.',
                                       'IMAGINED', lore='A pattern from the yarn shelf.'))
        self.assertTrue(r['valid'])

if __name__ == '__main__':
    unittest.main()
