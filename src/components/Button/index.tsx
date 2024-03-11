import React, { ReactNode, ButtonHTMLAttributes } from "react";
import "./styles.scss";

interface ILayoutComponentsProps
	extends ButtonHTMLAttributes<HTMLButtonElement> {
	children: ReactNode;
}

export const Button: React.FC<ILayoutComponentsProps> = ({
	children,
	...rest
}) => {
	return (
		<button type="button" {...rest}>
			{children}
		</button>
	);
};
