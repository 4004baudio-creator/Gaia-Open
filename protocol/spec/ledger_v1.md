# ledger_v1.md — Claim Ledger (gaia.ledger/v1)

Built on the spine rule **receiving is not endorsing**. No central chain, no owner-node, no trust scores, no propagated deletion.

## The local shelf

- Append-only: packets are stored as files named by their canonical hash.
- The derived index (`index.jsonl`) can always be rebuilt. Packets are the truth.

## Snapshot exchange (gaia.snapshot/v1)

A plain JSON envelope over ANY transport. Every import re-validates. Failures go to quarantine with reasons.

## Corrections

Errors are fixed by NEW packets citing `supersedes: <old hash>` — history is never edited.
