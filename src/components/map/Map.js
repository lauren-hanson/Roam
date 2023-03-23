// --- (1), (2) & (3): install and import ---
import { useState, useEffect, useRef } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { Icon } from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { getMyTrips } from "../../managers/TripManager"
import { getDestinationByStatus } from "../../managers/DestinationManager"
import "./Map.css"

import { MapSearch } from './MapSearch.js'

export function Map({ token }) {

    // const [position, setPosition] = useState(null);
    const [favDestinations, setFavDestinations] = useState([{
        destination: {
            latitude: 0,
            longitude: 0
        }
    }]);
    const [toGoDestinations, setToGoDestinations] = useState([{
        destination: {
            latitude: 0,
            longitude: 0
        }
    }]);

    const tokenInt = parseInt(token)

    useEffect(() => {
        getDestinationByStatus(4).then((destArray) => {
            setFavDestinations(destArray)
        })

        getDestinationByStatus(5).then((destArray) => {
            setToGoDestinations(destArray)
        })

    }, [])

    const center = [36.1627, -86.7816]

    const favIcon = new Icon({
        iconUrl: 'https://www.pngall.com/wp-content/uploads/2017/05/Map-Marker-Free-Download-PNG.png',
        iconSize: [20, 20],

    })

    const toGoIcon = new Icon({
        iconUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSV8o6gnF3v56oVeSFhF96GDaQPCYI6ulT7dA&usqp=CAU',
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
                    <div>
                        {favDestinations.map((t) => {
                            return (<Marker position={[t.destination.latitude ?? 0, t.destination.longitude ?? 0]} icon={favIcon}>
                                <Popup>{t.destination.location}, {t.destination.state}</Popup>

                            </Marker>)
                        })}
                    </div>
                    <div>
                        {toGoDestinations.map((t) => {
                            return (<Marker position={[t.destination.latitude ?? 0, t.destination.longitude ?? 0]} icon={toGoIcon}>
                                <Popup>{t.destination.location}, {t.destination.state}</Popup>

                            </Marker>)
                        })}
                    </div>
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