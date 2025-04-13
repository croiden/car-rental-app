import { Flex, Text } from '@chakra-ui/react'
import { Tooltip } from '@/components/ui/tooltip'

interface Props {
   maxWidth?: string
   fontWeight?: string
   children?: string
}

const TableCell = ({ children, maxWidth = '100px', fontWeight = 'normal' }: Props) => {
   return (
      <Flex maxW={maxWidth}>
         <Tooltip content={children} positioning={{ placement: 'top' }}>
            <Text truncate fontWeight={fontWeight}>
               {children}
            </Text>
         </Tooltip>
      </Flex>
   )
}

export default TableCell
