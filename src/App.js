import { BrowserRouter as Router } from "react-router-dom";
import MainRoutes from "routes";
import { ThemeProvider } from "@mui/material/styles";
import { ToastContainer } from "react-toastify";
import theme, { theme2, theme3, theme4 } from "theme";
import "react-toastify/dist/ReactToastify.css";
import { SocketProvider } from "context/socketCtx";
import CssBaseline from "@mui/material/CssBaseline";
import useCtxValues from "context";
import { useMemo } from "react";
function App() {
  const [state] = useCtxValues();
  const { theme: currentTheme } = state;

  const themeToUse = (themeName) => {
    switch (themeName) {
      case "theme":
        return theme;
      case "theme2":
        return theme2;
      case "theme3":
        return theme3;
      case "theme4":
        return theme4;
      default:
        return theme;
    }
  };

  const memoizedTheme = useMemo(() => themeToUse(currentTheme), [currentTheme]);

  return (
    <div className="App">
      <Router>
        <ThemeProvider theme={memoizedTheme}>
          <SocketProvider>
            <MainRoutes />
          </SocketProvider>
          <CssBaseline />
        </ThemeProvider>
        <ToastContainer theme="dark" position="bottom-right" autoClose={8000} />
      </Router>
    </div>
  );
}

export default App;
