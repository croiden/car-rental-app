import { CarTypeEnum } from '@/enums'
import i18n from '@/i18n'

export const NOMINATIM_OPENSTREET_MAPS_URL = 'https://nominatim.openstreetmap.org/reverse'

export const CAR_TYPE_DISPLAY_VALUES = {
   [CarTypeEnum.SEDAN]: i18n.t('car_type_sedan'),
   [CarTypeEnum.SUV]: i18n.t('car_type_suv'),
   [CarTypeEnum.HATCHBACK]: i18n.t('car_type_hatchback'),
}
