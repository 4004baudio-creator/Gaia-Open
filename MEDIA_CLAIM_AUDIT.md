# Media / claim audit protocol

A platform tick on an *account* is not a tick on a *sentence*.
A climate or exploration story may sit on the map only as a **claim packet**, never as a crown.

This file is the sorting rule for words. EDGE_DEVICE_AUDIT.md is the sorting rule for instruments.
Shared shape: PACKET_CONTRACT.md. Two lanes: LANE_FILTER.md.
Same spine. Different noise.

## Packet shape

```
raw cut (footage, quote, spreadsheet, scene)
  → story variant (one assembly)
  → rival variants (other outlets, labs, the subject’s own packet)
  → external audit (reproduce or break a named sentence)
  → shelf: ANCHORED | DISPUTED | BESIDE | WITHDRAWN | REFUSED
```

## Allow a “tethered” mark (ANCHORED claim)

All of these must exist:

1. Named claims. Each sentence that asserts a number or event cites a source URL or file hash. “Scientists say” is not a source.
2. Time window and place. “This year the planet cooked” fails. “IGCC 2013–2025 EEI ~1.12 W m⁻²” can sit on a shelf.
3. At least one independent packet on the same claim (second outlet, lab, national inventory, operator file).
4. Open challenge channel. An auditor may attach supporting or contradicting evidence without joining the newsroom.
5. Versioning. If the story changes, the old cut stays with a diff. Climate TRACE changelogs are the pattern; most newsrooms do not do this.
6. No inner-state harvest. A fear score is not a measurand.
7. Contract complete. Badge alone cannot complete.

Stamp: source, time, hash, licence, knowledgeLayer.

## WITHDRAWN

A story that was tethered and later fails its own date, loses its source file, or is superseded by a higher-rank series is WITHDRAWN + successor. Do not delete the cut.

## Refuse the badge (do not stamp ANCHORED)

- The only proof is the platform’s own label.
- Model output sold as a sensor.
- A cycle (one storm, one cool month) sold as the ledger.
- Variants collapsed into one official narrative and rivals deleted instead of scored.
- Weight is clicks, mood, or doom index.
- Account-verified used as claim-verified.
- Repeat-without-file treated as confirmation (LANE_FILTER illusion test).

Refuse = drop the *stamp*. Do not quarantine people. Quarantine packets.

## How technology weights variants

Scoring, not silencing.

| Signal | Meaning |
|--------|---------|
| Reproducibility | A second node can pull the same file. |
| Evidence rank | calibrated in-situ > delayed-mode inventory > satellite+AI estimate > statistical downscale > anonymous model > unsourced copy |
| Failed predictions | Last month’s sentence vs this month’s series. Misses lose weight. |
| Carried uncertainty | Like `PSAL_ADJUSTED_ERROR` on Argo. A number without error is incomplete. |

Output is not “this article is True.”
Output is: **these sentences are anchored / disputed / beside / withdrawn.**

## Climate TRACE on this shelf

Climate TRACE is an independent *inventory* (satellites + models + some ground truth; methods on GitHub; monthly lag). Independent assessments show large scatter on some AI facility rows; many power-plant rows still use national-mean factors.

Rule: TRACE may **enter** next to national inventories and in-situ. It does not outrank a calibrated instrument. A TRACE row without sector method + version + confidence does not get ANCHORED.

## Weekly check

The Monday live-map automation also flags:
- Live copy that treats a news tick as an instrument.
- TRACE or similar inventories stamped above Argo/CERES-class series.
- Stories on the map with no source card or no rival packet.
- Two lanes collapsed into one.

See MODULE_31_CLAIM_SHELF.md.
