import { SubmitHandler, useForm } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LayoutComponents } from "../../components/LayoutComponents";
import { AuthContext } from "../../context/AuthProvider";

import Logo from "../../assets/logo.svg";
import { Button } from "../../components/ButtonComponent";
import "./style.scss";

interface User {
	email: string;
	password: string;
}

const loginSchema = yup.object().shape({
	email: yup
		.string()
		.required("E-mail Obrigatório")
		.email("E-mail ou Senha inválidos"),
	password: yup
		.string()
		.required("Senha Obrigatória")
		.min(6, "E-mail ou Senha inválidos"),
});

export const LoginPage = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const { signIn, signed } = useContext(AuthContext);

	const { register, handleSubmit, formState } = useForm<User>({
		resolver: yupResolver(loginSchema),
	});

	const { errors } = formState;

	const navigate = useNavigate();

	const handleSignIn: SubmitHandler<User> = async () => {
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
			<LayoutComponents>
				<div className="login-form-title-description">
					<h1>Olá, 👋 </h1>
					<p>
						Faça login para começar a<br /> gerenciar seus produtos.
					</p>
				</div>
				<form onSubmit={handleSubmit(handleSignIn)} className="login-form">
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
	}
};
