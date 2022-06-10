import {
  Container,
  TextField,
  Typography,
  makeStyles,
  ThemeProvider,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  LinearProgress,
  TableBody,
} from "@material-ui/core";
import Pagination from "@material-ui/lab/Pagination";
import React, { useState, useEffect } from "react";
import darkTheme from "./../helpers/darkTheme";
import useCoins from "./hooks/useCoins";
import numberWithCommas from "./../helpers/numberWithCommas";
import { useNavigate } from "react-router-dom";
import usePagination from "./hooks/usePagination";

const useStyles = makeStyles({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingTop: 15,
  },
  searchField: {
    width: "100%",
    marginBottom: 15,
    marginTop: 15,
  },
  tableRow: {
    cursor: "pointer",
    backgroundColor: "#16171a",
    "&:hover": {
      backgroundColor: "#131111",
    },
  },
  pagination: {
    "& 	.MuiPaginationItem-root": {
      color: "gold",
    },
  },
});

const tableHeaders = ["Coin", "Price", "Change(24 hours)", "Market Cap"];
const pageSize = 10;

const CoinTable = () => {
  const [search, setSearch] = useState("");
  const [coins, loading, currency, symbol] = useCoins();
  const [filteredCoins, setFilteredCoins] = useState(coins);
  const [page, pageNumber, setPageNumber] = usePagination({
    items: filteredCoins,
    pageSize,
  });

  useEffect(() => {
    const tempCoins = coins.filter(
      (coin) =>
        coin?.name.toLowerCase().includes(search.toLowerCase()) ||
        coin?.id.toLowerCase().includes(search.toLowerCase())
    );

    setFilteredCoins((prev) => [...tempCoins]);
    setPageNumber((prev) => 1);
  }, [search, coins]);

  const navigate = useNavigate();

  const classes = useStyles();
  return (
    <Container className={classes.container}>
      <Typography variant="h4">Crypto-Currency Prices by Market Cap</Typography>

      <ThemeProvider theme={darkTheme}>
        <TextField
          label="Search for a Crypto Currency..."
          className={classes.searchField}
          variant="outlined"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <TableContainer>
          {loading ? (
            <LinearProgress style={{ backgroundColor: "gold" }} />
          ) : (
            <Table>
              <TableHead style={{ backgroundColor: "#EEBC1D" }}>
                <TableRow>
                  {tableHeaders.map((header) => (
                    <TableCell
                      key={header}
                      style={{ color: "black", fontWeight: "bold" }}
                      align={header === "Coin" ? "inherit" : "right"}
                    >
                      {header}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>

              <TableBody>
                {page.map((coin) => (
                  <TableRow
                    key={coin?.id}
                    onClick={() => navigate(`/coins/${coin?.id}`)}
                    className={classes.tableRow}
                  >
                    <TableCell
                      component="th"
                      scope="row"
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "start",
                      }}
                    >
                      <img src={coin?.image} alt={coin?.name} height={50} />
                      <span
                        style={{ fontSize: 22, textTransform: "uppercase" }}
                      >
                        {coin?.symbol}
                      </span>
                      <span style={{ color: "darkgray" }}>{coin?.name}</span>
                    </TableCell>
                    <TableCell align="right">
                      {symbol +
                        " " +
                        numberWithCommas(coin?.current_price.toFixed(2))}
                    </TableCell>
                    <TableCell
                      style={{
                        color:
                          coin?.price_change_percentage_24h > 0
                            ? "rgb(14, 203, 129)"
                            : "red",
                      }}
                      align="right"
                    >
                      {coin?.price_change_percentage_24h > 0
                        ? "+" + coin?.price_change_percentage_24h.toFixed(2)
                        : coin?.price_change_percentage_24h.toFixed(2)}
                      %
                    </TableCell>
                    <TableCell align="right">
                      {symbol +
                        " " +
                        numberWithCommas(
                          (coin?.market_cap / 1000000).toFixed(2)
                        )}
                      M
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </TableContainer>
      </ThemeProvider>
      <Pagination
        style={{
          padding: 20,
          width: "100%",
          display: "flex",
          justifyContent: "center",
        }}
        classes={{ ul: classes.pagination }}
        count={Math.ceil(filteredCoins.length / pageSize)}
        onChange={(e, value) => {
          window.scroll(0, 450);
          return setPageNumber((prev) => value);
        }}
      />
    </Container>
  );
};
export default CoinTable;
