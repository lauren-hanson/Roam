// import { useEffect, useState } from "react"
// import { Link, useParams } from "react-router-dom"
// import { getSingleTrip } from "../../managers/TripManager"
// import { getFinalDestination } from "../../managers/DestinationManager"
// import {TripDetails} from './TripDetails'
// import "./Trip.css"

// export const TripList = ({ token }) => {

//     const tokenInt = parseInt(token)
//     const [singleTrip, setSingleTrip] = useState([])
//     const [finalDestination, setFinalDestination] = useState([])
//     const {tripId} = useParams()

//     useEffect(() => {
//         getFinalDestination(tokenInt).then((finalDestination) => setFinalDestination(finalDestination))
//         getSingleTrip(tripId).then(setSingleTrip)
//     }, [, tripId])

//     return <>
//         <section className="trip__array">
//             <h2>My Trips</h2>
//             {
//                 finalDestination.map((final) => (
//                     <>
//                         <Link
//                             style={{ textDecoration: "none", color: "inherit" }}
//                             to={`/${tripId}`}
//                             className="hover"
//                         >
//                             <div key={final.id} className="myTripHome">
//                                 <p>{final.destination.state}</p>
//                             </div>


//                         </Link>
//                     </>))
//             }
//         </section>
//     </>

// }

