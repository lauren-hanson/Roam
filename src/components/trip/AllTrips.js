import { useEffect, useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { Trip, Trips, TableRow } from "./Trips"
import { getTrips, getSearchedTrips } from "../../managers/TripManager"
import { HumanDate } from "../utils/HumanDate";
import "./Trip.css"
import "../connect/Connect.css"

export const AllTrips = ({ token, limitedContent }) => {
    const [trips, setTrips] = useState([])
    const [filteredTrips, setFilteredTrips] = useState([])
    const [readMore, setReadMore] = useState(false)

    const navigate = useNavigate()

    useEffect(() => {
        getTrips().then((tripData) => setTrips(tripData))

        setFilteredTrips(trips)
    }, [])

    return (
        <div key={`trip--${trips.id}`}>
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
                                    <br />

                                    <h2> {trip?.title}</h2>


                                    <Link to={`/travelers/${trip?.traveler?.id}`}>
                                        {trip.traveler.full_name}
                                    </Link>


                                    <div className="subtitle is-custom">
                                        <span style={{ margin: 0, padding: 0 }}>
                                            <HumanDate date={trip.publication_date} />
                                        </span>
                                    </div>
                                </div>
                                <div className="column is-one-fifth">
                                    <figure className="image is-16by9">
                                        <img className="tripImage" src={trip.image_url} alt="Image 1"></img>
                                    </figure>
                                </div>
                                <div className="subtitle is-6 has-text-weight-semibold is-custom-margin">
                                    {/* {trip.notes} */}
                                    {limitedContent}
                                </div>
                                <div className="subtitle is-6 has-text-weight-semibold is-custom-margin">
                                    {trip?.tag?.type}
                                </div>
                            </div>
                            <hr className="hr"></hr>
                        </Link>
                    </div>
                </>
            })}
        </div>
    )
}
