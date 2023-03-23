import { useEffect, useState } from "react"
import { useNavigate, Link, useParams } from "react-router-dom"
import { getMyTrips, getUpcomingTrips, getPastTrips } from "../../managers/TripManager"
import { TripByDate } from "./TripByDate"
import "./Trip.css"

export const MyTripList = ({ token }) => {
    const { tripId } = useParams()
    const tokenInt = parseInt(token)
    const navigate = useNavigate()
    const [trips, setMyTrips] = useState([])
    const [myTrips, setFilteredTrips] = useState(trips)
    const [upcomingTrips, setUpcomingTrips] = useState([])
    const [pastTrips, setPastTrips] = useState(false)


    useEffect(() => {
        getUpcomingTrips(tripId).then((tripData) => setUpcomingTrips(tripData))
        getPastTrips(tripId).then((tripData) => setPastTrips(tripData))

    }, [])

    useEffect(() => {
        getMyTrips(tokenInt).then((tripData) => setMyTrips(tripData))
    }, [tripId, tokenInt]
    )

    useEffect(() => {
        setFilteredTrips(trips)
    }, [trips])

    return <>
        <section className="goBack">
            <div className="topButton"><button className="button is-small" onClick={() => navigate(`/trips/newtrip`)}>+</button>
            <div className="buttonLabel">New Trip</div></div>
        </section>
            <br></br>
            <h2 className="tripHeader">My Trips</h2>


            <TripByDate
                setFilteredTrips={setFilteredTrips} tripId={tripId} upcomingTrips={upcomingTrips} trips={trips} pastTrips={pastTrips} />


            <div className="myTripList">
                {myTrips.map((trip) => (
                    <div key={`trip--${trip.id}`} className="tripBox" >
                        <Link
                            style={{ textDecoration: "none", color: "inherit" }}
                            to={`/trips/${trip.id}`}
                            className="hover"
                        >
                            <div className="myTripHome">
                                <img src={trip.image_url} alt="Trip Image" className="tripBoxImage" />
                                <div class="centered">{trip.title}</div>
                            </div>
                        </Link>

                    </div>))}
            </div>
    </>

}

