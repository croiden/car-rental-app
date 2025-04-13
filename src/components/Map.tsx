import { useState } from 'react'
import type { LatLngTuple } from 'leaflet'
import L from 'leaflet'
import { MapContainer, Marker, TileLayer, Popup } from 'react-leaflet'
import { useCarStore } from '../store/useCarStore'
import RentModalView from './RentModalView'
import { Flex, Text } from '@chakra-ui/react'
import { base64 } from './base64'

export const position: LatLngTuple = [24.75, 55] // Default position

const icon = L.icon({
   iconUrl: base64,
   iconSize: [70, 70],
   //  iconAnchor: [17, 46],
   popupAnchor: [0, -20],
   //  shadowSize: [50, 64], // size of the shadow
   //  shadowAnchor: [4, 62], // the same for the shadow

   className: 'leaflet-marker-icon',
})

export default function App() {
   const { availableCars, cars, selectedCarId, setSelectedCarId, rentCar } = useCarStore((state) => state)
   const [showModal, setShowModal] = useState<boolean>(false)

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
               const { id, model, location, address, vendor, carType } = cars[carId]
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
                     //  rotate the marker icon
                  >
                     <Popup closeButton={false} minWidth={150}>
                        <Flex direction={'column'} gap={2}>
                           <Text fontSize="lg" fontWeight="bold">
                              {model}
                           </Text>
                           <Text fontSize="md">
                              {vendor} {`(${carType})`}
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
