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
      className="p-5 select-none bg-neutral-900 rounded-2xl border border-white/5"
      onMouseLeave={() => {}}
    >
      <div className="grid grid-cols-7 mb-3">
        {DAYS.map(d => (
          <div key={d} className="flex items-center justify-center py-2">
            <span className="text-[10px] font-semibold tracking-widest uppercase text-neutral-600">{d}</span>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1.5">
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