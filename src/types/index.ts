import { CarType } from '../enums'

export type Car = {
   id: string
   model: string
   vendor: string
   carType: CarType
   available: boolean
   location: {
      lat: number
      lng: number
   }
   address: {
      city: string
      state: string
      country: string
   }
   bookedBy?: string
   bookedAt?: string
}
