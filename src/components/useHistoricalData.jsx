import { useState, useEffect } from "react";
import { HistoricalChart } from "./../config/api";
import { CryptoState } from "../CrytoContext";
import axios from "axios";

const useHistoricalData = ({ id, coin }) => {
  const [historicalData, setHistoricalData] = useState();
  const [days, setDays] = useState(1);
  const [loading, setLoading] = useState(false);

  const { currency } = CryptoState();

  const fetchHistoricalData = async () => {
    setLoading(true);
    const { data } = await axios.get(HistoricalChart(coin?.id, days, currency));
    setHistoricalData(data.prices);
    setLoading(false);
  };

  useEffect(() => {
    fetchHistoricalData();
  }, [currency, days]);

  return [historicalData, loading, days, setDays, currency];
};
export default useHistoricalData;
