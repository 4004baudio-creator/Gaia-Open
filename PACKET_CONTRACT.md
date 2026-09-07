# Packet contract (all ingest)

A complete, hashed packet. Not a token. Not a chain requirement.
Incomplete packets may sit beside the map. They cannot complete onto the collective as map data.

Kind-specific rules live in EDGE_DEVICE_AUDIT.md, MEDIA_CLAIM_AUDIT.md, MODULE_32, MODULE_33.
This file is the shared shape.

## States

`ARRIVED → BESIDE | PLAUSIBLE | ANCHORED | CHALLENGED | WITHDRAWN → successor`

Never quiet-edit a stamp. Version++. Keep the old row.

WITHDRAWN is not only a broken sensor. It is also: expired cert, unsigned firmware, retracted paper, superseded inventory vintage, story that failed its own date, model whose skill collapsed.

## Required fields (all kinds)

| Field | Why |
|---|---|
| Kind | device, public_series, inventory, model, story, catalogue, lived_note, chat_output |
| Measurand or claim sentence + units + time window | What was said |
| Instrument / author / agency | Who spoke |
| Method or calibration path (or “none”) | Compliance |
| Version (firmware, product, inventory vintage) | Reproducibility |
| Locator (URL, DOI, hash) or “no file” | Second node |
| Rank claimed vs rank allowed | No self-promotion |
| Payload hash | Tamper evidence |
| Successor pointer | Where to look after WITHDRAWN |

Missing required field = cannot complete.

## Kind defaults

| Kind | Completes when | Default if incomplete | Cannot become |
|---|---|---|---|
| In-situ / edge | measurand, ID, cal path, firmware, locator, hash | BESIDE | ANCHORED without cal |
| Public series (EEI, OHC, CERES) | named product + window + locator + version | PLAUSIBLE | “present equilibrium” |
| Inventory | method + vintage + changelog | PLAUSIBLE | a thermometer |
| Model / downscale | paper or code + inputs + failed-prediction log | BESIDE / PLAUSIBLE | ANCHORED over in-situ |
| Media / story | claim + source + time + rival packet | BESIDE | verified-by-badge |
| Catalogue / mission | agency page + date | ANCHORED as *status* only | Earth flux substitute |
| Lived / inner / field note | stays the author’s | OPEN_FIELD / IMAGINED | collective telemetry |
| Chat / model output | cited open file or marked OPS_SIM | BESIDE | training the map on a person |

Inner states do not complete. Refusal, not a missing field.

## Hierarchy (disagreement)

compliant in-situ → public flux/catalogue → national inventory → TRACE-class → downscale → unsigned model → story

Lower may challenge higher. Lower may not overwrite higher.

## Path A — evidence lift

BESIDE + complete contract + second node + rank allowed → PLAUSIBLE or ANCHORED.
Keep the beside row.

## Path B — knowledge break

ANCHORED + later non-compliance or superseded method → WITHDRAWN + successor.
Re-rank dependents. Do not delete the trail.

## Weekly check

Flag live chrome that: collapses two lanes into one; shows a WITHDRAWN series as live; treats chat or lived note as ingest.
