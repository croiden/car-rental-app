import { create } from 'zustand'

import ALL_CARS_DEFAULT from '../data/cars.json'
import { Car, Location } from '../types'
import { localStorage } from '@/storage'
import { getLocalStorageAvailableCars, getLocalStorageCars, getLocalStorageRentedCars } from '@/utils'

interface CarState {
   carIds: Array<string>
   cars: Record<string, Car>
   availableCars: Array<string>
   rentedCars: Array<string>
   selectedCarId: string | null
   setSelectedCarId: (id: string | null) => void
   rentCar: (carId: string, userName: string) => void
   returnCar: (carId: string, location: Location) => void
   updateAddress: (carId: string, address: Car['address']) => void
}

const ALL_CARS = getLocalStorageCars() ?? (ALL_CARS_DEFAULT as CarState['cars'])

export const useCarStore = create<CarState>((set) => ({
   carIds: Object.keys(ALL_CARS),
   cars: ALL_CARS,
   availableCars: getLocalStorageAvailableCars() ?? Object.keys(ALL_CARS),
   rentedCars: getLocalStorageRentedCars() ?? [],
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

         const cars = {
            ...state.cars,
            [carId]: updatedCar,
         }
         const availableCars = state.availableCars.filter((id) => id !== carId)
         const rentedCars = [carId, ...state.rentedCars]

         // update the local storage
         localStorage.setItem('cars', JSON.stringify(cars))
         localStorage.setItem('available_cars', JSON.stringify(availableCars))
         localStorage.setItem('rented_cars', JSON.stringify(rentedCars))

         return {
            cars,
            availableCars,
            rentedCars,
         }
      }),
   returnCar: (carId, location) =>
      set((state) => {
         const car = state.cars[carId]
         if (!car || car.available) return state

         const updatedCar = {
            ...car,
            available: true,
            location,
            address: undefined, // get address based on location
            bookedBy: undefined,
            bookedAt: undefined,
         }
         const cars = {
            ...state.cars,
            [carId]: updatedCar,
         }
         const availableCars = [...state.availableCars, carId]
         const rentedCars = state.rentedCars.filter((id) => id !== carId)

         // update the local storage
         localStorage.setItem('cars', JSON.stringify(cars))
         localStorage.setItem('available_cars', JSON.stringify(availableCars))
         localStorage.setItem('rented_cars', JSON.stringify(rentedCars))

         return {
            cars,
            availableCars,
            rentedCars,
         }
      }),
   updateAddress: (carId, address) =>
      set((state) => {
         const cars = {
            ...state.cars,
            [carId]: {
               ...state.cars[carId],
               address: {
                  city: address?.city,
                  state: address?.state,
                  country: address?.country,
               },
            },
         }

         // update the local storage
         localStorage.setItem('cars', JSON.stringify(cars))

         return {
            cars,
         }
      }),
}))
