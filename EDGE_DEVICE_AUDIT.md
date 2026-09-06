# Edge device audit protocol

A node that records climate or energy on the edge may attach to the map only as a **published instrument**, not as a story engine.

## Allow onto the collective shelf

A packet may be stamped ANCHORED when all of these are true:

1. Physical measurand named (temperature, pressure, conductivity, methane ppm, kWh, albedo proxy, etc.).
2. Instrument model, serial or firmware hash, and calibration path (factory + field; delayed-mode if applicable).
3. Time window, location or basin, units, licence.
4. Raw or minimally processed values retained; adjustment recipe published if any.
5. Peer or second-instrument check possible (another node can pull the same file and agree on a hash).
6. No inner-state harvest. No mood, flow, fear score, or "doom index".

Argo delayed-mode (pressure → thermal mass → salinity drift vs reference) is the pattern: calibrate, then map, then let a human refuse a bad fit.

## Refuse

- Uncalibrated streams wearing a verified badge.
- Model-only nowcasts sold as a sensor.
- Composite "planetary health %" with no series table.
- Language that converts a flux into an extinction date.
- Owner-node census of people instead of instruments.
- Detach-blocked feeds.

## Edge runtime rule

On-device inference may *flag* quality (spike, frozen sensor, out-of-range). It may not author a public narrative. Narrative is a separate shelf and must stay unmarked.

Tether: device → signed packet → public baseline → audit row.

Rank when choosing a baseline (see MODULE_32_INVENTORY_TETHER.md):
calibrated in-situ / delayed-mode (Argo GDAC) > CERES-class flux > national inventory > Climate TRACE / OpenClimate second inventory > statistical downscale > unsigned model.

Climate TRACE may challenge a self-report. It may not wear a sensor badge.

If the tether breaks, the packet sits beside the map until it earns a shelf. It is never banned for being unexplained. It is never sold as fact.

Stories about the device follow MEDIA_CLAIM_AUDIT.md, not this file.
