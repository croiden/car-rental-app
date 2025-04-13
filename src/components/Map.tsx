/** @jsxImportSource @emotion/react */
import { useState } from 'react'
import type { LatLngTuple } from 'leaflet'
import L from 'leaflet'
import { MapContainer, Marker, TileLayer, Popup } from 'react-leaflet'
import { Flex, Text } from '@chakra-ui/react'
import { css } from '@emotion/react'

import { useCarStore } from '../store/useCarStore'
import RentModalView from './RentModalView'
import { base64 } from './base64'
import { CAR_TYPE_DISPLAY_VALUES } from '@/constants'
import { useColorModeValue } from '@/components/ui/color-mode'

const PopupContentClass = css`
   p {
      margin: 0 !important;
   }
`

export const position: LatLngTuple = [24.75, 55] // Default position

const icon = L.icon({
   iconUrl: base64,
   iconSize: [70, 70],
   popupAnchor: [0, -20],
   className: 'leaflet-marker-icon',
})

export default function App() {
   const { availableCars, cars, selectedCarId, setSelectedCarId, rentCar } = useCarStore((state) => state)
   const [showModal, setShowModal] = useState<boolean>(false)

   const backgroundColor = useColorModeValue('white', 'gray.900')
   const color = useColorModeValue('gray.900', 'gray.100')

   const handleRentCar = (carId: string) => {
      if (!carId) return

      setSelectedCarId(carId)
      setShowModal(true)
   }

   const handleModalClose = () => {
      setSelectedCarId(null)
      setShowModal(false)
   }

   const handleModalSubmit = (carId: string, userName: string) => {
      handleModalClose()
      rentCar(carId, userName)
   }

   return (
      <>
         <MapContainer center={position} zoom={9}>
            <TileLayer
               attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
               url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {availableCars.map((carId) => {
               const { id, model, location, address, vendor, type } = cars[carId]
               return (
                  <Marker
                     position={[location.lat, location.lng]}
                     key={id}
                     icon={icon}
                     eventHandlers={{
                        click: () => {
                           handleRentCar(id)
                        },
                        mouseover: (event) => event.target.openPopup(),
                        mouseout: (event) => event.target.closePopup(),
                     }}
                  >
                     <Popup closeButton={false} minWidth={150} className="rca-leaflet-popup">
                        <Flex
                           direction={'column'}
                           gap={2}
                           css={PopupContentClass}
                           bg={backgroundColor}
                           p={4}
                           borderRadius={12}
                        >
                           <Text fontSize="lg" fontWeight="bold" color={color}>
                              {model}
                           </Text>
                           <Text fontSize="md" color={color}>
                              {vendor} {`(${CAR_TYPE_DISPLAY_VALUES[type]})`}
                           </Text>
                           {address ? (
                              <Text fontSize="md" color="gray.500">
                                 {address.city ?? address.state}, {address.country}
                              </Text>
                           ) : null}
                        </Flex>
                     </Popup>
                  </Marker>
               )
            })}
         </MapContainer>
         {selectedCarId && showModal ? (
            <RentModalView car={cars[selectedCarId]} onClose={handleModalClose} onSubmit={handleModalSubmit} />
         ) : null}
      </>
   )
}
