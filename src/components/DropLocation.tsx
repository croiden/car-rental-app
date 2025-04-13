import { Marker, useMapEvents } from 'react-leaflet'
import { Location } from '../types'

interface Props {
   location: Location | null
   onLocationChange: (location: Location) => void
}

const DropLocation = ({ location, onLocationChange }: Props) => {
   useMapEvents({
      click(e: any) {
         if (e.latlng) {
            onLocationChange(e.latlng)
         }
      },
   })

   return location ? <Marker position={location} /> : null
}

export default DropLocation
