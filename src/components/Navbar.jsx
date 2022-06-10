import {
  AppBar,
  Container,
  FormControl,
  Select,
  MenuItem,
  Toolbar,
  Typography,
  ThemeProvider,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import React from "react";
import { useNavigate } from "react-router-dom";
import { CryptoState } from "../CrytoContext";
import darkTheme from "../helpers/darkTheme";

const useStyles = makeStyles({
  title: {
    fontFamily: "Montserrat",
    fontWeight: "bold",
    cursor: "pointer",
    color: "gold",
    flex: 1,
  },
  select: {
    height: 40,
    width: 100,
    marginRight: 15,
  },
});

const Navbar = () => {
  const { currency, setCurrency } = CryptoState();
  const navigate = useNavigate();

  const classes = useStyles();
  return (
    <ThemeProvider theme={darkTheme}>
      <AppBar color="transparent" position="static">
        <Container className={classes.container}>
          <Toolbar>
            <Typography
              onClick={() => navigate("/")}
              className={classes.title}
              variant="h6"
            >
              Crypto-Finder
            </Typography>

            <FormControl variant="outlined">
              <Select
                className={classes.select}
                id="currency"
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
              >
                <MenuItem value="USD">USD</MenuItem>
                <MenuItem value="NGN">NGN</MenuItem>
              </Select>
            </FormControl>
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
};
export default Navbar;
