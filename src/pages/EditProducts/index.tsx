import axios from "axios";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
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

export const EditProducts = () => {
	const [products, setProducts] = useState();

	const { register, handleSubmit, setValue } = useForm<IProducts>();

	const navigate = useNavigate();

	const { id } = useParams<{ id: string }>();

	useEffect(() => {
		const getProducts = async () => {
			const response = await axios.get(`http://localhost:3001/products/${id}`);
			setProducts(response.data);

			setValue("product", response.data.product);
			setValue("category", response.data.category);
			setValue("codProduct", response.data.codProduct);
			setValue("priceProduto", response.data.priceProduto);
			setValue("qtdProduto", response.data.qtdProduto);
		};

		getProducts();
	}, [id, setValue]);

	const addProducts: SubmitHandler<IProducts> = async (data: IProducts) => {
		try {
			await axios.put<IProducts>(`http://localhost:3001/products/${id}`, data);
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
