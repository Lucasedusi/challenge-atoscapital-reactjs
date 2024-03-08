import { Button, Input } from "@chakra-ui/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Navigate } from "react-router-dom";

import { useAuth } from "../../context/AuthProvider/useAuth";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthProvider";

interface User {
	email: string;
	password: string;
}

export function LoginPage() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const { signIn, signed } = useContext(AuthContext);

	const { register, handleSubmit } = useForm<User>();

	const navigate = useNavigate();

	const handleLogin: SubmitHandler<User> = async () => {
		const data = {
			email: email,
			password: password,
		};

		await signIn(data);
	};

	if (signed) {
		return navigate("/home");
	} else {
		return (
			<form onSubmit={handleSubmit(handleLogin)}>
				<Input
					type="text"
					{...register("email")}
					onChange={(e) => setEmail(e.target.value)}
				/>
				<Input
					type="password"
					{...register("password")}
					onChange={(e) => setPassword(e.target.value)}
				/>
				<Button type="submit">Entrar</Button>
			</form>
		);
	}
}
