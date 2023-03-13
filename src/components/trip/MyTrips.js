import { useEffect, useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { getMyTrips } from "../../managers/TripManager"
import { TripDetails } from "./TripDetails"
import "./Trip.css"

export const MyTrips = ({ token }) => {

    const [myTrips, setMyTrips] = useState([])
    const tokenInt = parseInt(token)
    const navigate = useNavigate()

    useEffect(() => {
        getMyTrips(tokenInt)
            .then((tripData) => setMyTrips(tripData))
    }, [])

    return <>
        <h2 className="tripHeader">My Trips</h2>
        <div><button onClick={() => navigate(`/trips/newtrip`)}>+</button>New Trip</div>
        <section className="myTripList">
            <Link
                style={{ textDecoration: "none", color: "inherit" }}
                to={`/trips/${myTrips?.id}`}
                className="hover"
            ><TripDetails token={token} trips={myTrips} /></Link>
        </section>
    </>

}

