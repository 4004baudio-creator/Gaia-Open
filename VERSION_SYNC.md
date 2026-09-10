# Version sync (GitHub ↔ Studio ↔ live)

Three registers. They must name the same commit.

| Register | What it is | How to read |
|---|---|---|
| **GitHub `main`** | Source of law and source | `git rev-parse HEAD` on 4004baudio-creator/Gaia-Open |
| **Studio working copy** | What Gemini edits | Must `git pull` that SHA before edit; must `git push` before Publish |
| **Live** https://our-core.ai.studio | What humans see | Publish only after push. Commit ≠ publish |

## Current pin (update on every publish)

| Field | Value |
|---|---|
| Last pushed SHA | e2a756480b5c0a417a3496a1e8879c8b6fee993a |
| Last known live match | hero + nav from that commit (Yarning / Thermohaline / Mirror Pit / Acclimatization chips) |
| Map chrome | v3.3 MAP |
| EEI banner packet | ~1.12 W m⁻² (2013–2025) — present tense, not zero |

Do not bump MAP_VERSION for law-only docs. Do bump it when hero meaning changes.
Do not add a Phase Roman numeral to the hero without writing it in MAP_VERSION.md.

## One path (both Grok and Gemini)

1. Read GitHub HEAD SHA first. That is the current version.
2. If Studio is behind: pull that SHA. If Studio is ahead: push, then publish.
3. After publish, paste the SHA into this table.
4. A relay that does not name the SHA is not a version check.

## Conflicts still on this pin (fix next, do not hide)

- Module 44: Hiroshima packet vs ACCLIMATIZATION_PATHWAY.md using 44.
- EEI ~1.12 on banner / audit card vs ~1.18 in Root Anchor and sim HUD.
- Hero says Phase XXII while MAP_VERSION stays v3.3.
- Mission text assigns Module 19 to inter-species sanctuary; spine has 19 = Quantum Bridge, 24 = Inter-Species.
