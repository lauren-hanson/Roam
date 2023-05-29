import { useEffect, useState } from "react";
import { getTags } from "../../managers/TagManager"
import { getTripByTag } from "../../managers/TripManager"
import "./Trip.css"

export const TripByTag = ({ setSelectedTripByTag }) => {
    const [tags, setTags] = useState([])
    const [tripByTags, setTripByTags] = useState(0)

    useEffect(
        () => {
            getTags().then((tagData) => setTags(tagData))
            getTripByTag(0).then((tByT) => setTripByTags(tByT))
        }, [])

    return (
        <><section className="posts__dropdown">
            <label htmlFor="tags">Search By Tag</label><br></br>
            <select onChange={(event) => { setSelectedTripByTag(parseInt(event.target.value)) }}>
                <option value="0" name="tag_id" className="form-control" >View All</option>
                {tags.map(tag => (
                    <option key={`tag--${tag.id}`} value={tag.id}>
                        {tag.type}
                    </option>
                )
                )}
            </select>
            </section>
        </>
    )
}