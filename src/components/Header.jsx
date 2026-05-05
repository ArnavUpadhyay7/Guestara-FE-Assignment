import { MONTHS } from '../utils/dateUtils';

export default function Header({ currentMonth, onPrev, onNext, onToday }) {
  return (
    <div className="flex items-center justify-between px-5 py-3.5 border-b border-white/5">
      <div className="flex items-center gap-3">
        <div className="w-7 h-7 rounded-lg bg-amber-500/15 border border-amber-500/20 flex items-center justify-center">
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
            <rect x="2" y="3" width="12" height="11" rx="2" stroke="#f59e0b" strokeWidth="1.5"/>
            <path d="M2 7h12" stroke="#f59e0b" strokeWidth="1.5"/>
            <path d="M5 1v3M11 1v3" stroke="#f59e0b" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </div>
        <div>
          <h1 className="text-xs font-semibold text-white tracking-wide leading-none">Booking Calendar</h1>
          <p className="text-[10px] text-neutral-500 mt-0.5 leading-none">Occupancy heatmap</p>
        </div>
      </div>

      <div className="flex items-center gap-1">
        <button
          onClick={onPrev}
          className="w-7 h-7 flex items-center justify-center rounded-lg text-neutral-500 hover:text-white hover:bg-white/5 transition-all duration-200"
        >
          <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
            <path d="M9 11L5 7l4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        <div className="px-3 min-w-[148px] text-center">
          <span className="text-sm font-semibold text-white tabular-nums">
            {MONTHS[currentMonth.getMonth()]} {currentMonth.getFullYear()}
          </span>
        </div>

        <button
          onClick={onNext}
          className="w-7 h-7 flex items-center justify-center rounded-lg text-neutral-500 hover:text-white hover:bg-white/5 transition-all duration-200"
        >
          <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
            <path d="M5 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        <div className="w-px h-4 bg-white/10 mx-1" />

        <button
          onClick={onToday}
          className="px-3 h-7 text-[11px] font-medium tracking-wide rounded-lg bg-white/5 border border-white/8 text-neutral-400 hover:bg-amber-500/10 hover:text-amber-400 hover:border-amber-500/20 transition-all duration-200"
        >
          Today
        </button>
      </div>
    </div>
  );
}