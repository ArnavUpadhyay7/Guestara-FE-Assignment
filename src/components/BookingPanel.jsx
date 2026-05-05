import React, { useMemo } from 'react';
import { getBookingsInRange } from '../utils/bookingUtils';
import { formatRange, MONTHS } from '../utils/dateUtils';

const STATUS_COLORS = {
  confirmed: 'bg-emerald-900 text-emerald-300 border-emerald-800',
  pending: 'bg-amber-900 text-amber-300 border-amber-800',
  cancelled: 'bg-red-950 text-red-400 border-red-900',
  'checked-in': 'bg-sky-900 text-sky-300 border-sky-800',
  'checked-out': 'bg-stone-800 text-stone-400 border-stone-700',
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
        <div className="w-12 h-12 rounded-xl bg-stone-800 flex items-center justify-center mb-3">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <rect x="3" y="4" width="14" height="13" rx="2" stroke="#78716c" strokeWidth="1.5"/>
            <path d="M3 8h14" stroke="#78716c" strokeWidth="1.5"/>
            <path d="M7 2v3M13 2v3" stroke="#78716c" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </div>
        <p className="text-stone-500 text-sm">Drag on the calendar to select a date range</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between px-4 py-3 border-b border-stone-800">
        <div>
          <p className="text-xs text-stone-500 uppercase tracking-wider">Selected Range</p>
          <p className="text-sm font-semibold text-stone-200 mt-0.5">{formatRange(start, end)}</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs bg-amber-900/50 text-amber-400 border border-amber-800 px-2 py-0.5 rounded-full font-semibold">
            {rangeBookings.length} booking{rangeBookings.length !== 1 ? 's' : ''}
          </span>
          <button
            onClick={onClear}
            className="w-6 h-6 flex items-center justify-center rounded text-stone-500 hover:text-stone-200 hover:bg-stone-800 transition-all"
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M2 2l8 8M10 2L2 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-3 py-3 space-y-2">
        {rangeBookings.length === 0 ? (
          <div className="text-center py-8 text-stone-600 text-sm">No bookings in this range</div>
        ) : (
          rangeBookings.map(b => (
            <div key={b.id} className="rounded-xl bg-stone-800/60 border border-stone-700/50 p-3 hover:border-stone-600 transition-all">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <p className="text-stone-200 font-semibold text-sm">{b.guestName}</p>
                  <p className="text-stone-500 text-xs">Room {b.roomNumber} · {b.roomType}</p>
                </div>
                <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border uppercase tracking-wider ${STATUS_COLORS[b.status] || STATUS_COLORS['checked-out']}`}>
                  {fmt(b.status)}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-x-3 gap-y-1 text-xs mt-2">
                <div>
                  <span className="text-stone-600">Check-in</span>
                  <p className="text-stone-300 font-medium">{b.checkIn}</p>
                </div>
                <div>
                  <span className="text-stone-600">Check-out</span>
                  <p className="text-stone-300 font-medium">{b.checkOut}</p>
                </div>
                <div>
                  <span className="text-stone-600">Guests</span>
                  <p className="text-stone-300 font-medium">{b.guests}</p>
                </div>
                <div>
                  <span className="text-stone-600">Amount</span>
                  <p className="text-amber-400 font-semibold">{formatCurrency(b.totalAmount, b.currency)}</p>
                </div>
              </div>
              <div className="mt-2 flex items-center justify-between">
                <span className="text-[10px] text-stone-600 uppercase tracking-wider">{b.source}</span>
                <span className="text-[10px] text-stone-700 font-mono">{b.id}</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}