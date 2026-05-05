import React from 'react';
import DayCell from './DayCell';
import { DAYS } from '../utils/dateUtils';

export default function CalendarGrid({
  calendarDays,
  occupancyMap,
  maxCount,
  selectedRange,
  onMouseDown,
  onMouseEnter,
  onMouseUp,
}) {
  return (
    <div
      className="p-4 select-none"
      onMouseLeave={() => {}}
    >
      {/* Day headers */}
      <div className="grid grid-cols-7 mb-2">
        {DAYS.map(d => (
          <div key={d} className="flex items-center justify-center py-1">
            <span className="text-[10px] font-bold tracking-widest uppercase text-stone-600">{d}</span>
          </div>
        ))}
      </div>

      {/* Day cells */}
      <div className="grid grid-cols-7 gap-1">
        {calendarDays.map(({ date, currentMonth }, i) => (
          <DayCell
            key={i}
            date={date}
            isCurrentMonth={currentMonth}
            occupancyMap={occupancyMap}
            maxCount={maxCount}
            selectedRange={selectedRange}
            onMouseDown={onMouseDown}
            onMouseEnter={onMouseEnter}
            onMouseUp={onMouseUp}
          />
        ))}
      </div>
    </div>
  );
}