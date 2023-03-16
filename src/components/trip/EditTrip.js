import { useState, useEffect, useRef } from "react"
import { useNavigate, useParams } from 'react-router-dom'
import { updateTrip, getSingleTrip } from "../../managers/TripManager"
import { getDestinations, addDestination } from "../../managers/DestinationManager"
import { getTags } from "../../managers/TagManager"
import "./Trip.css"

export const EditTrip = ({ token }) => {

    const navigate = useNavigate();
    const { tripId } = useParams()
    const [tags, setTags] = useState([]);
    const [tripTags, setTripTags] = useState(new Set())
    const [currentTrip, setCurrentTrip] = useState({
        title: "",
        weather: "",
        startDate: "",
        endDate: "",
        notes: "",
        user_id: parseInt(token),
        tag: [],
        destination: [],
        public: 0
    })

    const tagArr = (tagId) => {
        let copy = new Set(tripTags)
        copy.has(tagId) ? copy.delete(tagId) : copy.add(tagId)
        setTripTags(copy)
    }

    useEffect(() => {
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

    const handleNewTripInfo = (event) => {
        const copy = { ...currentTrip }
        copy[event.target.name] = event.target.value;
        setCurrentTrip(copy);
    }


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
                        name="startDate"
                        required
                        autoFocus
                        defaultValue={currentTrip.startDate}
                        className="form-control"
                        placeholder="StartDate"
                        onChange={handleNewTripInfo}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div>
                    <label>End Date:</label>
                    <input
                        type="date"
                        name="endDate"
                        required
                        autoFocus
                        defaultValue={currentTrip.endDate}
                        className="form-control"
                        placeholder="EndDate"
                        onChange={handleNewTripInfo}
                    />
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
                            className="radioButton"
                            defaultValue={currentTrip.public}
                            name="public"
                        // onClick={
                        //     () => {
                        //         const copy = { ...trip }
                        //         copy.public = true
                        //         handleNewTripInfo(copy)
                        //     }
                        // }
                        />
                        <label className="radioLabel">Yes</label>

                        <input

                            type="radio"
                            className="radioButton"
                            defaultValue={currentTrip.public}
                            name="public"
                        // onClick={
                        //     () => {
                        //         const copy = { ...trip }
                        //         copy.musicianRequest = false
                        //         handleNewTripInfo(copy)
                        //     }
                        // }

                        />
                        <label className="radioLabel" >No</label>

                    </div>
                </div>
            </fieldset>


            <button
                type="saveTrip"
                onClick={evt => {
                    evt.preventDefault()

                    const updateTrip = {
                        title: currentTrip.title,
                        weather: currentTrip.weather,
                        startDate: currentTrip.startDate,
                        endDate: currentTrip.endDate,
                        notes: currentTrip.notes,
                        user_id: parseInt(token),
                        tag: Array.from(tripTags),
                        public: 1
                    }

                    updateTrip(tripId, updateTrip)
                        .then(() => navigate("/trips/mytrips"))
                }}
                className="button is-link is-rounded is-small">Publish</button>
        </form>

    </>
    )
}
