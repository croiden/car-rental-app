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

export const filterCars = (
   carIds: string[],
   cars: Record<string, Car>,
   searchTerm: string,
   filterColumns: string[] = ['model', 'vendor', 'type'],
): string[] => {
   if (!searchTerm || searchTerm === '') return carIds
   console.info('search counter')

   const lowerCaseSearchTerm = searchTerm.toLowerCase()

   return carIds.filter((carId) => {
      const car = cars[carId]
      return filterColumns.some((column) => {
         const value = car[column as keyof Car]
         if (typeof value === 'string') {
            return value.toLowerCase().includes(lowerCaseSearchTerm)
         }
         return false
      })
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
