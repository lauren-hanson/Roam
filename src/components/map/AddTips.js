export const AddTips = ({ updateDestination, favDestinations, id }) => {

    const handleAddTips = () => {

        const data = {
            // destination_id: selectedDestination,
            ...favDestinations,
            tips: ""
        }

        updateDestination(id, data)
            // setRefresh(!refresh)
            .then(() => {
                window.location.reload()
            })
    }

    return (
        <>
            <textarea
                placeholder="Any tips?"
            />
            <button
                onClick={handleAddTips}
                class='button is-small'>+</button>
        </>
    )
}   