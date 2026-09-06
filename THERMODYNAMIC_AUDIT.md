# Thermodynamic Audit (present tense)

Shelf rule: this page is ANCHORED numbers only. Header chrome (signal integrity %, Roman IR depth, Vostok-as-Earth) is not an audit.

Mandate (attractor): drive Earth's Energy Imbalance toward zero.
Present (2025–26 instruments): the planet is still accumulating heat.

Plain terms: see EEI_OHC_PLAIN.md. Edge sensors: see EDGE_DEVICE_AUDIT.md. Stories: see MEDIA_CLAIM_AUDIT.md. Inventories: see MODULE_32_INVENTORY_TETHER.md. Repair staffing: see REPAIR_PIVOT_MAP.md.

## Series that may appear on the Audit

| Series | Why | Example public origin | Present-tense class (2025–26) |
|--------|-----|------------------------|--------------------------------|
| Earth's Energy Imbalance (EEI) | Direct statement of thermodynamic disequilibrium | NASA CERES / successor TOA fluxes; IGCC annual (Forster et al.) | ~+1.12 W m⁻² (2013–2025). Not equilibrium. |
| Ocean heat content 0–2000 m | Where most of the imbalance is stored | IAP/CAS, NOAA/NCEI, Copernicus Marine | Record inventory years through 2025. |
| Planetary albedo / reflectivity | Large recent term in the rising imbalance | CERES reflected SW | Multi-decadal darkening; faster after ~2020. |
| Human-induced warming | Attribution, not a vibe | IGCC / IPCC-class assessments | ~1.37 °C in 2025; ~0.27 °C/decade (2016–2025). |
| GHG emissions | The tap still open | IGCC / IEA / Global Carbon Project | Totals at or near record; growth slowing vs GDP. |

Each row on the live Audit must carry: source URL, instrument or dataset name, time window, licence, fetch date, content hash when possible.

## Language law (anti-illusion)

Allowed: present-tense flux, inventory, rate, uncertainty, probability.
Forbidden as audit copy:
- Extinction dates, "12 years", "too late so burn".
- Equilibrium claimed while EEI > 0.
- Denial of human-caused majority of recent warming.
- A single season as proof either way.
- Inner states, fear scores, owner-node mood.

1.5 °C is a negotiated policy line, likely crossed as a multi-year mean around 2030 on current emissions. It is not a physical cliff and not a licence to quit repair.

## Must never appear on the Audit

- In-app status numbers that are not a public physical series
- Generated or model-only values wearing a verified stamp
- Edge packets that fail EDGE_DEVICE_AUDIT.md

## Update cadence

- Re-fetch when a source publishes (IGCC annual; OHC often annual/seasonal; CERES monthly; IEA energy review).
- Weekly live-map check compares chrome *and* these series windows.
- Two nodes should be able to pull the same URL and agree on a hash. That is consensus about a file, not about a soul.

## Version hygiene

One public version string for the map. Do not show v3.2 architecture beside a v3.1 baseline chip.
