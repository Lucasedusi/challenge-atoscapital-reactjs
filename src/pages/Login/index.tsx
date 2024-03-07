import { Button, Input } from "@chakra-ui/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useAuth } from "../../context/AuthProvider/useAuth";
import { useNavigate } from "react-router-dom";

interface User {
	email: string;
	password: string;
}

export function LoginPage() {
	const auth = useAuth();

	const { register, handleSubmit } = useForm<User>();

	const navigate = useNavigate();

	const handleLogin: SubmitHandler<User> = async (data) => {
		try {
			await auth.authenticate(data.email, data.password);

			navigate("/home");
		} catch (error) {
			alert("erro");
		}
	};

	return (
		<form onSubmit={handleSubmit(handleLogin)}>
			<Input type="text" {...register("email")} />
			<Input type="password" {...register("password")} />
			<Button type="submit">Entrar</Button>
		</form>
	);
}
