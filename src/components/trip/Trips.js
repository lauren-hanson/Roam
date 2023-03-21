import { Link, useNavigate } from "react-router-dom"
import { HumanDate } from "../utils/HumanDate"
import { AllTrips } from "./AllTrips"


export const Trips = ({ trips, token }) => {
    const navigate = useNavigate()

    // const limitedContent = trips.notes.slice(0, 50) + "..."

    return (
        <>
            <div>
                {trips.map((trip) => {

                    <Link
                        style={{ textDecoration: "none", color: "inherit" }}
                        to={`/trips/${trip?.id}`}
                        className="hover"
                    >
                        {/* <AllTrips limitedContent={limitedContent} /> */}
                    </Link>
                })}
            </div>
        </>
    )
}

