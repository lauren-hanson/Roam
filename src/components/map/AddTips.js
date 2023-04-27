import { useState, useEffect } from "react"

export const AddTips = ({ updateDestination, favDestinations }) => {

    const [addTips, setTips] = useState(
        {
            tips: ""
        }
    )

    // useEffect(() => {
    //     setTips
    // })

    const handleAddTips = (event) => {
        const copy = { ...addTips }
        copy[event.target.name] = event.target.value;
        setTips(copy);
    }

    return (
        <>
            <input
                type="text"
                name="tips"
                required
                autoFocus
                defaultValue={addTips.tips}
                className="form-control"
                placeholder="Any tips?"
            // onChange={handleAddTips}
            />
            <button
                type="saveTip"
                onClick={evt => {
                    evt.preventDefault()

                    const tipToAdd = {
                        tips: addTips.tips
                    }

                    updateDestination(favDestinations.id, tipToAdd)
                    // .then(() => navigate(`/trips/${currentTrip.id}`))
                }}

                class='button is-small'>+</button>
        </>
    )
}   