import { useMemo } from 'react';
import { getBookingsInRange } from '../utils/bookingUtils';
import { formatRange } from '../utils/dateUtils';

const STATUS_COLORS = {
  confirmed:    'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  pending:      'bg-amber-500/10 text-amber-400 border-amber-500/20',
  cancelled:    'bg-red-500/10 text-red-400 border-red-500/20',
  'checked-in': 'bg-sky-500/10 text-sky-400 border-sky-500/20',
  'checked-out':'bg-neutral-500/10 text-neutral-400 border-neutral-500/20',
};

function fmt(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function formatCurrency(amount, currency) {
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency: currency || 'INR', maximumFractionDigits: 0 }).format(amount);
}

export default function BookingPanel({ selectedRange, bookings, onClear }) {
  const { start, end } = selectedRange;

  const rangeBookings = useMemo(
    () => getBookingsInRange(bookings, start, end),
    [bookings, start, end]
  );

  if (!start) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center px-6 py-12">
        <div className="w-10 h-10 rounded-xl bg-white/4 border border-white/6 flex items-center justify-center mb-4">
          <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
            <rect x="3" y="4" width="14" height="13" rx="2" stroke="#525252" strokeWidth="1.5"/>
            <path d="M3 8h14" stroke="#525252" strokeWidth="1.5"/>
            <path d="M7 2v3M13 2v3" stroke="#525252" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </div>
        <p className="text-neutral-600 text-xs leading-relaxed">Drag on the calendar to<br/>select a date range</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/5">
        <div>
          <p className="text-[10px] text-neutral-600 uppercase tracking-widest font-medium mb-1">Selected range</p>
          <p className="text-sm font-semibold text-white leading-none">{formatRange(start, end)}</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20">
            {rangeBookings.length} booking{rangeBookings.length !== 1 ? 's' : ''}
          </span>
          <button
            onClick={onClear}
            className="w-6 h-6 flex items-center justify-center rounded-lg text-neutral-600 hover:text-neutral-300 hover:bg-white/5 transition-all duration-200"
          >
            <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
              <path d="M2 2l8 8M10 2L2 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-3 py-3 space-y-2">
        {rangeBookings.length === 0 ? (
          <div className="text-center py-10 text-neutral-700 text-xs">No bookings in this range</div>
        ) : (
          rangeBookings.map(b => (
            <div
              key={b.id}
              className="rounded-xl bg-white/3 border border-white/5 p-3.5 hover:bg-white/5 hover:border-white/10 transition-all duration-200 cursor-default"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="text-white font-semibold text-sm leading-none mb-1">{b.guestName}</p>
                  <p className="text-neutral-500 text-[11px]">Room {b.roomNumber} · {b.roomType}</p>
                </div>
                <span className={`text-[9px] font-semibold px-2 py-0.5 rounded-full border uppercase tracking-wider ${STATUS_COLORS[b.status] || STATUS_COLORS['checked-out']}`}>
                  {fmt(b.status)}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-x-3 gap-y-2 text-[11px]">
                <div>
                  <p className="text-neutral-600 mb-0.5">Check-in</p>
                  <p className="text-neutral-300 font-medium">{b.checkIn}</p>
                </div>
                <div>
                  <p className="text-neutral-600 mb-0.5">Check-out</p>
                  <p className="text-neutral-300 font-medium">{b.checkOut}</p>
                </div>
                <div>
                  <p className="text-neutral-600 mb-0.5">Guests</p>
                  <p className="text-neutral-300 font-medium">{b.guests}</p>
                </div>
                <div>
                  <p className="text-neutral-600 mb-0.5">Amount</p>
                  <p className="text-amber-400 font-semibold">{formatCurrency(b.totalAmount, b.currency)}</p>
                </div>
              </div>

              <div className="mt-3 pt-2.5 border-t border-white/4 flex items-center justify-between">
                <span className="text-[9px] text-neutral-600 uppercase tracking-wider">{b.source}</span>
                <span className="text-[9px] text-neutral-700 font-mono">{b.id}</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}