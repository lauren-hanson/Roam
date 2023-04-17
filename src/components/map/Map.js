// --- (1), (2) & (3): install and import ---
import { useState, useEffect, useRef } from 'react'
import { useNavigate } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { Icon } from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { getMyTrips, getTripDestinations } from "../../managers/TripManager"
import { getDestinationByStatus, updateTripStatus, getNotFavDestinations } from "../../managers/DestinationManager"
import Modal from 'react-modal'
import "./Map.css"
import { AddFavDest } from "./AddFavDest"

export function Map({ token }) {

    const navigate = useNavigate()
    const [trips, setTrips] = useState([])
    const [notFavDests, setNotFavDests] = useState([])
    const [favDestinations, setFavDestinations] = useState([
        {
            location: '',
            state: '',
            latitude: '',
            longitude: '',
            tips: '',
            destination_status: 0
        }
    ]);


    const tokenInt = parseInt(token)


    useEffect(() => {
        //all trips that are favorites
        getDestinationByStatus(4).then((destArray) => {
            setFavDestinations(destArray)
        })

        //filtering all trips that are favorite to return all others
        getNotFavDestinations(4).then((notFavArray) => {
            setNotFavDests(notFavArray)
        })

    }, [])

    const center = [36.1627, -86.7816]

    const favIcon = new Icon({
        iconUrl: 'https://www.pngall.com/wp-content/uploads/2017/05/Map-Marker-Free-Download-PNG.png',
        iconSize: [20, 20],

    })

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
                            return (<Marker position={[t.latitude ?? 0, t.longitude ?? 0]} icon={favIcon}>
                                <Popup><h2 className="popUpHeader">{t.location}, {t.state}</h2><br></br>{t.tips}

                                </Popup>
                            </Marker>)
                        })}
                    </div>

                </MapContainer>
            </div>
            <AddFavDest updateTripStatus={updateTripStatus} notFavDests={notFavDests} />
        </section >
    )
}