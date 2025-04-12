import { create } from 'zustand'

import ALL_CARS from '../data/cars.json'
import { Car } from '../types'

interface CarState {
   carIds: Array<string>
   cars: Record<string, Car>
   availableCars: Array<string>
   rentedCars: Array<string>
   selectedCarId: string | null
   setSelectedCarId: (id: string | null) => void
   rentCar: (carId: string, userName: string) => void
   returnCar: (carId: string) => void
}

export const useCarStore = create<CarState>((set) => ({
   carIds: Object.keys(ALL_CARS),
   cars: ALL_CARS as CarState['cars'],
   availableCars: Object.keys(ALL_CARS),
   rentedCars: [],
   selectedCarId: null,
   setSelectedCarId: (id) => set({ selectedCarId: id }),
   rentCar: (carId, userName) =>
      set((state) => {
         const car = state.cars[carId]
         if (!car || !car.available) return state

         const updatedCar = {
            ...car,
            available: false,
            bookedBy: userName,
            bookedAt: new Date().toISOString(),
         }

         return {
            cars: {
               ...state.cars,
               [carId]: updatedCar,
            },
            availableCars: state.availableCars.filter((id) => id !== carId),
            rentedCars: [carId, ...state.rentedCars],
         }
      }),
   returnCar: (carId) =>
      set((state) => {
         const car = state.cars[carId]
         if (!car || car.available) return state

         const updatedCar = {
            ...car,
            available: true,
            bookedBy: undefined,
            bookedAt: undefined,
         }

         return {
            cars: {
               ...state.cars,
               [carId]: updatedCar,
            },
            availableCars: [...state.availableCars, carId],
            rentedCars: state.rentedCars.filter((id) => id !== carId),
         }
      }),
}))
