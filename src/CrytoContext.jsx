import { createContext, useContext, useEffect, useState } from "react";

const cryptoContext = createContext();

const CryptoContext = (props) => {
  const [currency, setCurrency] = useState("USD");
  const [symbol, setSymbol] = useState("$");

  useEffect(() => {
    if (currency === "USD") setSymbol("$");
    else if (currency === "NGN") setSymbol("₦");
  }, [currency]);

  //console.log(symbol);
  return (
    <cryptoContext.Provider value={{ currency, symbol, setCurrency }}>
      {props.children}
    </cryptoContext.Provider>
  );
};
export default CryptoContext;

export const CryptoState = (props) => {
  return useContext(cryptoContext);
};
