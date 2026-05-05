export const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export const MONTHS = [
  'January','February','March','April','May','June',
  'July','August','September','October','November','December'
];

export function toDateKey(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

export function parseDate(str) {
  const [y, m, d] = str.split('-').map(Number);
  return new Date(y, m - 1, d);
}

export function isSameDay(a, b) {
  return a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate();
}

export function isSameMonth(date, month) {
  return date.getFullYear() === month.getFullYear() &&
    date.getMonth() === month.getMonth();
}

export function addMonths(date, n) {
  const d = new Date(date);
  d.setDate(1);
  d.setMonth(d.getMonth() + n);
  return d;
}

export function startOfMonth(date) {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

export function endOfMonth(date) {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0);
}

// Monday-based week: Mon=0, Sun=6
export function dayOfWeekMon(date) {
  return (date.getDay() + 6) % 7;
}

export function build42Cells(currentMonth) {
  const first = startOfMonth(currentMonth);
  const last = endOfMonth(currentMonth);
  const startOffset = dayOfWeekMon(first);

  const cells = [];

  // prev month days
  for (let i = startOffset - 1; i >= 0; i--) {
    const d = new Date(first);
    d.setDate(first.getDate() - (i + 1));
    cells.push({ date: d, currentMonth: false });
  }

  // current month days
  for (let d = 1; d <= last.getDate(); d++) {
    cells.push({ date: new Date(first.getFullYear(), first.getMonth(), d), currentMonth: true });
  }

  // next month days
  while (cells.length < 42) {
    const last = cells[cells.length - 1].date;
    const next = new Date(last);
    next.setDate(last.getDate() + 1);
    cells.push({ date: next, currentMonth: false });
  }

  return cells;
}

export function formatRange(start, end) {
  if (!start) return '';
  const fmt = (d) => `${d.getDate()} ${MONTHS[d.getMonth()].slice(0,3)} ${d.getFullYear()}`;
  return end ? `${fmt(start)} – ${fmt(end)}` : fmt(start);
}

export function today() {
  const n = new Date();
  return new Date(n.getFullYear(), n.getMonth(), n.getDate());
}