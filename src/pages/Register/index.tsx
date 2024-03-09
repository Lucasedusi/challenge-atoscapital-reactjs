// src/components/RegisterForm.js
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Api } from "../../services/api";

import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Logo from "../../assets/logo.svg";

import { Link } from "react-router-dom";
import { Button } from "../../components/ButtonComponent";
import { LayoutComponents } from "../../components/LayoutComponents";

interface User {
	name: string;
	email: string;
	password: string;
}

const userSchema = yup.object().shape({
	name: yup.string().required("Nome Obrigatório"),
	email: yup.string().required("E-mail Obrigatório").email("E-mail Inválido"),
	password: yup
		.string()
		.required("Senha Obrigatória")
		.min(6, "Mínimo 6 caracteres"),
});

export const RegisterPage = () => {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const { register, handleSubmit, formState } = useForm<User>({
		resolver: yupResolver(userSchema),
	});

	const { errors } = formState;

	const handleCreateUser: SubmitHandler<User> = async () => {
		try {
			const data = {
				name: name,
				email: email,
				password: password,
			};

			await Api.post("create", data);
		} catch (error) {
			console.error("Erro ao cadastrar usuário:", error);
		}
	};

	return (
		<LayoutComponents>
			<div className="login-form-title-description">
				<h1>Cadastre-se</h1>
				<p>
					Preencha os campos para concluir <br /> seu cadastro
				</p>
			</div>
			<form onSubmit={handleSubmit(handleCreateUser)} className="login-form">
				<div className="wrap-input">
					<span>Nome</span>
					<input
						placeholder="Informe seu nome"
						className={email !== "" ? "has-value input" : "input"}
						{...register("email")}
						onChange={(e) => setEmail(e.target.value)}
					/>
				</div>

				{errors.email?.message && (
					<div className="input-error">
						<span>{errors.email?.message}</span>
					</div>
				)}

				<div className="wrap-input">
					<span>Email</span>
					<input
						placeholder="seuemail@email.com"
						className={email !== "" ? "has-value input" : "input"}
						{...register("email")}
						onChange={(e) => setEmail(e.target.value)}
					/>
				</div>

				{errors.email?.message && (
					<div className="input-error">
						<span>{errors.email?.message}</span>
					</div>
				)}

				<div className="wrap-input">
					<span>Senha</span>
					<input
						placeholder="Digite sua senha..."
						type="password"
						className={password !== "" ? "has-value input" : "input"}
						{...register("password")}
						onChange={(e) => setPassword(e.target.value)}
					/>
				</div>

				{errors.password?.message && (
					<div className="input-error">
						<span>{errors.password?.message}</span>
					</div>
				)}

				<Button type="submit" className="login-form-btn">
					Login
				</Button>
			</form>

			<div className="line-container">
				<span className="line-text">Ou</span>
			</div>

			<div className="account">
				Não possui conta?
				<Link to="/register" className="link-password">
					Cadastre-se
				</Link>
				<div className="logo-image-footer">
					<img src={Logo} alt="Jovem Programador" />
				</div>
			</div>
		</LayoutComponents>
	);
};

export default RegisterPage;
