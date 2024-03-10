import { Outlet } from "react-router-dom";
import { LayoutComponents } from "../../components/LayoutComponents";

import "./styles.scss";

export const DefautlLayout = () => {
	return (
		<LayoutComponents>
			<p>HEADER</p>
			<Outlet />
		</LayoutComponents>
	);
};
