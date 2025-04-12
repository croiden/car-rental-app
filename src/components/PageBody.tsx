import { useTranslation } from 'react-i18next'
import { Accordion, Box, Card, Flex, Span } from '@chakra-ui/react'

import RentedCarsTable from './RentedCarsTable'
import AvailableCarsTable from './AvailableCarsTable'
import Map from './Map'
import { useCarStore } from '../store/useCarStore'

const PageBody = () => {
   const { t } = useTranslation()
   const { availableCars, rentedCars } = useCarStore((state) => state)

   return (
      <Flex gap={4} pt={4}>
         <Box overflow="auto" minW="550px">
            <Box height={'calc(100vh - 100px)'} mr={4}>
               <Card.Root>
                  <Card.Body>
                     <Accordion.Root multiple defaultValue={['RENTED', 'AVAILABLE']}>
                        <Accordion.Item value={'RENTED'}>
                           <Accordion.ItemTrigger>
                              <Span flex="1">
                                 {t('rented_cars')}
                                 {` (${rentedCars.length})`}
                              </Span>
                              <Accordion.ItemIndicator />
                           </Accordion.ItemTrigger>
                           <Accordion.ItemContent>
                              <Accordion.ItemBody>
                                 <RentedCarsTable />
                              </Accordion.ItemBody>
                           </Accordion.ItemContent>
                        </Accordion.Item>
                        <Accordion.Item value={'Available'}>
                           <Accordion.ItemTrigger>
                              <Span flex="1">
                                 {t('available_cars')}
                                 {` (${availableCars.length})`}
                              </Span>
                              <Accordion.ItemIndicator />
                           </Accordion.ItemTrigger>
                           <Accordion.ItemContent>
                              <Accordion.ItemBody>
                                 <AvailableCarsTable />
                              </Accordion.ItemBody>
                           </Accordion.ItemContent>
                        </Accordion.Item>
                     </Accordion.Root>
                  </Card.Body>
               </Card.Root>
            </Box>
         </Box>
         <Card.Root w="100%">
            <Map />
         </Card.Root>
      </Flex>
   )
}
export default PageBody
