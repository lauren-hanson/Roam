import { Link } from "react-router-dom"
import { AllTrips } from "../trip/AllTrips"
import "./Connect.css"
import "../trip/Trip.css"



export const Connect = ({ token }) => {

    return (<>
        <div className="connectPage">
            <Link style={{ textDecoration: "none", color: "papayawhip" }}
                to={`/travelers`} className="goBack">
                See All Roamers
            </Link>
            <AllTrips token={token} />
        </div>
    </>)
}