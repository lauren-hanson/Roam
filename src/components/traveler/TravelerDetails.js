import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import { getTravelerById } from "../../managers/TravelerManager"
import { SubscriptionForm } from "./Subscribe"
import "./Traveler.css"

export const TravelerDetails = ({ token }) => {
  const [traveler, setTraveler] = useState({
    profile_image_url: "",
    full_name: "",
    bio: "",
    user: {
      date_joined: "",
      email: "",
      username: ""
    }
  })

  const { travelerId } = useParams()

  useEffect(() => {
    getTravelerById(travelerId)
      .then(setTraveler)
  }, [travelerId])

  const date = traveler.user.date_joined

  return (
    <>

      <Link
        style={{ textDecoration: "none", color: "inherit" }}
        to={`/travelers`}
        className="hover goBack"
      > ⬅️ All Roamers
      </Link>
      <br></br>
      <Link
        style={{ textDecoration: "none", color: "inherit" }}
        to={`/connect/discover`}
        className="hover goBack"
      > ⬅️ Trips
      </Link>
      <section className="travelerContainer">
        <div className="travelerPhotoBio">
          <section className="detailImage">
            <img src={traveler.profile_image_url} />
            <div className="travelerLabel">{traveler.bio}</div>
          </section>
        </div>
        <article className="traveler__info">
          <SubscriptionForm traveler={traveler} setTraveler={setTraveler} />
        </article>
      </section>
    </>
  )
}


