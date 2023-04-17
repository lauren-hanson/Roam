import { useState, useEffect } from "react"
import { useNavigate, useParams } from 'react-router-dom'
import { updateTrip, getSingleTrip, getDestinationByTrip } from "../../managers/TripManager"
import { getTags } from "../../managers/TagManager"
import "./Trip.css"
import { getStatus } from "../../managers/StatusManager"
import { AddTripDestination } from "../destination/AddTripDestination"

export const EditTrip = ({ token }) => {

    const navigate = useNavigate()

    const { tripId } = useParams()
    const [tags, setTags] = useState([])
    const [status, setStatus] = useState([])
    const [tripTags, setTripTags] = useState(new Set())
    const [trips, setTrips] = useState([])
    const [destinations, setDestinations] = useState([])

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
            latitude: 0,
            longitude: 0,
            tips: "",
            destination_status: 0
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
        getStatus().then(statusInfo => setStatus(statusInfo))
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

    const handleNewTripInfo = (event) => {
        const copy = { ...currentTrip }
        copy[event.target.name] = event.target.value;
        setCurrentTrip(copy);
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
                        cols="50"
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
            {/* <AddTripDestination tripId={tripId} currentTrip={currentTrip} setCurrentTrip/> */}
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

            <div>
                <AddTripDestination tripId={tripId} currentTrip={currentTrip} setCurrentTrip={setCurrentTrip} status={status} />
            </div>

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
        </form >

    </>
    )
}
