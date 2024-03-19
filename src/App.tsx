import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { Router } from "./Routes";
import { AuthProvider } from "./context/AuthProvider";
import { GlobalStyle } from "./styles/global";
import { defaultTheme } from "./styles/theme/default";

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
