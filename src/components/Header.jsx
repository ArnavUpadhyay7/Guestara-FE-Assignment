import React from 'react';
import { MONTHS } from '../utils/dateUtils';

export default function Header({ currentMonth, onPrev, onNext, onToday }) {
  return (
    <div className="flex items-center justify-between px-6 py-4 border-b border-stone-800">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-amber-500 flex items-center justify-center">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <rect x="2" y="3" width="12" height="11" rx="2" stroke="#1c1917" strokeWidth="1.5"/>
            <path d="M2 7h12" stroke="#1c1917" strokeWidth="1.5"/>
            <path d="M5 1v3M11 1v3" stroke="#1c1917" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </div>
        <div>
          <h1 className="text-sm font-bold text-stone-100 tracking-widest uppercase">Heatmap</h1>
          <p className="text-xs text-stone-500 tracking-wider">Booking Calendar</p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={onPrev}
          className="w-8 h-8 flex items-center justify-center rounded-lg text-stone-400 hover:text-stone-100 hover:bg-stone-800 transition-all"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M9 11L5 7l4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        <div className="min-w-40] text-center">
          <span className="text-stone-100 font-semibold tracking-wide">
            {MONTHS[currentMonth.getMonth()]} {currentMonth.getFullYear()}
          </span>
        </div>

        <button
          onClick={onNext}
          className="w-8 h-8 flex items-center justify-center rounded-lg text-stone-400 hover:text-stone-100 hover:bg-stone-800 transition-all"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M5 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        <button
          onClick={onToday}
          className="ml-2 px-3 py-1.5 text-xs font-semibold tracking-wider uppercase rounded-lg bg-stone-800 text-amber-400 hover:bg-amber-500 hover:text-stone-900 transition-all border border-stone-700 hover:border-amber-500"
        >
          Today
        </button>
      </div>
    </div>
  );
}