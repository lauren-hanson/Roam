import { useEffect, useState } from "react";

export const TripSearch = ({ searchTerms, setSearchTerms, getSearchedTrips, trips }) => {

    const [filteredTrips, setFilteredTrips] = useState([])

    useEffect(() => {
        setFilteredTrips(trips)
    }, [])

    const handleKeypress = (e) => {
        //it triggers by pressing the enter key
        if (e.keyCode === 13) {
            handleSubmit()
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        getSearchedTrips(`${searchTerms}`).then((data) => setFilteredTrips(data))
        setSearchTerms("Search Trips by Keyword")
        document.getElementById("search").value = ""
    }

    return (
        <>
            <section className="posts__buttons">
                <section className="posts__filters">
                    <form>
                        <input
                            type="textfield"
                            placeholder={searchTerms}
                            id="search"
                            onChange={(e) => setSearchTerms(e.target.value)}
                            onKeyUp={handleKeypress}
                        ></input>
                        <button className="button is-small" type="submit" onClick={handleSubmit}>
                            Go
                        </button>
                        <button className="button is-small" onClick={() => setFilteredTrips(trips)}>View All</button>
                    </form>
                </section>
            </section>
        </>
    )
}