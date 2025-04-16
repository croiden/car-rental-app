import { Marker, useMapEvents } from 'react-leaflet'
import { Location } from '../types'
import { LeafletMouseEvent } from 'leaflet'

interface Props {
   location: Location | null
   onLocationChange: (location: Location) => void
}

const DropLocation = ({ location, onLocationChange }: Props) => {
   useMapEvents({
      click(e: LeafletMouseEvent) {
         if (e.latlng) {
            onLocationChange(e.latlng)
         }
      },
   })

   return location ? <Marker position={location} /> : null
}

export default DropLocation
