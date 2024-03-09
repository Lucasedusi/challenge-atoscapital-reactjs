import { ReactNode } from "react";

import "./styles.scss";

interface ILayoutComponentsProps {
	children: ReactNode;
}

export const LayoutComponents: React.FC<ILayoutComponentsProps> = ({
	children,
}) => {
	return (
		<div className="container">
			<div className="container-login">
				<div className="wrap-login">{children}</div>
			</div>
			<div className="container-image" />
		</div>
	);
};
