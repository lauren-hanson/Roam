// --- (1), (2) & (3): install and import ---
import { useState, useEffect, useRef } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { Icon } from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { getMyTrips } from "../../managers/TripManager"
import { getDestinations } from "../../managers/DestinationManager"

import { MapSearch } from './MapSearch.js'

export function Map({ token }) {

    // const [position, setPosition] = useState(null);
    const [destinations, setDestinations] = useState([{
        destination: {
            latitude: 0,
            longitude: 0
        }
    }]);

    const tokenInt = parseInt(token)

    useEffect(() => {
        getDestinations(tokenInt).then((destArray) => {
            setDestinations(destArray)
        })

    }, [])

    const center = [36.1627, -86.7816]

    const customIcon = new Icon({
        iconUrl: 'https://www.pngall.com/wp-content/uploads/2017/05/Map-Marker-Free-Download-PNG.png',
        iconSize: [20, 20],
    
    })

    // const polyline = [
    //     [36.1627, -86.7816],
    //     [31.892008, -104.820476],
    //     [33.833378, -111.417358],
    //     [34.871002, -111.760826],
    //     [38.55056, -107.68667],
    //     [36.372852, -94.208817],
    //     [36.1627, -86.7816]

    // ]

    const greenOption = { color: 'darkgreen' }

    return (
        <section className='map-component' >

            <div id='map'>
                <MapContainer center={[36.1627, -86.7816]} zoom={4} style={{ height: "500px" }} scrollWheelZoom={true} >
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    {destinations.map((t) => {
                        return (<Marker position={[t.latitude ?? 0, t.longitude ?? 0]} icon={customIcon}>
                            <Popup>{t.location}, {t.state}</Popup>
                            
                        </Marker>)
                    })}
                </MapContainer>

                <fieldset>
                    <input type="text"

                    />

                    <button>Add Location</button>
                </fieldset>
            </div>
        </section >
    )
}