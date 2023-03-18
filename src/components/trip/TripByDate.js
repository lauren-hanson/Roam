
export const TripByDate = ({setFilteredTrips, upcomingTrips, trips}) => {

    return (<>
        <button className="button is-small is-rounded" onClick={() => setFilteredTrips(upcomingTrips)}>View Upcoming</button>
        <button className="button is-small is-rounded" onClick={() => setFilteredTrips(trips)}>View All</button>
    </>)
}