import { Outlet } from "react-router-dom";

import { Header } from "../../components/Header";
import { MainLayout } from "../../components/MainLayout";
import { SideBar } from "../../components/SideBar";
import "./styles.scss";

export const DefaultLayout = () => {
	return (
		<MainLayout>
			<div className="header">
				<Header />
			</div>
			<div className="container">
				<SideBar />
				<div className="outlet">
					<Outlet />
				</div>
			</div>
		</MainLayout>
	);
};
