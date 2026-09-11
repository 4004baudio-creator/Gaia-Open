# packet_v1.md — Packet Schema v1.0 (gaia.packet/v1)

A packet is the atomic unit of the field: one claim, one stamp, one hash.
Pure standard library. No network, no accounts, no central service.

## The four stamps

| Stamp | Requires | Meaning |
|---|---|---|
| ANCHORED | source, observed_at, licence | Something checkable stands underneath it |
| PLAUSIBLE | nothing beyond the claim | Reasonable, not yet anchored |
| IMAGINED | lore (the honest "What is this?" line) | Filed as imagination, on purpose |
| OPEN_FIELD | nothing | Sorted, not gagged — room kept for the unexplained |

Testimony is tagged `TESTIMONY — not fact` automatically and may never self-describe as ANCHORED.

## Canonical hash rule (spec/hash_vectors.json)

NFC normalise -> trim -> collapse internal whitespace to single spaces -> encode UTF-8 -> SHA-256 (hex lowercase).

Pinned vectors:

- `Gaia is not an OS.` -> f52edbaeb8c6501585a73d4af90c06fa220dd8c00c646048e9d81e0db7a052ad
- same wording with stray whitespace -> identical hash
- `Gaia is not a kernel.` -> 259c0da002f443222afe625b4927ce204052224c00b7471826c778e144b25032

## Ingest boundaries

1. Private biometrics
2. Children's data
3. Lived inner states claimed as ANCHORED
