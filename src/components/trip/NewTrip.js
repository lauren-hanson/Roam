import { useState, useEffect, useRef } from "react"
import { useNavigate } from 'react-router-dom'
import { addNewTrip, addTripDestination } from "../../managers/TripManager"
import { getDestinations, addDestination } from "../../managers/DestinationManager"
import { getTags } from "../../managers/TagManager"
import { addNewTag, getPostTags } from "../../managers/TagManager"
// import { getStates } from "../../managers/StateManager"
import "./Trip.css"


export const NewTrip = ({ token }) => {

    const [trip, setNewTrip] = useState({})
    const [tags, setTags] = useState([])
    const [tagsToAPI, setTagsToAPI] = useState([])
    const [destinations, setDestinations] = useState([])
    const [newDestination, setNewDestination] = useState({})
    // const [states, setStates] = useState([])

    const navigate = useNavigate()

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


    useEffect(
        () => {
            getTags().then((tagData) => setTags(tagData))
            getDestinations().then((destinationData) => setDestinations(destinationData))
            // getStates().then((stateData) => setStates(stateData))
        }, [])

    const tagPromise = (body) => {
        return fetch(`http://localhost:8000/triptags`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        })
    }

    const destinationPromise = (body) => {
        return fetch(`http://localhost:8000/tripdestinations`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        })
    }

    const publishNewTrip = () => {

        const destinationId = parseInt(trip.destinationId)

        addNewTrip({
            startDate: trip.startDate,
            endDate: trip.endDate,
            notes: trip.notes,
            user_id: parseInt(token),
            public: false,
            tag: tagsToAPI,
            destination: destinationId
        })

            .then((res) => res.json())
            .then((res) => {
                let APITags = tagsToAPI.map(tag => {
                    return {
                        tag_id: tag,
                        trip_id: res.id
                    }
                })
                Promise.all(APITags.map(tag => {
                    tagPromise(tag)
                }))
            })

            // .then((res) => {
            //     let APIDestinations = newDestination.map(destination => {
            //         return {
            //             destination_id: destination,
            //             trip_id: res.id, 

            //         }
            //     })
            //     Promise.all(APIDestinations.map(destination => {
            //         destinationPromise(destination)
            //     }))
            // })

            .then(() => navigate("/"))
    }

    const createNewDestination = (event) => {
        event.preventDefault()
        addDestination(newDestination)
            .then((response) => {
                const newDestination = Object.assign({}, trip)
                newDestination.destinationId = response.id
                setNewDestination(newDestination)
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

                {/* <div className="state">
                    <select
                        name="stateId"
                        className="stateInput"
                        value={trip.stateId}
                        onChange={(state) => {
                            const copy = { ...trip }
                            copy.stateId = parseInt(state.target.value)
                            handleNewTripInfo(copy)
                        }}
                    >
                        <option value="0">State Select</option>
                        {states.map((state) => {
                            return <option
                                key={`state--${state.id}`}
                                value={state.id}
                            >{state.label}</option>
                        })}
                    </select>
                </div> */}
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
            {/* <fieldset>
                <div>
                    <label htmlFor="destinations">What stop would you like to make?</label>
                    <br></br>
                    <input
                        type="text"
                        name="city"
                        required autoFocus
                        className="cityInput"
                        placeholder="City"
                        // onChange={setNewTrip} 
                        />
                </div>
                <div className="state">
                    <select
                        name="stateId"
                        className="stateInput"
                        value={trip.stateId}
                        // onChange={(trip) => {
                        //     const copy = { ...trip }
                        //     copy.stateId = parseInt(trip.target.value)
                        //     setNewDestination(copy)
                        // }}
                    >
                        <option value="0">State Select</option>
                        {states.map((state) => {
                            return <option
                                key={`state--${state.id}`}
                                value={state.id}
                            >{state.label}</option>
                        })}

                    </select>
                </div>
                <button>Add Stop</button>
            </fieldset> */}
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

