import { ReactNode } from "react";
import "./styles.scss";

interface IMainLayoutProps {
	children: ReactNode;
}

export const MainLayout: React.FC<IMainLayoutProps> = ({ children }) => {
	return <div className="main-layout">{children}</div>;
};
