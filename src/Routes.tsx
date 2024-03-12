import { Route, Routes } from "react-router-dom";
import { DefaultLayout } from "./layout/defaultLayout";
import { AddProducts } from "./pages/AddProducts";
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
				<Route path="/addProducts" element={<AddProducts />}></Route>
				<Route path="/:id/edit" element={<EditProducts />}></Route>
			</Route>
		</Routes>
	);
}
