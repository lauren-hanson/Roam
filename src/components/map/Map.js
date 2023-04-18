// --- (1), (2) & (3): install and import ---
import { useState, useEffect, useRef } from 'react'
import { useNavigate } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { Icon } from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { getDestinationByStatus, updateDestinationStatus, getNotFavDestinations } from "../../managers/DestinationManager"
import Modal from 'react-modal'
import "./Map.css"
import { AddFavDest } from "./AddFavDest"
import { EditDest } from "./EditDest"
import { RemoveDest } from "./RemoveDest"

export function Map({ token }) {

    const navigate = useNavigate()
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [refresh, setRefresh] = useState(false)
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


    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            background: '#131313',
            color: 'papayawhip', 
            zIndex: 9999
        },
    }

    const openModal = () => {
        setIsModalOpen(true)
    }

    const closeModal = () => {
        setRefresh(!refresh)
        setIsModalOpen(false)
    }

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
                                    <div>
                                        <button class="button is-small" onClick={openModal}>edit.</button>
                                        <Modal
                                            isOpen={isModalOpen}
                                            onRequestClose={closeModal}
                                            style={customStyles}
                                            contentLabel="modal"
                                            ariaHideApp={false}
                                            // appElement={el}
                                            >
                                            <button onClick={closeModal}>x</button>
                                            <EditDest setIsModalOpen={setIsModalOpen} closeModal={closeModal} />
                                        </Modal>
                                        <RemoveDest />
                                    </div>
                                </Popup>
                            </Marker>)
                        })}
                    </div>

                </MapContainer>
            </div>
            <AddFavDest updateDestinationStatus={updateDestinationStatus} notFavDests={notFavDests} setFavDestinations={setFavDestinations} favDestinations={favDestinations} />
        </section >
    )
}