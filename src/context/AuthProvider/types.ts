export interface IUser {
	name?: string;
	id: number;
	email: string;
}

export interface AuthContextData {
	token: string | null;
	isAuthenticated: boolean;
	signIn: (credentials: { email: string; password: string }) => Promise<void>;
	Account: (credentials: {
		name: string;
		email: string;
		password: string;
	}) => Promise<void>;
	signOut: () => void;
}

export interface IAuthProvider {
	children: JSX.Element;
}
