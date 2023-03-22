import { useState, useEffect, useRef } from "react"
import { useNavigate } from 'react-router-dom'
import { addNewTrip, addTripTag, addTripDestination } from "../../managers/TripManager"
import { getTags, addNewTag } from "../../managers/TagManager"
import "./Trip.css"

export const NewTrip = ({ token }) => {
    const navigate = useNavigate()

    const [trip, setNewTrip] = useState({
        title: "",
        weather: "",
        image_url: "",
        start_date: "",
        end_date: "",
        notes: "",
        user_id: parseInt(token),
        tag: [],
        public: 0,
        complete: 0
    })

    const [tags, setTags] = useState([])
    const [tagsToAPI, setTagsToAPI] = useState([])

    useEffect(
        () => {
            getTags().then((tagData) => setTags(tagData))
        }, [])

    const handleNewTripInfo = (event) => {
        const newTrip = Object.assign({}, trip)
        newTrip[event.target.name] = event.target.value
        setNewTrip(newTrip)
    }

    const publishNewTrip = () => {

        const newTrip = {
            startDate: trip.start_date,
            endDate: trip.end_date,
            notes: trip.notes,
            image_url: trip.image_url,
            title: trip.title,
            user_id: parseInt(token),
            public: trip.public,
            tag: tagsToAPI,
            traveler: trip.traveler,
            complete: trip.complete

        }
        addNewTrip(newTrip)
            .then((trip) => {
                const tripTags = tagsToAPI.map((tag) => ({ tag_id: tag, trip_id: trip.id }))

                Promise.all([addNewTag(tagsToAPI), addTripTag(tripTags)])
                    .then(() => {
                        navigate(`/trips/${trip.id}`)
                    })
            })
    }

    return (
        <div className="newTripForm">
            <h2 className="tripSubtitle">Tell us about your next trip...</h2>
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
                <br></br>
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
                <br></br>
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
                <br></br>
                <fieldset>
                    <div className="tags">
                        {tags.map(tag => (
                            <div className="tag" key={tag.id}>
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
                <br></br>
                <fieldset>
                    <div>
                        <textarea
                            type="textbox"
                            rows="15"
                            cols="60"
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
                <br></br>
                <fieldset>
                    <div>
                        <label htmlFor="public">Would you like this trip to be public?</label>
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
                                        setNewTrip(copy)
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
                                        setNewTrip(copy)
                                    }
                                }

                            />
                            <label className="radioLabel" >No</label>

                        </div>
                    </div>
                </fieldset>
                <br></br>
                <button type="save" className="button saveTripForm"
                    onClick={evt => {
                        evt.preventDefault()
                        publishNewTrip()
                    }}
                >
                    Save Trip
                </button>

            </form>
        </div>

    )
}

