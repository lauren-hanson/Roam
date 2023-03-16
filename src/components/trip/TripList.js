import { useEffect, useState } from "react"
import { useNavigate, Link, useParams } from "react-router-dom"
import { getFinalDestination } from "../../managers/DestinationManager"
import { getMyTrips } from "../../managers/TripManager"
import "./Trip.css"

export const TripList = ({ trips, token }) => {

    const [myTrips, setMyTrips] = useState([])
    const tokenInt = parseInt(token)
    const { tripId } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        getMyTrips(tokenInt).then((tripData) => setMyTrips(tripData))
    }, [, tripId])

    return <>
        <section className="trip__array">
            <div><button onClick={() => navigate(`/trips/newtrip`)}>+</button>New Trip</div>
            <h2>My Trips</h2>
            {
                myTrips.map((trip) => (
                    <>
                        <Link
                            style={{ textDecoration: "none", color: "inherit" }}
                            to={`/trips/${trip.id}`}
                            className="hover"
                        >
                            <div key={trip.id} className="myTripHome">
                                <p>{trip.title}</p>
                            </div>
                        </Link>

                    </>))
            }
        </section>
    </>

}

