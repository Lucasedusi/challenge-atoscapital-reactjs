import "./styles.scss";

export const Dash = () => {
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

				<form>
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
								<input type="text" placeholder="Descrição do produto" />
							</div>
							<div className="form-group">
								<label htmlFor="categoria">Categoria:</label>
								<input type="text" placeholder="Categoria do produto" />
							</div>
						</div>

						<div className="form-row">
							<div className="form-group">
								<label htmlFor="dataCadastro">Código</label>
								<input type="text" placeholder="Código do produto" />
							</div>
							<div className="form-group">
								<label htmlFor="codigoProduto">Valor:</label>
								<input type="number" placeholder="Valor  do  Produto" />
							</div>
						</div>

						<div className="form-group">
							<label htmlFor="preco">Quantidade:</label>
							<input type="number" placeholder="Quantidade do produto" />
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
