import { useAuth } from "../../context/AuthProvider/useAuth";

export const ProtectdLayout = ({ children }: { children: JSX.Element }) => {
	const auth = useAuth();

	if (!auth.email) {
		return <h1>Não tem acesso</h1>;
	}

	return children;
};
