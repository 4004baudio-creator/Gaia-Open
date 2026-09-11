# Gaia Open — Protocol Kit

The runnable half of Gaia Open: packet schema, claim ledger, peer signatures.
Headless by design — no server, no accounts, no central authority.
This folder is engineering. It is not a MAP house and not a nav chip.

## Run the tests

    cd protocol
    PYTHONPATH=impl python -m unittest discover -s tests -t .

Expected: 56 tests, OK (17 packet + 16 ledger + 23 signature).
Verified 2026-09-12 in the reference environment.

## Use it

    python gaia_cli.py --shelf shelfA add --claim 'lichen on the north heap' --stamp PLAUSIBLE
    python gaia_cli.py --shelf shelfA export out.snapshot.json.gz
    python gaia_cli.py --shelf shelfB import out.snapshot.json.gz
    python gaia_cli.py --shelf shelfB audit

## Principles

- A signature proves authorship, never authority.
- Receiving is not endorsing. Import re-validates; quarantine keeps reasons.
- Fork is the hierarchy replacement.
