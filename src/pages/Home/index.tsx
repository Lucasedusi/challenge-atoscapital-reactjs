import { FaRegEdit, FaRegTrashAlt } from "react-icons/fa";

import axios from "axios";
import { useEffect, useState } from "react";
import { IoMdSearch } from "react-icons/io";
import { Link } from "react-router-dom";
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

export const HomePage = () => {
	const [products, setProducts] = useState<IProducts[]>([]);
	const [search, setSearch] = useState("");
	const [showConfirmationModal, setShowConfirmationModal] = useState(false);
	const [productIdToDelete, setProductIdToDelete] = useState<number | null>(
		null
	);
	const [totalCadastros, setTotalCadastros] = useState<number>(0);

	useEffect(() => {
		const getProducts = async () => {
			const response = await axios.get("http://localhost:3001/products");

			setProducts(response.data);
			setTotalCadastros(response.data.length);
		};

		getProducts();
	}, []);

	const filteredProducts =
		search.length > 0
			? products.filter((product) => product.product.includes(search))
			: [];

	const confirmDelete = (id: number) => {
		setProductIdToDelete(id);
		setShowConfirmationModal(true);
	};

	const handleRemoveProduct = (id: number) => {
		if (productIdToDelete !== null) {
			axios.delete(`http://localhost:3001/products/${id}`);

			const removeProduct = products.filter((product) => product.id !== id);

			setProducts(removeProduct);
			setTotalCadastros(removeProduct.length);

			setShowConfirmationModal(false);
			setProductIdToDelete(null);
		}
	};

	const cancelDelete = () => {
		setShowConfirmationModal(false);
		setProductIdToDelete(null);
	};

	return (
		<div>
			<div className="container-welcome">
				<div className="welcome-user">
					<h1>Olá, Usuário</h1>
					<p>Seja bem-vindo</p>
				</div>

				<Link className="btn-add-product" to={"/addProducts"}>
					+ Novo Produto
				</Link>
			</div>

			<div className="container-products">
				<div className="title-products">
					<h1>Seus Cadastros</h1>
				</div>

				<div className="group-qtd-produtcs">
					<p className="number-products">{totalCadastros}</p>
					<p className="text-products">Total de Cadastros</p>
				</div>
			</div>

			<div className="container-search-bar">
				<div className="main-search-bar-products">
					<div className="search-bar-products">
						<div className="search-icon-products">
							<IoMdSearch size={18} />
						</div>
						<input
							type="text"
							placeholder="Pesquisar..."
							onChange={(e) => setSearch(e.target.value)}
							value={search}
						/>
					</div>
				</div>

				<p className="text-update">Última atualização: 10 de Março 10:45 AM</p>
			</div>

			<table className="custom-table">
				<thead>
					<tr>
						<th>Descrição</th>
						<th>Categoria</th>
						<th>Quantidade de Produtos</th>
						<th>Cód do Produto</th>
						<th>Preços</th>
						<th>Ações</th>
					</tr>
				</thead>
				<tbody>
					{search.length > 0 ? (
						<>
							{filteredProducts.map((product) => (
								<tr key={product.id}>
									<td>{product.product}</td>
									<td>{product.category}</td>
									<td>{product.qtdProduto}</td>
									<td>{product.codProduct}</td>
									<td>{product.priceProduto}</td>
									<td className="actions">
										<button className="edit-button">
											<FaRegEdit size={12} color="#fff" /> Editar
										</button>
										<button
											type="button"
											className="delete-button"
											onClick={() => confirmDelete(product.id)}
										>
											<FaRegTrashAlt size={12} color="#fff" /> Excluir
										</button>
									</td>
								</tr>
							))}
						</>
					) : (
						<>
							{products.map((product) => (
								<tr key={product.id}>
									<td>{product.product}</td>
									<td>{product.category}</td>
									<td>{product.qtdProduto}</td>
									<td>{product.codProduct}</td>
									<td>{product.priceProduto}</td>
									<td className="actions">
										<Link className="edit-button" to={`/${product.id}/edit`}>
											<FaRegEdit size={12} color="#fff" /> Editar
										</Link>
										<button
											type="button"
											className="delete-button"
											onClick={() => confirmDelete(product.id)}
										>
											<FaRegTrashAlt size={12} color="#fff" /> Excluir
										</button>
									</td>
								</tr>
							))}
						</>
					)}
				</tbody>
			</table>

			{showConfirmationModal && (
				<div className="confirmation-modal-container">
					<div className="confirmation-modal">
						<p>Deseja realmente excluir este produto?</p>
						<button onClick={cancelDelete}>Cancelar</button>
						<button
							onClick={() => {
								if (productIdToDelete !== null) {
									handleRemoveProduct(productIdToDelete);
								}
							}}
						>
							Sim
						</button>
					</div>
				</div>
			)}
		</div>
	);
};
