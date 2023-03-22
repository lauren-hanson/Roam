import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { getTravelers } from "../../managers/TravelerManager"
import { Traveler } from "./Traveler"
import "./Traveler.css"


export const TravelerList = ({ token }) => {
  const [travelers, setTravelers] = useState([{
    user: {

    }
  }])
  const navigate = useNavigate()

  useEffect(() => {
    getTravelers().then((travelersData) => setTravelers(travelersData))
  }, [])

  return (
    <>
      <div style={{ marginTop: "2rem" }}>
        <h1 className="travelerHeader">Roam Travelers</h1>
        <section className="travelersContainer">
          {travelers.map((traveler) => (
            <Traveler key={`traveler=${traveler.id}`} traveler={traveler} setTravelers={setTravelers} />
          ))}
        </section>
      </div>
    </>
  )
}
