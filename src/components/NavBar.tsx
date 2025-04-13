import { Flex, Text } from '@chakra-ui/react'
import { ColorModeButton } from '@/components/ui/color-mode'

const NavBar = () => {
   return (
      <Flex bg="teal.700" p={4} justifyContent="space-between" alignItems="center">
         <Text fontSize="lg" fontWeight="bold" color={'white'}>
            Car Rental App
         </Text>
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
