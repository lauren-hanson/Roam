import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import { getTravelerById } from "../../managers/TravelerManager"
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
  const formatted_date = new Date(date).toLocaleDateString("en-US")

  return (
    <>
      <Link
        style={{ textDecoration: "none", color: "inherit" }}
        to={`/travelers`}
        className="hover"
      > ⬅️ All Roamers
      </Link>
      <section className="travelers__container">
        <section className="travelerdetail__image">
          <img className="profileImage" src={traveler.profile_image_url} />
        </section>
        <article className="traveler__info">
          <h3 className="traveler__name">Name: {traveler.full_name}</h3>
          <div className="traveler__bio">Bio: {traveler.bio}</div>
        </article>
      </section>
    </>
  )
}
