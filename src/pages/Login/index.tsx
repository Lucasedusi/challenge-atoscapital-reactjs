import { Button, Input } from "@chakra-ui/react";
import { SubmitHandler, useForm } from "react-hook-form";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import "./style.scss";

import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthProvider";

interface User {
	email: string;
	password: string;
}

const loginSchema = yup.object().shape({
	email: yup.string().required("E-mail Obrigatório").email("E-mail Inválido"),
	password: yup.string().required("Senha Obrigatória").min(6, "Senha Inválida"),
});

export function LoginPage() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const { signIn, signed } = useContext(AuthContext);

	const { register, handleSubmit, formState } = useForm<User>({
		resolver: yupResolver(loginSchema),
	});

	const { errors } = formState;

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
			<form onSubmit={handleSubmit(handleLogin)} className="login-form">
				<span className="login-form-title">
					{/* <img src={logoImg} alt="Jovem Programador" /> */}
				</span>

				<div className="wrap-input">
					<input
						className={email !== "" ? "has-value input" : "input"}
						{...register("email")}
						onChange={(e) => setEmail(e.target.value)}
					/>
					<span className="focus-input" data-placeholder="Email"></span>
				</div>

				{errors.email?.message && (
					<div className="input-error">
						<span>{errors.email?.message}</span>
					</div>
				)}

				<div className="wrap-input">
					<input
						type="password"
						className={password !== "" ? "has-value input" : "input"}
						{...register("password")}
						onChange={(e) => setPassword(e.target.value)}
					/>
					<span className="focus-input" data-placeholder="Senha"></span>
				</div>

				{errors.password?.message && (
					<div className="input-error">
						<span>{errors.password?.message}</span>
					</div>
				)}

				<div className="container-login-form-btn">
					<Button type="submit" className="login-form-btn">
						Entrar
					</Button>
				</div>

				<div className="text-center">
					<Link to="/register" className="link-password">
						Criar Conta
					</Link>
				</div>
			</form>
		);
	}
}
