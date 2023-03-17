import { useEffect, useState } from "react"
import { useParams, Link, useNavigate } from "react-router-dom"
import { getSingleTrip, deleteTrip } from "../../managers/TripManager"
import { HumanDate } from "../utils/HumanDate";
import "./Trip.css"

export const TripDetails = ({ token }) => {

    const navigate = useNavigate()
    const tokenInt = parseInt(token)
    const [trip, setTrip] = useState({
        destination: [],
        tag: []
    })

    const { tripId } = useParams()

    useEffect(() => {
        getSingleTrip(tripId).then(setTrip)
    }, [, tripId])

    const deleteWindow = () => {
        if (
            window.confirm(
                "Are you sure you want to bail on this adventure?"
            )
        ) {
            deleteTrip(tripId).then(() => navigate("/trips"))
        } else {
            navigate(`/trips/${trip.id}`)
        }
    }


    return <>
        <Link
            style={{ textDecoration: "none", color: "inherit" }}
            to={`/trips`}
            className="hover"
        > ⬅️ All Trips
        </Link>
        <section className="singleTrip">
            <div className="single-trip">
                <section className="myposts__content">
                    <span style={{ fontWeight: "bold" }}>
                        <section className="subscribe__postheader">
                            <h2>{trip.title}</h2>
                            <div>{trip?.start_date} - {trip?.end_date}</div>
                        </section>
                    </span>
                    <Link to={`/users/${trip?.traveler?.id}`}>
                        <h2>{trip?.traveler?.full_name}</h2>
                    </Link>
                    < div key={trip.id} className="myTrip" >
                        <div>
                            <h4>A little about the weather...</h4>
                            <p>{trip.weather}</p>
                        </div>
                        <div className="destinationList">
                            <h4>Where are you going?</h4>
                            {trip.destination.map((d) => (
                                <ol>{d.location}</ol>))}
                        </div>
                        <div>
                            <h4>Notes</h4>
                            {trip.notes}
                        </div>
                        <div className="tagList">
                            {trip.tag.map((t) => (
                                <ol>{t.type}</ol>))}
                        </div>

                        <div className="buttonContainer">
                            <button className="editButton"
                                onClick={() => {
                                    navigate(`/trips/edit/${trip.id}`)
                                }}

                            >
                                Edit
                            </button>
                            <button className="deleteTrip"
                                onClick={(e) => {
                                    e.preventDefault()
                                    deleteWindow()
                                }}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </section>
            </div>
        </section>
    </>

}
