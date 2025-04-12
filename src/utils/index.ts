export const formatDate = (date: Date): string => {
   const options: Intl.DateTimeFormatOptions = {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
   }

   return date.toLocaleString('en-US', options)
}
