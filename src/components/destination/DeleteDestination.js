
export const DeleteDestination = ({ deleteDestination, FaTrashAlt, getSingleTrip, tripId, setCurrentTrip, refresh, setRefresh, currentTrip }) => {

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
            <div>
                {currentTrip?.destination.map((destination, index) => (
                    <div key={index}>
                        <li>{destination.location}, {destination.state}
                            {deleteButton(destination.id)}</li>
                    </div>
                ))}

            </div>
        </>
    )
}