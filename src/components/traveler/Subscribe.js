import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from "react"
import { getTravelerById, getTravelers } from "../../managers/TravelerManager"
import { addSubscription, deleteSubscription } from "../../managers/SubscriptionManager"

export const SubscriptionForm = ({ traveler , setTraveler, setTravelers }) => {
  
  return <>
      {
        traveler.subscribed 
        ?
            <button className="button is-warning users__follow_button" width="fit-content"
            onClick={() => {
                deleteSubscription(traveler.id)
                .then(() => {
                  getTravelerById(traveler.id)
                  .then(setTraveler)
                })
                .then(() => {
                  getTravelers()
                  .then(setTravelers)
                })
            }}>Unfollow</button>
        :
            <button className="button"
            onClick={() => {
                addSubscription(traveler.id)
                .then(() => {
                  getTravelerById(traveler.id)
                  .then(setTraveler)
                })
                .then(() => {
                  getTravelers()
                  .then(setTravelers)
                })
            }}>Follow</button>
      }
    </>
  }