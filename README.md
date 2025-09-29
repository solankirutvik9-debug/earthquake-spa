# Earthquake SPA


A single-page React + TypeScript application that:
- Fetches earthquake data (USGS `all_month.csv`) and parses it.
- Shows an interactive scatter plot where each point is an earthquake record.
- Shows a scrollable, selectable data table with all rows/columns.
- Demonstrates three state-sharing approaches: props drilling, React Context, and Zustand global store.


## Features
- Axis-select controls for the chart (select which numeric fields map to X and Y).
- Click/hover interactions in both table and chart that highlight the matching record in the other component.
- Loading and error states while fetching and parsing CSV.
- Uses TanStack Query (React Query) for data fetch caching & status management.


## Stack & External Dependencies
- React + TypeScript (Vite)
- Tailwind CSS (utility styling)
- Recharts (charting)
- react-query (TanStack Query) for data fetching
- papaparse for CSV parsing
- Zustand for an external/global store


## Install & Run
1. Clone into a new repo (or create a folder and copy files)
2. Install:


```bash
npm install
# or
yarn
```


3. Start dev server:


```bash
npm run dev
```


4. Build for production:


```bash
npm run build
```

Notes for reviewer:

- The project uses three state-sharing techniques:
1) Props: App passes `xField` and `yField` as props to ChartPanel.
2) React Context: SelectedContext holds `selectedId` and `setSelectedId` and wraps the app.
3) Zustand: Global store stores `selectedId` and a `filterText` used by App.
- Interactions set both Context and Zustand selectedId so both systems stay in sync.
- Chart click sets selectedId (context + zustand). Table click does the same.
- Table auto-scrolls to the selected row via refs.




