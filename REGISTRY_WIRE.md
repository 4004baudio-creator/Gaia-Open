# Studio wire (two imports)

After pull, point module lists at the barrel so 31–33 appear in the registry/gateway:

- `src/context/AutomatedUpdateContext.tsx`
- `src/components/SpecialistGateway.tsx`

Change:
`import { MASTER_MODULES } from '../data/modulesData'`

to:
`import { MASTER_MODULES } from '../data/modulesIndex'`

Do not copy 31–33 into the locked spine. Law already lives in MEDIA_CLAIM_AUDIT.md and MODULE_31–33.
