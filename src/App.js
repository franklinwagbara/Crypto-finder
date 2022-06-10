import { ThemeProvider } from "@material-ui/core";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Homepage from "./pages/Homepage";
import Coinpage from "./pages/Coinpage";
import { makeStyles } from "@material-ui/styles";
import "./App.css";
import CryptoContext from "./CrytoContext";
import theme from "./helpers/theme";

const useStyles = makeStyles({
  root: {
    backgroundColor: "#14161a",
    color: "white",
    minHeight: "100vh",
  },
});

function App() {
  const classes = useStyles();
  return (
    <ThemeProvider theme={theme}>
      <CryptoContext>
        <div className={classes.root}>
          <Navbar />
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/coins/:id" element={<Coinpage />} />
          </Routes>
        </div>
      </CryptoContext>
    </ThemeProvider>
  );
}

export default App;
