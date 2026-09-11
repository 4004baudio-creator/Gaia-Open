"""Gaia Open — Reference Packet Validator (Packet Schema v1.0)

Pure, dependency-light (stdlib only). Implements the canonical hash rule,
the validator contract, ingest boundaries, and the warm error catalogue.

    from gaia_packet import validate, canonical_hash, new_packet
"""
import hashlib, json, re, unicodedata, uuid
from datetime import datetime

SCHEMA = "gaia.packet/v1"
STAMPS = ("ANCHORED", "PLAUSIBLE", "IMAGINED", "OPEN_FIELD")
LICENCES = {"CC-BY", "CC-BY-SA", "CC0", "public-domain", "unknown"}
CLAIM_MAX = 500

def canonical_hash(claim: str) -> str:
    s = unicodedata.normalize("NFC", claim)
    s = " ".join(s.strip().split())
    return hashlib.sha256(s.encode("utf-8")).hexdigest()

BOUNDARY_PATTERNS = [
    (r"\b(fingerprint|fingerprints|face[- ]?geometry|facial[- ]recognition (?:template|data)|iris scan|retina scan|genome|dna sequence|biometric (?:id|identifier|data|template))\b",
     "INGEST_PRIVATE_BIOMETRICS",
     "This touches private biometrics — it's outside the field, not against it."),
    (r"\b(?:child|kid|minor|student|pupil)\b[^.?!]{0,80}\b(?:name is|named|address|home address|lives at)\b",
     "INGEST_CHILD_DATA",
     "Children's data doesn't enter the field. This isn't a judgement of the claim — it's a wall."),
    (r"^\s*i (?:am|feel|heard|experience|suffer(?:ing)? from)\b[^.?!]{0,120}",
     "INGEST_INNER_STATES",
     "Lived inner states can't be sorted from outside. They stay with the person who has them."),
]

MESSAGES = {
    "MISSING_SOURCE":        "An anchored claim needs somewhere to stand — add the source it grew from.",
    "MISSING_OBSERVED_AT":   "An anchored claim names when its evidence was observed — add the date.",
    "MISSING_LICENCE":       "This claim carries a source, so it needs a licence stamp — 'unknown' is legal and honest.",
    "MISSING_LORE":          "Every imagined thing needs its What-is-this? line, so no one mistakes yarn for fact.",
    "TESTIMONY_AS_ANCHORED": "Testimony is lived, not proven. It keeps its voice — try PLAUSIBLE, or drop the fact-stamp.",
    "HASH_MISMATCH":         "This claim has changed since it was stamped. Re-stamp it, or restore the original wording.",
    "BAD_SCHEMA":            "This packet speaks a different schema version than I do. I won't guess at it.",
    "NOT_JSON":              "This packet isn't valid JSON — I can't read it at all, so I won't guess at it.",
    "BAD_STAMP":             "That stamp isn't one of the four layers (ANCHORED, PLAUSIBLE, IMAGINED, OPEN_FIELD).",
    "BAD_LICENCE":           "That licence isn't a recognised SPDX stamp (CC-BY, CC-BY-SA, CC0, public-domain, unknown).",
    "BAD_ID":                "The id should be a UUID so the packet can be referenced without being confused.",
    "CLAIM_TOO_LONG":        "A claim is a sentence, not an essay. Keep the essence; move the rest to 'note'.",
}
WARN = {
    "SOURCE_RECOMMENDED": "Plausible is reasoned, not proven. If you have a source, consider re-stamping ANCHORED.",
    "HASH_MISSING": "No hash on this packet. I computed one from the claim as it stands — bake it in before sharing.",
}

def _is_iso_date(s: str) -> bool:
    try:
        datetime.fromisoformat(s.replace("Z", "+00:00"))
        return True
    except ValueError:
        return False

def _boundaries(text: str):
    low = text.lower()
    for pat, code, msg in BOUNDARY_PATTERNS:
        if re.search(pat, low, re.IGNORECASE):
            return code, msg
    return None, None

def validate(packet):
    if isinstance(packet, str):
        try:
            packet = json.loads(packet)
        except (json.JSONDecodeError, TypeError):
            return {"valid": False, "stamp": None,
                    "errors": [{"code": "NOT_JSON", "message": MESSAGES["NOT_JSON"]}],
                    "warnings": [], "rendered_tag": "", "packet_hash": None}
    if not isinstance(packet, dict):
        packet = {}
    errors, warnings = [], []
    if packet.get("schema") != SCHEMA:
        errors.append({"code": "BAD_SCHEMA", "message": MESSAGES["BAD_SCHEMA"]})
    claim = packet.get("claim")
    if not isinstance(claim, str) or not claim.strip():
        errors.append({"code": "NOT_JSON" if not isinstance(claim, str) else "CLAIM_TOO_LONG",
                       "message": MESSAGES["NOT_JSON"] if not isinstance(claim, str) else MESSAGES["CLAIM_TOO_LONG"]})
    elif len(claim) > CLAIM_MAX:
        errors.append({"code": "CLAIM_TOO_LONG", "message": MESSAGES["CLAIM_TOO_LONG"]})
    stamp = packet.get("stamp")
    if stamp not in STAMPS:
        errors.append({"code": "BAD_STAMP", "message": MESSAGES["BAD_STAMP"]})
        stamp = None
    try:
        uuid.UUID(str(packet.get("id")))
    except (ValueError, AttributeError, TypeError):
        errors.append({"code": "BAD_ID", "message": MESSAGES["BAD_ID"]})
    if isinstance(claim, str):
        code, msg = _boundaries(claim)
        if code:
            errors.append({"code": code, "message": msg})
    testimony = packet.get("testimony") is True
    if stamp == "ANCHORED":
        if testimony:
            errors.append({"code": "TESTIMONY_AS_ANCHORED", "message": MESSAGES["TESTIMONY_AS_ANCHORED"]})
        if not str(packet.get("source") or "").strip():
            errors.append({"code": "MISSING_SOURCE", "message": MESSAGES["MISSING_SOURCE"]})
        if not _is_iso_date(str(packet.get("observed_at") or "")):
            errors.append({"code": "MISSING_OBSERVED_AT", "message": MESSAGES["MISSING_OBSERVED_AT"]})
        if not str(packet.get("licence") or "").strip():
            errors.append({"code": "MISSING_LICENCE", "message": MESSAGES["MISSING_LICENCE"]})
    elif stamp == "PLAUSIBLE":
        if not str(packet.get("source") or "").strip():
            warnings.append({"code": "SOURCE_RECOMMENDED", "field": "source", "message": WARN["SOURCE_RECOMMENDED"]})
    elif stamp == "IMAGINED":
        if not str(packet.get("lore") or "").strip():
            errors.append({"code": "MISSING_LORE", "message": MESSAGES["MISSING_LORE"]})
    rendered_tag = "[TESTIMONY — not fact]" if testimony else ""
    h = packet.get("hash")
    packet_hash = None
    if isinstance(claim, str) and claim.strip() and len(claim) <= CLAIM_MAX:
        packet_hash = canonical_hash(claim)
        if not h:
            warnings.append({"code": "HASH_MISSING", "field": "hash", "message": WARN["HASH_MISSING"]})
        elif str(h).lower() != packet_hash:
            errors.append({"code": "HASH_MISMATCH", "message": MESSAGES["HASH_MISMATCH"]})
    if packet.get("licence") and packet["licence"] not in LICENCES:
        errors.append({"code": "BAD_LICENCE", "message": MESSAGES["BAD_LICENCE"]})
    return {"valid": not errors, "stamp": stamp, "errors": errors, "warnings": warnings,
            "rendered_tag": rendered_tag, "packet_hash": packet_hash}

def new_packet(claim: str, stamp: str, **fields):
    p = {"schema": SCHEMA, "id": str(uuid.uuid4()), "claim": claim, "stamp": stamp,
         "stamped_at": datetime.utcnow().isoformat(timespec="seconds") + "Z",
         "hash": canonical_hash(claim)}
    p.update(fields)
    return p
