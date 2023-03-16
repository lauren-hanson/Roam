import { useEffect, useState } from "react"
// import { useNavigate } from "react-router-dom"
import { getMyTrips } from "../../managers/TripManager"
import "./Trip.css"

export const TripDetails = ({ token, trips }) => {

    return <>
        <section className="myTripList">
            {
                trips.map((trip) => (
                    <>
                        < div key={trip.id} className="myTrip" >
                            <p>{trip.start_date} - {trip.end_date}</p>
                            A little about the weather...
                            <p>{trip.weather}</p>
                            <div className="destinationList">
                                {trip.destination.map((d) => (
                                    <ol>{d.location}</ol>))}
                            </div>
                            <div>{trip.notes}</div>

                            <div className="tagList">
                                {trip.tag.map((t) => (
                                    <ol>{t.type}</ol>))}
                            </div>

                            <div className="buttonContainer">
                                <button>Edit</button>
                                <button>Delete</button>
                            </div>


                        </div>
                    </>
                ))
            }
        </section>
    </>

}
