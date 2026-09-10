# Version Synchronization Protocol

Three registers, one SHA:

1. **GitHub `main`** = current version.  
2. **Studio** only edits after `pull` of that SHA.  
3. **Live** only changes after `push` then Publish.  
4. Paste the SHA into `VERSION_SYNC.md` after publish.

---

## Last Pushed SHA
`66a6aaec`

---

## Synchronization Workflow
1. `git fetch && git pull origin main`. Verify HEAD SHA.
2. Edit on that SHA only.
3. `git push origin main`. Note new SHA.
4. Publish in Studio.
5. Update `VERSION_SYNC.md` with the new SHA.

## Invariant Rules
- Do not invent a Phase Roman numeral unless `MAP_VERSION.md` names it.
- Do not change locked spine numbers 2, 11, 17, 19–27.
- EEI stays uniformly ~1.12 W m⁻² (2013–2025) across all telemetry, UI, Root Anchor, and audit cards.
