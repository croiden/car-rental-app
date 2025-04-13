import { EmptyState, VStack } from '@chakra-ui/react'
import { MdNoTransfer } from 'react-icons/md'

interface Props {
   title: string
   description?: string
}

const EmptyView = ({ title, description }: Props) => {
   return (
      <EmptyState.Root>
         <EmptyState.Content>
            <EmptyState.Indicator>
               <MdNoTransfer />
            </EmptyState.Indicator>
            <VStack textAlign="center">
               <EmptyState.Title>{title}</EmptyState.Title>
               {description && <EmptyState.Description>{description}</EmptyState.Description>}
            </VStack>
         </EmptyState.Content>
      </EmptyState.Root>
   )
}

export default EmptyView
