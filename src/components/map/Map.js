// --- (1), (2) & (3): install and import ---
import { useState, useEffect, useRef } from 'react'
import { useNavigate } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { Icon } from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { getMyTrips, getTripDestinations } from "../../managers/TripManager"
import { getDestinationByStatus, updateTripStatus } from "../../managers/DestinationManager"
import Modal from 'react-modal'
import "./Map.css"

export function Map({ token }) {

    const navigate = useNavigate()
    const [trips, setTrips] = useState([])
    const [favDestinations, setFavDestinations] = useState([{
        destination: {
            latitude: 0,
            longitude: 0
        }
    }]);

    const [newFavDestination, setNewFavDestinations] = useState([{
        destination: {
            location: "",
            stateId: 0,
            latitude: 0,
            longitude: 0,
            status: 0
        }
    }])

    const tokenInt = parseInt(token)

    useEffect(() => {
        getDestinationByStatus(4).then((destArray) => {
            setFavDestinations(destArray)
        })

        // getTripDestinations().then((tripData) => {
        //     setTrips(tripData)
        // })

    }, [])

    const center = [36.1627, -86.7816]

    const favIcon = new Icon({
        iconUrl: 'https://www.pngall.com/wp-content/uploads/2017/05/Map-Marker-Free-Download-PNG.png',
        iconSize: [20, 20],

    })

    // const handleAddStatus = () => {
    //     const destinationId = parseInt(newFavDestination.destinationId)
    //     const stateId = parseInt(newFavDestination.stateId)

    //     const data = {
    //         location: newFavDestination.name,
    //         state: stateId,
    //         longitude: newFavDestination.longitude,
    //         latitude: newFavDestination.latitude,
    //         status: 4
    //     }

    //     updateTripStatus(destinationId, data)
    //         .then(() => {
    //             window.location.reload()
    //         })
    //         .catch((error) => {
    //             console.error(error)
    //         })
    // }


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
                                <Popup><h2 className="popUpHeader">{t.destination.location}, {t.destination.state}</h2><br></br>{t.destination.tips}
                    
                                </Popup>
                            </Marker>)
                        })}
                    </div>
                 
                </MapContainer>
            </div>
            {/* <fieldset>
                <div className="form-group">
                    <select
                        name="destinationId"
                        className="input"
                        value={newFavDestination.destination}
                        onChange={(event) => {
                            const copy = { ...newFavDestination }
                            copy.destinationId = parseInt(event.target.value)
                            setFavDestinations(copy)
                        }}
                    >
                        <option value="0">Any locations you want to save?</option>
                        {trips.map(t => (
                            <option
                                key={`trip--${t.id}`}
                                value={t.id}>
                                {t.destination.location}
                            </option>
                        ))}
                    </select>
                    <button
                        type="button"
                        onClick={handleAddStatus}
                        className="button is-link is-rounded is-small">Publish</button>
                </div>
            </fieldset> */}
        </section >
    )
}