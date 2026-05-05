const LEVELS = [
  { label: '0',    cls: 'bg-neutral-800/60 border border-white/5' },
  { label: '',     cls: 'bg-amber-950/50' },
  { label: '',     cls: 'bg-amber-900/60' },
  { label: '',     cls: 'bg-amber-700/60' },
  { label: '',     cls: 'bg-amber-500/75' },
  { label: 'Peak', cls: 'bg-amber-400/90' },
];

export default function HeatmapLegend() {
  return (
    <div className="flex items-center gap-3 px-5 py-3 border-t border-white/5">
      <span className="text-[10px] font-medium text-neutral-600 uppercase tracking-widest shrink-0">Occupancy</span>
      <div className="flex items-center gap-1">
        {LEVELS.map((l, i) => (
          <div key={i} className="flex flex-col items-center gap-1">
            <div className={`w-5 h-5 rounded-md ${l.cls}`} />
            {l.label && (
              <span className="text-[9px] text-neutral-600 font-medium">{l.label}</span>
            )}
          </div>
        ))}
      </div>
      <div className="ml-auto">
        <span className="text-[10px] text-neutral-700">drag to select range</span>
      </div>
    </div>
  );
}