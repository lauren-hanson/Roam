import { useEffect, useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { getMyTrips } from "../../managers/TripManager"
import { getFinalDestination } from "../../managers/DestinationManager"
import { TripDetails } from "./TripDetails"
import "./Trip.css"

export const MyTrips = ({ token }) => {

    const [myTrips, setMyTrips] = useState([])
    const [finalDestination, setFinalDestination] = useState([])

    const tokenInt = parseInt(token)
    const navigate = useNavigate()

    useEffect(() => {
        getMyTrips(tokenInt).then((tripData) => setMyTrips(tripData))
        getFinalDestination(tokenInt).then((finalData) => setFinalDestination(finalData))
    }, [])



    return <>
        <h2 className="tripHeader">My Trips</h2>
       
        <section className="myTripList">
            <Link
                style={{ textDecoration: "none", color: "inherit" }}
                to={`/${myTrips?.id}`}
                className="hover"
            >
                <section className="myTripList">
                    {
                        myTrips.map((trip) => (
                            <>
                                < div key={trip.id} className="myTrip" >
                                    <h2>STATE</h2>
                                    <p>{trip.start_date} - {trip.end_date}</p>

                                    <h5>A little about the weather...</h5>
                                    <p>{trip.weather}</p>
                                    <div className="destinationList">
                                        <h5>Stops Along the way...</h5>
                                        {trip.destination.map((d) => (
                                            <li>{d.location}</li>))}
                                    </div>
                                    <h5>Highlights...</h5>
                                    <div>{trip.notes}</div>

                                    <div className="tagList">
                                        {trip.tag.map((t) => (
                                            <ol>{t.type}</ol>))}
                                    </div>

                                    <div className="buttonContainer">
                                        <button>Complete?</button>
                                        <button>Edit</button>
                                        <button>Delete</button>
                                    </div>
                                </div>
                            </>
                        ))
                    }
                </section>
            </Link>
        </section>
    </>

}

