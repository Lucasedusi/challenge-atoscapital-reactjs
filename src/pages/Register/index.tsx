// src/components/RegisterForm.js
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import {
	FormControl,
	FormLabel,
	Input,
	Button,
	Stack,
	FormErrorMessage,
} from "@chakra-ui/react";
import { Api } from "../../services/api";

interface User {
	name: string;
	email: string;
	password: string;
}

const RegisterPage = () => {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const { register, handleSubmit } = useForm<User>();

	const onSubmit: SubmitHandler<User> = async () => {
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
		<form onSubmit={handleSubmit(onSubmit)}>
			<Stack spacing={4}>
				<FormControl id="name">
					<FormLabel>Nome</FormLabel>
					<Input
						type="text"
						{...register("name", { required: "Email é obrigatório" })}
						onChange={(e) => setName(e.target.value)}
					/>
					<FormErrorMessage></FormErrorMessage>
				</FormControl>
				<FormControl id="email">
					<FormLabel>Email</FormLabel>
					<Input
						type="email"
						{...register("email", { required: "Email é obrigatório" })}
						onChange={(e) => setEmail(e.target.value)}
					/>
					<FormErrorMessage></FormErrorMessage>
				</FormControl>
				<FormControl id="password">
					<FormLabel>Senha</FormLabel>
					<Input
						type="password"
						{...register("password", { required: "Senha é obrigatória" })}
						onChange={(e) => setPassword(e.target.value)}
					/>
					<FormErrorMessage></FormErrorMessage>
				</FormControl>
				<Button type="submit" colorScheme="blue">
					Cadastrar
				</Button>
			</Stack>
		</form>
	);
};

export default RegisterPage;
