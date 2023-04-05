import { useEffect, useState } from "react"
import { getSubscribedTrips } from "../../managers/TripManager"
import { Link, useNavigate } from "react-router-dom"
import { HumanDate } from "../utils/HumanDate"
import "./Connect.css"



export const ConnectFeed = ({ token }) => {

  const [trips, setTrips] = useState([])
  const tokenInt = parseInt(token)
  const navigate = useNavigate()

  useEffect(() => {
    getSubscribedTrips(tokenInt).then((tripData) => setTrips(tripData))

  }, [])

  const mostRecentTrip = trips[0]
  const secondTrip = trips[1]
  const allOtherTrips = trips.slice(2)


  return (
    <article className="connectTripsPage">
      <Link
        style={{ textDecoration: "none", color: "inherit" }}
        to={`/connect/discover`}
        className="hover goBack"
      > See all trips.
      </Link>
      <div key={`trip--${trips.id}`}>

        <article className="connectTripPages" >
          <h2 className="connectHeader">Welcome to your Connect Page...</h2>
          {trips.length ? (
            <div className="connectTripsContainer">
              <div className="columns" >


                <div className="mostRecentContainer column is-7">
                  <section className="trip">
                    <Link
                      style={{ textDecoration: "none", color: "inherit" }}
                      to={`/trips/${mostRecentTrip?.id}`}
                    >
                      <div className="connectLabel">Most Recent Trip...</div>
                      <br></br>
                      <h1 className="connectSubtitle">{mostRecentTrip.title}</h1>
                      <span style={{ fontWeight: "bold" }}>
                        <section className="subscribe_tripheader">
                          <h3>
                            Traveler:{" "}
                            <Link to={`/travelers/${mostRecentTrip.traveler.id}`}>
                              <div className="travelerName">{mostRecentTrip?.traveler?.full_name}</div>
                            </Link>
                          </h3>
                          <div className="trips_date">
                            Published On:{" "}
                            <HumanDate date={mostRecentTrip.publication_date} />
                          </div>
                        </section>
                      </span>
                      <img className="tripImage" src={mostRecentTrip?.image_url} />
                      <section className="subscribe_tripbody">
                        <p>
                          {mostRecentTrip.notes.slice(0, 250) + "..."}
                        </p>
                      </section>
                    </Link>
                  </section>
                </div>

                <div className="secondTripContainer">
                  <section className="column">
                    <Link
                      style={{ textDecoration: "none", color: "inherit" }}
                      to={`/trips/${secondTrip?.id}`}
                    >
                      <span style={{ fontWeight: "bold" }}>
                        <div className="side_trips_title">{secondTrip.title}</div>
                        <h3>
                          Traveler:{" "}
                          <Link to={`/travelers/${secondTrip.traveler.id}`}>
                            <div className="travelerName">{secondTrip?.traveler?.full_name}</div>
                          </Link>
                        </h3>
                        <div className="trips_date">
                          Published On:{" "}
                          <HumanDate date={secondTrip.publication_date} />
                        </div>

                      </span>
                      <img className="tripImage" src={secondTrip?.image_url} />
                      <section className="subscribe__tripbody">
                        <div className="column">{secondTrip.notes.slice(0, 250) + "..."}
                        </div>
                      </section>
                    </Link>
                    <section>
                    </section>
                  </section>
                </div>
              </div>

              <div className="allOtherTripsContainer">
                {allOtherTrips.map((trip) => (
                  <div className="bottomTrips">
                    <div className="columns is-centered">
                      <Link
                        style={{ textDecoration: "none", color: "inherit" }}
                        to={`/trips/${trip?.id}`}
                      >
                        <br />
                        <div className="column is-one-fifth"></div>
                        <div className="column is-one-fifth">
                          <p
                            className="tripSubtitle "
                            aria-label="breadcrumbs"
                          >
                            {trip?.title}
                          </p>

                          <div className="tripLabel">
                            <span style={{ margin: 0, padding: 0 }}>
                              <HumanDate date={trip.publication_date} />
                            </span>
                          </div>
                        </div>
                        <h3>
                          <Link to={`/travelers/${trip.traveler.id}`}>
                            <div className="travelerName">{trip?.traveler?.full_name}</div>
                          </Link>
                        </h3>
                      </Link>
                    </div>

                    <div className="column is-two-fifth">
                      <Link
                        style={{ textDecoration: "none", color: "inherit" }}
                        to={`/trips/${trip?.id}`}
                        className="hover"
                      >{trip.notes.slice(0, 250) + "..."}
                      </Link></div>

                    <div className="column is-one-fifth">
                      <Link
                        to={`/trips/${trip?.id}`}

                      ><img src={trip.image_url} alt="Image 1"></img></Link>

                    </div>
                  </div>


                )
                )}</div>
            </div>
          )
            : (<div className="connectTripsPage">
              <div className="connectLabel">Follow travelers to curate your connect page!</div>
              <Link
                style={{ textDecoration: "none", color: "inherit" }}
                to={`/connect/discover`}
                className="hover goBack"
              > Click here to see all trips!
              </Link>
            </div>

            )}
        </article >
      </div >
    </article >
  )
}

