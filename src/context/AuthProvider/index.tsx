import { createContext, useState, useEffect, ReactNode } from "react";
import { useToast } from "@chakra-ui/react";
import { Api } from "../../services/api";
// Importe o cliente de API que você está usando

interface User {
	id: number;
	email: string;
	// Adicione outras propriedades do usuário conforme necessário
}

interface AuthContextData {
	user: User | null;
	signed: boolean;
	signIn: (credentials: { email: string; password: string }) => Promise<void>;
	signOut: () => void;
}

export const AuthContext = createContext<AuthContextData>(
	{} as AuthContextData
);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
	children,
}) => {
	const [user, setUser] = useState<User | null>(null);
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
		</AuthContext.Provider>
	);
};
