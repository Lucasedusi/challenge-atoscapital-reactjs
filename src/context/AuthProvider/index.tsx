import { useToast } from "@chakra-ui/react";
import { ReactNode, createContext, useEffect, useState } from "react";
import { Api } from "../../services/api";
import { AuthContextData, IUser } from "./types";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const AuthContext = createContext<AuthContextData>(
	{} as AuthContextData
);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
	children,
}) => {
	const [user, setUser] = useState<IUser | null>(null);
	const toast = useToast();

	useEffect(() => {
		const loadingStorageData = async () => {
			const storageUser = localStorage.getItem("@Auth:user");
			const storageToken = localStorage.getItem("@Auth:token");

			if (storageUser && storageToken) {
				setUser(JSON.parse(storageUser));
			}
		};

		loadingStorageData();
	}, []);

	const signIn = async ({
		email,
		password,
	}: {
		email: string;
		password: string;
	}) => {
		try {
			const response = await Api.post("/auth", { email, password });

			if (response.data.error) {
				toast({
					title: `${response.data.error}`,
					status: "error",
					duration: 5000,
					isClosable: true,
				});
			} else {
				setUser(response.data.user);
				Api.defaults.headers.common[
					"Authorization"
				] = `Bearer ${response.data.token}`;
				localStorage.setItem("@Auth:token", response.data.token);
				localStorage.setItem("@Auth:user", JSON.stringify(response.data.user));
			}
		} catch (error) {
			console.error("Erro ao fazer login:", error);
			toast({
				title: "Erro ao fazer login",
				description: "E-mail ou senha incorretos",
				status: "error",
				duration: 5000,
				isClosable: true,
			});
		}
	};

	const signOut = () => {
		localStorage.clear();
		setUser(null);
	};

	return (
		<AuthContext.Provider
			value={{
				user,
				signed: !!user,
				signIn,
				signOut,
			}}
		>
			{children}
			<ToastContainer />
		</AuthContext.Provider>
	);
};
