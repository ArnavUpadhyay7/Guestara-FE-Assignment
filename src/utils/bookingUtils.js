import { parseDate, toDateKey } from './dateUtils';

export function buildOccupancyMap(bookings) {
  const map = {};

  bookings.forEach(b => {
    if (b.status === 'cancelled') return;

    const checkIn = parseDate(b.checkIn);
    const checkOut = parseDate(b.checkOut);

    const cur = new Date(checkIn);
    while (cur < checkOut) {
      const key = toDateKey(cur);
      if (!map[key]) map[key] = { count: 0, bookings: [] };
      map[key].count += 1;
      map[key].bookings.push(b);
      cur.setDate(cur.getDate() + 1);
    }
  });

  return map;
}

export function getHeatLevel(count, maxCount) {
  if (!count || count === 0) return 0;
  if (maxCount === 0) return 0;
  const ratio = count / maxCount;
  if (ratio <= 0.2) return 1;
  if (ratio <= 0.4) return 2;
  if (ratio <= 0.6) return 3;
  if (ratio <= 0.8) return 4;
  return 5;
}

export function getBookingsInRange(bookings, rangeStart, rangeEnd) {
  if (!rangeStart || !rangeEnd) return [];
  const start = rangeStart <= rangeEnd ? rangeStart : rangeEnd;
  const end = rangeStart <= rangeEnd ? rangeEnd : rangeStart;

  // rangeEnd is inclusive for display but we treat checkOut exclusive
  // Overlap: booking.checkIn < rangeEnd+1day && booking.checkOut > rangeStart
  const endExclusive = new Date(end);
  endExclusive.setDate(endExclusive.getDate() + 1);

  return bookings.filter(b => {
    if (b.status === 'cancelled') return false;
    const ci = parseDate(b.checkIn);
    const co = parseDate(b.checkOut);
    return ci < endExclusive && co > start;
  });
}

export function computeStats(bookings, occupancyMap) {
  const active = bookings.filter(b => b.status !== 'cancelled');
  const counts = Object.values(occupancyMap).map(v => v.count);
  const maxDay = counts.length ? Math.max(...counts) : 0;
  const avgOccupancy = counts.length ? (counts.reduce((a, b) => a + b, 0) / counts.length).toFixed(1) : 0;
  return {
    total: active.length,
    maxDay,
    avgOccupancy,
  };
}

export function getUniqueRooms(bookings) {
  const rooms = [...new Set(bookings.map(b => b.roomNumber))].sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
  return rooms;
}

export function filterBookings(bookings, statusFilter, roomFilter) {
  return bookings.filter(b => {
    if (statusFilter !== 'all' && b.status !== statusFilter) return false;
    if (roomFilter !== 'all' && b.roomNumber !== roomFilter) return false;
    return true;
  });
}