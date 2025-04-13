import { debounce } from '@/utils'
import { CloseButton, Input, InputGroup } from '@chakra-ui/react'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'

interface Props {
   onChange?: (value: string) => void
}

const SearchInput = ({ onChange }: Props) => {
   const { t } = useTranslation()
   const [value, setValue] = useState<string>('')
   const inputRef = useRef<HTMLInputElement | null>(null)

   const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setValue(event.target.value)
   }

   // Use useCallback to create a stable debounced function
   const debouncedChange = useCallback(
      debounce((val: string) => {
         if (onChange) onChange(val)
      }, 500),
      [onChange],
   )

   useEffect(() => {
      debouncedChange(value)
   }, [value, debouncedChange])

   const endElement = value ? (
      <CloseButton
         size="xs"
         onClick={() => {
            setValue('')
            inputRef.current?.focus()
         }}
         me="-2"
      />
   ) : undefined

   return (
      <InputGroup endElement={endElement}>
         <Input ref={inputRef} placeholder={t('search_for_a_car')} value={value} onChange={handleInputChange} />
      </InputGroup>
   )
}

export default SearchInput
