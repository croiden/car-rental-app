import { Button, Dialog, Text, Portal, Stack } from '@chakra-ui/react'
import { useRef, useState } from 'react'
import { IoMdReturnRight } from 'react-icons/io'
import { toaster } from '@/components/ui/toaster'
import { Car } from '../types'
import CarDetails from './CarDetails'
import { MapContainer, TileLayer } from 'react-leaflet'
import { position } from './Map'
import DropLocation from './DropLocation'
import { Location } from '../types'
import { useTranslation } from 'react-i18next'

interface Props {
   car: Car
   onClose: () => void
   onSubmit: (carId: string, location: Location) => void
}

const RentModalView = ({ car, onClose, onSubmit }: Props) => {
   const { t } = useTranslation()
   const ref = useRef<HTMLInputElement>(null)
   const [location, setLocation] = useState<Location | null>(null)
   const [locationFieldValid, setLocationFieldValid] = useState<boolean>(true)

   const handleSubmit = () => {
      if (!location) {
         setLocationFieldValid(false)
         return
      }
      toaster.create({
         description: t('car_returned_successfully'),
         type: 'success',
      })
      onSubmit?.(car.id, location)
   }

   const handleDropLocationChange = (location: Location) => {
      if (location) {
         setLocationFieldValid(true)
         setLocation(location)
      }
   }

   return (
      <Dialog.Root
         initialFocusEl={() => ref.current}
         defaultOpen
         placement={'center'}
         size="xl"
         scrollBehavior="inside"
         onExitComplete={onClose}
      >
         <Portal>
            <Dialog.Backdrop />
            <Dialog.Positioner>
               <Dialog.Content>
                  <Dialog.Header>
                     <Dialog.Title>{`${t('return')}: ${car.model}`}</Dialog.Title>
                  </Dialog.Header>
                  <Dialog.Body pb="4">
                     <Stack gap="10" css={{ '--field-label-width': '120px' }}>
                        <CarDetails car={car} />
                        <Stack w="100%" h="450px" gap="4">
                           <Text fontSize="md">{t('click_on_map_to_select_drop_location')}</Text>
                           <MapContainer center={position} zoom={9}>
                              <TileLayer
                                 attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                 url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                              />
                              <DropLocation onLocationChange={handleDropLocationChange} location={location} />
                           </MapContainer>
                           {location ? (
                              <Text>{`${t('drop_location')}: ${location.lat.toFixed(4)}, ${location.lng.toFixed(4)}`}</Text>
                           ) : (
                              <Text color="red.500" fontSize="sm" minH={'20px'}>
                                 {!locationFieldValid ? t('required_drop_location') : null}
                              </Text>
                           )}
                        </Stack>
                     </Stack>
                  </Dialog.Body>
                  <Dialog.Footer>
                     <Button variant="outline" onClick={onClose}>
                        {t('cancel')}
                     </Button>
                     <Button onClick={handleSubmit}>
                        <IoMdReturnRight />
                        {t('return')}
                     </Button>
                  </Dialog.Footer>
               </Dialog.Content>
            </Dialog.Positioner>
         </Portal>
      </Dialog.Root>
   )
}

export default RentModalView
