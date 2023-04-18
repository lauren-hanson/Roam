import { useState, useEffect } from 'react'

export const AddFavDest = ({ updateDestinationStatus, notFavDests, favDestinations, setFavDestinations }) => {
    const [refresh, setRefresh] = useState(false)
    const [selectedDestination, setSelectedDestination] = useState(null)

    const handleAddStatus = () => {

        if (selectedDestination === null) {
            console.log('You forgot to select a destination.')
        }

        const data = {
            // destination_id: selectedDestination,
            ...selectedDestination,
            destination_status: 4
        }

        updateDestinationStatus(selectedDestination.id, data)
            // setRefresh(!refresh)
            .then(() => {
                window.location.reload()
            })
    }

    return (<>
        <fieldset>
            <div className="form-group">
                <select
                    name="tripDestinationId"
                    className="input"
                    value={selectedDestination ? selectedDestination.id : '0'}
                    onChange={(event) => {
                        const destinationId = parseInt(event.target.value)
                        const selected = notFavDests.find((dest) => dest.id === destinationId)
                        setSelectedDestination(selected)
                    }}
                >
                    <option value="0">Any locations you want to add to your favorites?</option>
                    {notFavDests.map((dest) => (
                        <option key={dest.id} value={dest.id}>
                            {dest.location}
                        </option>
                    ))}
                </select>
                <button
                    type="button"
                    onClick={handleAddStatus}
                    className="button is-small"
                >Publish
                </button>
            </div>
        </fieldset>
    </>)
}