import { CarType } from '@/enums'
import i18n from '@/i18n'

export const NOMINATIM_OPENSTREET_MAPS_URL = 'https://nominatim.openstreetmap.org/reverse'

export const CAR_TYPE_DISPLAY_VALUES = {
   [CarType.SEDAN]: i18n.t('carType_sedan'),
   [CarType.SUV]: i18n.t('carType_suv'),
   [CarType.HATCHBACK]: i18n.t('carType_hatchback'),
}
