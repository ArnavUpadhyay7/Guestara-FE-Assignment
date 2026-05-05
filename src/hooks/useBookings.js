import { useState, useEffect, useMemo } from 'react';
import { buildOccupancyMap, computeStats, filterBookings } from '../utils/bookingUtils';

export function useBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [statusFilter, setStatusFilter] = useState('all');
  const [roomFilter, setRoomFilter] = useState('all');

  useEffect(() => {
    fetch('/bookings.json')
      .then(r => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json();
      })
      .then(data => {
        setBookings(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const filteredBookings = useMemo(
    () => filterBookings(bookings, statusFilter, roomFilter),
    [bookings, statusFilter, roomFilter]
  );

  const occupancyMap = useMemo(() => buildOccupancyMap(filteredBookings), [filteredBookings]);

  const maxCount = useMemo(
    () => Math.max(0, ...Object.values(occupancyMap).map(v => v.count)),
    [occupancyMap]
  );

  const stats = useMemo(() => computeStats(filteredBookings, occupancyMap), [filteredBookings, occupancyMap]);

  return {
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
  };
}