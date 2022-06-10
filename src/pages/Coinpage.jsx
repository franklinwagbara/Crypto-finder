import React, { lazy, Suspense } from "react";
import { useParams } from "react-router-dom";
import { LinearProgress, makeStyles, ThemeProvider } from "@material-ui/core";
import useCoin from "./../components/useCoin";
import StyledCircularProgress from "./../components/StyledCircularProgress";
import darkTheme from "./../helpers/darkTheme";

const Sidebar = lazy(() => import("../components/Sidebar"));
const CoinChart = lazy(() => import("../components/CoinChart"));

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    fontFamily: "Montserrat",
    [theme.breakpoints.down("md")]: {
      flexDirection: "column",
      alignItems: "center",
    },
  },
}));

const Coinpage = () => {
  const { id } = useParams();
  const [coin, loading, currency, symbol] = useCoin(id);

  const classes = useStyles();

  if (!coin) return <LinearProgress style={{ backgroundColor: "gold" }} />;
  return (
    <div className={classes.container}>
      <Suspense fallback={<StyledCircularProgress size="30%" />}>
        <Sidebar id={id} coin={coin} currency={currency} symbol={symbol} />
      </Suspense>
      <Suspense fallback={<StyledCircularProgress size="75%" />}>
        <ThemeProvider theme={darkTheme}>
          <CoinChart id={id} coin={coin} currency={currency} symbol={symbol} />
        </ThemeProvider>
      </Suspense>
    </div>
  );
};
export default Coinpage;
