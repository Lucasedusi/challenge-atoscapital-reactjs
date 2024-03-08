import { Route, Routes } from "react-router-dom";
import { HomePage } from "./pages/Home";
import { LoginPage } from "./pages/Login";
import { ProtectdLayout } from "./components/ProtectedLayout";
import RegisterPage from "./pages/Register";

export function Router() {
	return (
		<Routes>
			<Route path="/" element={<LoginPage />}></Route>
			<Route path="/register" element={<RegisterPage />}></Route>
			<Route path="/home" element={<HomePage />}></Route>
		</Routes>
	);
}
