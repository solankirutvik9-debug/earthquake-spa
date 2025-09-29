import { useQuery } from '@tanstack/react-query'
import Papa from 'papaparse'


export type EqRecord = {
id: string
time: string
latitude: number
longitude: number
depth: number
mag: number
place: string
}


async function fetchAndParseCSV(): Promise<EqRecord[]> {
const url = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.csv'
const res = await fetch(url)
if (!res.ok) throw new Error('Network error')
const text = await res.text()


const parsed = Papa.parse(text, { header: true, dynamicTyping: true })
const data = parsed.data as any[]


// normalize
return data
.filter((row) => row.id && row.latitude != null && row.longitude != null)
.map((row) => ({
id: String(row.id),
time: row.time,
latitude: Number(row.latitude),
longitude: Number(row.longitude),
depth: Number(row.depth),
mag: Number(row.mag),
place: row.place || '',
}))
}


export default function useEarthquakes() {
return useQuery(['earthquakes-month'], fetchAndParseCSV, { staleTime: 1000 * 60 * 5 })
}