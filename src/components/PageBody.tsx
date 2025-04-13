import { useTranslation } from 'react-i18next'
import { Box, Card, Flex, Tabs } from '@chakra-ui/react'

import RentedCarsTable from './RentedCarsTable'
import AvailableCarsTable from './AvailableCarsTable'
import Map from './Map'
import { useCarStore } from '../store/useCarStore'

const PageBody = () => {
   const { t } = useTranslation()
   const { availableCars, rentedCars } = useCarStore((state) => state)

   return (
      <Flex
         gap={4}
         pt={4}
         flexDir={{
            base: 'column-reverse',
            rca_xl: 'row',
         }}
      >
         <Box
            minWidth={{
               base: '100%',
               rca_xl: '550px',
            }}
         >
            <Card.Root
               h={{
                  base: 'auto',
                  rca_xl: 'calc(100vh - 100px)',
               }}
               minHeight={'400px'}
            >
               <Card.Body>
                  <Tabs.Root lazyMount unmountOnExit defaultValue="AVAILABLE">
                     <Tabs.List>
                        <Tabs.Trigger value="AVAILABLE">
                           {t('available_cars')}
                           {` (${availableCars.length})`}
                        </Tabs.Trigger>
                        <Tabs.Trigger value="RENTED">
                           {t('rented_cars')}
                           {` (${rentedCars.length})`}
                        </Tabs.Trigger>
                     </Tabs.List>
                     <Tabs.Content value="AVAILABLE">
                        <AvailableCarsTable />
                     </Tabs.Content>
                     <Tabs.Content value="RENTED">
                        <RentedCarsTable />
                     </Tabs.Content>
                  </Tabs.Root>
               </Card.Body>
            </Card.Root>
         </Box>
         <Card.Root
            w="100%"
            h={{
               base: '400px',
               rca_xl: 'auto',
            }}
         >
            <Map />
         </Card.Root>
      </Flex>
   )
}
export default PageBody
