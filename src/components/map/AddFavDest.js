import { useState, useEffect } from 'react'

export const AddFavDest = ({ destByStatus, updateStatus, trips, setFavDestinations }) => {

    const [tripDest, setTripDest] = useState([])

    const [newFavDestination, setNewFavDestinations] = useState([{
        destination: {
            location: "",
            stateId: 0,
            latitude: 0,
            longitude: 0,
            status: 0
        }
    }])

    useEffect(() => {
        destByStatus(3).then((destArray) => {
            setTripDest(destArray)
        })

    }, [])

    const handleAddStatus = () => {
        const destinationId = parseInt(newFavDestination.destinationId)
        const stateId = parseInt(newFavDestination.stateId)

        const data = {
            location: newFavDestination.name,
            state: stateId,
            longitude: newFavDestination.longitude,
            latitude: newFavDestination.latitude,
            status: 4
        }

        updateStatus(destinationId, data)
            .then(() => {
                window.location.reload()
            })
            .catch((error) => {
                console.error(error)
            })
    }

    return (<>
        <fieldset>
            <div className="form-group">
                <select
                    name="destinationId"
                    className="input"
                    value={newFavDestination.destination}
                    onChange={(event) => {
                        const copy = { ...newFavDestination }
                        copy.destinationId = parseInt(event.target.value)
                        setFavDestinations(copy)
                    }}
                >
                    <option value="0">Any locations you want to save?</option>
                    {tripDest.map(t => (
                        <option
                            key={`trip--${t.id}`}
                            value={t.id}>
                            {t.destination.location}
                        </option>
                    ))}
                </select>
                <button
                    type="button"
                    onClick={handleAddStatus}
                    className="button is-link is-rounded is-small">Publish</button>
            </div>
        </fieldset>
    </>)
}