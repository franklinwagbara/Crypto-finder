import React, { useState, useEffect } from "react";
import { CryptoState } from "../../CrytoContext";
import axios from "axios";
import { CoinList } from "./../../config/api";

const useCoins = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);

  const { currency, symbol } = CryptoState();

  const fetchCoins = async () => {
    setLoading(true);
    const { data } = await axios.get(CoinList(currency));

    setCoins((prev) => [...data]);

    setLoading(false);
  };

  useEffect(() => {
    fetchCoins();
  }, [currency]);

  return [coins, loading, currency, symbol];
};

export default useCoins;
