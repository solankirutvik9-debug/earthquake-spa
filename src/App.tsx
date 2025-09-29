import React, { useMemo, useState } from 'react'
import useEarthquakes from './hooks/useEarthquakes'
import ChartPanel from './components/ChartPanel'
import DataTable from './components/DataTable'
import { useSelectedContext } from './context/SelectedContext'
import useStore from './store/useStore'


export default function App() {
// demonstrate Zustand usage by syncing a local "filter" text
const filterText = useStore((s) => s.filterText)
const setFilterText = useStore((s) => s.setFilterText)


const { data, isLoading, isError } = useEarthquakes()


const { selectedId } = useSelectedContext()


const [xField, setXField] = useState('mag')
const [yField, setYField] = useState('depth')


const numericFields = useMemo(() => ['mag', 'depth', 'latitude', 'longitude'], [])


if (isLoading) return <div className="p-6">Loading earthquake data...</div>
if (isError || !data) return <div className="p-6">Failed to load data.</div>


const filtered = data.filter((r) => {
if (!filterText) return true
return r.place.toLowerCase().includes(filterText.toLowerCase())
})


return (
<div className="min-h-screen bg-gray-50 p-6">
<header className="mb-4">
<h1 className="text-2xl font-bold">Earthquake Explorer</h1>
<p className="text-sm text-gray-600">Interactive chart + table. Click items to select.</p>
</header>


<div className="mb-4 flex gap-2">
<label className="flex items-center gap-2">
<span className="text-sm">Filter place:</span>
<input
value={filterText}
onChange={(e) => setFilterText(e.target.value)}
className="border px-2 py-1 rounded"
placeholder="Type to filter by place"
/>
</label>


<div className="ml-auto flex gap-2">
<label className="flex items-center gap-2">
X:
<select value={xField} onChange={(e) => setXField(e.target.value)} className="border rounded px-2 py-1">
{numericFields.map((f) => (
<option key={f} value={f}>{f}</option>
))}
</select>
</label>


<label className="flex items-center gap-2">
Y:
<select value={yField} onChange={(e) => setYField(e.target.value)} className="border rounded px-2 py-1">
{numericFields.map((f) => (
<option key={f} value={f}>{f}</option>
))}
</select>
</label>
</div>
</div>


<main className="grid grid-cols-2 gap-4">
<ChartPanel data={filtered} xField={xField} yField={yField} />
<DataTable data={filtered} />
</main>


<footer className="mt-6 text-sm text-gray-600">
Selected ID: {selectedId ?? 'none'}
</footer>
</div>
)
}