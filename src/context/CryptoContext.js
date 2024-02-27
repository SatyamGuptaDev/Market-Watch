import { createContext, useLayoutEffect, useState } from "react";

export const CryptoContext = createContext({});

export const CryptoProvider = ({ children }) => {
  const [CryptoData, setCryptoData] = useState({});

  const [searchData, setSearchData] = useState({});
  const [searchedCoin, setSearchedCoin] = useState("");

  const [currency, setCurrency] = useState("inr");
  const [currencyUnit, setCurrencyUnit] = useState("inr");

  const [sorting, setSorting] = useState("market_cap_desc");
  const [sortingOption, setSortingOption] = useState("market_cap_desc");

  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);

  const [totalCoins, setTotalCoins] = useState(250);

  const [coinData, setCoinData] = useState({});

  const setReset = () => {
    setSearchedCoin("");
    setCurrentPage(1);
  };

  const getCoinData = async (CoinID) => {
    try {
      const data = await fetch(
        `https://api.coingecko.com/api/v3/coins/${CoinID}`
      )
        .then((res) => res.json())
        .then((data) => data);

      setCoinData(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const getCryptoData = async () => {
    try {
      setCryptoData({}); // Reset CryptoData
      const data = await fetch(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&ids=${searchedCoin}&order=${sorting}&per_page=${perPage}&page=${currentPage}&sparkline=false&price_change_percentage=1h%2C%2024h%2C%207d%2C%2014d&locale=en`
      )
        .then((res) => res.json())
        .then((data) => data);

      setCurrencyUnit(currency);
      setSortingOption(sorting);

      let updatedTotalCoins = totalCoins; // Define updatedTotalCoins variable

      // Check if totalCoins is equal to 250
      if (totalCoins === 250) {
        const totalCoinsResponse = await fetch(
          `https://api.coingecko.com/api/v3/global`
        );
        if (totalCoinsResponse.ok) {
          const totalCoinsData = await totalCoinsResponse.json();
          updatedTotalCoins = totalCoinsData.data.active_cryptocurrencies;
        } else {
          // If the API call fails, set updatedTotalCoins to 250
          updatedTotalCoins = 250;
        }
      }

      setTotalCoins(updatedTotalCoins); // Update totalCoins with updatedTotalCoins

      console.log(data);

      setCryptoData(data);
    } catch (error) {
      console.log(error);
    }
  };

  const getSearchData = async (searchText) => {
    try {
      const data = await fetch(
        `https://api.coingecko.com/api/v3/search?query=${searchText}`
      )
        .then((res) => res.json())
        .then((data) => data.coins);

      setSearchData(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  useLayoutEffect(() => {
    getCryptoData();
  }, [searchedCoin, currency, sorting, currentPage, perPage]);

  return (
    <CryptoContext.Provider
      value={{
        CryptoData,
        searchData,
        currencyUnit,
        sortingOption,
        currentPage,
        totalCoins,
        perPage,
        coinData,
        getCoinData,
        setCoinData,
        getSearchData,
        setSearchedCoin,
        setCurrency,
        setSorting,
        setReset,
        setSearchData,
        setCurrentPage,
        setPerPage,
      }}
    >
      {children}
    </CryptoContext.Provider>
  );
};
