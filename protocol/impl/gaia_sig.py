"""gaia_sig.py — Peer signatures for Gaia Open (gaia.sig/v1).

A signature proves AUTHORSHIP, never authority.
"""
import hashlib
import json
import os
import unicodedata
from datetime import datetime, timezone

SIG_SCHEMA = "gaia.sig/v1"

try:
    from cryptography.hazmat.primitives.asymmetric.ed25519 import (
        Ed25519PrivateKey, Ed25519PublicKey)
    BACKEND = "cryptography"
except Exception:
    BACKEND = None

def _now_iso():
    return datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ")

if BACKEND is None:
    _P = 2 ** 255 - 19
    _L = 2 ** 252 + 27742317777372353535851937790883648493
    _I = pow(2, (_P - 1) // 4, _P)
    _D = (-121665 * pow(121666, _P - 2, _P)) % _P

    def _inv(x):
        return pow(x, _P - 2, _P)

    _By = (4 * _inv(5)) % _P

    def _recover_x(y, sign):
        if y >= _P:
            return None
        x2 = ((y * y - 1) * _inv(_D * y * y + 1)) % _P
        if x2 == 0:
            return None if sign else 0
        x = pow(x2, (_P + 3) // 8, _P)
        if (x * x - x2) % _P != 0:
            x = (x * _I) % _P
        if (x * x - x2) % _P != 0:
            return None
        if x % 2 != sign:
            x = _P - x
        return x

    _Bx = _recover_x(_By, 0)
    _B = (_Bx, _By, 1, (_Bx * _By) % _P)

    def _edwards_add(P, Q):
        x1, y1, z1, t1 = P
        x2, y2, z2, t2 = Q
        A = ((y1 - x1) * (y2 - x2)) % _P
        B = ((y1 + x1) * (y2 + x2)) % _P
        C = (2 * t1 * t2 * _D) % _P
        D = (2 * z1 * z2) % _P
        E, F, G, H = B - A, D - C, D + C, B + A
        return (E * F % _P, G * H % _P, F * G % _P, E * H % _P)

    def _scalar_mult(P, e):
        if e == 0:
            return (0, 1, 1, 0)
        Q = _scalar_mult(P, e // 2)
        Q = _edwards_add(Q, Q)
        if e & 1:
            Q = _edwards_add(Q, P)
        return Q

    def _compress(P):
        x, y, z, _ = P
        zi = _inv(z)
        x = x * zi % _P
        y = y * zi % _P
        return int.to_bytes(y | ((x & 1) << 255), 32, "little")

    def _decompress(b):
        y = int.from_bytes(b, "little")
        sign = y >> 255
        y &= (1 << 255) - 1
        x = _recover_x(y, sign)
        if x is None:
            return None
        return (x, y, 1, (x * y) % _P)

    def _clamp(h32):
        a = int.from_bytes(h32, "little")
        return (a & ((1 << 254) - 8)) | (1 << 254)

    def _pure_sign(seed, msg):
        h = hashlib.sha512(seed).digest()
        a = _clamp(h[:32])
        pub = _compress(_scalar_mult(_B, a))
        r = int.from_bytes(hashlib.sha512(h[32:] + msg).digest(), "little") % _L
        R = _compress(_scalar_mult(_B, r))
        k = int.from_bytes(hashlib.sha512(R + pub + msg).digest(), "little") % _L
        S = (r + k * a) % _L
        return pub, R + int.to_bytes(S, 32, "little")

    def _pure_verify(pub, sig, msg):
        if len(sig) != 64 or len(pub) != 32:
            return False
        A = _decompress(pub)
        R = _decompress(sig[:32])
        if A is None or R is None:
            return False
        S = int.from_bytes(sig[32:], "little")
        if S >= _L:
            return False
        k = int.from_bytes(hashlib.sha512(sig[:32] + pub + msg).digest(), "little") % _L
        sB = _scalar_mult(_B, S)
        kA = _scalar_mult(A, k)
        return _compress(_edwards_add(R, kA)) == _compress(sB)

def canonical_json(obj):
    def norm(v):
        if isinstance(v, bool):
            return v
        if isinstance(v, str):
            return unicodedata.normalize("NFC", v)
        if isinstance(v, int):
            return v
        if isinstance(v, float):
            if v == int(v):
                return int(v)
            raise TypeError("key statements use strings, booleans and integers")
        if isinstance(v, dict):
            return {str(k): norm(x) for k, x in sorted(v.items())}
        if isinstance(v, list):
            return [norm(x) for x in v]
        raise TypeError("unsupported statement value: %r" % (v,))
    return json.dumps(norm(obj), ensure_ascii=False, separators=(",", ":"),
                      sort_keys=True).encode("utf-8")

def statement_hash(statement: dict) -> str:
    return hashlib.sha256(canonical_json(statement)).hexdigest()

def generate_keypair():
    if BACKEND == "cryptography":
        priv = Ed25519PrivateKey.generate()
        raw = priv.private_bytes_raw()
        pub = priv.public_key().public_bytes_raw().hex()
    else:
        raw = os.urandom(32)
        pub = public_key_from_private(raw.hex())
    return {"private_key": raw.hex(), "public_key": pub}

def public_key_from_private(private_key_hex: str) -> str:
    seed = bytes.fromhex(private_key_hex)
    if BACKEND == "cryptography":
        return Ed25519PrivateKey.from_private_bytes(seed).public_key().public_bytes_raw().hex()
    return _compress(_scalar_mult(_B, _clamp(hashlib.sha512(seed).digest()[:32]))).hex()

def _sign_raw(seed: bytes, msg: bytes) -> bytes:
    if BACKEND == "cryptography":
        return Ed25519PrivateKey.from_private_bytes(seed).sign(msg)
    return _pure_sign(seed, msg)[1]

def _verify_raw(pub: bytes, sig: bytes, msg: bytes) -> bool:
    if BACKEND == "cryptography":
        try:
            Ed25519PublicKey.from_public_bytes(pub).verify(sig, msg)
            return True
        except Exception:
            return False
    return _pure_verify(pub, sig, msg)

def sign(data, private_key_hex: str) -> str:
    msg = data.encode("utf-8") if isinstance(data, str) else data
    return _sign_raw(bytes.fromhex(private_key_hex), msg).hex()

def verify(data, sig_hex: str, pubkey_hex: str) -> bool:
    msg = data.encode("utf-8") if isinstance(data, str) else data
    try:
        return _verify_raw(bytes.fromhex(pubkey_hex), bytes.fromhex(sig_hex), msg)
    except (ValueError, TypeError):
        return False

def make_statement(fields: dict, private_key_hex: str) -> dict:
    pub = public_key_from_private(private_key_hex)
    stmt = {"schema": SIG_SCHEMA, "pubkey": pub, "created": _now_iso()}
    stmt.update(fields)
    stmt.pop("statement_hash", None)
    stmt.pop("sig", None)
    blob = canonical_json(stmt)
    out = dict(stmt)
    out["statement_hash"] = hashlib.sha256(blob).hexdigest()
    out["sig"] = _sign_raw(bytes.fromhex(private_key_hex), blob).hex()
    return out

def verify_statement(statement: dict) -> dict:
    try:
        clean = {k: v for k, v in statement.items() if k not in ("statement_hash", "sig")}
        sig = statement.get("sig") or ""
        pubkey = statement.get("pubkey") or ""
        blob = canonical_json(clean)
        if hashlib.sha256(blob).hexdigest() != statement.get("statement_hash"):
            return {"status": "signature_invalid", "reason": "statement hash mismatch"}
        if not verify(blob, sig, pubkey):
            return {"status": "signature_invalid", "reason": "bad Ed25519 signature"}
        return {"status": "verified"}
    except (TypeError, ValueError, KeyError):
        return {"status": "signature_invalid", "reason": "malformed statement"}

class KeyIndex:
    def __init__(self):
        self._statements = {}
        self._revoked = set()
    def add_statement(self, statement: dict):
        if not isinstance(statement, dict) or statement.get("schema") != SIG_SCHEMA:
            return ("rejected", "not a gaia.sig/v1 statement")
        pubkey = statement.get("pubkey") or ""
        result = verify_statement(statement)
        if result["status"] != "verified":
            return ("rejected", result["reason"])
        if statement.get("revoked") is True:
            self._statements[pubkey] = statement
            self._revoked.add(pubkey)
            return ("revoked", pubkey)
        if pubkey in self._revoked:
            return ("rejected", "key is revoked")
        if pubkey in self._statements:
            return ("rejected", "one statement per key — first valid wins")
        self._statements[pubkey] = statement
        return ("accepted", pubkey)
    def is_known(self, pubkey_hex: str) -> bool:
        return pubkey_hex in self._statements
    def is_revoked(self, pubkey_hex: str) -> bool:
        return pubkey_hex in self._revoked
    def resolve_key(self, pubkey_hex: str):
        seen = set()
        cur = pubkey_hex
        last = None
        while cur and cur not in seen:
            seen.add(cur)
            if cur in self._revoked:
                return None
            stmt = self._statements.get(cur)
            if not stmt:
                break
            last = cur
            nxt = None
            for pk, s in self._statements.items():
                if s.get("supersedes") == cur:
                    nxt = pk
                    break
            cur = nxt
        return last

def sign_packet(packet: dict, private_key_hex: str) -> dict:
    packet_hash = packet.get("hash") or ""
    sig = _sign_raw(bytes.fromhex(private_key_hex), packet_hash.encode("utf-8"))
    pub = public_key_from_private(private_key_hex)
    return {"schema": SIG_SCHEMA, "pubkey": pub, "sig": sig.hex()}

_verification_available = True

def set_verification_available(ok: bool):
    global _verification_available
    _verification_available = bool(ok)

def verify_packet(packet: dict, sig_hex: str, pubkey_hex: str, key_index=None) -> dict:
    if not _verification_available:
        return {"status": "verification_unavailable",
                "reason": "no usable Ed25519 backend on this runtime"}
    try:
        from gaia_packet import canonical_hash
        if canonical_hash(str(packet.get("claim", ""))) != packet.get("hash"):
            return {"status": "signature_invalid",
                    "reason": "claim changed since signing (HASH_MISMATCH)"}
        msg = str(packet.get("hash", "")).encode("utf-8")
        if not _verify_raw(bytes.fromhex(pubkey_hex), bytes.fromhex(sig_hex), msg):
            return {"status": "signature_invalid", "reason": "bad Ed25519 signature"}
        if key_index is not None:
            if key_index.is_revoked(pubkey_hex):
                return {"status": "signature_invalid", "reason": "signing key is revoked"}
            if not key_index.is_known(pubkey_hex):
                return {"status": "key_unknown", "reason": "key never introduced by a statement"}
        return {"status": "verified"}
    except (ValueError, TypeError):
        return {"status": "signature_invalid", "reason": "malformed signature"}
