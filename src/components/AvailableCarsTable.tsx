import { Button, Table, Text } from '@chakra-ui/react'
import { MdCarRental } from 'react-icons/md'
import { useCarStore } from '../store/useCarStore'

const AvailableCarsTable = () => {
   const { availableCars, cars, rentCar } = useCarStore((state) => state)

   const handleRentCar = (carId: string) => {
      if (!carId) return

      rentCar(carId, 'John Doe') // Replace 'John Doe' with the actual user name
   }

   if (availableCars.length === 0) {
      return (
         <Text fontSize="lg" textAlign="center" color="gray.500">
            No cars available
         </Text>
      )
   }

   return (
      <Table.Root size="sm">
         <Table.Header>
            <Table.Row>
               <Table.ColumnHeader>Model</Table.ColumnHeader>
               <Table.ColumnHeader>Vendor</Table.ColumnHeader>
               <Table.ColumnHeader textAlign="end">Rent</Table.ColumnHeader>
            </Table.Row>
         </Table.Header>
         <Table.Body>
            {availableCars.map((carId) => {
               const { id, model, vendor } = cars[carId]
               return (
                  <Table.Row key={id}>
                     <Table.Cell>
                        <Text fontWeight="semibold">{model}</Text>
                     </Table.Cell>
                     <Table.Cell>{vendor}</Table.Cell>
                     <Table.Cell textAlign="end">
                        <Button colorPalette="teal" variant="solid" onClick={() => handleRentCar(carId)}>
                           <MdCarRental />
                        </Button>
                     </Table.Cell>
                  </Table.Row>
               )
            })}
         </Table.Body>
      </Table.Root>
   )
}

export default AvailableCarsTable
