import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";

import { IProductsAdd } from "../../@types/Products";
import "./styles.scss";

const productsSchema = yup.object().shape({
	product: yup.string().required("Campo Obrigatório"),
	category: yup.string().required("Campo Obrigatório"),
	codProduct: yup.string().required("Campo Obrigatório"),
	priceProducts: yup.number().required("Campo Obrigatório"),
	qtdProduto: yup.number().required("Campo Obrigatório"),
});

export const AddProducts = () => {
	const [products, setProducts] = useState<IProductsAdd[]>([]);

	const { register, handleSubmit, formState } = useForm<IProductsAdd>({
		resolver: yupResolver(productsSchema),
	});

	const { errors } = formState;

	const navigate = useNavigate();

	const addProducts: SubmitHandler<IProductsAdd> = async (data) => {
		try {
			const newProduct: IProductsAdd = {
				product: data.product,
				category: data.category,
				codProduct: data.codProduct,
				priceProducts: data.priceProducts,
				dateCadastro: new Date(),
				qtdProduto: data.qtdProduto,
			};

			await axios.post<IProductsAdd>(
				"http://localhost:3001/products",
				newProduct
			);

			setProducts([...products, newProduct]);
		} catch (error) {
		} finally {
			navigate("/home");
		}
	};

	return (
		<div>
			<div className="container-welcome">
				<div className="welcome-user">
					<h1>Olá, Usuário</h1>
					<p>Seja bem-vindo</p>
				</div>
			</div>

			<div className="container-add-products">
				<div className="title-add-products">
					<h1>Cadastrar Produto</h1>
				</div>

				<form onSubmit={handleSubmit(addProducts)}>
					<div className="form-container-inputs">
						<div className="form-title-subtitle">
							<h2>Informações sobre o produto</h2>
							<p>
								Favor inserir as informações relativas ao produto que deseja
								cadastrar.
							</p>
						</div>

						<div className="form-row">
							<div className="form-group">
								<label>Descrição:</label>
								<input
									type="text"
									placeholder="Descrição do produto"
									{...register("product")}
								/>
								{errors.product?.message && (
									<div className="input-error">
										<span>{errors.product?.message}</span>
									</div>
								)}
							</div>

							<div className="form-group">
								<label>Categoria:</label>
								<input
									type="text"
									placeholder="Categoria do produto"
									{...register("category")}
								/>
								{errors.category?.message && (
									<div className="input-error">
										<span>{errors.category?.message}</span>
									</div>
								)}
							</div>
						</div>

						<div className="form-row">
							<div className="form-group">
								<label>Código</label>
								<input
									type="text"
									placeholder="Código do produto"
									{...register("codProduct")}
								/>
								{errors.codProduct?.message && (
									<div className="input-error">
										<span>{errors.codProduct?.message}</span>
									</div>
								)}
							</div>

							<div className="form-group">
								<label>Valor:</label>
								<input
									type="number"
									placeholder="Valor do Produto"
									{...register("priceProducts")}
								/>

								{errors.priceProducts?.message && (
									<div className="input-error">
										<span>{errors.priceProducts?.message}</span>
									</div>
								)}
							</div>
						</div>

						<div className="form-group">
							<label>Quantidade:</label>
							<input
								type="number"
								placeholder="Quantidade de produto"
								{...register("qtdProduto")}
							/>

							{errors.qtdProduto?.message && (
								<div className="input-error">
									<span>{errors.qtdProduto?.message}</span>
								</div>
							)}
						</div>
					</div>

					<div className="container-title-confirm">
						<div className="subtitle-confirm">
							<h1>Confirmação</h1>
							<p>Confira os dados informados antes de cadastrar o produto</p>
						</div>

						<button className="btn-add-product">Cadastrar</button>
					</div>
				</form>
			</div>
		</div>
	);
};
