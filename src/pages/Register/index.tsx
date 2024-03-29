import { useContext, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Logo from "../../assets/logo.svg";

import { AuthLayout } from "../../components/AuthLayout";
import { Button } from "../../components/Button";

import { FaChevronLeft } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { IRegister } from "../../@types/Products";
import { AuthContext } from "../../context/AuthProvider";
import "./styles.scss";

const userSchema = yup.object().shape({
	name: yup.string().required("Nome Obrigatório"),
	email: yup.string().required("E-mail Obrigatório").email("E-mail Inválido"),
	password: yup
		.string()
		.required("Senha Obrigatória")
		.min(2, "Mínimo 2 caracteres"),
	confirPassword: yup
		.string()
		.required("Confirmação de Senha Obrigatória")
		.min(2, "Mínimo 2 caracteres")
		.oneOf([yup.ref("password")], "As senhas precisam ser iguais"),
});

export const RegisterPage = () => {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirPassword, setConfirPassword] = useState("");

	const { register, handleSubmit, formState, clearErrors } = useForm<IRegister>(
		{
			resolver: yupResolver(userSchema),
		}
	);

	const { Account } = useContext(AuthContext);

	const { errors } = formState;

	const navigate = useNavigate();

	const handleCreateUser: SubmitHandler<IRegister> = async () => {
		try {
			const data = {
				name: name,
				email: email,
				password: password,
			};

			await Account(data);

			navigate("/home");
		} catch (error) {
			console.error("Erro ao cadastrar usuário:", error);
		}
	};

	return (
		<AuthLayout>
			<div className="register-form-title-description">
				<Link to={"/"} className="register-return">
					<FaChevronLeft color="#0c1421" size={12} />
					Retornar
				</Link>

				<h1>Cadastre-se</h1>
				<p>Preencha os campos para concluir seu cadastro</p>
			</div>
			<form onSubmit={handleSubmit(handleCreateUser)} className="login-form">
				<div className="wrap-input">
					<span>Nome</span>
					<input
						className={name !== "" ? "has-value input" : "input"}
						placeholder="Informe seu nome"
						{...register("name")}
						onChange={(e) => setName(e.target.value)}
					/>
				</div>

				{errors.name?.message && (
					<div className="input-error">
						<span>{errors.name?.message}</span>
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

				<div className="wrap-input">
					<span>Confirme a Senha</span>
					<input
						placeholder="Confirme a senha..."
						type="password"
						className={confirPassword !== "" ? "has-value input" : "input"}
						{...register("confirPassword")}
						onChange={(e) => setConfirPassword(e.target.value)}
					/>
				</div>

				{errors.confirPassword?.message && (
					<div className="input-error">
						<span>{errors.confirPassword?.message}</span>
					</div>
				)}

				<Button type="submit" className="btn-primary">
					Cadastre-se
				</Button>
			</form>
			<div className="footer">
				<div className="logo-image-footer">
					<img src={Logo} alt="Logo Atos Capital" />
				</div>
			</div>
		</AuthLayout>
	);
};
