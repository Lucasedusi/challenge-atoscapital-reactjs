import { FaRegEdit, FaRegTrashAlt } from "react-icons/fa";
import { TbClipboardText } from "react-icons/tb";

import axios from "axios";
import { useEffect, useState } from "react";
import { IoMdSearch } from "react-icons/io";
import { Link } from "react-router-dom";
import { IProducts } from "../../@types/Products";
import "./styles.scss";

export const HomePage = () => {
	const [products, setProducts] = useState<IProducts[]>([]);
	const [search, setSearch] = useState("");
	const [showConfirmationModal, setShowConfirmationModal] = useState(false);
	const [productIdToDelete, setProductIdToDelete] = useState<number | null>(
		null
	);
	const [totalCadastros, setTotalCadastros] = useState<number>(0);
	const [selectedCategory, setSelectedCategory] = useState("Todas");
	const [itemsPerPage, setItemsPerPage] = useState<number>(10);

	useEffect(() => {
		const getProducts = async () => {
			const response = await axios.get("http://localhost:3001/products");

			setProducts(response.data);
			setTotalCadastros(response.data.length);
		};

		getProducts();
	}, []);

	const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setSelectedCategory(e.target.value);
	};

	const handleItemsPerPageChange = (
		e: React.ChangeEvent<HTMLSelectElement>
	) => {
		setItemsPerPage(Number(e.target.value));
	};

	const filteredProducts =
		search.length > 0
			? products.filter((product) =>
					product.product.toLowerCase().includes(search.toLowerCase())
			  )
			: selectedCategory === "Todas"
			? products.slice(0, itemsPerPage)
			: products
					.filter((product) => product.category === selectedCategory)
					.slice(0, itemsPerPage);

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

	const formattedDate = (date: Date | string | undefined): string => {
		if (!date) return "";

		if (typeof date === "string") {
			date = new Date(date);
		}

		if (date instanceof Date && !isNaN(date.getTime())) {
			return date.toLocaleDateString("pt-BR");
		} else {
			return "";
		}
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

				<div className="group-filters">
					<div className="category-filter">
						<p>Filtrar por categoria:</p>
						<select value={selectedCategory} onChange={handleCategoryChange}>
							<option value="Todas">Todas</option>
							<option value="Alimentos">Alimentos</option>
							<option value="Laptops">Laptops</option>
							<option value="Livros">Livros</option>
							<option value="Ensino">Ensino</option>
						</select>
					</div>

					<div className="category-filter">
						<p>Itens por página:</p>
						<select value={itemsPerPage} onChange={handleItemsPerPageChange}>
							<option value="10">Todos</option>
							<option value="1">1</option>
							<option value="3">3</option>
							<option value="5">5</option>
						</select>
					</div>
				</div>
			</div>

			<table className="custom-table">
				<thead>
					<tr>
						<th>Descrição</th>
						<th>Categoria</th>
						<th>Quantidade de Produtos</th>
						<th>Cód do Produto</th>
						<th>Preços</th>
						<th>Data</th>
						<th>Ações</th>
					</tr>
				</thead>
				<tbody>
					{filteredProducts.length === 0 ? (
						<section className="empty">
							<TbClipboardText size={50} color="#666666" />

							<div>
								<p>Nenhum produto encontrado</p>
							</div>
						</section>
					) : (
						<>
							{filteredProducts.map((product) => (
								<tr key={product.id}>
									<td>{product.product}</td>
									<td>{product.category}</td>
									<td>{product.qtdProduto}</td>
									<td>{product.codProduct}</td>
									<td>{product.priceProducts}</td>
									<td>{formattedDate(product.dateCadastro)}</td>
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
