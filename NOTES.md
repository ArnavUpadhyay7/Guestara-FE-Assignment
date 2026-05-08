# NOTES

## Open Scope Features Chosen

### 1. Filtering
I added filtering by:
- Booking status
- Room number

I chose this because filtering directly improves the usefulness of the heatmap. Users can isolate occupancy patterns and inspect subsets of bookings more efficiently.

The heatmap updates dynamically based on active filters.


### 2. Monthly Statistics Bar
I added a stats section displaying:
- Average occupancy
- Total bookings
- Peak occupancy day

I chose this because it provides quick operational insight without requiring the user to inspect individual dates manually.


## Trade-offs

### Native Date APIs vs Heavy Abstractions
I primarily used native Date logic with lightweight utilities to keep the implementation understandable and avoid unnecessary abstraction.

The trade-off is that date manipulation becomes slightly more verbose, but it keeps the core logic transparent.


### Desktop-first Design
I prioritized desktop usability since the assignment explicitly mentioned desktop quality over responsiveness.

The layout is partially responsive, but mobile optimization was not the primary focus.


### Simplicity Over Over-engineering
I intentionally avoided adding global state libraries or excessive abstractions since the application's state requirements were manageable with React hooks and memoized derived state.


## What I Would Improve With More Time

### Accessibility
- Keyboard navigation
- ARIA labels
- Focus states


### Performance
- Virtualized booking panel for very large datasets
- Further memoization optimizations


### Additional Views
- Year heatmap
- Timeline / Gantt-style room view


### UX Improvements
- Hover tooltips
- Animated transitions
- Export selected bookings as CSV


## One Thing I’m Proud Of

The drag-to-select interaction and occupancy calculation logic.

Handling:
- reverse dragging
- cross-month selection
- inclusive-exclusive booking ranges

cleanly without external libraries was the most interesting engineering challenge in the project.


## One Thing I Would Refactor

I would further separate calendar interaction logic into a dedicated hook to reduce component responsibility and improve testability.