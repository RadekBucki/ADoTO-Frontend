import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Icon } from 'leaflet';
import 'leaflet/dist/leaflet.css';

export function Map() {
  const position = [51.76, 19.46]

  const customIcon = new Icon({
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.6.0/images/marker-icon.png',
    iconSize: [20, 20],
  })

  return (
    <section className='map-component' >
      <div className='map'>
      <MapContainer center={position} zoom={6} scrollWheelZoom={true}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position}
          icon={customIcon}
        >
          <Popup>
            Clicked🎉
          </Popup>
        </Marker>
      </MapContainer>
      </div>
    </section>
  )
}

export default Map