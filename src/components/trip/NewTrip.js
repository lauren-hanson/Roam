import { useState, useEffect, useRef } from "react"
import { useNavigate } from 'react-router-dom'
import { addNewTrip } from "../../managers/TripManager"
import { getTags } from "../../managers/TagManager"
import { getStates } from "../../managers/StateManager"
import "./Trip.css"


export const NewTrip = ({ token }) => {

    const [trip, setNewTrip] = useState({})
    const [tags, setTags] = useState([])
    const [tagsToAPI, setTagsToAPI] = useState([])
    const [states, setStates] = useState([])

    const navigate = useNavigate()

    const handleNewPostInfo = (event) => {
        const newTrip = Object.assign({}, trip)
        newTrip[event.target.name] = event.target.value
        setNewTrip(newTrip)
    }

    useEffect(
        () => {
            getTags().then((tagData) => setTags(tagData))
            getStates().then((stateData) => setStates(stateData))
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

    const publishNewTrip = () => {

        addNewTrip({
            weather: trip.weather,
            start_date: trip.start_date,
            end_date: trip.end_date,
            notes: trip.notes,
            user_id: parseInt(token)
        })
            .then((res) => res.json())
            .then((res) => {
                let APITags = tagsToAPI.map(tag => {
                    return {
                        tag_id: tag,
                        post_id: res.id
                    }
                })
                Promise.all(APITags.map(tag => {
                    tagPromise(tag)
                }))
            })
            .then(() => navigate("/trips"))
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
                        name="city"
                        required autoFocus
                        className="cityInput"
                        placeholder="City Name..."
                        onChange={handleNewPostInfo} />
                </div>
            </fieldset>
            <fieldset>
                <div className="state">
                    <select
                        name="stateId"
                        className="stateInput"
                        value={trip.stateId}
                        onChange={(trip) => {
                            const copy = { ...trip }
                            copy.stateId = parseInt(trip.target.value)
                            setNewTrip(copy)
                        }}
                    >
                        <option value="0">State Select</option>
                        {states.map((state) => {
                            <option
                                key={`state--${state.id}`}
                                value={state.id}
                            >{state.label}</option>
                        })}

                    </select>
                </div>
            </fieldset>
            <fieldset>
                <div>
                    <label htmlFor="startDate">When do you plan on leaving?</label>
                    <input
                        type="date"
                        name="startDate"
                        required autoFocus
                        className="startDate"
                        onChange={handleNewPostInfo} />

                </div>
            </fieldset>
            <fieldset>
                <div>
                    <label htmlFor="endDate">When are you coming home?</label>
                    <input
                        type="date"
                        name="endDate"
                        required autoFocus
                        className="title-form-control"
                        onChange={handleNewPostInfo} />

                </div>
            </fieldset>
            <fieldset>
                <div>
                    <label htmlFor="destinations">What stop would you like to make?</label>
                    <br></br>
                    <input
                        type="text"
                        name="city"
                        required autoFocus
                        className="cityInput"
                        placeholder="City"
                        onChange={handleNewPostInfo} />
                </div>
            </fieldset>
            <fieldset>
                <div className="state">
                    <select
                        name="stateId"
                        className="stateInput"
                        value={trip.stateId}
                        onChange={(trip) => {
                            const copy = { ...trip }
                            copy.stateId = parseInt(trip.target.value)
                            setNewTrip(copy)
                        }}
                    >
                        <option value="0">State Select</option>
                        {states.map((state) => {
                            <option
                                key={`state--${state.id}`}
                                value={state.id}
                            >{state.label}</option>
                        })}

                    </select>
                </div>
            </fieldset>
            <fieldset>
                <div>
                    {tags.map(tag => (
                        <div className="tags">
                            <label className="tagLabel">
                                <option
                                    key={`tag--${tag.id}`}
                                    value={tag.id}
                                >
                                    {tag.type}
                                </option>
                            </label>
                            <input
                                name="tagId"
                                type="checkbox"
                                required autoFocus
                                className="form-control"
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
                        </div>
                    ))}

                </div>
            </fieldset>
            <fieldset>
                <div>
                    <label htmlFor="public">Would you like this trip to be public for your followers?</label>
                    <input
                        type="radio"
                        name="public"
                        required autoFocus
                        className="publicInput"
                        onChange={handleNewPostInfo} />
                    <label>Yes</label>
                    <input
                        type="radio"
                        name="public"
                        required autoFocus
                        className="publicInput"
                        onChange={handleNewPostInfo} />
                    <label>No</label>

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

