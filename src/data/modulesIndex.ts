import { MASTER_MODULES as CORE_MODULES } from './modulesData';
import { AUDIT_SUPPORT_MODULES } from './auditModules';
import { GaiaModule } from '../types';

/** Locked spine + supporting + expansion + claim/inventory/exploration/contact/dragonfly (31–45). */
export const MASTER_MODULES: GaiaModule[] = [
  ...CORE_MODULES,
  ...AUDIT_SUPPORT_MODULES.map(module => ({
    ...module,
    structureTier: module.structureTier || ('SUPPORTING' as const),
    knowledgeLayer: module.knowledgeLayer || ('ANCHORED' as const)
  }))
];
