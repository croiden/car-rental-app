import { Flex, Icon, Text } from '@chakra-ui/react'
import { IoCarSportSharp } from 'react-icons/io5'
import { ColorModeButton } from '@/components/ui/color-mode'

const NavBar = () => {
   return (
      <Flex bg="teal.700" p={4} justifyContent="space-between" alignItems="center">
         <Flex alignItems="center" gap={4}>
            <Icon size="xl" color="white">
               <IoCarSportSharp />
            </Icon>
            <Text fontSize="lg" fontWeight="bold" color={'white'}>
               Car Rental App
            </Text>
         </Flex>
         <ColorModeButton
            color={'white'}
            _hover={{
               bg: 'gray.800',
            }}
         />
      </Flex>
   )
}
export default NavBar
