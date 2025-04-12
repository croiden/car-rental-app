import { Button, Table, Text } from '@chakra-ui/react'
import { IoMdReturnRight } from 'react-icons/io'
import { useCarStore } from '../store/useCarStore'
import { formatDate } from '../utils'

const RentedCarsTable = () => {
   const { rentedCars, cars, returnCar } = useCarStore((state) => state)

   const handleReturnCar = (carId: string) => {
      if (!carId) return

      returnCar(carId)
   }

   if (rentedCars.length === 0) {
      return (
         <Text fontSize="lg" textAlign="center" color="gray.500">
            No cars rented
         </Text>
      )
   }

   return (
      <Table.Root size="sm">
         <Table.Header>
            <Table.Row>
               <Table.ColumnHeader>Model</Table.ColumnHeader>
               <Table.ColumnHeader>Booked By</Table.ColumnHeader>
               <Table.ColumnHeader>Booked At</Table.ColumnHeader>
               <Table.ColumnHeader textAlign="end">Return</Table.ColumnHeader>
            </Table.Row>
         </Table.Header>
         <Table.Body>
            {rentedCars.map((carId) => {
               const { id, model, bookedBy, bookedAt } = cars[carId]
               return (
                  <Table.Row key={id}>
                     <Table.Cell>
                        <Text fontWeight="semibold">{model}</Text>
                     </Table.Cell>
                     <Table.Cell>{bookedBy}</Table.Cell>
                     <Table.Cell>{formatDate(new Date(bookedAt || ''))}</Table.Cell>
                     <Table.Cell textAlign="end">
                        <Button
                           colorPalette="orange"
                           variant="solid"
                           onClick={() => handleReturnCar(carId)}
                           aria-label={`Return ${model} booked by ${bookedBy}`}
                        >
                           <IoMdReturnRight />
                        </Button>
                     </Table.Cell>
                  </Table.Row>
               )
            })}
         </Table.Body>
      </Table.Root>
   )
}

export default RentedCarsTable
