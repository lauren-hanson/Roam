import { Route, Routes } from "react-router-dom"
import { Login } from "../components/auth/Login"
import { Register } from "../components/auth/Register"
import { Authorized } from "./Authorized"
import { MyTrips } from "../../src/components/trip/MyTrips"
import { NewTrip } from "../../src/components/trip/NewTrip"


export const ApplicationViews = ({ token, setToken }) => {
	return (
		<>
			<Routes>
				<Route path="/login" element={<Login setToken={setToken} />} />
				<Route path="/register" element={<Register setToken={setToken} />} />
				<Route path="/">
					<Route index element={<MyTrips token={token} />} />
				</Route>
				<Route element={<Authorized token={token} />} >
					<Route path="/trips" >
						<Route path="newtrip" element={<NewTrip token={token} />} />
					</Route>
				</Route>
			</Routes>
		</>
	)
}