import React from 'react';
import { toDateKey, isSameDay, today } from '../utils/dateUtils';
import { getHeatLevel } from '../utils/bookingUtils';

const HEAT_CLASSES = [
  'bg-stone-900',          // 0 - empty
  'bg-amber-950',          // 1 - very low
  'bg-amber-800',          // 2 - low
  'bg-amber-600',          // 3 - medium
  'bg-amber-400',          // 4 - high
  'bg-amber-300',          // 5 - peak
];

const HEAT_TEXT = [
  'text-stone-600',
  'text-amber-600',
  'text-amber-300',
  'text-stone-900',
  'text-stone-900',
  'text-stone-900',
];

export default function DayCell({
  date,
  isCurrentMonth,
  occupancyMap,
  maxCount,
  selectedRange,
  onMouseDown,
  onMouseEnter,
  onMouseUp,
}) {
  const key = toDateKey(date);
  const entry = occupancyMap[key];
  const count = entry?.count || 0;
  const heatLevel = getHeatLevel(count, maxCount);

  const isToday = isSameDay(date, today());

  const { start, end } = selectedRange;
  const inRange = start && end && date >= start && date <= end;
  const isRangeStart = start && isSameDay(date, start);
  const isRangeEnd = end && isSameDay(date, end);

  return (
    <div
      className={[
        'relative flex flex-col items-center justify-center rounded-lg cursor-pointer select-none transition-all duration-150 aspect-square',
        HEAT_CLASSES[heatLevel],
        !isCurrentMonth ? 'opacity-30' : 'opacity-100',
        inRange ? 'ring-2 ring-amber-400 ring-inset z-10' : '',
        isRangeStart || isRangeEnd ? 'ring-2 ring-amber-300 scale-105 z-20' : '',
        'hover:scale-105 hover:z-10',
      ].join(' ')}
      onMouseDown={() => onMouseDown(date)}
      onMouseEnter={() => onMouseEnter(date)}
      onMouseUp={() => onMouseUp(date)}
    >
      <span className={`text-xs font-semibold leading-none ${HEAT_TEXT[heatLevel]} ${!isCurrentMonth ? 'text-stone-700' : ''}`}>
        {date.getDate()}
      </span>
      {count > 0 && (
        <span className={`text-[9px] font-bold mt-0.5 ${HEAT_TEXT[heatLevel]}`}>
          {count}
        </span>
      )}
      {isToday && (
        <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-amber-400" />
      )}
    </div>
  );
}