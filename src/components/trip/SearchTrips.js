
export const SearchTrips = ({ searchTerms, setSearchTerms, handleSubmit, setFilteredTrips, handleKeypress, trips, myTrips }) => {
console.log(setFilteredTrips)
    return (<>
        <section className="trips_filter">
            <form>
                <input
                    type="textfield"
                    placeholder={searchTerms}
                    id="search"
                    onChange={(e) => setSearchTerms(e.target.value)}
                    onKeyUp={handleKeypress}
                ></input>
                <button className="button" type="submit" onClick={handleSubmit}>
                    Go
                </button>
                <button className="button" onClick={() => setFilteredTrips(myTrips)}>View All</button>
            </form>
        </section>
    </>)
}