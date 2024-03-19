export interface IUser {
	id: number;
	email: string;
}

export interface AuthContextData {
	token: string | null;
	isAuthenticated: boolean;
	signIn: (credentials: { email: string; password: string }) => Promise<void>;
	signOut: () => void;
}

export interface IAuthProvider {
	children: JSX.Element;
}
