import { useState, useEffect } from 'react'

export const AddFavDest = ({ destByStatus, updateStatus, setFavDestinations }) => {

    const [tripDest, setTripDest] = useState([])

    const [newFavDestination, setNewFavDestinations] = useState([{
        location: '',
        state: '',
        latitude: '',
        longitude: '',
        tips: '',
        destination_status: 0
    }])

    useEffect(() => {
        destByStatus(3).then((destArray) => {
            setTripDest(destArray)
        })
    }, [])

    // const handleAddStatus = () => {
        // const destinationId = parseInt(tripDest.destinationId)
        // const tripId = parseInt(tripDest.tripId)
        // const statusId = parseInt(tripDest.statusId)

        // const data = {
        //     destination: destinationId,
        //     trip: tripId,
        //     status: 4
        // }

    //     updateStatus(data)
    //         .then(() => {
    //             window.location.reload()
    //         })
    // }

    return (<>
        <fieldset>
            <div className="form-group">
                <select
                    name="tripDestinationId"
                    className="input"
                    value={tripDest.destinationId}

                    onChange={(event) => {
                        const copy = { ...newFavDestination }
                        copy.destinationId = parseInt(event.target.value)
                        setNewFavDestinations(copy)
                    }}

                >
                    <option value="0">Any locations you want to add to your favorites?</option>
                    {tripDest.map(t => (
                        <option
                            key={`tripdestination--${t.id}`}
                            value={t.id}>
                            {t.location}
                        </option>
                    ))}
                </select>

                <button
                    type="button"
                    // onClick={handleAddStatus}
                    className="button is-small"
                // onClick={evt => {
                //     evt.preventDefault()

                //     const statusUpdate = {
                //         trip: tripDest.tripId,
                //         destination: tripDest.destinationId,
                //         status: 4
                //     }

                //     updateStatus(statusUpdate)

                // }}
                >Publish
                </button>
            </div>
        </fieldset>
    </>)
}