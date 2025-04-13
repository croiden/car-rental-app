import { CarType } from '../enums'

export type Location = {
   lat: number
   lng: number
}

export type Car = {
   id: string
   model: string
   vendor: string
   carType: CarType
   available: boolean
   location: Location
   address?: {
      city?: string
      state?: string
      country?: string
   }
   bookedBy?: string
   bookedAt?: string
   imageUrl: string
}
