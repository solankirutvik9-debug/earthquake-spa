import create from 'zustand'


type State = {
selectedId: string | null
setSelectedId: (id: string | null) => void
filterText: string
setFilterText: (txt: string) => void
}


const useStore = create<State>((set) => ({
selectedId: null,
setSelectedId: (id) => set({ selectedId: id }),
filterText: '',
setFilterText: (txt) => set({ filterText: txt }),
}))


export default useStore