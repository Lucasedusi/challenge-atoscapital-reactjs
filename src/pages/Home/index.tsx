import { FaRegEdit, FaRegTrashAlt } from "react-icons/fa";

import { IoMdSearch } from "react-icons/io";
import { Link } from "react-router-dom";
import "./styles.scss";

const products = [
	{
		descricao: "Produto 01",
		categoria: "Hello World",
		dataCadastro: "Março 2024",
		codigoProduto: "0003",
		preco: 12.5,
	},
	{
		descricao: "Produto 01",
		categoria: "Hello World",
		dataCadastro: "Março 2024",
		codigoProduto: "0003",
		preco: 12.5,
	},
];

export const HomePage = () => {
	return (
		<div>
			<div className="container-welcome">
				<div className="welcome-user">
					<h1>Olá, Usuário</h1>
					<p>Seja bem-vindo</p>
				</div>

				<Link className="btn-add-product" to={"/dash"}>
					+ Novo Produto
				</Link>
			</div>

			<div className="container-products">
				<div className="title-products">
					<h1>Seus Cadastros</h1>
				</div>

				<div className="group-qtd-produtcs">
					<p className="number-products">31</p>
					<p className="text-products">Total de Cadastros</p>
				</div>
			</div>

			<div className="container-search-bar">
				<div className="main-search-bar-products">
					<div className="search-bar-products">
						<div className="search-icon-products">
							<IoMdSearch size={18} />
						</div>
						<input type="text" placeholder="Pesquisar..." />
					</div>
				</div>

				<p className="text-update">Última atualização: 10 de Março 10:45 AM</p>
			</div>

			<table className="custom-table">
				<thead>
					<tr>
						<th>Descrição</th>
						<th>Categoria</th>
						<th>Data de Cadastro</th>
						<th>Cód do Produto</th>
						<th>Preços</th>
						<th>Ações</th>
					</tr>
				</thead>
				<tbody>
					{products.map((item) => (
						<tr>
							<td>{item.descricao}</td>
							<td>{item.categoria}</td>
							<td>{item.dataCadastro}</td>
							<td>{item.codigoProduto}</td>
							<td>{item.preco}</td>
							<td className="actions">
								<button className="edit-button">
									<FaRegEdit size={12} color="#fff" /> Editar
								</button>
								<button className="delete-button">
									<FaRegTrashAlt size={12} color="#fff" /> Excluir
								</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};
