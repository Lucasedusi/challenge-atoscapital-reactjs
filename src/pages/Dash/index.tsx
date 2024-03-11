import axios from "axios";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import "./styles.scss";

interface IProducts {
	id: number;
	product: string;
	category: string;
	codProduct: string;
	priceProduto: number;
	dateCadastro: Date;
	qtdProduto: number;
}

export const Dash = () => {
	const [products, setProducts] = useState<IProducts[]>([]);

	const { register, handleSubmit } = useForm<IProducts>();

	const navigate = useNavigate();

	const addProducts: SubmitHandler<IProducts> = async (data) => {
		try {
			const newProduct: IProducts = {
				id: data.id + 1,
				product: data.product,
				category: data.category,
				codProduct: data.codProduct,
				priceProduto: data.priceProduto,
				dateCadastro: new Date(),
				qtdProduto: data.qtdProduto,
			};

			await axios.post<IProducts>("http://localhost:3001/products", newProduct);

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
								<label htmlFor="descricao">Descrição:</label>
								<input
									type="text"
									placeholder="Descrição do produto"
									{...register("product")}
								/>
							</div>
							<div className="form-group">
								<label htmlFor="categoria">Categoria:</label>
								<input
									type="text"
									placeholder="Categoria do produto"
									{...register("category")}
								/>
							</div>
						</div>

						<div className="form-row">
							<div className="form-group">
								<label htmlFor="dataCadastro">Código</label>
								<input
									type="text"
									placeholder="Código do produto"
									{...register("codProduct")}
								/>
							</div>
							<div className="form-group">
								<label htmlFor="codigoProduto">Valor:</label>
								<input
									placeholder="Valor do Produto"
									{...register("priceProduto")}
								/>
							</div>
						</div>

						<div className="form-group">
							<label htmlFor="preco">Quantidade:</label>
							<input
								type="number"
								placeholder="Quantidade do produto"
								{...register("qtdProduto")}
							/>
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
