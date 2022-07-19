import { createTheme } from "@mui/material/styles";
import { red } from "@mui/material/colors";

// Create a theme instance.
const theme = createTheme({
  spacing: (value) => value * 4,
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundImage: `url(/bg/1.jpg)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          fontFamily: '"Poppins", sans-serif',
        },
      },
    },
  },
  centerCol: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    gap: "1rem",
  },
  center: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "1rem",
  },
  palette: {
    primary: {
      main: "#800080",
      green: "#008000",
      red: "#ff0000",
      light: "#fff",
    },
    error: {
      main: red.A400,
    },
  },
  typography: {
    h1: {
      fontSize: "70px",
      fontWeight: 100,
     
    },
    h2: {
      fontSize: "3rem",
      fontWeight: 700,
    },
    h3: {
      fontSize: "2.5rem",
      fontWeight: 700,
      '@media (max-width:600px)': {
        fontSize: '1.5rem',
      },
    },
    h4: {
      fontSize: "1.7rem",
      fontWeight: 700,
      '@media (max-width:600px)': {
        fontSize: '1.3rem',
      },
    },
    h5: {
      fontSize: "1.2rem",
      fontWeight: 700,
      '@media (max-width:600px)': {
        fontSize: '1rem',
      },
    },
    body: {
      fontSize: "0.8rem",
    },
  },
  shape: {
    borderRadius: 4,
  },
  zIndex: {
    nav: 10000,
    lines: 999,
  },
});

export default theme;
