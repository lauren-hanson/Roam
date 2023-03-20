import { useEffect, useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { Trip, Trips, TableRow } from "./Trips"
import { getTrips, getSearchedTrips } from "../../managers/TripManager"
import "./Trip.css"

export const AllTrips = ({ token }) => {
    const [trips, setTrips] = useState([])
    const [filteredTrips, setFilteredTrips] = useState({})


    const navigate = useNavigate()

    useEffect(() => {
        getTrips().then((tripData) => setTrips(tripData))
        setFilteredTrips(trips)
    }, [])


    return (
        <>
            {trips.map((trip) => {
                return <>
                    <div>
                        <Link
                            style={{ textDecoration: "none", color: "inherit" }}
                            to={`/trip/${trip?.id}`}
                            className="hover"
                        >
                            <div className="columns is-centered">
                                <div className="column is-one-fifth"></div>
                                <div className="column is-one-fifth">
                                    <a href="/tags">{trip.tag?.label}</a>
                                    <br />
                                    <p
                                        className="title is-4 has-text-weight-bold is-margin"
                                        aria-label="breadcrumbs"
                                    >
                                        {trip?.title}
                                    </p>
                                    <div className="subtitle is-6 has-text-weight-semibold is-custom-margin">
                                        {trip.traveler.full_name}
                                    </div>
                                 
                                    {/* <div className="subtitle is-custom">
                                        <span style={{ margin: 0, padding: 0 }}>
                                            <HumanDate date={trip.publication_date} />
                                        </span>
                                    </div> */}
                                </div>
                                <div className="column is-one-fifth">
                                    <figure className="image is-16by9">
                                        <img className="tripImage" src={trip.image_url} alt="Image 1"></img>
                                    </figure>
                                </div>
                                <div className="subtitle is-6 has-text-weight-semibold is-custom-margin">
                                        {trip.notes}
                                    </div>
                                <div className="column is-one-fifth"></div>
                            </div>
                            <hr class="hr"></hr>
                        </Link>
                    </div></>
            })}
        </>
    )
}
