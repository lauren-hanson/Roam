import { Link } from "react-router-dom"
import "./Traveler.css"

export const Traveler = ({ traveler , setTravelers }) => (
    <section className="user__card" key={traveler.id}>
        <img src={traveler.profile_image_url} className="profileImage"/>
        <h3 className="traveler__name">
                <Link to={`/travelers/${traveler.id}`}>
                    <h3 className="traveler__name">{ traveler.full_name }</h3>
                </Link>
                <div className="traveler card__subtitle">{ traveler.followers_count } other travelers follow this author</div>
                <div className="traveler card__subtitle">{ traveler.user.email }</div>
                {/* <section className="traveler card__footer">
                    <SubscriptionForm traveler={traveler} setTravelers={setTravelers}/>
                </section> */}

        </h3>
    </section>
)
