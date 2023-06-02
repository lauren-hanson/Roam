
import { useEffect, useState } from "react";
import { getTags } from "../../managers/TagManager"
import { getTripByTag } from "../../managers/TripManager"
import "./Trip.css"

export const TripByTag = ({ setSelectedTripByTag, tagChoice, trips }) => {
    const [tags, setTags] = useState([])
    const [filteredTrips, setFilteredTrips] = useState([])

    useEffect(() => {
        getTags().then((tagData) => setTags(tagData));
    }, [])

    useEffect(() => {
        if (tagChoice === 0) {
            setFilteredTrips(trips);
        } else {
            const filteredCopy = trips.filter(
                (trip) => trip.tag.some((t) => t?.id === tagChoice)
            );
            setFilteredTrips(filteredCopy);
        }
    }, [tagChoice, trips]);

    return (
        <>
            <section className="tagsDropdown">
                <label htmlFor="tags">Search By Tags</label><br></br>
                <select onChange={(event) => setSelectedTripByTag(parseInt(event.target.value))}>
                    <option value="0" name="tag_id" className="form-control">View All</option>
                    {tags.map((tag) => (
                        <option key={`tag--${tag.id}`} value={tag.id}>
                            {tag.type}
                        </option>
                    ))}
                </select>
            </section>
        </>
    )
}
