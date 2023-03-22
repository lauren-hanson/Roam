import { Link } from "react-router-dom"
import { AllTrips } from "../trip/AllTrips"
import "../trip/Trip.css"

export const Connect = ({token}) => {

    return (<>
        <Link to={`/travelers`} className="goBack">
            See All Roamers
        </Link>
        <AllTrips token={token}/> 
    </>)
}