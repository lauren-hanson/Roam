import { useEffect, useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { Trip, Trips, TableRow } from "./Trips"
import { getPublicTrips, getSearchedTrips } from "../../managers/TripManager"
import { HumanDate } from "../utils/HumanDate";
import "./Trip.css"

export const AllTrips = ({ token }) => {
    const [trips, setTrips] = useState([])
    const [filteredTrips, setFilteredTrips] = useState([])
    const [readMore, setReadMore] = useState(false)

    const navigate = useNavigate()

    useEffect(() => {
        getPublicTrips().then((tripData) => setTrips(tripData))

        setFilteredTrips(trips)
    }, [])



    return (
        <div key={`trip--${trips.id}`}>
            <div className="allTripList">
                {trips.map((trip) => {
                    return <>
                        <Link
                            style={{ textDecoration: "none", color: "inherit" }}
                            to={`/trips/${trip?.id}`}
                            className="hover"
                        >
                            <div className="allTripContainer">

                                <div class="tripSubtitle">{trip.title}</div>

                                <img src={trip.image_url} alt="Image 1" className="allTripBoxImage"></img>


                                <Link to={`/travelers/${trip?.traveler?.id}`}>
                                    <div className=" tripLabel">{trip.traveler.full_name}</div>
                                </Link>



                                <span style={{ margin: 0, padding: 0 }}>
                                    <HumanDate date={trip.publication_date} />
                                </span>

                                <hr className="hr"></hr>
                            </div>
                        </Link>



                        {/* <div className="subtitle is-6 has-text-weight-semibold is-custom-margin">
                                    {trip.notes}
                                  
                                </div> */}
                        {/* <div className="subtitle is-6 has-text-weight-semibold is-custom-margin">
                                    {trip?.tag?.type}
                                </div> */}



                    </>
                })}</div>
        </div >
    )
}
