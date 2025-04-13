import { useState } from 'react'
import { Avatar, Button, Center, Flex, Table } from '@chakra-ui/react'
import { IoMdReturnRight } from 'react-icons/io'
import { Tooltip } from '@/components/ui/tooltip'

import { useCarStore } from '../store/useCarStore'
import { filterCars, formatDate } from '../utils'
import EmptyView from './EmptyView'
import ReturnModalView from './ReturnModalView'
import { Location } from '../types'
import { NOMINATIM_OPENSTREET_MAPS_URL } from '@/constants'
import SearchInput from './SearchInput'
import { useTranslation } from 'react-i18next'
import TableCell from './TableCell'

const RentedCarsTable = () => {
   const { t } = useTranslation()
   const { rentedCars, cars, returnCar, selectedCarId, setSelectedCarId, updateAddress } = useCarStore((state) => state)
   const [showModal, setShowModal] = useState<boolean>(false)
   const [filteredCars, setFilteredCars] = useState<string[]>(rentedCars)

   const handleReturnCar = (carId: string) => {
      if (!carId) return

      setSelectedCarId(carId)
      setShowModal(true)
   }

   const handleModalClose = () => {
      setSelectedCarId(null)
      setShowModal(false)
   }

   const handleModalSubmit = (carId: string, location: Location) => {
      handleModalClose()
      returnCar(carId, location)

      fetch(`${NOMINATIM_OPENSTREET_MAPS_URL}?lat=${location.lat}&lon=${location.lng}&format=json`)
         .then((res) => res.json())
         .then((data) => {
            updateAddress(carId, data?.address)
         })
   }

   const handleSearch = (searchTerm: string) => {
      setFilteredCars(filterCars(rentedCars, cars, searchTerm))
   }

   if (rentedCars.length === 0) {
      return (
         <Center height="calc(100vh - 400px)">
            <EmptyView title={t('no_rented_cars')} description={t('no_rented_cars_desc')} />
         </Center>
      )
   }

   return (
      <Flex direction="column" gap={4} pt={1}>
         <SearchInput onChange={handleSearch} />
         {filteredCars.length > 0 ? (
            <Table.ScrollArea height="calc(100vh - 270px)">
               <Table.Root size="sm" stickyHeader>
                  <Table.Header>
                     <Table.Row>
                        <Table.ColumnHeader>{t('model')}</Table.ColumnHeader>
                        <Table.ColumnHeader>{t('booked_by')}</Table.ColumnHeader>
                        <Table.ColumnHeader>{t('booked_at')}</Table.ColumnHeader>
                        <Table.ColumnHeader textAlign="end">{t('return')}</Table.ColumnHeader>
                     </Table.Row>
                  </Table.Header>
                  <Table.Body>
                     {rentedCars.map((carId) => {
                        const { id, model, bookedBy, bookedAt } = cars[carId]
                        return (
                           <Table.Row key={id}>
                              <Table.Cell>
                                 <TableCell fontWeight="semibold">{model}</TableCell>
                              </Table.Cell>
                              <Table.Cell>
                                 <Flex gap={2} alignItems="center">
                                    <Avatar.Root variant={'solid'} colorPalette={'cyan'} size={'2xs'}>
                                       <Avatar.Fallback name={bookedBy} />
                                    </Avatar.Root>
                                    <TableCell>{bookedBy}</TableCell>
                                 </Flex>
                              </Table.Cell>
                              <Table.Cell>{formatDate(new Date(bookedAt || ''))}</Table.Cell>
                              <Table.Cell textAlign="end">
                                 <Tooltip content={t('return_tooltip')} positioning={{ placement: 'top' }}>
                                    <Button
                                       colorPalette="orange"
                                       variant="solid"
                                       onClick={() => handleReturnCar(carId)}
                                       aria-label={
                                          t('return_aria_button', {
                                             model,
                                             bookedBy,
                                          }) || ''
                                       }
                                    >
                                       <IoMdReturnRight />
                                    </Button>
                                 </Tooltip>
                              </Table.Cell>
                           </Table.Row>
                        )
                     })}
                  </Table.Body>
               </Table.Root>
            </Table.ScrollArea>
         ) : (
            <Center height="calc(100vh - 400px)">
               <EmptyView title={t('no_cars_found')} description={t('no_cars_found_desc')} />
            </Center>
         )}
         {selectedCarId && showModal ? (
            <ReturnModalView car={cars[selectedCarId]} onClose={handleModalClose} onSubmit={handleModalSubmit} />
         ) : null}
      </Flex>
   )
}

export default RentedCarsTable
