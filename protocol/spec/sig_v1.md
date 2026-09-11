# sig_v1.md — Peer Signatures (gaia.sig/v1)

**A signature proves authorship, never authority.** A signed packet is not sorted any better than an unsigned one.

Local Ed25519 keypairs. The public key IS the identity. No PKI, no trust scores.
The signature covers the packet's canonical SHA-256 hash.

DoS guard: one statement per known key. Self-revocation outranks the guard.
`cryptography` is optional. If no backend initialises, `verify_packet` returns `verification_unavailable`.
