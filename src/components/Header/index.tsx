import { useContext, useEffect, useState } from "react";
import Logo from "../../assets/logo.svg";
import "./styles.scss";

import axios from "axios";
import { IoMdExit, IoMdSearch } from "react-icons/io";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthProvider";

export interface IUser {
	username: string;
}

export const Header = () => {
	const [user, setUser] = useState<IUser | null>(null);

	const { signOut } = useContext(AuthContext);

	useEffect(() => {
		const getUsers = async () => {
			try {
				const response = await axios.get<IUser>("http://localhost:3001/users");
				setUser(response.data);
			} catch (error) {
				console.error("Error fetching user data:", error);
			}
		};

		getUsers();
	}, []);

	const handleSignOut = () => {
		signOut();
	};

	return (
		<>
			<div className="logo">
				<Link to={"/home"}>
					<img src={Logo} alt="Logo Atos Capital" />
				</Link>
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
				<div className="group-avatar-name">
					<img src="https://avatars.githubusercontent.com/u/33089713?v=4" />
					<p>{user ? user.username : "Loading..."}</p>
				</div>

				<div className="help-icons">
					<IoMdExit size={24} color="#898989" onClick={handleSignOut} />
				</div>
			</div>
		</>
	);
};
