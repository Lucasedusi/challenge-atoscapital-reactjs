// ProtectedRoute.tsx
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthProvider";
import { HomePage } from "../../pages/Home";

export function ProtectedRoute() {
	const { isAuthenticated } = useContext(AuthContext);

	console.log("isAuthenticated:", isAuthenticated);

	return isAuthenticated ? <HomePage /> : <Navigate to="/" replace />;
}
