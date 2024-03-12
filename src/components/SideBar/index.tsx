import { BsFillBagCheckFill } from "react-icons/bs";
import { Link } from "react-router-dom";

import "./styles.scss";

export const SideBar = () => {
	return (
		<div className="sidebar">
			<div className="navigation">
				<Link className="text-navigation" to={"/home"}>
					<BsFillBagCheckFill size={20} color="#89131D" />
					Produtos
				</Link>
			</div>
		</div>
	);
};
