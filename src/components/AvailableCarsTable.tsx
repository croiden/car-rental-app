import { useState } from 'react'
import { Button, Center, Flex, Table } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { Tooltip } from '@/components/ui/tooltip'
import { MdCarRental } from 'react-icons/md'
import { useCarStore } from '../store/useCarStore'
import EmptyView from './EmptyView'
import RentModalView from './RentModalView'
import SearchInput from './SearchInput'
import { filterCars } from '@/utils'
import TableCell from './TableCell'

const AvailableCarsTable = () => {
   const { t } = useTranslation()
   const { availableCars, cars, selectedCarId, setSelectedCarId, rentCar } = useCarStore((state) => state)
   const [showModal, setShowModal] = useState<boolean>(false)

   const [filteredCars, setFilteredCars] = useState<string[]>(availableCars)

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

   const handleSearch = (searchTerm: string) => {
      setFilteredCars(filterCars(availableCars, cars, searchTerm))
   }

   if (availableCars.length === 0) {
      return (
         <Center height="calc(100vh - 400px)">
            <EmptyView title={t('no_available_cars')} description={t('no_available_cars_desc')} />
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
                        <Table.ColumnHeader>{t('vendor')}</Table.ColumnHeader>
                        <Table.ColumnHeader textAlign="end">{t('rent')}</Table.ColumnHeader>
                     </Table.Row>
                  </Table.Header>
                  <Table.Body>
                     {filteredCars.map((carId) => {
                        const { id, model, vendor } = cars[carId]
                        return (
                           <Table.Row key={id}>
                              <Table.Cell>
                                 <TableCell fontWeight="semibold" maxWidth="200px">
                                    {model}
                                 </TableCell>
                              </Table.Cell>
                              <Table.Cell>
                                 <TableCell maxWidth="200px">{vendor}</TableCell>
                              </Table.Cell>
                              <Table.Cell textAlign="end">
                                 <Tooltip content={t('rent_tooltip')} positioning={{ placement: 'top' }}>
                                    <Button
                                       colorPalette="teal"
                                       variant="solid"
                                       onClick={() => handleRentCar(carId)}
                                       aria-label={
                                          t('rent_aria_button', {
                                             model,
                                             vendor,
                                          }) || ''
                                       }
                                    >
                                       <MdCarRental />
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
            <RentModalView car={cars[selectedCarId]} onClose={handleModalClose} onSubmit={handleModalSubmit} />
         ) : null}
      </Flex>
   )
}

export default AvailableCarsTable
