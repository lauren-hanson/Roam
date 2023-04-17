import { useState, useEffect, useRef } from "react"
import { addDestination, deleteDestination } from "../../managers/DestinationManager"
import { getSingleTrip, addTripDestination } from "../../managers/TripManager"
import { getStatus } from "../../managers/StatusManager"
import { FaTrashAlt } from "react-icons/fa";

export const AddTripDestination = ({ tripId, currentTrip, setCurrentTrip, status }) => {

    const locationRef = useRef()
    const stateRef = useRef()
    const latRef = useRef()
    const longRef = useRef()
    const tipsRef = useRef()
    const destStatusRef = useRef()
    const [refresh, setRefresh] = useState(false)
    const [destinations, setDestinations] = useState([])

    const [newDestination, setNewDestination] = useState({
        id: 0,
        location: "",
        state: "",
        latitude: 0,
        longitude: 0,
        tips: "",
        destination_status: 0
    })

    const handleNewDestinationInfo = (event) => {
        const startDestination = Object.assign({}, newDestination)
        startDestination[event.target.name] = event.target.value
        setNewDestination(startDestination)
    }

    const parseLatLong = (event) => {
        const latLong = Object.assign({}, newDestination)
        latLong[event.target.name] = parseFloat(event.target.value)
        setNewDestination(latLong)
    }

    const parseDestStatus = (event) => {
        const destination_status = Object.assign({}, newDestination)
        destination_status[event.target.name] = parseInt(event.target.value)
        setNewDestination(destination_status)
    }

    const createNewDestination = (event) => {
        event.preventDefault()

        const newDestination = {
            location: locationRef.current.value,
            state: stateRef.current.value,
            latitude: parseFloat(latRef.current.value),
            longitude: parseFloat(longRef.current.value),
            tips: tipsRef.current.value,
            destination_status: parseInt(destStatusRef.current.value)
        }
        setDestinations([...destinations, newDestination])
        locationRef.current.value = ''
        stateRef.current.value = ''
        latRef.current.value = ''
        longRef.current.value = ''
        tipsRef.current.value = ''
        destStatusRef.current.value = ''

        addDestination(newDestination)
            .then((destination) => {
                // create the new association object
                const newTripDestination = {
                    destinationId: destination.id,
                    tripId: parseInt(tripId)
                }

                addTripDestination(newTripDestination)
                    .then(() => {
                        getSingleTrip(tripId).then((data) => setCurrentTrip(data))
                    })
            })
    }

    const deleteButton = (id) => {
        return <FaTrashAlt className="deleteButton" onClick={() => {
            deleteDestination(id)
                .then(() => {
                    window.confirm(
                        "Do you want to delete this stop?"
                    )
                    getSingleTrip(tripId).then((data) => setCurrentTrip(data))
                    setRefresh(!refresh)
                })
        }
        }></FaTrashAlt>
    }

    return (
        <>
            <fieldset>
                <label className="tripLabel" htmlFor="destination">Stops along the way... </label>
                <div className="addDestinationContainer">
                    <br></br>
                    <div className="destinationInput">
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
                    </div>

                    <br></br>

                    <div>Do you want to add this to your map?</div>
                    <div className="destinationInput">
                        <input
                            type="text"
                            name="latitude"
                            ref={latRef}
                            required autoFocus
                            className="latInput"
                            placeholder="Latitude..."
                            onChange={parseLatLong}
                        />
                        <br></br>
                        <input
                            type="text"
                            name="longitude"
                            ref={longRef}
                            required autoFocus
                            className="longInput"
                            placeholder="Longitude..."
                            onChange={parseLatLong}
                        />
                    </div>
                    <br></br>
                    <div>Any tips and tricks?</div>
                    <div className="destinationInput">
                        <textarea
                            type="text"
                            rows="10"
                            cols="40"
                            name="tips"
                            ref={tipsRef}
                            required autoFocus
                            className="tipsInput"
                            placeholder="..."
                            onChange={handleNewDestinationInfo}
                        />
                    </div>
                    <div className="newStatusSelect">
                        <select
                            name="destination_status"
                            className="input"
                            ref={destStatusRef}
                            value={newDestination.destination_status}
                            onChange={parseDestStatus}
                        // onChange={(event) => {
                        //     const copy = { ...newDestination }
                        //     copy.statusId = parseInt(event.target.value)
                        //     setNewItem(copy)
                        // }}
                        >
                            <option value="0">Status Select</option>
                            {
                                status.map(s => (
                                    <option
                                        key={`status--${s.id}`}
                                        value={s.id}>
                                        {s.type}
                                    </option>
                                ))
                            }
                        </select>
                    </div>




                    <button className="button is-small addDestinationButton"
                        onClick={createNewDestination}>
                        Add Destination
                    </button>
                </div>
                <br></br>
                <div>
                    {currentTrip?.destination.map((destination, index) => (
                        <div key={index}>
                            <li>{destination.location}, {destination.state}
                                {deleteButton(destination.id)}</li>
                        </div>
                    ))}

                </div>
            </fieldset>
        </>
    )
}