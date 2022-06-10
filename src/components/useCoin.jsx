import React, { useState, useEffect } from "react";
import { CryptoState } from "../CrytoContext";
import axios from "axios";
import { SingleCoin } from "../config/api";

const useCoin = (id) => {
  const [coin, setCoin] = useState();
  const [loading, setLoading] = useState(false);

  const { currency, symbol } = CryptoState();

  const fetchCoin = async () => {
    if (!id) return;
    setLoading(true);
    const { data } = await axios.get(SingleCoin(id));

    setCoin((prev) => data);
    setLoading(false);
  };

  useEffect(() => {
    fetchCoin();
  }, [currency]);

  return [coin, loading, currency, symbol];
};
export default useCoin;
