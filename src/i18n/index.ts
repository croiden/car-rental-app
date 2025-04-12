import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

i18n.use(initReactI18next).init({
   resources: {
      en: {
         translation: {
            available_cars: 'Available Cars',
            rented_cars: 'Rented Cars',
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
