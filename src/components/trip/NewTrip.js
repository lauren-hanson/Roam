import { useState, useEffect, useRef } from "react"
import { useNavigate } from 'react-router-dom'
import { addNewTrip, addTripDestination, addTripTag, getSingleTrip } from "../../managers/TripManager"
import { getDestinations, addDestination } from "../../managers/DestinationManager"
import { getTags, addNewTag } from "../../managers/TagManager"
import "./Trip.css"

export const NewTrip = ({ token }) => {

    const navigate = useNavigate()
    const [newDestination, setNewDestination] = useState({
        id: 0,
        location: "",
        state: "",
        latitude: 0.0,
        longitude: 0.0
    })

    const [destinations, setDestinations] = useState([])
    const [trip, setNewTrip] = useState({
        destinationId: 0,
        startDate: "",
        endDate: "",
        notes: "",
        public: false
    })

    const [tags, setTags] = useState([])
    const [tagsToAPI, setTagsToAPI] = useState([])

    useEffect(
        () => {
            getTags().then((tagData) => setTags(tagData))
            getDestinations().then((destinationData) => setDestinations(destinationData))
        }, [])

    const handleStartDestinationInfo = (event) => {
        const startDestination = Object.assign({}, newDestination)
        startDestination[event.target.name] = event.target.value
        setNewDestination(startDestination)
    }

    const handleNewTripInfo = (event) => {
        const newTrip = Object.assign({}, trip)
        newTrip[event.target.name] = event.target.value
        setNewTrip(newTrip)
    }

    const tagPromise = (body) => {
        return fetch(`http://localhost:8000/triptags`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        })
    }

    const publishNewTrip = () => {

        addDestination(newDestination)
            .then((destination) => {
                const newTrip = {
                    startDate: trip.startDate,
                    endDate: trip.endDate,
                    notes: trip.notes,
                    user_id: parseInt(token),
                    public: false,
                    tag: tagsToAPI,
                    destination: destination.id
                }
                addNewTrip(newTrip)
                    .then((trip) => {
                        const tripTags = tagsToAPI.map((tag) => ({ tag_id: tag, trip_id: trip.id }));
                        const tripDestinations = [{ destination_id: destination.id, trip_id: trip.id }];

                        Promise.all([addNewTag(tagsToAPI), addTripDestination(tripDestinations), addTripTag(tripTags)])
                            .then(() => {
                                navigate("/");
                            })
                    });
            })
    }

    const createNewDestination = (event) => {
        event.preventDefault()
        addDestination(newDestination)
            .then((destination) => {
                const newTrip = Object.assign({}, trip)
                newTrip.destinationId = destination.id;
                setNewTrip(newTrip)
            })
    }

    return (<>
        <h2>Tell us about your next trip...</h2>
        <form className="addNewTripForm">
            <fieldset>
                <div>
                    <label htmlFor="destination">Where are you going?</label>
                    <br></br>
                    <input
                        type="text"
                        name="location"
                        required autoFocus
                        className="locationInput"
                        placeholder="City Name..."
                        onChange={handleStartDestinationInfo} />
                    <br></br>
                    <input
                        type="text"
                        name="state"
                        required autoFocus
                        className="stateInput"
                        placeholder="State..."
                        onChange={handleStartDestinationInfo}
                    />
                    <br></br>
                    <input
                        type="text"
                        name="latitude"
                        required autoFocus
                        className="latitudeInput"
                        placeholder="Latitude..."
                        onChange={handleStartDestinationInfo}
                    />
                    <br></br>
                    <input
                        type="text"
                        name="longitude"
                        required autoFocus
                        className="longitudeInput"
                        placeholder="Longitude..."
                        onChange={handleStartDestinationInfo}
                    />
                </div>

                <button
                    onClick={createNewDestination}>
                    Add Destination
                </button>
            </fieldset>
            <fieldset>
                <div>
                    <label htmlFor="startDate">When do you plan on leaving?</label>
                    <br></br>
                    <input
                        type="date"
                        name="startDate"
                        required autoFocus
                        className="startDate"
                        onChange={handleNewTripInfo} />

                </div>
            </fieldset>
            <fieldset>
                <div>
                    <label htmlFor="endDate">When are you coming home?</label>
                    <br></br>
                    <input
                        type="date"
                        name="endDate"
                        required autoFocus
                        className="title-form-control"
                        onChange={handleNewTripInfo} />
                </div>
            </fieldset>
            <fieldset>
                <div>
                    {tags.map(tag => (
                        <div className="tags">

                            <input
                                name="tagId"
                                type="checkbox"
                                required autoFocus
                                className="checkbox"
                                placeholder="tag"
                                value={tag.id}
                                onChange={(event) => {
                                    if (event.target.checked) {
                                        let copy = [...tagsToAPI]
                                        copy.push(parseInt(event.target.value))
                                        setTagsToAPI(copy)
                                    } else {
                                        let copy = [...tagsToAPI]
                                        let index = copy.indexOf(parseInt(event.target.value))
                                        copy.splice(index)
                                        setTagsToAPI(copy)
                                    }
                                }}
                            />
                            <label className="tagLabel">
                                <option
                                    key={`tag--${tag.id}`}
                                    value={tag.id}
                                >
                                    {tag.type}
                                </option>
                            </label>
                        </div>
                    ))}
                </div>
            </fieldset>
            <fieldset>
                <div>
                    <textarea
                        type="textbox"
                        rows="5"
                        cols="30"
                        name="notes"
                        required
                        defaultValue={trip.notes}
                        autoFocus
                        className="form-control"
                        placeholder="Leave some notes about the trip..."
                        onChange={handleNewTripInfo}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div>
                    <label htmlFor="public">Would you like this trip to be public for your followers?</label>
                    <div className="radioLabel">
                        <input

                            type="radio"
                            className="radioButton"
                            value={true}
                            name="public"
                            onClick={
                                () => {
                                    const copy = { ...trip }
                                    copy.public = true
                                    handleNewTripInfo(copy)
                                }
                            }
                        />
                        <label className="radioLabel">Yes</label>

                        <input

                            type="radio"
                            className="radioButton"
                            value={false}
                            name="public"
                            onClick={
                                () => {
                                    const copy = { ...trip }
                                    copy.musicianRequest = false
                                    handleNewTripInfo(copy)
                                }
                            }

                        />
                        <label className="radioLabel" >No</label>

                    </div>
                </div>
            </fieldset>


            <button type="save" className="saveTripForm"
                onClick={evt => {
                    evt.preventDefault()
                    publishNewTrip()
                }}
            >
                Save Trip
            </button>

        </form></>

    )
}

