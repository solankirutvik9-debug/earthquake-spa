import { create } from "zustand";

interface Earthquake {
  id: string;
  place: string;
  mag: number;
  time: string;
  lat: number;
  lon: number;
}

interface StoreState {
  selectedId: string | null;
  setSelectedId: (id: string | null) => void;
}

const useStore = create<StoreState>((set) => ({
  selectedId: null,
  setSelectedId: (id) => set({ selectedId: id }),
}));

export default useStore;