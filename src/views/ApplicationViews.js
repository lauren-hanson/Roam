import { Route, Routes } from "react-router-dom"
import { Login } from "../../src/components/auth/Login"
import { Register } from "../../src/components/auth/Register"
import { Authorized } from "./Authorized"

export const ApplicationViews = ({ token, setToken }) => {
	return (
		<>
			<Routes>
				<Route path="/login" element={<Login setToken={setToken} />} />
				<Route path="/register" element={<Register setToken={setToken} />} />
				<Route element={<Authorized token={token} />} >

				</Route>
			</Routes>
		</>
	)
}