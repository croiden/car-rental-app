import { CAR_TYPE_DISPLAY_VALUES } from '@/constants'
import { Car } from '@/types'
import { formatDate } from '@/utils'
import { Flex, Text, Image } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

interface Props {
   car: Car
}

const CarDetails = ({ car }: Props) => {
   const { t } = useTranslation()
   return (
      <Flex gap={4} border="1px solid" borderColor="gray.200" borderRadius="md">
         <Image
            rounded="md"
            src={car?.imageUrl}
            alt={`${car.model} image`}
            width="450px"
            minHeight={'300px'}
            minWidth={'450px'}
         />
         <Flex flexDirection="column" justifyContent="center">
            <Text textStyle="3xl">{car.model}</Text>
            <Text textStyle="xl">
               {car.vendor} {`(${CAR_TYPE_DISPLAY_VALUES[car.type]})`}
            </Text>
            {car?.available ? (
               <>
                  {car.address ? (
                     <Text fontWeight="light">
                        {car.address.city ?? car.address.state}, {car.address.country}
                     </Text>
                  ) : null}
                  <Text fontWeight="light">{`${t('location')}: ${car.location.lat}, ${car.location.lng}`}</Text>
               </>
            ) : (
               <>
                  <Text fontWeight="light">{`${t('booked_by')}: ${car?.bookedBy}`}</Text>
                  <Text fontWeight="light">{`${t('booked_at')}: ${formatDate(new Date(car?.bookedAt || ''))}`}</Text>
               </>
            )}
         </Flex>
      </Flex>
   )
}

export default CarDetails
