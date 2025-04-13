import { CloseButton, Input, InputGroup } from '@chakra-ui/react'
import { useEffect, useRef, useState } from 'react'
import { useDebounce } from '@uidotdev/usehooks'
import { IoSearch } from 'react-icons/io5'

interface Props {
   placeholder: string
   onChange?: (value: string) => void
}

const SearchInput = ({ placeholder, onChange }: Props) => {
   const [value, setValue] = useState<string | null>(null)
   const inputRef = useRef<HTMLInputElement | null>(null)

   const debouncedSearchTerm = useDebounce(value, 500)

   const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setValue(event.target.value)
   }

   useEffect(() => {
      if (onChange && debouncedSearchTerm !== null) {
         onChange(debouncedSearchTerm)
      }
   }, [debouncedSearchTerm, onChange])

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
      <InputGroup startElement={<IoSearch />} endElement={endElement}>
         <Input ref={inputRef} placeholder={placeholder} value={value || ''} onChange={handleInputChange} />
      </InputGroup>
   )
}

export default SearchInput
