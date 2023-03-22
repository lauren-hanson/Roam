import { Link } from "react-router-dom"
import "./Traveler.css"
import { SubscriptionForm } from "./Subscribe"

export const Traveler = ({ traveler, setTravelers }) => (
    <section className="travelerContainer" key={traveler.id}>
        <img src={traveler.profile_image_url} className="travelerDetailImage" />
        <h3 className="traveler__name">
            <Link to={`/travelers/${traveler.id}`}>
                <h3 className="traveler__name">{traveler.full_name}</h3>
            </Link>
            <div className="traveler card__subtitle">{traveler.followers_count} other travelers follow this Roamer</div>
            <div className="traveler card__subtitle">{traveler.user.email}</div>
            <section className="traveler card__footer">
                <SubscriptionForm traveler={traveler} setTravelers={setTravelers} />
            </section>

        </h3>
    </section>
)
