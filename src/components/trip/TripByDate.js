import "./Trip.css"

export const TripByDate = ({ setFilteredTrips, upcomingTrips, trips, pastTrips }) => {

    return (<div className="filterMyTrips">
        <button className="button is-small filterButton" onClick={() => setFilteredTrips(pastTrips)}>Past</button>
        <button className="button is-small filterButton" onClick={() => setFilteredTrips(upcomingTrips)}>Upcoming</button>
        <button className="button is-small filterButton" onClick={() => setFilteredTrips(trips)}>All</button>
    </div>)
}