import React from 'react';
import { HouseDef } from '../data/houses';

export const HouseBand: React.FC<{ house: HouseDef }> = ({ house }) => {
  return (
    <div
      id={house.sectionId}
      className="border-t border-white/10 bg-[#05070a]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        <p className="font-mono text-[10px] tracking-[0.25em] uppercase text-[#00ff95] mb-2">
          House
        </p>
        <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-white">
          {house.label}
        </h2>
        <p className="mt-2 max-w-2xl text-sm text-slate-400 leading-relaxed">
          {house.intent}
        </p>
        <div className="mt-4 flex flex-wrap gap-2 font-mono text-[10px] uppercase tracking-wider">
          <span className="px-2 py-0.5 rounded border border-white/15 text-slate-300">
            {house.defaultLayer}
          </span>
          <span className="px-2 py-0.5 rounded border border-[#00ff95]/40 text-[#00ff95]">
            {house.defaultLane}
          </span>
        </div>
      </div>
    </div>
  );
};
