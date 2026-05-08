# Guestara — Booking Calendar Heatmap

An interactive hotel occupancy heatmap calendar built with React, Vite, and Tailwind CSS.

This project visualizes hotel bookings across a monthly calendar view, allowing users to quickly understand occupancy levels, inspect booking details, and select date ranges through drag interactions.


## Features

### Core Features
- Month-view calendar grid
- Occupancy heatmap visualization
- Previous / Next / Today navigation
- Drag-to-select date range
- Booking detail side panel
- Async loading from `bookings.json`
- Loading + error states

### Open Scope Features
- Filtering by booking status and room
- Monthly statistics bar
  - Average occupancy
  - Total bookings
  - Peak occupancy day


## Tech Stack

- React
- Vite
- Tailwind CSS
- date-fns


## Project Structure

```bash
src/
 ├── components/
 │    ├── CalendarGrid.jsx
 │    ├── DayCell.jsx
 │    ├── HeatmapLegend.jsx
 │    ├── BookingPanel.jsx
 │    └── Header.jsx
 │
 ├── hooks/
 │    ├── useCalendar.js
 │    ├── useBookings.js
 │
 ├── utils/
 │    ├── dateUtils.js
 │    ├── bookingUtils.js
 │
 ├── App.jsx
```


## Getting Started

### 1. Clone the repository

```bash
git clone <repo-url>
cd <repo-name>
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run the development server

```bash
npm run dev
```

### 4. Open in browser

```txt
http://localhost:5173
```


## Occupancy Logic

A booking occupies nights using an inclusive-exclusive model:

- `checkIn` → occupied
- `checkOut` → not occupied

Example:

```txt
checkIn: 2026-02-10
checkOut: 2026-02-13
```

Occupied nights:
- Feb 10
- Feb 11
- Feb 12

Not occupied:
- Feb 13

Condition used:

```js
date >= checkIn && date < checkOut
```

Cancelled bookings are excluded from occupancy calculations.


## Drag Selection

Date range selection is implemented using native mouse events:
- `onMouseDown`
- `onMouseEnter`
- `onMouseUp`

The selection system:
- Works in both directions
- Supports cross-month dragging
- Handles single-day selection


## Design Goals

The UI was designed to feel like a modern SaaS dashboard:
- Minimal
- High readability
- Clear visual hierarchy
- Subtle heatmap gradients
- Smooth interactions


## Future Improvements

With more time, potential improvements would include:
- Keyboard accessibility
- Virtualized booking lists
- Year-view heatmap
- CSV export
- Improved mobile responsiveness
- Tooltip previews


## Loom Walkthrough

Loom link:

