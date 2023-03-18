import { useEffect, useState } from "react"
import { useNavigate, Link, useParams } from "react-router-dom"
import { getMyTrips, getUpcomingTrips, getSearchedTrips } from "../../managers/TripManager"
import { TripByDate } from "./TripByDate"
import { SearchTrips } from "./SearchTrips"
import "./Trip.css"

export const TripList = ({ token }) => {

    const [trips, setMyTrips] = useState([])
    const [myTrips, setFilteredTrips] = useState(trips)
    const [upcomingTrips, setUpcomingTrips] = useState([])
    const [pastTrips, setpastTrips] = useState(false)

    const [searchTerms, setSearchTerms] = useState("Search Posts By Title")

    const tokenInt = parseInt(token)
    const { tripId } = useParams()
    const navigate = useNavigate()

    useEffect(() => {

        getMyTrips(tokenInt).then((tripData) => setMyTrips(tripData))

        setFilteredTrips(trips)

    }, [, tripId])

    useEffect(() => {
        getUpcomingTrips(tripId).then((tripData) => setUpcomingTrips(tripData))
        
    }, [])

    // const handleSubmit = (e) => {
    //     e.preventDefault()
    //     getSearchedTrips(`${searchTerms}`).then((data) => setFilteredTrips(data))
    //     setSearchTerms("Search Trips By Title")
    //     document.getElementById("search").value = ""
    // }

    // const handleKeypress = (e) => {
    //     //it triggers by pressing the enter key
    //     if (e.keyCode === 13) {
    //         handleSubmit()
    //     }
    // }


    return <>
        <section className="trip__array">
            <div><button onClick={() => navigate(`/trips/newtrip`)}>+</button>New Trip</div>
            <h2>My Trips</h2>
            {/* <SearchTrips searchTerms={searchTerms} setSearchTerms={setSearchTerms} handleSubmit={handleSubmit} setFilteredTrips={setFilteredTrips}
                handleKeypress={handleKeypress} trips={trips} myTrips={myTrips} /> */}
            <TripByDate setFilteredTrips={setFilteredTrips} tripId={tripId} upcomingTrips={upcomingTrips} trips={trips}/>
            {
                myTrips.map((trip) => (
                    <>
                        <Link
                            style={{ textDecoration: "none", color: "inherit" }}
                            to={`/trips/${trip.id}`}
                            className="hover"
                        >
                            <div key={trip.id} className="myTripHome">
                                <p>{trip.title}</p>
                            </div>
                        </Link>

                    </>))
            }
        </section>
    </>

}

