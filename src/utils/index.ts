import { Car } from '@/types'
import { localStorage } from '@/storage'

export const formatDate = (date: Date): string => {
   const options: Intl.DateTimeFormatOptions = {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
   }

   return date.toLocaleString('en-US', options)
}

export function debounce<T extends (...args: any[]) => void>(func: T, delay: number): (...args: Parameters<T>) => void {
   let timer: ReturnType<typeof setTimeout>

   return function (...args: Parameters<T>) {
      clearTimeout(timer)
      timer = setTimeout(() => {
         func(...args)
      }, delay)
   }
}

export const filterCars = (carIds: string[], cars: Record<string, Car>, searchTerm: string): string[] => {
   if (!searchTerm || searchTerm === '') return carIds
   console.info('search counter')

   const lowerCaseSearchTerm = searchTerm.toLowerCase()

   return carIds.filter((carId) => {
      const car = cars[carId]
      return (
         car.model.toLowerCase().includes(lowerCaseSearchTerm) ||
         car.vendor.toLowerCase().includes(lowerCaseSearchTerm) ||
         car.type.toLowerCase().includes(lowerCaseSearchTerm)
      )
   })
}

export const getLocalStorageCars = (): Record<string, Car> | null =>
   localStorage.getItem('cars') ? (JSON.parse(localStorage.getItem('cars') as string) as Record<string, Car>) : null

export const getLocalStorageAvailableCars = (): Array<string> | null =>
   localStorage.getItem('available_cars')
      ? (JSON.parse(localStorage.getItem('available_cars') as string) as Array<string>)
      : null

export const getLocalStorageRentedCars = (): Array<string> | null =>
   localStorage.getItem('rented_cars')
      ? (JSON.parse(localStorage.getItem('rented_cars') as string) as Array<string>)
      : null
