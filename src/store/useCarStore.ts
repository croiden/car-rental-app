import { create } from 'zustand'

interface CarState {
   selectedCarId: string | null
   setSelectedCarId: (id: string | null) => void
}

export const useCarStore = create<CarState>((set) => ({
   selectedCarId: null,
   setSelectedCarId: (id) => set({ selectedCarId: id }),
}))
