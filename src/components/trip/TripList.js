import { useEffect, useState } from "react"
import { useNavigate, Link, useParams } from "react-router-dom"
import { getFinalDestination } from "../../managers/DestinationManager"
import "./Trip.css"

export const TripList = ({ trips, token }) => {

    const tokenInt = parseInt(token)
    const [finalDestination, setFinalDestination] = useState([])
    const { tripId } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        getFinalDestination(tokenInt).then((finalDestination) => setFinalDestination(finalDestination))
    }, [, tripId])

    return <>
        <section className="trip__array">
            <div><button onClick={() => navigate(`trips/newtrip`)}>+</button>New Trip</div>
            <h2>My Trips</h2>
            {
                finalDestination.map((final) => (
                    <>
                        <Link
                            style={{ textDecoration: "none", color: "inherit" }}
                            to={`/trips/${final?.trip?.id}`}
                            className="hover"
                        >
                            <div key={final.id} className="myTripHome">
                                <p>{final.destination.state}</p>
                            </div>
                        </Link>

                    </>))
            }
        </section>
    </>

}

