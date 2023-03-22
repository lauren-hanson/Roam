import { useState, useEffect, useRef } from "react"
import { useNavigate, useParams } from 'react-router-dom'
import { updateTrip, getSingleTrip, getDestinationByTrip, addTripDestination } from "../../managers/TripManager"
import { getDestinations, addDestination, deleteDestination } from "../../managers/DestinationManager"
import { getTags } from "../../managers/TagManager"
import { FaTrashAlt } from "react-icons/fa";
import "./Trip.css"

export const EditTrip = ({ token }) => {

    const navigate = useNavigate()
    const locationRef = useRef()
    const stateRef = useRef()
    const latRef = useRef()
    const longRef = useRef()
    const { tripId } = useParams()
    const [refresh, setRefresh] = useState(false)
    const [tags, setTags] = useState([])
    const [tripTags, setTripTags] = useState(new Set())
    const [trips, setTrips] = useState([])
    const [destinations, setDestinations] = useState([])
    const [newDestination, setNewDestination] = useState({
        id: 0,
        location: "",
        state: "",
        latitude: 0,
        longitude: 0
    })

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
            location: "",
            state: "",
            latitude: 0,
            longitude: 0
        }],
        public: 0,
        complete: 0
    })

    const tagArr = (tagId) => {
        let copy = new Set(tripTags)
        copy.has(tagId) ? copy.delete(tagId) : copy.add(tagId)
        setTripTags(copy)
    }

    useEffect(() => {
        getTags().then(data => setTags(data))
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

    const handleNewDestinationInfo = (event) => {
        const startDestination = Object.assign({}, newDestination)
        startDestination[event.target.name] = event.target.value
        setNewDestination(startDestination)
    }

    const createNewDestination = (event) => {
        event.preventDefault()

        const newDestination = {
            location: locationRef.current.value,
            state: stateRef.current.value,
            latitude: latRef.current.value,
            longitude: longRef.current.value
        }
        setDestinations([...destinations, newDestination])
        locationRef.current.value = ''
        stateRef.current.value = ''

        addDestination(newDestination)
            .then((destination) => {
                // create the new association object
                const newTripDestination = {
                    destinationId: destination.id,
                    tripId: parseInt(tripId)
                }

                addTripDestination(newTripDestination)
                    .then(() => {
                        getSingleTrip(tripId).then((data) => setCurrentTrip(data))
                    })
            })
    }

    const handleNewTripInfo = (event) => {
        const copy = { ...currentTrip }
        copy[event.target.name] = event.target.value;
        setCurrentTrip(copy);
    }

    const deleteButton = (id) => {
        return <FaTrashAlt className="deleteButton" onClick={() => {
            deleteDestination(id)
                .then(() => {
                    window.confirm(
                        "Do you want to skip this stop?"
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
                        cols="60"
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
                <div>
                    <input
                        type="text"
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
                        // name="startDate"
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
                        // name="end_date"
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
            <fieldset>
                <label className="tripLabel" htmlFor="destination">Stops along the way... </label>
                <div className="addDestinationContainer">
                    <br></br>
                    <div className="destinationInput">
                        <input
                            type="text"
                            name="location"
                            ref={locationRef}
                            required autoFocus
                            className="locationInput"
                            placeholder="City..."
                            onChange={handleNewDestinationInfo} />
                        <br></br>
                        <input
                            type="text"
                            name="state"
                            ref={stateRef}
                            required autoFocus
                            className="stateInput"
                            placeholder="State..."
                            onChange={handleNewDestinationInfo}
                        />
                        <br></br>
                        <div>Do you want to add this to your map?</div>
                        <div className="destinationInput">
                            <input
                                type="text"
                                name="latitude"
                                ref={latRef}
                                required autoFocus
                                className="latInput"
                                placeholder="Latitude..."
                                onChange={handleNewDestinationInfo}
                            />
                            <input
                                type="text"
                                name="longitude"
                                ref={longRef}
                                required autoFocus
                                className="longInput"
                                placeholder="Longitude..."
                                onChange={handleNewDestinationInfo}
                            />
                        </div>
                    </div>


                    <button className="button is-small addDestinationButton"
                        onClick={createNewDestination}>
                        Add Destination
                    </button>
                </div>
                <br></br>
                <div>
                    {currentTrip?.destination.map((destination, index) => (
                        <div key={index}>
                            {/* <p>{index + 1}. {destination.location}, {destination.state}
                            {deleteButton(destination.id)}
                            </p> */}
                            <li>{destination.location}, {destination.state}
                                {deleteButton(destination.id)}</li>
                            {/* <button onClick={deleteWindow(destination.id)}>❌</button> */}
                        </div>
                    ))}

                </div>
            </fieldset>
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
            <fieldset>
                <div className="field">
                    <label htmlFor="tag" className="triplabel label">Tags: </label>
                    {
                        tags.map(tag => {
                            const foundTag = currentTrip.tag.find(tripTag => tag.id === tripTag.id)

                            return <div key={`tag--${tag.id}`}>
                                <input type="checkbox" name={tag.type}
                                    defaultChecked={foundTag}
                                    onClick={() => tagArr(tag.id)}
                                />
                                <label htmlFor={tag.type}>{tag?.type}</label><br />
                            </div>
                        })
                    }
                </div>
            </fieldset>
            <br></br>
            <fieldset>
                <div>
                    <label htmlFor="public">Are you ready for this trip to be public?</label>
                    <div className="radioLabel">
                        <input

                            type="radio"
                            checked={currentTrip.public === true}
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
                            checked={currentTrip.public === false}
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
        </form>

    </>
    )
}
