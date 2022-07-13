import { BrowserRouter as Router } from "react-router-dom";
import MainRoutes from "routes";
import { ThemeProvider } from "@mui/material/styles";
import { ToastContainer } from "react-toastify";
import theme from "theme";
import "react-toastify/dist/ReactToastify.css";
import { UserProvider } from "context";
function App() {
  
  return (
    <div className="App">
      <Router>
        <ThemeProvider theme={theme}>
          <UserProvider>
            <MainRoutes />
          </UserProvider>
        </ThemeProvider>
        <ToastContainer theme="dark" position="bottom-right" autoClose={8000} />
      </Router>
    </div>
  );
}

export default App;
