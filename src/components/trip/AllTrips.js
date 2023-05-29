import { useEffect, useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { TripByTag } from "./TripByTag"
import { getPublicTrips, getSearchedTrips } from "../../managers/TripManager"
import { HumanDate } from "../utils/HumanDate";
import "./Trip.css"

export const AllTrips = ({ token }) => {
    const [trips, setTrips] = useState([])
    const [filteredTrips, setFilteredTrips] = useState([])
    const [selectedTripByTag, setSelectedTripByTag] = useState(0)
    // const [selectedTag, setSelectedTag] = useState(0)

    const navigate = useNavigate()

    useEffect(() => {
        getPublicTrips().then((tripData) => setTrips(tripData))
        setFilteredTrips(trips)
    }, [])

    useEffect(() => {
        if (selectedTripByTag === 0) {
            setFilteredTrips(trips)
        } else if (selectedTripByTag !== 0) {
            const filteredCopy = trips.filter(
                (trip) => trip.tag.id === parseInt(selectedTripByTag)
            )
            setFilteredTrips(filteredCopy)
        }

    }, [trips, selectedTripByTag])

    return (
        <>
            <TripByTag setSelectedTripByTag={setSelectedTripByTag} />
            <div key={`trips--${trips.id}`}>
                <div className="allTripList">
                    {trips.map((trip) => {
                        return <div key={`trip--${trip.id}`}>
                            <Link
                                style={{ textDecoration: "none", color: "inherit" }}
                                to={`/trips/${trip?.id}`}
                                className="hover"
                            >
                                <div className="allTripContainer" >

                                    <div className="tripSubtitle">{trip.title}</div>

                                    <img src={trip.image_url} alt="Image 1" className="allTripBoxImage"></img>


                                    <Link style={{ textDecoration: "none", color: "inherit" }}
                                        to={`/travelers/${trip?.traveler?.id}`}>
                                        <div className=" tripLabel">{trip.traveler.full_name}</div>
                                    </Link>



                                    <span style={{ margin: 0, padding: 0 }}>
                                        <HumanDate date={trip.publication_date} />
                                    </span>

                                    <div className="tags">
                                        {trip.tag.map((t) => (
                                            <ol key={t.id} className="tagList"> {t.type} </ol>))}
                                    </div>
                                </div>
                            </Link>

                        </div>
                    })}</div>
            </div >

        </>)
}
