import React, { useContext, useState } from "react";
import search from "../assets/search-icon.svg";
import { CryptoContext } from "../context/CryptoContext";

const Search = () => {
  const [searchText, setSearchText] = useState("");
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [timer, setTimer] = useState(null);
  const [showNoResults, setShowNoResults] = useState(false);

  const { getSearchData } = useContext(CryptoContext);
  const { searchData, setSearchData } = useContext(CryptoContext);
  const { setSearchedCoin } = useContext(CryptoContext);

  const debounce = (func, delay) => {
    clearTimeout(timer);
    setTimer(setTimeout(func, delay));
  };

  const handleInput = (e) => {
    e.preventDefault();
    const query = e.target.value;
      

    setSearchText(query);
    setShowNoResults(false); // Reset showNoResults
    debounce(() => getSearchData(query), 2000); // Start search after 2 seconds
    setTimeout(() => setShowNoResults(true), 7000); // Show "No results found" after 10 seconds
  };

  const selectCoin = (coinId) => {
    setSearchedCoin(coinId);
    setSearchText("");
    setShowNoResults(false); // Reset showNoResults
    console.log(coinId);
  };

  return (
    <>
      <form className="w-96 relative font-nunito flex items-center">
        <input
          type="text"
          value={searchText}
          className="w-full rounded bg-gray-200 placeholder-text-gray-100 pl-2 pr-2 required outline-none border border-transparent focus:border-cyan"
          placeholder="Search"
          name="search"
          onChange={handleInput}
          onFocus={() => setIsInputFocused(true)}
          onBlur={() => setIsInputFocused(false)}
        />

        <button type="submit" className="-translate-x-7" onClick={(e) => { e.preventDefault(); handleInput();}}>
          <img src={search} alt="search" className="w-full h-auto" />
        </button>
      </form>

      {searchText.length > 0 ? (
        <ul className="absolute top-14 left-5 w-96 h-96 min-h-36 max-h-96 bg-gray-200 text-white font-nunito px-4 py-3 rounded overflow-x-hidden bg-opacity-60 backdrop-blur-lg gap-4">
          {searchData && searchData.length > 0 ? (
            searchData.map((coin) => {
              return (
                <li
                  key={coin.id}
                  className="flex items-center gap-4 cursor-pointer my-2 hover:opacity-50"
                  onClick={() => selectCoin(coin.id)}
                >
                  <img
                    src={coin.thumb}
                    alt={coin.name}
                    className="w-5 h-5 rounded-full  "
                  />
                  <span>{coin.name}</span>
                </li>
              ) 
            })
          ) : showNoResults ? (
            <li>
              <span className="text-red-500">No results found</span>
            </li>
          ) : (
              <div className=" w-full h-full flex justify-center items-center">
                <div className="animate-spin rounded-full h-8 w-8 border-4 border-cyan border-b-gray-200  "></div>
              </div>
          )}

        </ul>

      ) : isInputFocused && searchText.length === 0 ? (
        <ul className="absolute top-14 left-5 w-96 h-auto bg-gray-200 text-white font-nunito px-4 py-3 rounded overflow-x-hidden bg-opacity-60 backdrop-blur-lg flex-col">
          <li>Please enter a search term</li>
        </ul>
      ) : null}
    </>
  );
};

export default Search;
