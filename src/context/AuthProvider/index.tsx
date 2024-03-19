import { ReactNode, createContext, useEffect, useState } from "react";
import { Api } from "../../services/api";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContextData } from "./types";

export const AuthContext = createContext<AuthContextData>(
	{} as AuthContextData
);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
	children,
}) => {
	const [token, setToken] = useState<string | null>(() => {
		return localStorage.getItem("@Auth:token") || null;
	});

	useEffect(() => {
		const loadTokenFromStorage = async () => {
			const storageToken = localStorage.getItem("@Auth:token");
			if (storageToken) {
				setToken(storageToken);
			}
		};

		loadTokenFromStorage();
	}, []);

	const signIn = async ({
		email,
		password,
	}: {
		email: string;
		password: string;
	}) => {
		try {
			const response = await Api.post("/login", { email, password });

			if (response.data.error) {
				toast.error("Erro ao fazer login", {});
			} else {
				const accessToken = response.data.access_token;
				setToken(accessToken);
				Api.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
				localStorage.setItem("@Auth:token", accessToken);
			}
		} catch (error) {
			toast.error("Erro ao fazer login", {});
		}
	};

	const signOut = () => {
		localStorage.removeItem("@Auth:token");
		setToken(null);
	};

	return (
		<AuthContext.Provider
			value={{ token, isAuthenticated: !!token, signIn, signOut }}
		>
			{children}
			<ToastContainer />
		</AuthContext.Provider>
	);
};
