/** Public IA. Rooms hang off houses. Phases are not addresses. */

export type HouseId = 'measure' | 'shelf' | 'care' | 'explore';

export interface HouseDef {
  id: HouseId;
  sectionId: string;
  label: string;
  intent: string;
  defaultLayer: 'ANCHORED' | 'PLAUSIBLE' | 'IMAGINED' | 'OPEN_FIELD';
  defaultLane: 'instruments' | 'lineage';
}

export const HOUSES: HouseDef[] = [
  {
    id: 'measure',
    sectionId: 'house-measure',
    label: 'Measure',
    intent: 'Public series and repair maps. Watts first. Simulated HUD stays labelled SIM.',
    defaultLayer: 'ANCHORED',
    defaultLane: 'instruments'
  },
  {
    id: 'shelf',
    sectionId: 'house-shelf',
    label: 'Shelf',
    intent: 'Yarn, craft, lineage. Representation is allowed. Substitution is not.',
    defaultLayer: 'IMAGINED',
    defaultLane: 'lineage'
  },
  {
    id: 'care',
    sectionId: 'house-care',
    label: 'Care',
    intent: 'Sanctuary, rest, other life. Inner law is not a public score.',
    defaultLayer: 'PLAUSIBLE',
    defaultLane: 'lineage'
  },
  {
    id: 'explore',
    sectionId: 'house-explore',
    label: 'Explore',
    intent: 'Sky, orbit, nested scale. Contact stays OPEN_FIELD until a matching series exists.',
    defaultLayer: 'OPEN_FIELD',
    defaultLane: 'instruments'
  }
];
