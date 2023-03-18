import { useState, useEffect, useRef } from "react"
import { useNavigate, useParams } from 'react-router-dom'
import { addNewTrip, addTripTag, getSingleTrip, addTripDestination, getTripDestinations } from "../../managers/TripManager"
import { getDestinations, addDestination } from "../../managers/DestinationManager"
import { getTags, addNewTag } from "../../managers/TagManager"
import "./Trip.css"

// addTripDestination,

export const NewTrip = ({ token }) => {

    const navigate = useNavigate()
    const [showDestination, setShowDestination] = useState(false)
    // const { tripId } = useParams()
    const locationRef = useRef()
    const stateRef = useRef()

    const [destinations, setDestinations] = useState([])
    const [newDestination, setNewDestination] = useState([{
        location: "",
        state: ""
    }])

    const [trip, setNewTrip] = useState({
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
            state: ""
        }],
        public: 0
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


    const publishNewTrip = () => {

        // const destinationId = parseInt(trip.destination)

        addDestination(newDestination)
            .then((destination) => {
                const newTrip = {
                    startDate: trip.start_date,
                    endDate: trip.end_date,
                    notes: trip.notes,
                    title: trip.title,
                    user_id: parseInt(token),
                    public: false,
                    tag: tagsToAPI,
                    destination: destination.id,
                    // trip_id: trip.id


                }
                addNewTrip(newTrip)
                    .then((trip) => {
                        const tripTags = tagsToAPI.map((tag) => ({ tag_id: tag, trip_id: trip.id }));
                        const tripDestinations = [{ destination: destination.id, trip_id: trip.id }];

                        Promise.all([addNewTag(tagsToAPI), addTripDestination(tripDestinations), addTripTag(tripTags)])
                            .then(() => {
                                navigate("/trips")
                            })
                    })
            })
    }


    // const createNewDestination = (event) => {
    //     setShowDestination(true)
    //     event.preventDefault()
    //     addDestination(newDestination)
    //         .then((destination) => {
    //             const newTrip = Object.assign({}, trip)
    //             newTrip.destination = destination.id;
    //             setNewTrip(newTrip)
    //         })
    // }

    const createNewDestination = (event) => {

        setShowDestination(true)
        event.preventDefault()
        addDestination(newDestination)
            .then((destination) => {
                setNewDestination({
                    location: destination.location,
                    state: destination.state,
                    id: destination.id
                })
                const newTrip = Object.assign({}, trip)
                newTrip.destinationId = destination.id;
                setNewTrip(newTrip)
            })

        // setShowDestination(true)

        // event.preventDefault()

        // addDestination(newDestination)
        //     .then((newDestination) => {
        //         const newTrip = Object.assign({}, trip)
        //         newTrip.destination = newDestination.id;
        //         setNewTrip(newTrip)
        //     })
    }

    // const newDestination = {
    //     location: locationRef.current.value,
    //     state: stateRef.current.value
    // }

    // addDestination(newDestination)
    //     .then((destination) => {
    //         // create the new association object
    //         const newTripDestination = {
    //             destinationId: destination.id,
    //             tripId: parseInt(tripId)
    //         }

    //         addTripDestination(newTripDestination)
    //             .then(() => {
    //                 getSingleTrip(tripId).then((data) => setNewTrip(data))
    //             })

    //     })


    const lastDestination = destinations.length > 0 ? destinations[destinations.length - 1] : null

    return (<>
        <h2>Tell us about your next trip...</h2>
        <form className="addNewTripForm">
            <fieldset>
                <div>
                    <label htmlFor="title">Where are you going?</label>
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
                </div>

                <button
                    onClick={createNewDestination}>
                    Add Destination
                </button>
                <div>
                    {showDestination && lastDestination && (
                        <div key={lastDestination.id}>
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
                        name="start_date"
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
                        name="end_date"
                        required autoFocus
                        className="title-form-control"
                        onChange={handleNewTripInfo} />
                </div>
            </fieldset>

            <fieldset>
                <div>
                    {tags.map(tag => (
                        <div className="tags" key={tag.id}>
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

