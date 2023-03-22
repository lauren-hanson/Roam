import "./Trip.css"

export const TripByDate = ({ setFilteredTrips, upcomingTrips, trips, pastTrips }) => {

    return (<div className="filterMyTrips">
        <button className="button" onClick={() => setFilteredTrips(pastTrips)}>Past</button>
        <button className="button" onClick={() => setFilteredTrips(upcomingTrips)}>Upcoming</button>
        <button className="button" onClick={() => setFilteredTrips(trips)}>All</button>
    </div>)
}