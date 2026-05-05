import { toDateKey, isSameDay, today } from '../utils/dateUtils';
import { getHeatLevel } from '../utils/bookingUtils';

const HEAT_CLASSES = [
  'bg-neutral-800/60',
  'bg-amber-950/50',
  'bg-amber-900/60',
  'bg-amber-700/60',
  'bg-amber-500/75',
  'bg-amber-400/90',
];

const HEAT_TEXT = [
  'text-neutral-600',
  'text-amber-700',
  'text-amber-400',
  'text-amber-200',
  'text-neutral-900',
  'text-neutral-900',
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
        'relative flex flex-col items-center justify-center rounded-xl cursor-pointer select-none',
        'transition-all duration-200 aspect-square',
        'shadow-[0_0_0_1px_rgba(255,255,255,0.04)]',
        HEAT_CLASSES[heatLevel],
        !isCurrentMonth ? 'opacity-25' : 'opacity-100',
        inRange && !isRangeStart && !isRangeEnd ? 'ring-1 ring-amber-500/50 bg-amber-500/10 z-10' : '',
        isRangeStart || isRangeEnd ? 'ring-2 ring-amber-400 bg-amber-500/20 scale-[1.04] z-20 shadow-md' : '',
        !isRangeStart && !isRangeEnd ? 'hover:scale-[1.03] hover:shadow-md hover:z-10 hover:brightness-110' : '',
      ].join(' ')}
      onMouseDown={() => onMouseDown(date)}
      onMouseEnter={() => onMouseEnter(date)}
      onMouseUp={() => onMouseUp(date)}
    >
      <span className={[
        'text-[11px] font-medium leading-none',
        HEAT_TEXT[heatLevel],
        !isCurrentMonth ? 'text-neutral-700' : '',
      ].join(' ')}>
        {date.getDate()}
      </span>
      {count > 0 && (
        <span className={`text-[9px] font-bold mt-1 leading-none ${HEAT_TEXT[heatLevel]}`}>
          {count}
        </span>
      )}
      {isToday && (
        <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-amber-400 shadow-[0_0_4px_rgba(251,191,36,0.6)]" />
      )}
    </div>
  );
}