export const isStorageSupported = (): boolean => {
   if (typeof Storage !== 'undefined') {
      return true
   }
   console.error('storage not supported by the browser', new Error('storage not supported by the browser'))
   return false
}

const KEY_PREFIX = 'CAR_RENTAL_APP'

export const localStorage = {
   setItem: (key: string, value: any): void => {
      if (isStorageSupported()) window.localStorage.setItem(`${KEY_PREFIX}_${key}`, value)
   },
   getItem: (key: string): string | null =>
      isStorageSupported() ? window.localStorage.getItem(`${KEY_PREFIX}_${key}`) : null,
   removeItem: (key: string): void => {
      if (isStorageSupported()) window.localStorage.removeItem(`${KEY_PREFIX}_${key}`)
   },
}

export const sessionStorage = {
   setItem: (key: string, value: any): void => {
      if (isStorageSupported()) window.sessionStorage.setItem(`${KEY_PREFIX}_${key}`, value)
   },
   getItem: (key: string): string | null =>
      isStorageSupported() ? window.sessionStorage.getItem(`${KEY_PREFIX}_${key}`) : null,
   removeItem: (key: string): void => {
      if (isStorageSupported()) window.sessionStorage.removeItem(`${KEY_PREFIX}_${key}`)
   },
}
