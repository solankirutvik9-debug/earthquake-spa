import React from 'react'
import { ScatterChart, Scatter, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts'
import { EqRecord } from '../hooks/useEarthquakes'
import { useSelectedContext } from '../context/SelectedContext'
import useStore from '../store/useStore'

type Props = {
  data: EqRecord[]
  xField: string
  yField: string
}

const ChartPanel: React.FC<Props> = ({ data, xField, yField }: Props) => {
  // const setStoreSelected = useStore((s) => s.setSelectedId)
  const { selectedId, setSelectedId } = useSelectedContext()
  const setStoreSelected = useStore((s) => s.setSelectedId)

  const points = data.map((d) => ({ x: (d as any)[xField], y: (d as any)[yField], id: d.id, mag: d.mag, place: d.place }))

  return (
	<div className="h-96 bg-white p-4 rounded shadow">
	  <h2 className="font-semibold">Scatter plot</h2>
	  <ResponsiveContainer width="100%" height="85%">
		<ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
		  <CartesianGrid />
		  <XAxis type="number" dataKey="x" name={xField} />
		  <YAxis type="number" dataKey="y" name={yField} />
		  <Tooltip cursor={{ strokeDasharray: '3 3' }} />
		  <Scatter
			data={points}
			onClick={(e) => {
			  // setStoreSelected(e.id)
			  setSelectedId(e.id)
			  setStoreSelected(e.id)
			}}
			shape={(props: any) => {
			  const { cx, cy, payload } = props as any
			  const isSelected = payload.id === selectedId
			  // size increases for magnitude and when selected
			  const size = Math.max(3, (payload.mag || 1) * 3) + (isSelected ? 6 : 0)
			  return <circle cx={cx} cy={cy} r={size} stroke={isSelected ? '#f97316' : '#2563eb'} fill={isSelected ? '#fb923c' : '#60a5fa'} />
			}}
		  />
		</ScatterChart>
	  </ResponsiveContainer>
	</div>
  )
}

export default ChartPanel