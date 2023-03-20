import { useEffect, useState } from "react"
import { useParams, Link, useNavigate } from "react-router-dom"
import { getSingleTrip, deleteTrip, updateTrip } from "../../managers/TripManager"
// import { Weather } from "../weather/Weather"
// import { HumanDate } from "../utils/HumanDate";
import "./Trip.css"

export const TripDetails = ({ token }) => {

    const navigate = useNavigate()
    // const [completeButton, setComplete] = useState(false)
    const [trip, setTrip] = useState({
        title: "",
        weather: "",
        imageUrl: "",
        notes: "",
        start_date: "",
        end_date: "",
        tag: [],
        complete: false,
        public: false
    })

    const { tripId } = useParams()

    useEffect(() => {
        getSingleTrip(tripId).then(setTrip)
    }, [, tripId])

    const deleteWindow = () => {
        if (
            window.confirm(
                "Are you sure you want to bail on this adventure?"
            )
        ) {
            deleteTrip(tripId).then(() => navigate("/trips"))
        } else {
            navigate(`/trips/${trip.id}`)
        }
    }

    const handleCompleteClick = (id) => {
        const completeProp = {
            ...trip,
            complete: true,
        }
        setTrip(completeProp)
        updateTrip(trip.id, completeProp)
    }


    return <>
        <Link
            style={{ textDecoration: "none", color: "inherit" }}
            to={`/trips`}
            className="hover"
        > ⬅️ All Trips
        </Link>
        <section className="singleTrip" key={trip.id}>
            <div className="single-trip">
                <section className="myposts__content">
                    <span style={{ fontWeight: "bold" }}>
                        <section className="subscribe__postheader">
                            <h2>{trip.title}</h2>
                            {/* <div><HumanDate date={trip?.start_date}/> - <HumanDate date={trip?.end_date}/></div> */}
                            <div>{trip?.start_date} - {trip?.end_date}</div>
                        </section>
                    </span>
                    <Link to={`/travelers/${trip?.traveler?.id}`}>
                        <h2>{trip?.traveler?.full_name}</h2>
                    </Link>
                    < div key={trip.id} className="myTrip" >
                        <div>
                            <img className="tripImage" src={trip.image_url} alt="Trip Image" />
                        </div>
                        {/* {trip.image_url ?
                            (<><div>
                                <img className="tripImage" src={trip.image_url} alt="Trip Image" />
                            </div></>) : (<></>)} */}

                        <div>
                            <h4>A little about the weather...</h4>
                            <p>{trip.weather}</p>
                            {/* {trip.weather ?
                                (<><h4>A little about the weather...</h4>
                                    <p>{trip.weather}</p></>) : (<></>)} */}

                            {/* <Weather/> */}
                        </div>
                        <div className="destinationList">
                            {/* {trip.destination ?
                                (<><h4>Stops along the way...</h4>
                                </>) : (<></>)} */}
                            <h4>Stops along the way...</h4>

                            {trip?.destination?.map((d, index) => (
                                <ol key={index}>{index + 1}. {d.location}</ol>
                            ))}
                        </div>
                        <div>
                            <h4>Notes</h4>
                            {trip.notes}
                        </div>
                        <div className="tagList">
                            {trip.tag.map((t) => (
                                <ol key={t.id}>{t.type}</ol>))}
                        </div>
                        <div className="radioAnswers">
                            <div className="radioReview">
                                {trip.public === true ?
                                    <div>✔️Public</div> :
                                    <div>✖️Public</div>
                                }
                            </div>
                        </div>

                        {trip.complete ? (
                            <>
                                <button className="deleteTrip"
                                    onClick={(e) => {
                                        e.preventDefault()
                                        deleteWindow()
                                    }}
                                >
                                    Delete
                                </button></>) :
                            (<>
                                <button className="completeButton"
                                    onClick={handleCompleteClick}
                                >
                                    Complete?
                                </button>
                                < button className="editButton"
                                    onClick={() => {
                                        navigate(`/trips/edit/${trip.id}`)
                                    }}
                                >
                                    Edit
                                </button>
                                <button className="deleteTrip"
                                    onClick={(e) => {
                                        e.preventDefault()
                                        deleteWindow()
                                    }}
                                >
                                    Delete
                                </button></>)
                        }
                        {/* <div className="buttonContainer">
                            <button className="editButton"
                                onClick={() => {
                                    navigate(`/trips/edit/${trip.id}`)
                                }}
                            >
                                Complete
                            </button>
                            <button className="editButton"
                                onClick={() => {
                                    navigate(`/trips/edit/${trip.id}`)
                                }}

                            >
                                Edit
                            </button>
                            <button className="deleteTrip"
                                onClick={(e) => {
                                    e.preventDefault()
                                    deleteWindow()
                                }}
                            >
                                Delete
                            </button>
                        </div> */}
                    </div>
                </section>
            </div>
        </section >
    </>

}
