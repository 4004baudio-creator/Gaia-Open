/**
 * Verification audit filter for the Claim Shelf & Gaia Open protocol (Module 31 / 27).
 * Identifies external roleplay character sheets, non-standard synthetic adventure data,
 * fictional RPG stats (e.g. SWSheets, tabletop obligations, credit debts, syndicate factions),
 * and tags them as 'SIMULATED' or 'ADVENTURE_DATA' so they cannot contaminate the physical baseline.
 */

export interface CharacterAuditResult {
  detected: boolean;
  classification: 'STANDARD_FIELD' | 'ADVENTURE_DATA' | 'SIMULATED';
  matchedFlags: string[];
  quarantineReason?: string;
  recommendedStamp: 'SIMULATED' | 'ADVENTURE_DATA';
}

// Patterns characteristic of tabletop RPG / adventure character sheets / fictional lore injections
const ADVENTURE_CHARACTER_PATTERNS: { regex: RegExp; label: string }[] = [
  { regex: /\b(?:kaelen\s+voss)\b/i, label: 'KNOWN_NON_STANDARD_ENTITY (Kaelen Voss)' },
  { regex: /\b(?:swsheets(?:\.com)?)\b/i, label: 'EXTERNAL_RPG_SHEET_SOURCE (swsheets)' },
  { regex: /\b(?:obligations?:\s*(?:debt|responsibility|bounty|addiction|betrayal|blackmail))\b/i, label: 'RPG_OBLIGATION_MECHANIC' },
  { regex: /\b(?:debt\s*\(\d+\)|responsibility\s*\(\d+\)|duty\s*\(\d+\)|morality\s*\(\d+\))\b/i, label: 'RPG_STAT_SCORE_BRACKETS' },
  { regex: /\b(?:hutt\s+cartel|corporate\s+sector\s+authority|black\s+sun\s+syndicate|pyke\s+syndicate)\b/i, label: 'FICTIONAL_ADVENTURE_SYNDICATE' },
  { regex: /\b(?:character\s+sheet|stat\s+block|hit\s+points|saving\s+throw|xp\s+cost|wound\s+threshold|strain\s+threshold)\b/i, label: 'TABLETOP_RPG_STAT_BLOCK' }
];

const SIMULATED_SYNTHETIC_PATTERNS: { regex: RegExp; label: string }[] = [
  { regex: /\b(?:synthetic\s+persona|fictional\s+character|roleplay\s+avatar|non-canon\s+character)\b/i, label: 'EXPLICIT_ROLEPLAY_PERSONA' },
  { regex: /\b(?:d&d|star\s+wars\s+rpg|ffg\s+rpg|edge\s+of\s+the\s+empire|age\s+of\s+rebellion)\b/i, label: 'CAMPAIGN_SETTING_SOURCE' }
];

export function auditClaimForAdventureOrSimulated(text: string): CharacterAuditResult {
  if (!text || typeof text !== 'string') {
    return {
      detected: false,
      classification: 'STANDARD_FIELD',
      matchedFlags: [],
      recommendedStamp: 'SIMULATED'
    };
  }

  const matchedFlags: string[] = [];

  for (const item of ADVENTURE_CHARACTER_PATTERNS) {
    if (item.regex.test(text)) {
      matchedFlags.push(item.label);
    }
  }

  if (matchedFlags.length > 0) {
    return {
      detected: true,
      classification: 'ADVENTURE_DATA',
      matchedFlags,
      quarantineReason: `Tagged ADVENTURE_DATA: Matches external roleplay/character sheet patterns [${matchedFlags.join(', ')}]. Preserved as isolated yarn, excluded from physical baseline.`,
      recommendedStamp: 'ADVENTURE_DATA'
    };
  }

  for (const item of SIMULATED_SYNTHETIC_PATTERNS) {
    if (item.regex.test(text)) {
      matchedFlags.push(item.label);
    }
  }

  if (matchedFlags.length > 0) {
    return {
      detected: true,
      classification: 'SIMULATED',
      matchedFlags,
      quarantineReason: `Tagged SIMULATED: Matches synthetic or simulated character profile. Excluded from empirical instrument series.`,
      recommendedStamp: 'SIMULATED'
    };
  }

  return {
    detected: false,
    classification: 'STANDARD_FIELD',
    matchedFlags: [],
    recommendedStamp: 'SIMULATED'
  };
}
