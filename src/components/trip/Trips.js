import { Link, useNavigate } from "react-router-dom"
import { HumanDate } from "../utils/HumanDate"


export const Trips = ({ trips, token }) => {
    const navigate = useNavigate()

    //   const limitedContent = trips.notes.slice(0, 140) + "..."

    return (
        <>
            <div>
                {trips.map((trip) => {

                    <Link
                        style={{ textDecoration: "none", color: "inherit" }}
                        to={`/trips/${trip?.id}`}
                        className="hover"
                    >
                        <h2>ALL TRIPS</h2>
                    </Link>
                })}
            </div>
        </>
    )
}

