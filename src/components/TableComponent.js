import React, { useContext } from "react";
import { CryptoContext } from "../context/CryptoContext";
import "../../src/index.css";
import Pagination from "./Pagination";

const TableComponents = () => {
  const { CryptoData, currencyUnit } = useContext(CryptoContext);

  const onclickCoin = (id) => {
    window.location.href = `/${id}`;
  }

  return (
    <>
      <div className="flex flex-col mt-9 border border-gray-100 rounded">
        <table className="w-full table-auto">
          <thead className="capitalize text-base text-gray-100 font-medium border-b border-gray-100">
            <tr>
              <th className="py-1 pl-1">Asset</th>
              <th className="py-1">Name</th>
              <th className="py-1">Price</th>
              <th className="py-1">Volume</th>
              <th className="py-1">Market Cap Change</th>
              <th className="py-1">1h</th>
              <th className="py-1">24h</th>

            </tr>
          </thead>
          <tbody>
            {CryptoData && CryptoData.length > 0 ? (
              CryptoData.map((crypto, index) => (
                <tr
                  key={crypto.id}
                  className="text-center text-base border-b border-gray-100 hover:bg-gray-200 last:border-0"
                  onClick={() => onclickCoin(crypto.id)}
                >
                  <td className="px-1 py-3 uppercase flex flex-row align-middle">
                    <button className="outline-0 border-0 bg-none cursor-pointer">
                      {/* Your SVG code */}
                    </button>

                    <button className="self-center flex flex-row uppercase">
                      <img
                        src={crypto.image}
                        alt="crypto"
                        className="w-[1.2rem] h-[1.2rem] mx-[0.5rem]"
                      />
                      {crypto.symbol}
                    </button>
                  </td>
                  <td className="px-4 py-3">{crypto.name}</td>
                  <td className="px-4 py-3">
                    {new Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency: currencyUnit,
                    }).format(crypto.current_price)}
                  </td>
                  <td className="px-4 py-3">{crypto.total_volume}</td>

                  <td
                    className={
                      crypto.market_cap_change_percentage_24h != null &&
                      crypto.market_cap_change_percentage_24h >= 0
                        ? "px-4 py-3 text-green"
                        : "px-4 py-3 text-red"
                    }
                  >
                    {crypto.market_cap_change_percentage_24h != null
                      ? crypto.market_cap_change_percentage_24h.toFixed(2) + "%"
                      : "N/A"}
                  </td>

                  <td
                    className={
                      crypto.price_change_percentage_1h_in_currency != null &&
                      crypto.price_change_percentage_1h_in_currency >= 0
                        ? "px-4 py-3 text-green"
                        : "px-4 py-3 text-red"
                    }
                  >
                    {crypto.price_change_percentage_1h_in_currency != null
                      ? crypto.price_change_percentage_1h_in_currency.toFixed(
                          2
                        ) + "%"
                      : "N/A"}
                  </td>
                  <td
                    className={
                      crypto.price_change_percentage_24h != null &&
                      crypto.price_change_percentage_24h >= 0
                        ? "px-4 py-3 text-green"
                        : "px-4 py-3 text-red"
                    }
                  >
                    {crypto.price_change_percentage_24h != null
                      ? crypto.price_change_percentage_24h.toFixed(2) + "%"
                      : "N/A"}
                  </td>

                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-center py-4">
                  <div className="w-full h-40 flex justify-center items-center bg-gray-300">
                    <div className="animate-spin rounded-full h-8 w-8 border-4 border-cyan border-b-gray-200  z-0  "></div>
                    <span className="text-gray-500 text-lg font-medium mx-2">
                      {" "}
                      Loading...
                    </span>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="flex flex-row justify-between items-center mt-5 capitalize h-[2rem]  select-none">
        <span className="text-gray-500 text-sm font-medium">
          Data fetched from{" "}
          <a
            href="https://www.coingecko.com/en/api"
            target="_blank"
            rel="noreferrer"
            className="text-cyan"
          >
            CoinGecko API
          </a>
        </span>
        <Pagination />
      </div>
    </>
  );
};

export default TableComponents;
