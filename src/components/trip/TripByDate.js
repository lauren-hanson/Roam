import { useEffect, useState } from "react"
import { getUpcomingTrips } from "../../managers/TripManager"


export const TripByDate = ({setFilteredTrips, tripId, myTrips}) => {

    const [upcomingTrips, setUpcomingTrips] = useState([])

    useEffect(() => {
        getUpcomingTrips(tripId).then((tripData) => setUpcomingTrips(tripData))
    }, [, tripId])

    return (<>
        <button className="button is-small is-rounded" onClick={() => setFilteredTrips(upcomingTrips)}>View Upcoming</button>
        <button className="button is-small is-rounded" onClick={() => setFilteredTrips(myTrips)}>View All</button>
    </>)
}