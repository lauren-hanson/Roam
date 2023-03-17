import { useState, useEffect, useRef } from "react"
import { useNavigate } from 'react-router-dom'
import { addNewTrip, addTripTag, getSingleTrip } from "../../managers/TripManager"
import { getDestinations, addDestination } from "../../managers/DestinationManager"
import { getTags, addNewTag } from "../../managers/TagManager"
import "./Trip.css"

// addTripDestination,

export const NewTrip = ({ token }) => {

    const navigate = useNavigate()
    const [showDestination, setShowDestination] = useState(false)
    const locationRef = useRef()
    const stateRef = useRef()

    const [destinations, setDestinations] = useState([])
    const [newDestination, setNewDestination] = useState({
        location: "",
        state: ""
    })

    const [trip, setNewTrip] = useState({
        destination: [],
        tag: [],
        weather: "",
        start_date: "",
        title: "",
        end_date: "",
        notes: "",
        public: false,
        image_url: ""
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

    // const tagPromise = (body) => {
    //     return fetch(`http://localhost:8000/triptags`, {
    //         method: "POST",
    //         headers: {
    //             "Content-Type": "application/json",
    //         },
    //         body: JSON.stringify(body),
    //     })
    // }

    const publishNewTrip = () => {

        const destinationId = parseInt(trip.destination)

        addDestination(newDestination)
            .then((destination) => {
                const newTrip = {
                    startDate: trip.startDate,
                    endDate: trip.endDate,
                    notes: trip.notes,
                    title: trip.title,
                    user_id: parseInt(token),
                    public: false,
                    tag: tagsToAPI,
                    destination: destinationId

                }
                addNewTrip(newTrip)
            })
            .then(() => {
                navigate("/trips");
            })
    }

    const createNewDestination = (event) => {
        event.preventDefault()
        setShowDestination(true)
        const newDestination = {
            location: locationRef.current.value,
            state: stateRef.current.value
        }
        setDestinations([...destinations, newDestination]);
        locationRef.current.value = ''
        stateRef.current.value = ''
        // latRef.current.value = ''
        // longRef.current.value = ''
        addDestination(newDestination)
            .then((destination) => {
                const newTrip = Object.assign({}, trip)
                newTrip.destination = destination.id;
                setNewTrip(newTrip)
            })


    }

    const lastDestination = destinations.length > 0 ? destinations[destinations.length - 1] : null

    return (<>
        <h2>Tell us about your next trip...</h2>
        <form className="addNewTripForm">
            <fieldset>
                <div>
                    <label htmlFor="title">Title: </label>
                    <br></br>
                    <input
                        type="text"
                        name="title"
                        required autoFocus
                        className="titleInput"
                        onChange={handleNewTripInfo} />
                    <br></br>
                </div>
            </fieldset>
            <fieldset>
                <div>
                    <label htmlFor="destination">Where are you going?</label>
                    <br></br>
                    <input
                        type="text"
                        name="location"
                        ref={locationRef}
                        required autoFocus
                        className="locationInput"
                        placeholder="City..."
                        onChange={handleStartDestinationInfo} />
                    <br></br>
                    <input
                        type="text"
                        name="state"
                        ref={stateRef}
                        required autoFocus
                        className="stateInput"
                        placeholder="State..."
                        onChange={handleStartDestinationInfo}
                    />
                    <br></br>
                    {/* <input
                        type="text"
                        name="latitude"
                        ref={latRef}
                        required autoFocus
                        className="latitudeInput"
                        placeholder="Latitude..."
                        onChange={handleStartDestinationInfo}
                    />
                    <br></br>
                    <input
                        type="text"
                        name="longitude"
                        ref={longRef}
                        required autoFocus
                        className="longitudeInput"
                        placeholder="Longitude..."
                        onChange={handleStartDestinationInfo}
                    /> */}
                </div>

                <button
                    onClick={createNewDestination}>
                    Add Destination
                </button>

                <div>
                    {showDestination && lastDestination && (
                        <div>
                            <p>{lastDestination.location}, {lastDestination.state}</p>
                        </div>)}
                </div>
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
            {/* <fieldset>
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
                                    copy.public = false
                                    handleNewTripInfo(copy)
                                }
                            }

                        />
                        <label className="radioLabel" >No</label>

                    </div>
                </div>
            </fieldset> */}


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

