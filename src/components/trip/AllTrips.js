import { useEffect, useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { Trip, Trips, TableRow } from "./Trips"
import { getTrips, getSearchedTrips } from "../../managers/TripManager"
import { HumanDate } from "../utils/HumanDate";
import "./Trip.css"
import "../connect/Connect.css"

export const AllTrips = ({ token }) => {
    const [trips, setTrips] = useState([])
    const [filteredTrips, setFilteredTrips] = useState([])
    const [readMore, setReadMore] = useState(false)

    const navigate = useNavigate()

    useEffect(() => {
        getTrips().then((tripData) => setTrips(tripData))

        setFilteredTrips(trips)
    }, [])

    // const limitedContent = trips.notes.slice(0, 50) + "..."


    const mostRecentTrip = trips[0]
    const secondTrip = trips[1]
    const allOtherTrips = trips.slice(2)


    // return (
    //     <div key={`trip--${trips.id}`}>
    //         {trips.map((trip) => {
    //             return <>
    //                 <div>
    //                     <Link
    //                         style={{ textDecoration: "none", color: "inherit" }}
    //                         to={`/trip/${trip?.id}`}
    //                         className="hover"
    //                     >
    //                         <div className="columns is-centered">
    //                             <div className="column is-one-fifth"></div>
    //                             <div className="column is-one-fifth">
    //                                 <br />

    //                                 <h2> {trip?.title}</h2>


    //                                 <Link to={`/travelers/${trip?.traveler?.id}`}>
    //                                     {trip.traveler.full_name}
    //                                 </Link>


    //                                 <div className="subtitle is-custom">
    //                                     <span style={{ margin: 0, padding: 0 }}>
    //                                         <HumanDate date={trip.publication_date} />
    //                                     </span>
    //                                 </div>
    //                             </div>
    //                             <div className="column is-one-fifth">
    //                                 <figure className="image is-16by9">
    //                                     <img className="tripImage" src={trip.image_url} alt="Image 1"></img>
    //                                 </figure>
    //                             </div>
    //                             <div className="subtitle is-6 has-text-weight-semibold is-custom-margin">
    //                                 {trip.notes}
    //                             </div>
    //                             <div className="subtitle is-6 has-text-weight-semibold is-custom-margin">
    //                                 {trip?.tag?.type}
    //                             </div>
    //                         </div>
    //                         <hr className="hr"></hr>
    //                     </Link>
    //                 </div>
    //             </>
    //         })}
    //     </div>
    // )

    return (
        <div key={`trip--${trips.id}`}>
            <Link
                style={{ textDecoration: "none", color: "inherit" }}
                to={`/connect/discover`}
                className="hover"
            > ⬅️ Find More Travelers
            </Link>
            <article className="connectTripPage" >
                {trips.length ? (
                    <div className="connectTripContainer" >


                        <div className="mostRecentTripContainer">
                            <section className="subscribe_content">
                                <Link
                                    style={{ textDecoration: "none", color: "inherit" }}
                                    to={`/trips/${mostRecentTrip?.id}`}
                                >
                                    <span style={{ fontWeight: "bold" }}>
                                        <section className="subscribe_tripheader">
                                            <div>Most Recent Trip...</div>
                                            <div className="trips_title">{mostRecentTrip.title}</div>
                                            <div className="trips_date">
                                                Published On:{" "}
                                                <HumanDate date={mostRecentTrip.publication_date} />
                                            </div>
                                        </section>
                                        <h3>
                                            Traveler:{" "}
                                            <Link to={`/travelers/${mostRecentTrip.traveler.id}`}>
                                                <div className="travelerName">{mostRecentTrip?.traveler?.full_name}</div>
                                            </Link>
                                        </h3>
                                    </span>
                                    {/* <h3>{mostRecentTrip?.category?.label}</h3> */}
                                    <img className="trip_image" src={mostRecentTrip?.image_url} />
                                    <section className="subscribe_tripbody">
                                        <p>{mostRecentTrip.notes}</p>
                                    </section>
                                </Link>
                                <section>
                                    <div className="buttonContainer">
                                        <button className="button is-link is-rounded is-small"
                                            onClick={() => navigate(`/trips/${mostRecentTrip.id}/comments`)}
                                        >
                                            View Comments
                                        </button>
                                        <button className="button is-link is-rounded is-small"
                                            onClick={() => navigate(`/trips/${mostRecentTrip.id}/comment`)}
                                        >
                                            Add Comments
                                        </button>
                                    </div>
                                </section>
                            </section>
                            <hr className="hr"></hr>
                        </div>

                        <div className="secondTripContainer">
                            <section className="column">
                                <Link
                                    style={{ textDecoration: "none", color: "inherit" }}
                                    to={`/trips/${secondTrip?.id}`}
                                >
                                    <span style={{ fontWeight: "bold" }}>
                                        <div className="side_trips_title">{secondTrip.title}</div>
                                        <div className="trips_date">
                                            Published On:{" "}
                                            <HumanDate date={secondTrip.publication_date} />
                                        </div>
                                    </span>
                                    <h3>{secondTrip?.category?.label}</h3>
                                    <img className="trip_image" src={secondTrip?.image_url} />
                                    <section className="subscribe__tripbody">
                                        <div className="column">{secondTrip.notes}</div>
                                    </section>
                                </Link>
                                <section>
                                    <h3>
                                        Traveler:{" "}
                                        <Link to={`/travelers/${secondTrip.traveler.id}`}>
                                            <div className="travelerName">{secondTrip?.traveler?.full_name}</div>
                                        </Link>
                                    </h3>
                                    <div className="buttonContainer">
                                        <button className="button is-link is-rounded is-small"
                                            onClick={() => navigate(`/trips/${secondTrip.id}/comments`)}
                                        >
                                            View Comments
                                        </button>
                                        <button className="button is-link is-rounded is-small"
                                            onClick={() => navigate(`/trips/${secondTrip.id}/comment`)}
                                        >
                                            Add Comments
                                        </button>
                                    </div>
                                </section>
                            </section>
                            <hr className="hr"></hr>
                        </div>

                        <div className="allOtherTripsContainer">
                            {allOtherTrips.map((trip) => (
                                <div className="bottomTrips">
                                    <div className="columns is-centered">
                                        <div className="column is-two-fifth">
                                            <Link
                                                style={{ textDecoration: "none", color: "inherit" }}
                                                to={`/trips/${trip?.id}`}

                                            >
                                                <br />
                                                <p
                                                    className="title is-4 has-text-weight-bold is-margin"
                                                    aria-label="breadcrumbs"
                                                >
                                                    {trip?.title}
                                                </p>
                                                <div className="subtitle is-6 has-text-weight-semibold is-custom-margin">
                                                    <h3>
                                                        Traveler:{" "}
                                                        <Link to={`/travelers/${trip.traveler.id}`}>
                                                            <div className="travelerName">{trip?.traveler?.full_name}</div>
                                                        </Link>
                                                    </h3>
                                                </div>
                                            </Link>
                                            {trip?.title}

                                            <div className="title is-6 has-text-weight-semibold is-margin">
                                                {trip?.traveler?.full_name}
                                            </div>
                                            <div className="subtitle is-custom">
                                                <span style={{ margin: 0, padding: 0 }}>
                                                    <HumanDate date={trip.publication_date} />
                                                </span>
                                            </div>
                                            <div className="buttonContainer">
                                                <button className="button is-link is-rounded is-small"
                                                    onClick={() => navigate(`/trips/${trip.id}/comments`)}
                                                >
                                                    View Comments
                                                </button>
                                                <button className="button is-link is-rounded is-small"
                                                    onClick={() => navigate(`/trips/${trip.id}/comment`)}
                                                >
                                                    Add Comments
                                                </button>
                                            </div>
                                        </div>
                                        <div className="column is-three-fifth">
                                            <Link
                                                style={{ textDecoration: "none", color: "inherit" }}
                                                to={`/trips/${trip?.id}`}
                                                className="hover"
                                            >{trip.notes}
                                            </Link></div>
                                        <div className="column is-two-fifth">
                                            <Link
                                                to={`/trips/${trip?.id}`}

                                            ><img className="trip_image" id="image" src={trip.image_url} alt="Image 1"></img></Link>

                                        </div>
                                        <hr className="hr"></hr>
                                    </div>

                                </div>
                            )
                            )}</div>
                    </div>
                )
                    : (<>
                        <div className="subscribe__text">Follow travelers to curate your connect page!</div>
                    </>

                    )}
            </article>
        </div>
    )
}


