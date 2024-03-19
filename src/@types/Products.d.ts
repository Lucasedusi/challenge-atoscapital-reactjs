export interface IProductsAdd {
	product: string;
	category: string;
	codProduct: string;
	priceProducts: number;
	dateCadastro?: Date;
	qtdProduto: number;
}

export interface IProducts {
	id: number;
	product: string;
	category: string;
	codProduct: string;
	priceProducts: number;
	dateCadastro?: Date;
	qtdProduto: number;
}

export interface IAuth {
	email: string;
	password: string;
}

export interface IRegister {
	name: string;
	email: string;
	password: string;
	confirPassword: string;
}

export interface IUser {
	username: string;
}
