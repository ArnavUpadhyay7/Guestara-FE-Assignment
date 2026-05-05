import React from 'react';

const LEVELS = [
  { label: '0', cls: 'bg-stone-900 border border-stone-700' },
  { label: 'Low', cls: 'bg-amber-950' },
  { label: '', cls: 'bg-amber-800' },
  { label: '', cls: 'bg-amber-600' },
  { label: '', cls: 'bg-amber-400' },
  { label: 'Peak', cls: 'bg-amber-300' },
];

export default function HeatmapLegend() {
  return (
    <div className="flex items-center gap-2 px-6 py-3 border-t border-stone-800">
      <span className="text-xs text-stone-500 tracking-wider uppercase mr-1">Occupancy</span>
      <div className="flex items-center gap-1">
        {LEVELS.map((l, i) => (
          <div key={i} className="flex flex-col items-center gap-1">
            <div className={`w-6 h-6 rounded ${l.cls}`} />
            {l.label && <span className="text-[9px] text-stone-500">{l.label}</span>}
          </div>
        ))}
      </div>
      <span className="text-[10px] text-stone-600 ml-2 italic">drag to select range</span>
    </div>
  );
}