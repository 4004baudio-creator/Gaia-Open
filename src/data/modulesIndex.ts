import { MASTER_MODULES as CORE_MODULES } from './modulesData';
import { AUDIT_SUPPORT_MODULES } from './auditModules';
import { GaiaModule } from '../types';

/** Locked spine + supporting + expansion + claim/inventory/exploration (31–33). */
export const MASTER_MODULES: GaiaModule[] = [
  ...CORE_MODULES,
  ...AUDIT_SUPPORT_MODULES.map(module => ({
    ...module,
    structureTier: 'SUPPORTING' as const,
    knowledgeLayer: 'ANCHORED' as const
  }))
];
