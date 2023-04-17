import { useState, useEffect } from 'react'

export const AddFavDest = ({ updateTripStatus, notFavDests }) => {

    const [selectedDestination, setSelectedDestination] = useState(null)

    const handleAddStatus = () => {

        if (selectedDestination === null) { 
            console.log('You forgot to select a destination.')
        }

        const data = {
            // destination_id: selectedDestination,
            location: selectedDestination.location,
            state: selectedDestination.state,
            latitude: selectedDestination.latitude,
            longitude: selectedDestination.longitude,
            tips: selectedDestination.tips,
            destination_status: 4
        }

        updateTripStatus(selectedDestination, data)
            // .then(() => {
            //     window.location.reload()
            // })
    }

    return (<>
        <fieldset>
            <div className="form-group">
                <select
                    name="tripDestinationId"
                    className="input"
                    value={selectedDestination}
                    onChange={(event) => {
                        const destinationId = parseInt(event.target.value)
                        setSelectedDestination(destinationId)
                    }}
                >
                    <option value="0">Any locations you want to add to your favorites?</option>
                    {notFavDests.map(t => (
                        <option
                            key={`t--${t.id}`}
                            value={t.id}>
                            {t.location}
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