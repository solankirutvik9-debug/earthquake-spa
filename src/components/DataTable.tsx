import React, { useRef, useEffect } from 'react'
import { EqRecord } from '../hooks/useEarthquakes'
import { useSelectedContext } from '../context/SelectedContext'
import useStore from '../store/useStore'
import { format } from "date-fns";

type Props = { data: EqRecord[] }


export default function DataTable({ data }: Props) {
const { selectedId, setSelectedId } = useSelectedContext()
const setStoreSelected = useStore((s) => s.setSelectedId)
const tableRef = useRef<HTMLDivElement | null>(null)
const rowRefs = useRef<Record<string, HTMLTableRowElement | null>>({})


useEffect(() => {
if (!selectedId) return
const row = rowRefs.current[selectedId]
if (row && tableRef.current) {
// scroll into view inside the table container
const container = tableRef.current
const offsetTop = row.offsetTop
container.scrollTo({ top: Math.max(0, offsetTop - 20), behavior: 'smooth' })
}
}, [selectedId])


return (
<div className="h-96 bg-white p-4 rounded shadow overflow-hidden flex flex-col">
<h2 className="font-semibold">Data table</h2>
<div ref={tableRef} className="overflow-auto mt-2 flex-1">
<table className="min-w-full table-auto">
<thead className="sticky top-0 bg-gray-100">
<tr>
<th className="p-2 text-left">ID</th>
<th className="p-2 text-left">Time</th>
<th className="p-2 text-left">Place</th>
<th className="p-2 text-right">Mag</th>
<th className="p-2 text-right">Depth</th>
<th className="p-2 text-right">Lat</th>
<th className="p-2 text-right">Lon</th>
</tr>
</thead>
<tbody>
{data.map((r) => {
const isSelected = selectedId === r.id
return (
<tr
key={r.id}
ref={(el) => { rowRefs.current[r.id] = el; }}
onClick={() => {
setSelectedId(r.id)
setStoreSelected(r.id)
}}
className={`cursor-pointer ${isSelected ? 'bg-yellow-100' : ''}`}
>
<td className="p-2">{r.id}</td>
<td className="p-2">{format(new Date(), "yyyy-MM-dd HH:mm:ss")}</td>
<td className="p-2">{r.place}</td>
<td className="p-2 text-right">{r.mag}</td>
<td className="p-2 text-right">{r.depth}</td>
<td className="p-2 text-right">{r.latitude}</td>
<td className="p-2 text-right">{r.longitude}</td>
</tr>
)
})}
</tbody>
</table>
</div>
</div>
)
}