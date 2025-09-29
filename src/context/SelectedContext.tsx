import React, { createContext, useContext, useState } from 'react'


type Context = {
selectedId: string | null
setSelectedId: (id: string | null) => void
}


const SelectedContext = createContext(undefined) as React.Context<Context | undefined>


export function SelectedProvider({ children }: { children: React.ReactNode }) {
const [selectedId, setSelectedId] = useState<string | null>(null)
return <SelectedContext.Provider value={{ selectedId, setSelectedId }}>{children}</SelectedContext.Provider>
}


export function useSelectedContext() {
const ctx = useContext(SelectedContext)
if (!ctx) throw new Error('useSelectedContext must be used inside SelectedProvider')
return ctx
}