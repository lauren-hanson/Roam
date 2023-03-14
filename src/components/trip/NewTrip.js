import { useState, useEffect, useRef } from "react"
import { useNavigate } from 'react-router-dom'
import { addNewTrip } from "../../managers/TripManager"
import { getTags } from "../../managers/TagManager"
import "./Trip.css"


export const NewTrip = ({ token }) => {

    const [trip, setNewTrip] = useState({})
    const [tags, setTags] = useState([])
    const [tagsToAPI, setTagsToAPI] = useState([])

    const navigate = useNavigate()

    const handleNewPostInfo = (event) => {
        const newTrip = Object.assign({}, trip)
        newTrip[event.target.name] = event.target.value
        setNewTrip(newTrip)
    }

    useEffect(
        () => {
            getTags().then((tagData) => setTags(tagData))
        }, [])

    const publishNewTrip = () => {

        addNewTrip({
            weather: trip.weather,
            start_date: trip.start_date,
            end_date: trip.end_date,
            notes: trip.notes,
            user_id: parseInt(token)
        })
            .then((res) => res.json())
            // .then((res) => {
            //     let APITags = tagsToAPI.map(tag => {
            //         return {
            //             tag_id: tag,
            //             post_id: res.id
            //         }
            //     })
            //     Promise.all(APITags.map(tag => {
            //         tagPromise(tag)
            //     }))
            // })
            .then(() => navigate("/trips"))
    }
    return (<>
        <h2>Tell us about your next trip...</h2>
        <form className="addNewTripForm">
            <fieldset>
                <div>
                    <label for="destination">Where are you going?</label>
                    <input
                        type="text"
                        name="city"
                        required autoFocus
                        className="cityInput"
                        placeholder="City"
                        onChange={handleNewPostInfo} />
                    <input
                        type="text"
                        name="state"
                        required autoFocus
                        className="stateInput"
                        placeholder="State"
                        onChange={handleNewPostInfo} />
                </div>
            </fieldset>
            <fieldset>
                <div>
                    <label for="startDate">When do you plan on leaving?</label>
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
                    <label for="endDate">When are you coming home?</label>
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
                    <label for="destinations">What stops would you like to make?</label>
                    <input
                        type="text"
                        name="city"
                        required autoFocus
                        className="cityInput"
                        placeholder="City"
                        onChange={handleNewPostInfo} />
                    <input
                        type="text"
                        name="state"
                        required autoFocus
                        className="stateInput"
                        placeholder="State"
                        onChange={handleNewPostInfo} />

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
                    <label for="public">Would you like this trip to be public for your followers?</label>
                    <input
                        type="radio"
                        name="public"
                        required autoFocus
                        className="publicInput"
                        onChange={handleNewPostInfo} />

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

