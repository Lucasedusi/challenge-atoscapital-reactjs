import Logo from "../../assets/logo.svg";
import "./styles.scss";

import { IoIosNotifications, IoMdSearch } from "react-icons/io";
import { MdOutlineHelp } from "react-icons/md";
import { RxAvatar } from "react-icons/rx";

export const Header = () => {
	return (
		<>
			<div className="logo">
				<img src={Logo} alt="Logo Atos Capital" />
			</div>
			<div className="main-search-bar">
				<div className="search-bar">
					<div className="search-icon">
						<IoMdSearch size={18} />
					</div>
					<input type="text" placeholder="Pesquisar..." />
				</div>
			</div>
			<div className="group-info">
				<div className="help-icons">
					<MdOutlineHelp size={24} color="#898989" />
					<IoIosNotifications size={24} color="#898989" />
				</div>

				<div className="group-avatar-name">
					<RxAvatar size={36} />
					<p>Lucas Eduardo</p>
				</div>
			</div>
		</>
	);
};
