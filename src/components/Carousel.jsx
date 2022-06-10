import React, { useState, useEffect } from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import axios from "axios";
import { TrendingCoins } from "../config/api";
import { CryptoState } from "../CrytoContext";
import { makeStyles } from "@material-ui/styles";
import { Link } from "react-router-dom";
import numberWithCommas from "./../helpers/numberWithCommas";
import { CarouselFallback } from "./Banner";

const useStyles = makeStyles({
  carousel: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  carouselImage: {
    height: 80,
    marginBottom: 15,
  },

  carouselItem: {
    color: "#fff",
    textAlign: "center",
    textTransform: "uppercase",
    "& span, p": {
      lineHeight: -0.4,
    },
  },
});

const responsive = {
  0: { items: 2 },
  512: { items: 4 },
};
const Carousel = () => {
  const [trending, setTrending] = useState([]);
  const [loading, setLoading] = useState(false);

  const { currency, symbol } = CryptoState();

  const handleDragStart = (e) => e.preventDefault();

  const fetchTendingCoins = async () => {
    setLoading(true);
    const { data } = await axios.get(TrendingCoins(currency));
    setTrending((prev) => [...data]);
    setLoading(false);
  };

  useEffect(() => {
    fetchTendingCoins();
  }, [currency]);

  const classes = useStyles();

  const items = trending.map((coin) => {
    const percent_change_in_price = coin?.price_change_24h;
    const isProfit = percent_change_in_price > 0;
    return (
      <Link className={classes.carousel} to={`/coins/${coin?.id}`}>
        <img
          className={classes.carouselImage}
          src={coin.image}
          alt={coin.name}
          onDragStart={handleDragStart}
          role="presentation"
        />
        <div className={classes.carouselItem}>
          <span>{coin?.symbol}</span> &nbsp;{" "}
          <span style={{ color: isProfit ? "rgb(14, 203, 129)" : "red" }}>
            {isProfit && "+"}
            {percent_change_in_price.toFixed(2)}%
          </span>
          <span style={{ display: "block", fontSize: 22, fontWeight: 500 }}>
            {symbol + " " + numberWithCommas(coin?.current_price.toFixed(2))}
          </span>
        </div>
      </Link>
    );
  });

  return (
    <>
      {loading ? (
        <CarouselFallback />
      ) : (
        <AliceCarousel
          mouseTracking
          infinite
          autoPlayInterval={1000}
          animationDuration={1500}
          disableDotsControls
          disableButtonsControls
          responsive={responsive}
          autoPlay
          items={items}
        />
      )}
    </>
  );
};
export default Carousel;
