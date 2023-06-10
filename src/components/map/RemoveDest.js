import { useState } from 'react'

export const RemoveDest = ({updateDestination, notFavDests}) => {

    const [refresh, setRefresh] = useState(false)
    const [selectedDestination, setSelectedDestination] = useState(null)

    const handleDeleteStatus = () => {

        if (selectedDestination === null) {
            console.log('You forgot to select a destination.')
        }

        const data = {
            // destination_id: selectedDestination,
            ...selectedDestination,
            destination_status: 3
        }

        updateDestination(selectedDestination.id, data)
            setRefresh(!refresh)
            .then(() => {
                window.location.reload()
            })
    }

    return (<>
        <button className="button is-small" >delete.</button>
    </>)
}