export const AddTripTag = ({currentTrip, tripTags, setTripTags, tags}) => {

    const tagArr = (tagId) => {
        let copy = new Set(tripTags)
        copy.has(tagId) ? copy.delete(tagId) : copy.add(tagId)
        setTripTags(copy)
    }
    
    return (
        <>
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
        </>
    )
}