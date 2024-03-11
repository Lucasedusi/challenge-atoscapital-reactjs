import { Route, Routes } from "react-router-dom";
import { DefaultLayout } from "./layout/defaultLayout";
import { Dash } from "./pages/Dash";
import { EditProducts } from "./pages/EditProducts";
import { HomePage } from "./pages/Home";
import { LoginPage } from "./pages/Login";
import { RegisterPage } from "./pages/Register";

export function Router() {
	return (
		<Routes>
			<Route path="/" element={<LoginPage />}></Route>
			<Route path="/register" element={<RegisterPage />}></Route>
			<Route element={<DefaultLayout />}>
				<Route path="/home" element={<HomePage />}></Route>
				<Route path="/dash" element={<Dash />}></Route>
				<Route path="/:id/edit" element={<EditProducts />}></Route>
			</Route>
		</Routes>
	);
}
