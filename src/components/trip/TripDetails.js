import { useEffect, useState } from "react"
import { useParams, Link, useNavigate } from "react-router-dom"
import { getSingleTrip, deleteTrip, updateTrip, getDestinationByTrip } from "../../managers/TripManager"
import { Map } from "../map/Map"
import { Icon } from 'leaflet'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { Weather } from "../weather/Weather"
import { HumanDate } from "../utils/HumanDate";
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
        public: false,
        destination: [
            {
                latitude: 0,
                longitude: 0
            }
        ]
    })

    const [destinations, setDestinations] = useState([{
        destination: {
            latitude: 0,
            longitude: 0
        }
    }])

    const { tripId } = useParams()

    useEffect(() => {
        getSingleTrip(tripId).then(setTrip)
        getDestinationByTrip(tripId).then(setDestinations)
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

    const customIcon = new Icon({
        iconUrl: 'https://www.pngall.com/wp-content/uploads/2017/05/Map-Marker-Free-Download-PNG.png',
        iconSize: [20, 20]
    })

    return <>
        <Link
            style={{ textDecoration: "none", color: "inherit" }}
            to={`/trips`}
            className="hover goBack"
        > ⬅️ All Trips
        </Link>
        <section className="singleTrip" key={trip.id}>
            <div className="single-trip">
                <section className="myposts__content">
                    <span style={{ fontWeight: "bold" }}>
                        <section className="subscribe__postheader">
                            <div className="tripHeader">{trip.title}</div>
                            <div><HumanDate date={trip?.start_date} /> - <HumanDate date={trip?.end_date} /></div>
                        </section>
                    </span>
                    < div key={trip.id} className="myTrip" >
                        <div>
                            <img className="tripImage" src={trip.image_url} alt="Trip Image" />
                        </div>
                        <div>
                            <br></br>
                            <div className="destinationList">
                                <h4 className="tripSubtitle">Stops along the way...</h4>

                                {trip?.destination?.map((d, index) => (
                                    <ol key={index}>{index + 1}. {d.location}</ol>
                                ))}
                                <div className="singleTripMap" id="map">
                                    <MapContainer center={[39.50, -98.350]} zoom={3} style={{ height: "300px", width: "350px" }} scrollWheelZoom={true} >
                                        <TileLayer
                                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                            url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
                                        />
                                        {destinations.map(d => {
                                            return (<Marker position={[d.destination.latitude ?? 0, d.destination.longitude ?? 0]} icon={customIcon} key={d.id}>
                                                <Popup>{d.destination.location}</Popup>
                                            </Marker>)
                                        })}
                                    </MapContainer>
                                </div>
                            </div>


                        </div>
                        <br></br>
                        <div>
                            <h4 className="tripSubtitle">A little about the weather...</h4>
                            <p>{trip.weather}</p>
                            {/* {trip.weather ?
                                (<><h4>A little about the weather...</h4>
                                    <p>{trip.weather}</p></>) : (<></>)} */}


                        </div>
                        <br></br>
                        <div>
                            <h4 className="tripSubtitle">Notes</h4>
                            {trip.notes}
                        </div>
                        <br></br>
                        <div className="tagList">
                            {trip.tag.map((t) => (
                                <ol key={t.id}>{t.type}</ol>))}
                        </div>
                        <br></br>
                        <div className="radioAnswer tripSubtitle">
                            <div className="radioReview">
                                {trip.public === true ?
                                    <div>✔️Public</div> :
                                    <div>✖️Public</div>
                                }
                            </div>
                        </div>
                        <br></br>
                        {trip.complete ? (
                            <>
                                <button className="button"
                                    onClick={(e) => {
                                        e.preventDefault()
                                        deleteWindow()
                                    }}
                                >
                                    Delete
                                </button></>) :
                            (<>
                                <button className="button"
                                    onClick={handleCompleteClick}
                                >
                                    Complete?
                                </button>
                                < button className="button"
                                    onClick={() => {
                                        navigate(`/trips/edit/${trip.id}`)
                                    }}
                                >
                                    Edit
                                </button>
                                <button className="button"
                                    onClick={(e) => {
                                        e.preventDefault()
                                        deleteWindow()
                                    }}
                                >
                                    Delete
                                </button></>)
                        }
                    </div>
                </section>
            </div>
        </section >
    </>

}
