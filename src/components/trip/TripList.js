import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { getTrips } from "../../managers/TripManager"
import { getFinalDestination } from "../../managers/DestinationManager"
import "./Trip.css"

export const TripList = ({ token }) => {

    const tokenInt = parseInt(token)
    const [finalDestination, setFinalDestination] = useState([])

    useEffect(() => {
        getFinalDestination(tokenInt).then((finalDestination) => setFinalDestination(finalDestination))
    }, [])

    return <>
        <section className="trip__array">
            <h2>My Trips</h2>
            {
                finalDestination.map((final) => (
                    <>
                        <Link
                            style={{ textDecoration: "none", color: "inherit" }}
                            to={`/${finalDestination?.id}`}
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

