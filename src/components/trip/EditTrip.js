// import { useState, useEffect, useRef } from "react"
// import { useNavigate } from 'react-router-dom'
// import { updateTrip, getSingleTrip } from "../../managers/TripManager"
// import { getDestinations, addDestination } from "../../managers/DestinationManager"
// import { getTags, addNewTag } from "../../managers/TagManager"
// import "./Trip.css"

// export const EditTrip = ({ token }) => {

//     const [tags, setTags] = useState([])
//     const [tripTags, setTripTags] = useState(new Set())
//     const [destinations, setDestinations] = useState([])
//     const [newDestination, setNewDestination] = useState({
//         id: 0,
//         location: "",
//         state: "",
//         latitude: 0.0,
//         longitude: 0.0
//     })

//     const [currenTrip, setCurrentTrip] = useState({
//         destinationId: 0,
//         startDate: "",
//         endDate: "",
//         notes: "",
//         public: false,
//         tag: []
//     })

//     useEffect(
//         () => {
//             getTags().then((tagData) => setTags(tagData))
//             getDestinations().then((destinationData) => setDestinations(destinationData))
//         }, [])

//     const handleStartDestinationInfo = (event) => {
//         const startDestination = Object.assign({}, newDestination)
//         startDestination[event.target.name] = event.target.value
//         setNewDestination(startDestination)
//     }

//     const handleNewTripInfo = (event) => {
//         const newTrip = Object.assign({}, trip)
//         newTrip[event.target.name] = event.target.value
//         setCurrentTrip(newTrip)
//     }

//     const tagArr = (tagId) => {
//         let copy = new Set(tripTags)
//         copy.has(tagId) ? copy.delete(tagId) : copy.add(tagId)
//         setTripTags(copy)
//     }

//     useEffect(() => {
//         getSingleTrip(tripId).then((data) => {
//             setCurrentTrip(data)

//             const tagSet = new Set()
//             for (const tag of data.tags) {
//                 tagSet.add(tag.id)
//             }
//             setTripTags(tagSet)
//         })
//     }, [tripId])

//     const handleNewTripInfo = (event) => {
//         const copy = { ...currentTrip }
//         copy[event.target.name] = event.target.value;
//         setCurrentTrip(copy);
//     }

//     // const publishNewTrip = () => {

//     //     addDestination(newDestination)
//     //         .then((destination) => {
//     //             const tripToUpdate = {
//     //                 startDate: currenTrip.startDate,
//     //                 endDate: currenTrip.endDate,
//     //                 notes: currenTrip.notes,
//     //                 user_id: parseInt(token),
//     //                 public: false,
//     //                 tag: tagsToAPI,
//     //                 destination: destination.id
//     //             }
//     //             updateTrip(tripToUpdate)
//     //                 .then((trip) => {
//     //                     const tripTags = tagsToAPI.map((tag) => ({ tag_id: tag, trip_id: trip.id }));
//     //                     const tripDestinations = [{ destination_id: destination.id, trip_id: trip.id }];

//     //                     Promise.all([addNewTag(tagsToAPI), addTripDestination(tripDestinations), addTripTag(tripTags)])
//     //                         .then(() => {
//     //                             navigate("/");
//     //                         })
//     //                 });
//     //         })
//     // }

//     // const createNewDestination = (event) => {
//     //     event.preventDefault()
//     //     addDestination(newDestination)
//     //         .then((destination) => {
//     //             const newTrip = Object.assign({}, trip)
//     //             newTrip.destinationId = destination.id;
//     //             setCurrentTrip(newTrip)
//     //         })
//     // }

//     return (<>
//         <h2>Tell us about your next trip...</h2>
//         <form className="addNewTripForm">
//             <fieldset>
//                 <div>
//                     <label htmlFor="destination">Where are you going?</label>
//                     <br></br>
//                     <input
//                         type="text"
//                         name="location"
//                         required autoFocus
//                         className="locationInput"
//                         placeholder="City..."
//                         onChange={handleStartDestinationInfo} />
//                     <br></br>
//                     <input
//                         type="text"
//                         name="state"
//                         required autoFocus
//                         className="stateInput"
//                         placeholder="State..."
//                         onChange={handleStartDestinationInfo}
//                     />
//                     <br></br>
//                     <input
//                         type="text"
//                         name="latitude"
//                         required autoFocus
//                         className="latitudeInput"
//                         placeholder="Latitude..."
//                         onChange={handleStartDestinationInfo}
//                     />
//                     <br></br>
//                     <input
//                         type="text"
//                         name="longitude"
//                         required autoFocus
//                         className="longitudeInput"
//                         placeholder="Longitude..."
//                         onChange={handleStartDestinationInfo}
//                     />
//                 </div>

//                 <button
//                     onClick={createNewDestination}>
//                     Add Destination
//                 </button>
//             </fieldset>
//             <fieldset>
//                 <div>
//                     <label htmlFor="startDate">When do you plan on leaving?</label>
//                     <br></br>
//                     <input
//                         type="date"
//                         name="startDate"
//                         required autoFocus
//                         defaultValue={currentTrip.startDate}
//                         className="startDate"
//                         onChange={handleNewTripInfo} />

//                 </div>
//             </fieldset>
//             <fieldset>
//                 <div>
//                     <label htmlFor="endDate">When are you coming home?</label>
//                     <br></br>
//                     <input
//                         type="date"
//                         name="endDate"
//                         required autoFocus
//                         className="title-form-control"
//                         onChange={handleNewTripInfo} />
//                 </div>
//             </fieldset>
//             <fieldset>
//                 <div className="field">
//                     <label htmlFor="content" className="label">Tags: </label>
//                     {
//                         tags.map(tag => {
//                             const foundTag = currentTrip.tags.find(tripTag => tag.id === tripTag.id)

//                             return <div key={`tag--${tag.id}`}>
//                                 <input type="checkbox" name={tag.label}
//                                     defaultChecked={foundTag}
//                                     onClick={() => tagArr(tag.id)} />
//                                 <label htmlFor={tag.label}>{tag?.label}</label><br />
//                             </div>
//                         })
//                     }
//                 </div>
//                 ))
//             </fieldset>
//             <fieldset>
//                 <div>
//                     <textarea
//                         type="textbox"
//                         rows="5"
//                         cols="30"
//                         name="notes"
//                         required
//                         defaultValue={currentTrip.notes}
//                         autoFocus
//                         className="form-control"
//                         placeholder="Leave some notes about the trip..."
//                         onChange={handleNewTripInfo}
//                     />
//                 </div>
//             </fieldset>
//             <fieldset>
//                 <div>
//                     <label htmlFor="public">Would you like this trip to be public for your followers?</label>
//                     <div className="radioLabel">
//                         <input

//                             type="radio"
//                             className="radioButton"
//                             value={true}
//                             name="public"
//                             onClick={
//                                 () => {
//                                     const copy = { ...trip }
//                                     copy.public = true
//                                     handleNewTripInfo(copy)
//                                 }
//                             }
//                         />
//                         <label className="radioLabel">Yes</label>

//                         <input

//                             type="radio"
//                             className="radioButton"
//                             value={false}
//                             name="public"
//                             onClick={
//                                 () => {
//                                     const copy = { ...trip }
//                                     copy.musicianRequest = false
//                                     handleNewTripInfo(copy)
//                                 }
//                             }

//                         />
//                         <label className="radioLabel" >No</label>

//                     </div>
//                 </div>
//             </fieldset>


//             <button type="save" className="saveTripForm"
//                 onClick={evt => {
//                     evt.preventDefault()
//                     publishNewTrip()
//                 }}
//             >
//                 Save Trip
//             </button>

//         </form></>

//     )
// }

