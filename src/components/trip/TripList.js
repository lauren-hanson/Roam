import { useEffect, useState } from "react"
// import { useNavigate } from "react-router-dom"
import { getTrips } from "../../managers/TripManager"

export const TripList = () => {

    const [trips, setTrips] = useState([])
    
    useEffect(() => {
        getTrips()
        .then((tripData) => setTrips(tripData))
    }, [])

    return <>
    <section className="trip__array">
        <h2>My Trips</h2>
        {
            trips.map((trip) => (
            <div key={trip.id}>
                <p>{trip.start_date} - {trip.end_date}</p>
                <div>{trip.notes}</div>
                    
                    </div>
                ))
        }
    </section>
    </>

}

