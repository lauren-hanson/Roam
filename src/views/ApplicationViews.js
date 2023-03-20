import { Route, Routes } from "react-router-dom"
import { Login } from "../components/auth/Login"
import { Register } from "../components/auth/Register"
import { Authorized } from "./Authorized"
import { NewTrip } from "../../src/components/trip/NewTrip"
import { MyTripList } from "../components/trip/MyTripList"
import { TripDetails } from "../../src/components/trip/TripDetails"
import { EditTrip } from "../../src/components/trip/EditTrip"
import { ItemList } from "../../src/components/packlist/ItemList"
import { PackList } from "../../src/components/packlist/PackList"
import { TravelerList } from "../components/traveler/TravelerList"
import { TravelerDetails } from "../components/traveler/TravelerDetails"
import { Connect } from "../components/connect/Connect"

export const ApplicationViews = ({ token, setToken }) => {
	return (
		<>
			<Routes>
				<Route path="/login" element={<Login setToken={setToken} />} />
				<Route path="/register" element={<Register setToken={setToken} />} />
				<Route path="/">
				</Route>
				<Route element={<Authorized token={token} />} >
					<Route path="/trips" >
						{/* <Route index element={<MyTrips token={token} />} /> */}
						{/* <Route index element={<TripContainer token={token} />} /> */}
						<Route index element={<MyTripList token={token} />} />
						<Route path=":tripId" element={<TripDetails path=":tripId" token={token} />} />
						<Route path="newtrip" element={<NewTrip token={token} />} />
						<Route path="edit/:tripId" element={<EditTrip token={token} />} />
					</Route>
					<Route path="/packlist" >
						<Route index element={<PackList token={token} />} />
						{/* <Route path="items" element={<ItemList token={token} />} /> */}
					</Route>
					<Route path="/connect" >
						<Route index element={<Connect token={token} />} />
					</Route>
					<Route path="/travelers" >
						<Route index element={<TravelerList token={token} />} />
						<Route path=":travelerId" element={<TravelerDetails
							token={token} />} />
					</Route>
				</Route>
			</Routes>
		</>
	)
}