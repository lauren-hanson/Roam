import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { getTravelers } from "../../managers/TravelerManager"
import { Traveler } from "./Traveler"


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
        <section className="travelers__container">
        <h1 className="travelers__title">Roam Travelers</h1>
          {travelers.map((traveler) => (
            <Traveler key={traveler.id} traveler={traveler} setTravelers={setTravelers}/>
          ))}
        </section>
      </div>
    </>
  )
}
