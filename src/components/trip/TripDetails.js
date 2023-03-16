import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import { getSingleTrip } from "../../managers/TripManager"
import "./Trip.css"

export const TripDetails = ({ token }) => {

    const [trip, setTrip] = useState([])
    const { tripId } = useParams()

    useEffect(() => {
        getSingleTrip(tripId).then(setTrip)
    }, [, tripId])

    return <>
        <section className="myTripList">

            <article className="posts__container">
                <div className="single-my-post">
                    <section className="myposts__content">
                        <span style={{ fontWeight: "bold" }}>
                            <section className="subscribe__postheader">
                                <div class="title is-3">{trip.title}</div>
                                <div>Trip Dates: {trip?.start_date} - {trip?.end_date}</div>
                            </section>
                        </span>
                        <Link to={`/users/${trip?.traveler?.id}`}>
                            <h2>{trip?.traveler?.full_name}</h2>
                        </Link>
                        < div key={trip.id} className="myTrip" >
                            A little about the weather...
                            <p>{trip.weather}</p>
                            {/* <div className="destinationList">
                                {trip.destination.map((d) => (
                                    <ol>{d.location}</ol>))}
                            </div> */}
                            <div>{trip.notes}</div>

                            {/* <div className="tagList">
                                {trip.tag.map((t) => (
                                    <ol>{t.type}</ol>))}
                            </div> */}

                            <div className="buttonContainer">
                                <button>Edit</button>
                                <button>Delete</button>
                            </div>


                        </div>
                    </section>
                </div>
            </article>

            {/* {
                            trips.map((trip) => (
                                <>
                                    < div key={trip.id} className="myTrip" >
                                        <p>{trip.start_date} - {trip.end_date}</p>
                                        A little about the weather...
                                        <p>{trip.weather}</p>
                                        <div className="destinationList">
                                            {trip.destination.map((d) => (
                                                <ol>{d.location}</ol>))}
                                        </div>
                                        <div>{trip.notes}</div>

                                        <div className="tagList">
                                            {trip.tag.map((t) => (
                                                <ol>{t.type}</ol>))}
                                        </div>

                                        <div className="buttonContainer">
                                            <button>Edit</button>
                                            <button>Delete</button>
                                        </div>


                                    </div>
                                </>
                            ))
                        } */}
        </section>
    </>

}
