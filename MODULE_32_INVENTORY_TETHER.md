# Module 32 — Inventory Tether (supporting)

Not spine. Serves Gaia Pulse (ground repair) without pretending an inventory is a thermometer.

**Purpose.** Rank how tonnes and activity estimates attach to the Audit.
**Layer.** Ranking rule ANCHORED. Each inventory row is PLAUSIBLE until method + version + uncertainty exist.
**Gate.** LANE_FILTER.md + PACKET_CONTRACT.md. Inventories cannot self-promote rank.

## Rank (high → low)

1. Calibrated in-situ instrument with delayed-mode path (Argo D-files, stack meters, flask networks).
2. Public physical flux / inventory with named instrument (CERES TOA, IAP/NOAA/Copernicus OHC).
3. National GHG inventory with published method (UNFCCC-class).
4. Independent second inventory (Climate TRACE and peers) — useful against self-report gaps, especially methane.
5. Statistical downscale / national-mean capacity factor applied to a named plant.
6. Unsigned model nowcast.
7. Story.

A lower rank may *challenge* a higher rank. It may not overwrite it.

## Climate TRACE attachment

- May sit beside a national inventory as a second packet.
- Requires: sector methodology doc, release version (e.g. v5.x), time window, confidence if published.
- Uncertainty “on request” is not the same as an error bar in the file. Stamp PLAUSIBLE until the error travels with the row.
- Changelog / external papers (including disputes) stay on the shelf. That is the peer loop working.
- Superseded vintage → WITHDRAWN + successor, not a silent overwrite.

## Directives

1. Never headline “satellite proved X” when the row is a national-average model.
2. Edge CH₄ / CO₂ nodes still pass EDGE_DEVICE_AUDIT.md before they argue with TRACE or UNFCCC.
3. Repair claims on REPAIR_PIVOT_MAP.md need an instrumented series at rank 1–4, not a story at rank 7.

## Verification

Same URL, same version tag, two hashes. File consensus only.
