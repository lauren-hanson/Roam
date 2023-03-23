import { useEffect, useState } from "react"
import { useParams, Link, useNavigate } from "react-router-dom"
import { getSingleTrip, deleteTrip, updateTrip, getDestinationByTrip } from "../../managers/TripManager"
import { Icon } from 'leaflet'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
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
                latitude: "",
                longitude: ""
            }
        ]
    })

    const [destinations, setDestinations] = useState([{
        destination: {
            latitude: "",
            longitude: ""
        }
    }])

    const { tripId } = useParams()

    useEffect(() => {
        getSingleTrip(tripId).then(setTrip)
        
    }, [, tripId])

    useEffect(() => { 
        getDestinationByTrip(tripId).then(setDestinations)
    })

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
            style={{ textDecoration: "none", color: "papayawhip" }}
            to={`/trips`}
            className="hover goBack"
        > ⬅️ Your Trips
        </Link>
        <section className="tripDetail" key={trip.id}>
            <div className="single-trip">
                <section className="myposts__content">
                    <span style={{ fontWeight: "bold" }}>
                        <section className="subscribe__postheader">
                            <div className="tripHeader">{trip.title}</div>
                            <div><HumanDate date={trip?.start_date} /> - <HumanDate date={trip?.end_date} /></div>
                        </section>
                    </span>
                    < div key={trip.id} className="myTrip" >
                        <div className="tripDetailImage" >
                            <img src={trip.image_url} alt="Trip Image" />
                        </div>
                        <div>
                            <br></br>
                            <div className="destinationList">
                                <h4 className="tripSubtitle">Stops along the way...</h4>

                                {trip?.destination?.map((d, index) => (
                                    <ol key={index}>{index + 1}. {d.location},  {d.state}</ol>
                                ))}
                                <br></br>
                                <div className="singleTripMap" id="map">
                                    <MapContainer center={[39.50, -98.350]} zoom={3.25} style={{ height: "500px", width: "500px" }} scrollWheelZoom={true} >
                                        <TileLayer
                                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                            url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
                                        />
                                        {destinations.map(d => {
                                            return (<Marker position={[d.destination.latitude ?? 0, d.destination.longitude ?? 0]} icon={customIcon} key={d.id}>
                                                <Popup>{d.destination.location}, {d.destination.state}</Popup>
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
                        <div className="tags">
                            {trip.tag.map((t) => (
                                <ol key={t.id} className="tagLabel"> {t.type} </ol>))}
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
                                <button className="button is-small"
                                    onClick={handleCompleteClick}
                                >
                                    Complete?
                                </button>
                                < button className="button is-small"
                                    onClick={() => {
                                        navigate(`/trips/edit/${trip.id}`)
                                    }}
                                >
                                    Edit
                                </button>
                                <button className="button is-small"
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
