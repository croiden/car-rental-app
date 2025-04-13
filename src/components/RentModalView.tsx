import { Button, Dialog, Field, Input, Portal, Stack } from '@chakra-ui/react'
import { useRef, useState } from 'react'
import { MdCarRental } from 'react-icons/md'
import { toaster } from '@/components/ui/toaster'
import { Car } from '../types'
import CarDetails from './CarDetails'
import { useTranslation } from 'react-i18next'

interface Props {
   car: Car
   onClose: () => void
   onSubmit: (carId: string, userName: string) => void
}

const RentModalView = ({ car, onClose, onSubmit }: Props) => {
   const { t } = useTranslation()
   const ref = useRef<HTMLInputElement>(null)
   const [userNameFieldValid, setUserNameFieldValid] = useState<boolean>(true)

   const handleSubmit = () => {
      const userName = ref.current?.value
      if (!userName) {
         setUserNameFieldValid(false)
         ref.current?.focus()
         return
      }
      toaster.create({
         description: t('car_rented_successfully'),
         type: 'success',
      })
      onSubmit?.(car.id, userName)
   }

   return (
      <Dialog.Root
         initialFocusEl={() => ref.current}
         defaultOpen
         placement={'center'}
         size={'xl'}
         scrollBehavior="inside"
         onExitComplete={onClose}
      >
         <Portal>
            <Dialog.Backdrop />
            <Dialog.Positioner>
               <Dialog.Content>
                  <Dialog.Header>
                     <Dialog.Title>{`${t('rent')}: ${car.model}`}</Dialog.Title>
                  </Dialog.Header>
                  <Dialog.Body pb="4">
                     <Stack gap="10" css={{ '--field-label-width': '120px' }}>
                        <CarDetails car={car} />
                        <Field.Root required invalid={!userNameFieldValid} orientation="horizontal" maxW="md">
                           <Field.Label>
                              {t('booked_by')}
                              <Field.RequiredIndicator />
                           </Field.Label>
                           <Input
                              ref={ref}
                              placeholder={t('enter_name')}
                              onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
                              flex="1"
                           />
                           <Field.ErrorText>{t('required_field')}</Field.ErrorText>
                        </Field.Root>
                     </Stack>
                  </Dialog.Body>
                  <Dialog.Footer>
                     <Button variant="outline" onClick={onClose}>
                        {t('cancel')}
                     </Button>
                     <Button onClick={handleSubmit}>
                        <MdCarRental />
                        {t('rent')}
                     </Button>
                  </Dialog.Footer>
               </Dialog.Content>
            </Dialog.Positioner>
         </Portal>
      </Dialog.Root>
   )
}

export default RentModalView
