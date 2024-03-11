import "./styles.scss";

export const SideBar = () => {
	return (
		<div className="sidebar">
			<div className="logo">
				<img src="logo.svg" alt="Logo da empresa" />
			</div>
			<div className="navigation">
				<ul>
					<li>PRODUTOS</li>
				</ul>
			</div>
		</div>
	);
};
