import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

i18n.use(initReactI18next).init({
   resources: {
      en: {
         translation: {
            available_cars: 'Available Cars',
            rented_cars: 'Rented Cars',
            car_type_sedan: 'Sedan',
            car_type_suv: 'SUV',
            car_type_hatchback: 'Hatchback',
            no_available_cars: 'No cars available',
            no_available_cars_desc: 'You can check back later for new arrivals.',
            model: 'Model',
            vendor: 'Vendor',
            rent: 'Rent',
            rent_tooltip: 'Rent this car',
            rent_aria_button: 'Rent {{model}} from {{vendor}}',
            location: 'Location',
            booked_by: 'Booked By',
            booked_at: 'Booked At',
            return: 'Return',
            no_rented_cars: 'No cars rented',
            no_rented_cars_desc: 'You can rent a car from the available cars list.',
            return_tooltip: 'Return this car',
            return_aria_button: 'Return {{model}} booked by {{bookedBy}}',
            car_rented_successfully: 'Car rented successfully',
            enter_name: 'Enter user name',
            required_field: 'This field is required',
            cancel: 'Cancel',
            car_returned_successfully: 'Car returned successfully',
            click_on_map_to_select_drop_location: 'Click on the map to select a drop location',
            search_for_a_car: 'Search for a car...',
            required_drop_location: 'Drop location is required',
            drop_location: 'Drop Location',
         },
      },
      fr: {
         translation: {
            available_cars: 'Voitures Disponibles',
         },
      },
   },
   lng: 'en',
   fallbackLng: 'en',
   interpolation: { escapeValue: false },
})

export default i18n
