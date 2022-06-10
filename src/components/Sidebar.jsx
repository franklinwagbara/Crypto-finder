import { makeStyles, Typography } from "@material-ui/core";
import numberWithCommas from "../helpers/numberWithCommas";
import ReactHtmlParser from "react-html-parser";

const useStyles = makeStyles((theme) => ({
  sidebar: {
    width: "30%",
    [theme.breakpoints.down("md")]: {
      width: "100%",
    },
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: 25,
    borderRight: "2px solid grey",
  },
  heading: {
    fontWeight: "bold",
    marginBottom: 20,
  },
  description: {
    width: "100%",
    textAlign: "justify",
    padding: 25,
    paddingBottom: 15,
    paddingTop: 10,

    "& a": {
      color: "gold",
    },
  },
  marketData: {
    alignSelf: "start",
    padding: 25,
    paddingTop: 10,
    width: "100%",
    //Making responsive
    [theme.breakpoints.down("md")]: {
      display: "flex",
      justifyContent: "space-around",
    },
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      alignItems: "center",
    },
    [theme.breakpoints.down("xs")]: {
      alignItems: "start",
    },
  },
}));

const Sidebar = ({ id, coin, currency, symbol }) => {
  const classes = useStyles();
  return (
    <div className={classes.sidebar}>
      <img
        src={coin?.image.large}
        alt={coin?.name}
        height={200}
        style={{ marginBottom: 20 }}
      />
      <Typography variant="h3" className={classes.heading}>
        {coin?.name}
      </Typography>
      <Typography variant="subtitle1" className={classes.description}>
        {ReactHtmlParser(coin?.description.en.split(". ")[0])}.
      </Typography>

      <div className={classes.marketData}>
        <span style={{ display: "flex" }}>
          <Typography variant="h5" className={classes.heading}>
            Rank:
          </Typography>
          &nbsp; &nbsp;
          <Typography variant="h5">{coin?.market_cap_rank} </Typography>
        </span>
        <span style={{ display: "flex" }}>
          <Typography variant="h5" className={classes.heading}>
            Current Price:
          </Typography>
          &nbsp; &nbsp;
          <Typography variant="h5">
            {symbol +
              numberWithCommas(
                coin?.market_data.current_price[
                  currency.toString().toLowerCase()
                ].toFixed(2)
              )}
          </Typography>
        </span>
        <span style={{ display: "flex" }}>
          <Typography variant="h5" className={classes.heading}>
            Market Cap:
          </Typography>
          &nbsp; &nbsp;
          <Typography variant="h5">
            {symbol +
              numberWithCommas(
                (
                  coin?.market_data.market_cap[currency.toLowerCase()] / 1000000
                ).toFixed(0)
              )}
            M
          </Typography>
        </span>
      </div>
    </div>
  );
};
export default Sidebar;
