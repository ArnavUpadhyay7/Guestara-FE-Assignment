import { useState, useMemo, useCallback, useRef } from 'react';
import { addMonths, build42Cells, today, toDateKey } from '../utils/dateUtils';

export function useCalendar() {
  const [currentMonth, setCurrentMonth] = useState(() => {
    const t = today();
    return new Date(t.getFullYear(), t.getMonth(), 1);
  });

  const [selectedRange, setSelectedRange] = useState({ start: null, end: null });
  const isDragging = useRef(false);
  const dragStart = useRef(null);

  const calendarDays = useMemo(() => build42Cells(currentMonth), [currentMonth]);

  const goToPrev = useCallback(() => setCurrentMonth(m => addMonths(m, -1)), []);
  const goToNext = useCallback(() => setCurrentMonth(m => addMonths(m, 1)), []);
  const goToToday = useCallback(() => {
    const t = today();
    setCurrentMonth(new Date(t.getFullYear(), t.getMonth(), 1));
  }, []);

  const handleMouseDown = useCallback((date) => {
    isDragging.current = true;
    dragStart.current = date;
    setSelectedRange({ start: date, end: date });
  }, []);

  const handleMouseEnter = useCallback((date) => {
    if (!isDragging.current || !dragStart.current) return;
    const s = dragStart.current;
    if (s <= date) {
      setSelectedRange({ start: s, end: date });
    } else {
      setSelectedRange({ start: date, end: s });
    }
  }, []);

  const handleMouseUp = useCallback((date) => {
    if (!isDragging.current || !dragStart.current) return;
    const s = dragStart.current;
    if (s <= date) {
      setSelectedRange({ start: s, end: date });
    } else {
      setSelectedRange({ start: date, end: s });
    }
    isDragging.current = false;
    dragStart.current = null;
  }, []);

  const clearSelection = useCallback(() => {
    setSelectedRange({ start: null, end: null });
  }, []);

  return {
    currentMonth,
    calendarDays,
    selectedRange,
    goToPrev,
    goToNext,
    goToToday,
    handleMouseDown,
    handleMouseEnter,
    handleMouseUp,
    clearSelection,
  };
}