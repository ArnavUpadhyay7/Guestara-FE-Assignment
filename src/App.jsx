import { useMemo } from 'react';
import Header from './components/Header';
import CalendarGrid from './components/CalenderGrid';
import HeatmapLegend from './components/HeatmapLegend';
import BookingPanel from './components/BookingPanel';
import { useCalendar } from './hooks/useCalendar';
import { useBookings } from './hooks/useBookings';
import { getUniqueRooms } from './utils/bookingUtils';

const STATUS_OPTIONS = ['all', 'confirmed', 'pending', 'cancelled', 'checked-in', 'checked-out'];

export default function App() {
  const {
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
  } = useCalendar();

  const {
    bookings,
    filteredBookings,
    occupancyMap,
    maxCount,
    stats,
    loading,
    error,
    statusFilter,
    setStatusFilter,
    roomFilter,
    setRoomFilter,
  } = useBookings();

  const rooms = useMemo(() => getUniqueRooms(bookings), [bookings]);

  if (loading) {
    return (
      <div className="min-h-screen bg-stone-950 flex items-center justify-center">
        <div className="text-center">
          <div className="w-10 h-10 border-2 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-stone-400 text-sm tracking-wider">Loading bookings…</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-stone-950 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-400 font-semibold">Failed to load bookings</p>
          <p className="text-stone-600 text-sm mt-1">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen bg-stone-950 text-stone-100 flex flex-col"
      onMouseUp={(e) => {
        // Ensure drag ends even if released outside cells
      }}
    >
      {/* Stats Bar */}
      <div className="flex items-center gap-6 px-6 py-2.5 bg-stone-900/80 border-b border-stone-800 text-xs">
        <div className="flex items-center gap-2">
          <span className="text-stone-600 uppercase tracking-wider">Total Active</span>
          <span className="font-bold text-amber-400">{stats.total}</span>
        </div>
        <div className="w-px h-3 bg-stone-800" />
        <div className="flex items-center gap-2">
          <span className="text-stone-600 uppercase tracking-wider">Avg/Day</span>
          <span className="font-bold text-amber-400">{stats.avgOccupancy}</span>
        </div>
        <div className="w-px h-3 bg-stone-800" />
        <div className="flex items-center gap-2">
          <span className="text-stone-600 uppercase tracking-wider">Peak Day</span>
          <span className="font-bold text-amber-400">{stats.maxDay}</span>
        </div>
        <div className="flex-1" />
        {/* Filters */}
        <div className="flex items-center gap-2">
          <span className="text-stone-600 uppercase tracking-wider">Status</span>
          <select
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
            className="bg-stone-800 border border-stone-700 text-stone-200 text-xs rounded px-2 py-1 outline-none focus:border-amber-500 transition-colors"
          >
            {STATUS_OPTIONS.map(s => (
              <option key={s} value={s}>{s === 'all' ? 'All' : s.charAt(0).toUpperCase() + s.slice(1)}</option>
            ))}
          </select>
        </div>
        <div className="w-px h-3 bg-stone-800" />
        <div className="flex items-center gap-2">
          <span className="text-stone-600 uppercase tracking-wider">Room</span>
          <select
            value={roomFilter}
            onChange={e => setRoomFilter(e.target.value)}
            className="bg-stone-800 border border-stone-700 text-stone-200 text-xs rounded px-2 py-1 outline-none focus:border-amber-500 transition-colors"
          >
            <option value="all">All</option>
            {rooms.map(r => (
              <option key={r} value={r}>{r}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Calendar side */}
        <div className="flex flex-col flex-1 min-w-0 border-r border-stone-800">
          <Header
            currentMonth={currentMonth}
            onPrev={goToPrev}
            onNext={goToNext}
            onToday={goToToday}
          />
          <div className="flex-1 overflow-auto">
            <CalendarGrid
              calendarDays={calendarDays}
              occupancyMap={occupancyMap}
              maxCount={maxCount}
              selectedRange={selectedRange}
              onMouseDown={handleMouseDown}
              onMouseEnter={handleMouseEnter}
              onMouseUp={handleMouseUp}
            />
          </div>
          <HeatmapLegend />
        </div>

        {/* Panel side */}
        <div className="w-80 shrink-0 flex flex-col bg-stone-950">
          <BookingPanel
            selectedRange={selectedRange}
            bookings={filteredBookings}
            onClear={clearSelection}
          />
        </div>
      </div>
    </div>
  );
}