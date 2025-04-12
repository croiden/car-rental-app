import { Box, Text } from '@chakra-ui/react'

const NavBar = () => {
   return (
      <Box bg="cyan.700" p={4} color={'white'}>
         <Text fontSize="lg" fontWeight="bold">
            Car Rental App
         </Text>
      </Box>
   )
}
export default NavBar
