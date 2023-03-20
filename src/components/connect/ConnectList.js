import { useEffect, useState } from "react"
import { getSubscribedTrips } from "../../managers/TripManager"
import "./Connect"
import { Link, useNavigate } from "react-router-dom"
import { HumanDate } from "../utils/HumanDate"
// import { PostReactions } from "../reactions/PostReactions";

export const ConnectList = ({ token }) => {

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
    <>
      <Link
        style={{ textDecoration: "none", color: "inherit" }}
        to={`/connect/find`}
        className="hover"
      > ⬅️ Find More Travelers
      </Link>
      <article className="subscribeTripsPage">
        {trips.length ? (
          <div className="subscribeTripsContainer">
            <div class="columns">

              <div className="asubscribe__trips column is-three-fifths">
                <section className="subscribe__content">
                  <Link
                    style={{ textDecoration: "none", color: "inherit" }}
                    to={`/trips/${mostRecentTrip?.id}`}
                  >
                    <span style={{ fontWeight: "bold" }}>
                      <section className="subscribe__tripheader">
                        <div>Most Recent Trip...</div>
                        <div className="trips_title">{mostRecentTrip.title}</div>
                        <div className="trips_date">
                          Published On:{" "}
                          <HumanDate date={mostRecentTrip.publication_date} />
                        </div>
                      </section>
                    </span>
                    <h3>{mostRecentTrip?.category?.label}</h3>
                    <img className="subscribe__image" src={mostRecentTrip?.image_url} />
                    <section className="subscribe__tripbody">
                      <p>{mostRecentTrip.content}</p>
                    </section>
                  </Link>
                  <section>
                    <h3>
                      Traveler:{" "}
                      <Link to={`/travelers/${mostRecentTrip.traveler.id}`}>
                        <div className="travelerName">{mostRecentTrip?.traveler?.full_name}</div>
                      </Link>
                    </h3>
                    <div className="buttonContainer">
                      <button className="button is-link is-rounded is-small"
                        onClick={() => navigate(`/trips/${mostRecentTrip.id}/comments`)}
                      >
                        View Comments
                      </button>
                      <button className="button is-link is-rounded is-small"
                        onClick={() => navigate(`/trips/${mostRecentTrip.id}/comment`)}
                      >
                        Add Comments
                      </button>
                    </div>
                  </section>
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
                      <div className="trips_date">
                        Published On:{" "}
                        <HumanDate date={secondTrip.publication_date} />
                      </div>
                    </span>
                    <h3>{secondTrip?.category?.label}</h3>
                    <img className="subscribe__image" src={secondTrip?.image_url} />
                    <section className="subscribe__tripbody">
                      <div className="column">{secondTrip.content}</div>
                    </section>
                  </Link>
                  <section>
                    <h3>
                      Traveler:{" "}
                      <Link to={`/travelers/${secondTrip.traveler.id}`}>
                        <div className="travelerName">{secondTrip?.traveler?.full_name}</div>
                      </Link>
                    </h3>
                    <div className="buttonContainer">
                      <button className="button is-link is-rounded is-small"
                        onClick={() => navigate(`/trips/${secondTrip.id}/comments`)}
                      >
                        View Comments
                      </button>
                      <button className="button is-link is-rounded is-small"
                        onClick={() => navigate(`/trips/${secondTrip.id}/comment`)}
                      >
                        Add Comments
                      </button>
                    </div>
                  </section>
                </section>
              </div>
            </div>

            <div className="rowTripsContainer">
              {allOtherTrips.map((trip) => (
                <div className="bottomTrips">
                  <div className="columns is-centered">
                    <div className="column is-two-fifth">
                      <Link
                        style={{ textDecoration: "none", color: "inherit" }}
                        to={`/trips/${trip?.id}`}

                      >
                        <a href="/categories">{trip.category?.label}</a>
                        <br />
                        <p
                          className="title is-4 has-text-weight-bold is-margin"
                          aria-label="breadcrumbs"
                        >
                          {trip?.title}
                        </p>
                        <div className="subtitle is-6 has-text-weight-semibold is-custom-margin">
                          <h3>
                            Traveler:{" "}
                            <Link to={`/travelers/${trip.traveler.id}`}>
                              <div className="travelerName">{trip?.traveler?.full_name}</div>
                            </Link>
                          </h3>
                        </div>
                      </Link>
                      {trip?.title}

                      <div className="title is-6 has-text-weight-semibold is-margin">
                        {trip?.traveler?.full_name}
                      </div>
                      <div className="subtitle is-custom">
                        <span style={{ margin: 0, padding: 0 }}>
                          <HumanDate date={trip.publication_date} />
                        </span>
                      </div>
                      <div className="buttonContainer">
                        <button className="button is-link is-rounded is-small"
                          onClick={() => navigate(`/trips/${trip.id}/comments`)}
                        >
                          View Comments
                        </button>
                        <button className="button is-link is-rounded is-small"
                          onClick={() => navigate(`/trips/${trip.id}/comment`)}
                        >
                          Add Comments
                        </button>
                      </div>
                    </div>
                    <div className="column is-three-fifth">
                      <Link
                        style={{ textDecoration: "none", color: "inherit" }}
                        to={`/trips/${trip?.id}`}
                        className="hover"
                      >{trip.content}
                      </Link></div>
                    <div className="column is-two-fifth">
                      <Link
                        to={`/trips/${trip?.id}`}
                        className="subscribe__image"
                      ><img id="image" src={trip.image_url} alt="Image 1"></img></Link>

                    </div>
                    <hr class="hr"></hr>
                  </div>

                </div>
              )
              )}</div>
          </div>
        )
          : (<>
            <div className="subscribe__text">Subscribe to travelers to curate your personal homepage!</div>
          </>

          )}
      </article>
    </>
  )
}

