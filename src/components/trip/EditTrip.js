import { useState, useEffect, useRef } from "react"
import { useNavigate, useParams } from 'react-router-dom'
import { updateTrip, getSingleTrip, getDestinationByTrip } from "../../managers/TripManager"
import { getDestinations, addDestination } from "../../managers/DestinationManager"
import { getTags } from "../../managers/TagManager"
import "./Trip.css"

export const EditTrip = ({ token }) => {

    const navigate = useNavigate()
    const locationRef = useRef()
    const stateRef = useRef()
    const latRef = useRef()
    const longRef = useRef()
    const { tripId } = useParams()
    const [tags, setTags] = useState([])
    const [tripTags, setTripTags] = useState(new Set())
    const [destinationByTrip, setDestinationByTrip] = useState([])
    const [destinations, setDestinations] = useState([])
    const [newDestination, setNewDestination] = useState({
        id: 0,
        location: "",
        state: "",
        latitude: 0,
        longitude: 0,
        trip: destinations.length > 0 ? destinations[destinations.length - 1].trip : 1
    })

    const [currentTrip, setCurrentTrip] = useState({
        title: "",
        weather: "",
        startDate: "",
        endDate: "",
        notes: "",
        user_id: parseInt(token),
        tag: [],
        destination: [],
        public: 0,
        destinationId: 0
    })

    const tagArr = (tagId) => {
        let copy = new Set(tripTags)
        copy.has(tagId) ? copy.delete(tagId) : copy.add(tagId)
        setTripTags(copy)
    }

    useEffect(() => {
        getDestinationByTrip(tripId).then(tripByDestArray => setDestinationByTrip(tripByDestArray))
        // getDestinations().then(destinationArray => setDestinations(destinationArray))
        getTags().then(data => setTags(data))
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
            longitude: longRef.current.value,
            trip: destinations.length > 0 ? destinations[destinations.length - 1].trip : 1
        }
        setDestinations([...destinations, newDestination]);
        locationRef.current.value = ''
        stateRef.current.value = ''
        latRef.current.value = ''
        longRef.current.value = ''

        addDestination(newDestination)
            .then((destination) => {
                const newTrip = Object.assign({}, currentTrip)
                newTrip.destinationId = destination.id;
                setCurrentTrip(newTrip)
            })
        setDestinations([...destinations, newDestination])
    }

    const handleNewTripInfo = (event) => {
        const copy = { ...currentTrip }
        copy[event.target.name] = event.target.value;
        setCurrentTrip(copy);
    }

    const lastDestination = destinations.length > 0 ? destinations[destinations.length - 1] : null


    return (<>
        <form>
            <h2>Edit your trip...</h2>
            <fieldset>
                <div>
                    <label>Title:</label>
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
            <fieldset>
                <div>
                    <label>Weather:</label>
                    <input
                        type="text"
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
            <fieldset>
                <div>
                    <label>Start Date:</label>
                    <input
                        type="date"
                        required
                        autoFocus
                        name="startDate"
                        defaultValue={currentTrip.start_date}
                        className="form-control"
                        onChange={
                            (event) => {
                                const copy = { ...currentTrip }
                                copy.startDate = event.target.value
                                handleNewTripInfo(copy)
                            }
                        }
                    />
                </div>
            </fieldset>
            <fieldset>
                <div>
                    <label>End Date:</label>
                    <input
                        type="date"
                        required
                        autoFocus
                        name="end_date"
                        defaultValue={currentTrip.end_date}
                        className="form-control"
                        onChange={
                            (event) => {
                                const copy = { ...currentTrip }
                                copy.endDate = event.target.value
                                handleNewTripInfo(copy)
                            }
                        }
                    />
                </div>
            </fieldset>
            <fieldset>
                <div>
                    <label htmlFor="destination">Would you like to add some stops?</label>
                    <br></br>
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
                    <input
                        type="text"
                        name="latitude"
                        ref={latRef}
                        required autoFocus
                        className="latitudeInput"
                        placeholder="Latitude..."
                        onChange={handleNewDestinationInfo}
                    />
                    <br></br>
                    <input
                        type="text"
                        name="longitude"
                        ref={longRef}
                        required autoFocus
                        className="longitudeInput"
                        placeholder="Longitude..."
                        onChange={handleNewDestinationInfo}
                    />
                </div>

                <button
                    onClick={createNewDestination}>
                    Add Destination
                </button>
                {destinations.map((destination, index) => (
                    <div key={index}>
                        <h2>Destination {index + 1}</h2>
                        <p>{destination.location}</p>
                    </div>
                ))}
                <div>

                </div>
            </fieldset>
            <fieldset>
                <div>
                    <label>Notes:</label>
                    <input
                        type="text"
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
            <fieldset>
                <div className="field">
                    <label htmlFor="tag" className="label">Tags: </label>
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

            <button
                type="saveTrip"
                onClick={evt => {
                    evt.preventDefault()

                    const tripInfoToUpdate = {
                        title: currentTrip.title,
                        weather: currentTrip.weather,
                        start_date: currentTrip.start_date,
                        end_date: currentTrip.end_date,
                        notes: currentTrip.notes,
                        user_id: parseInt(token),
                        tag: Array.from(tripTags),
                        destination: [],
                        destinationId: 0,
                        public: currentTrip.public
                    }

                    updateTrip(tripId, tripInfoToUpdate)
                        .then(() => navigate(`/trips/${currentTrip.id}`))
                }}
                className="button is-link is-rounded is-small">Publish</button>
        </form>

    </>
    )
}
