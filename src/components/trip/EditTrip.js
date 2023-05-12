import { useState, useEffect } from "react"
import { useNavigate, useParams } from 'react-router-dom'
import { updateTrip, getSingleTrip, getDestinationByTrip } from "../../managers/TripManager"
import { getTags } from "../../managers/TagManager"
import "./Trip.css"
import { getStatus } from "../../managers/StatusManager"
import { AddTripDestination } from "../destination/AddTripDestination"
import { deleteDestination } from "../../managers/DestinationManager"
import { DeleteDestination } from "../destination/DeleteDestination"
import { AddTripTag } from "../tags/AddTripTag"
import Modal from 'react-modal'
import { FaTrashAlt } from "react-icons/fa"

export const EditTrip = ({ token }) => {

    const navigate = useNavigate()
    const { tripId } = useParams()
    const [tags, setTags] = useState([])
    const [status, setStatus] = useState([])
    const [tripTags, setTripTags] = useState(new Set())
    const [destinations, setDestinations] = useState([])
    const [refresh, setRefresh] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [currentTrip, setCurrentTrip] = useState({
        title: "",
        weather: "",
        image_url: "",
        start_date: "",
        end_date: "",
        notes: "",
        user_id: parseInt(token),
        tag: [],
        destination: [{
            latitude: 0,
            longitude: 0,
            tips: "",
            destination_status: 0
        }],
        public: 0,
        complete: 0
    })

    useEffect(() => {
        getTags().then(data => setTags(data))
        getStatus().then(statusInfo => setStatus(statusInfo))
        getDestinationByTrip(tripId).then(destination => setDestinations(destination))
        getSingleTrip(tripId).then((tripData) => {
            setCurrentTrip(tripData)

            const tagSet = new Set()
            for (const t of tripData.tag) {
                tagSet.add(t.id)
            }
            setTripTags(tagSet)
        })
    }, [tripId])

    const handleNewTripInfo = (event) => {
        const copy = { ...currentTrip }
        copy[event.target.name] = event.target.value;
        setCurrentTrip(copy);
    }

    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            background: '#131313',
            color: 'papayawhip'
        },
    }

    const openModal = () => {
        setIsModalOpen(true)
    }

    const closeModal = () => {
        setRefresh(!refresh)
        setIsModalOpen(false)
    }

    const deleteButton = (id) => {
        return <FaTrashAlt className="deleteButton" onClick={() => {
            deleteDestination(id)
                .then(() => {
                    window.confirm(
                        "Do you want to delete this stop?"
                    )
                    getSingleTrip(tripId).then((data) => setCurrentTrip(data))
                    setRefresh(!refresh)
                })
        }
        }></FaTrashAlt>
    }


    return (<>
        <form className="editForm">
            <h2 className="tripSubtitle">Edit your trip...</h2>
            <fieldset>
                <label className="tripLabel">Where are you going?</label>
                <div>
                    <input
                        type="text"
                        name="title"
                        required
                        autoFocus
                        defaultValue={currentTrip.title}
                        className="form-control"
                        placeholder="Title"
                        onChange={handleNewTripInfo}
                    />
                </div>
            </fieldset>
            <br></br>
            <fieldset>
                <label className="tripLabel">Weather:</label>
                <div>
                    <textarea
                        type="textbox"
                        rows="10"
                        cols="50"
                        name="weather"
                        required
                        autoFocus
                        defaultValue={currentTrip.weather}
                        className="form-control"
                        placeholder="Weather"
                        onChange={handleNewTripInfo}
                    />
                </div>
            </fieldset>
            <br></br>
            <fieldset>
                <label className="tripLabel">Photos:</label>
                {/* <div className="">
                    <input type="file" id="file-input" name="ImageStyle" />
                </div> */}
                <div>
                    <input
                        type="file"
                        name="image_url"
                        required
                        autoFocus
                        defaultValue={currentTrip.image_url}
                        className="form-control"
                        placeholder="ImageUrl"
                        onChange={handleNewTripInfo}
                    />
                </div>
            </fieldset>
            <br></br>
            <fieldset>
                <label className="tripLabel">Start Date:</label>
                <div>
                    <input
                        type="date"
                        required
                        autoFocus
                        defaultValue={currentTrip.start_date}
                        className="form-control"
                        onChange={
                            (event) => {
                                const copy = { ...currentTrip }
                                copy.start_date = event.target.value
                                setCurrentTrip(copy)
                            }
                        }
                    />
                </div>
            </fieldset>
            <br></br>
            <fieldset>
                <label className="tripLabel">End Date:</label>
                <div>
                    <input
                        type="date"
                        required
                        autoFocus
                        defaultValue={currentTrip.end_date}
                        className="form-control"
                        onChange={
                            (event) => {
                                const copy = { ...currentTrip }
                                copy.end_date = event.target.value
                                setCurrentTrip(copy)
                            }
                        }
                    />
                </div>
            </fieldset>
            <br></br>
            <div className="destinationList">
                <h4 className="tripSubtitle">Stops along the way...</h4>
{/* 
                {currentTrip?.destination?.map((d, index) => (
                    <ol key={index}>{index + 1}. {d.location},  {d.state} */}
                        <div>
                            <DeleteDestination FaTrashAlt={FaTrashAlt} getSingleTrip={getSingleTrip} tripId={tripId} setCurrentTrip={setCurrentTrip} refresh={refresh} setRefresh={setRefresh} currentTrip={currentTrip} />
                        </div>
                        {/* </ol> */}
                {/* ))} */}
                <br></br>
                {/* <div className="singleTripMap" id="map">
                    <MapContainer center={[39.50, -98.350]} zoom={3.5} style={{ height: "500px", width: "500px" }} scrollWheelZoom={true} >
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        {trip.destination.map(d => {
                            return (<Marker position={[d.latitude ?? 0, d.longitude ?? 0]} icon={customIcon} key={d.id}>
                                <Popup className="popUpHeader">{d.location}, {d.state}
                                    <p>{d.tips}</p></Popup>
                            </Marker>)
                        })}
                    </MapContainer>
                </div> */}
            </div>

            <div>
                <button class="button is-small" className="addDestButton" onClick={openModal}>+</button>
                Add new destination?
            </div>
            <Modal
                isOpen={isModalOpen}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <button onClick={closeModal} class="button is-small" className="closeModalButton">X</button>
                <div>
                    <AddTripDestination
                        tripId={tripId}
                        currentTrip={currentTrip}
                        setCurrentTrip={setCurrentTrip}
                        status={status}
                        setIsModalOpen={setIsModalOpen}
                        closeModal={closeModal}
                    />
                </div>
            </Modal>

            <br></br>
            <fieldset>
                <label>Notes:</label>
                <div>
                    <textarea
                        type="textbox"
                        rows="20"
                        cols="80"
                        name="notes"
                        required
                        autoFocus
                        defaultValue={currentTrip.notes}
                        className="form-control"
                        placeholder="Notes"
                        onChange={handleNewTripInfo}
                    />
                </div>
            </fieldset>
            <br></br>
            <div>
                <AddTripTag currentTrip={currentTrip} tripTags={tripTags}
                    setTripTags={setTripTags} tags={tags} />
            </div>
            <br></br>
            <fieldset>
                <div>
                    <label htmlFor="public">Are you ready for this trip to be public?</label>
                    <div className="radioLabel">
                        <input

                            type="radio"
                            defaultChecked={currentTrip.public === true}
                            name="public"
                            onClick={
                                () => {
                                    const copy = { ...currentTrip }
                                    copy.public = true
                                    setCurrentTrip(copy)
                                }
                            }
                        />

                        <label className="radioLabel">Yes</label>

                        <input

                            type="radio"
                            defaultChecked={currentTrip.public === false}
                            name="public"
                            onClick={
                                () => {
                                    const copy = { ...currentTrip }
                                    copy.public = false
                                    setCurrentTrip(copy)
                                }
                            }
                        />
                        <label className="radioLabel" >No</label>

                    </div>
                </div>
            </fieldset>
            <br></br>
            <button
                type="saveTrip"
                onClick={evt => {
                    evt.preventDefault()

                    const tripInfoToUpdate = {
                        title: currentTrip.title,
                        weather: currentTrip.weather,
                        image_url: currentTrip.image_url,
                        start_date: currentTrip.start_date,
                        end_date: currentTrip.end_date,
                        notes: currentTrip.notes,
                        user_id: parseInt(token),
                        tag: Array.from(tripTags),
                        destination: [],
                        destinationId: 0,
                        public: currentTrip.public,
                        complete: currentTrip.complete
                    }

                    updateTrip(tripId, tripInfoToUpdate)
                        .then(() => navigate(`/trips/${currentTrip.id}`))
                }}
                className="button publishButton">Publish</button>
        </form >

    </>
    )
}
