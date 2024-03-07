import { ThemeProvider } from "styled-components";
import { GlobalStyle } from "./styles/global";
import { defaultTheme } from "./styles/theme/default";
import { BrowserRouter } from "react-router-dom";
import { Router } from "./Routes";
import { AuthProvider } from "./context/AuthProvider";
import { ProtectdLayout } from "./components/ProtectedLayout";

function App() {
	return (
		<AuthProvider>
			<ThemeProvider theme={defaultTheme}>
				<GlobalStyle />
				<BrowserRouter>
					<Router />
				</BrowserRouter>
			</ThemeProvider>
		</AuthProvider>
	);
}

export default App;
