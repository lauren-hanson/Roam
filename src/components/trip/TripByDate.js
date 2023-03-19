
export const TripByDate = ({ setFilteredTrips, upcomingTrips, trips, pastTrips }) => {

    return (<>
        <button className="button" onClick={() => setFilteredTrips(trips)}>All</button>
        <button className="button" onClick={() => setFilteredTrips(pastTrips)}>Past</button>
        <button className="button" onClick={() => setFilteredTrips(upcomingTrips)}>Upcoming</button>
    </>)
}