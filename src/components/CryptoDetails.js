import React, { useLayoutEffect } from "react";
import ReactDOM from "react-dom";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useContext } from "react";
import { CryptoContext } from "../context/CryptoContext";

function CryptoDetails() {
  const navigate = useNavigate();

  const { getCoinData, coinData, setCoinData, currencyUnit } =
    useContext(CryptoContext);

  const { coinId } = useParams();

  function closeModal() {
    navigate("..");
    setCoinData(null);
  }

  useLayoutEffect(() => {
    getCoinData(coinId);
  }, [coinId]);

  return ReactDOM.createPortal(
    <div
      className="fixed top-0 w-full h-full bg-gray-200 bg-opacity-40 first-letter:
    backdrop-blur-sm flex items-center justify-center font-nunito"
      onClick={closeModal}
    >
      <div
        className="w-[65%] h-[75%] bg-gray-300 bg-opacity-75 rounded-lg text-white relative select-none overflow-y-auto overflow-x-hidden     scrollbar-thin scrollbar-thumb-gray-100 scrollbar-track-gray-200 scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar-thumb-hover-cyan scrollbar-track-hover-gray-100 scrollbar-thumb-active-cyan scrollbar-track-active-gray-100 "
        onClick={(e) => e.stopPropagation()}
      >
        {coinData ? (
          <div className="w-full h-full p-4 flex flex-col">
            <div className=" w-full flex gap-2">
              {coinData && coinData.image && coinData.image.large && (
                <img
                  src={coinData.image.large}
                  alt={coinData.name}
                  className="  h-[3rem] w-[3rem]  place-self-center"
                />
              )}
              <h1 className=" text-[2rem]  mr-1">
                {coinData && coinData.name}
              </h1>
              <p className=" w-fit h-fit pl-2 pr-2 pt-0.5 pb-0.5  place-self-center rounded-md  bg-[#14ffcc3a] text-cyan  uppercase">
                {coinData && coinData.symbol}
              </p>
            </div>

            <div className=" flex flex-wrap w-full h-full">
              {/* Info here */}
              <div className="w-[45%] h-full flex flex-col gap-2 pr-2">
                <div className="flex w-full mt-6">
                  <div className="flex flex-col w-full">
                    <div className="flex justify-between">
                      <span className="text-sm capitalize text-gray-100">
                        Price
                      </span>
                      <div
                        className={`text-sm px-1 ml-2 font-medium flex items-center
                            rounded uppercase bg-opacity-25
                            ${
                              coinData.market_data.price_change_percentage_24h >
                              0
                                ? "bg-green text-green"
                                : "bg-[#ff050560] text-[#ffbbbb]"
                            }
                            `}
                      >
                        <span>
                          {Number(
                            coinData.market_data.price_change_percentage_24h
                          ).toFixed(2)}
                          %
                        </span>
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 14 14"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className={`
                        w-[1rem] ml-0.5
                        ${
                          coinData.market_data.price_change_percentage_24h > 0
                            ? "fill-green rotate-180"
                            : "fill-[#ffbbbb]"
                        }
                        `}
                        >
                          <path d="M7.47951 11.4153C7.42599 11.493 7.35438 11.5565 7.27085 11.6004C7.18732 11.6444 7.09437 11.6673 7.00001 11.6673C6.90564 11.6673 6.81269 11.6444 6.72916 11.6004C6.64563 11.5565 6.57402 11.493 6.52051 11.4153L1.27051 3.83194C1.20974 3.74447 1.1741 3.64202 1.16747 3.53572C1.16084 3.42943 1.18346 3.32334 1.23289 3.229C1.28232 3.13466 1.35665 3.05567 1.44782 3.0006C1.53899 2.94554 1.6435 2.91652 1.75001 2.91669H12.25C12.3563 2.91713 12.4604 2.94652 12.5512 3.00172C12.642 3.05691 12.716 3.13581 12.7653 3.22993C12.8147 3.32406 12.8374 3.42984 12.8311 3.53591C12.8247 3.64199 12.7896 3.74433 12.7295 3.83194L7.47951 11.4153Z" />
                        </svg>
                      </div>
                    </div>
                    <h2 className="text-lg font-bold">
                      {coinData &&
                        coinData.market_data.current_price[currencyUnit] && (
                          <>
                            {new Intl.NumberFormat("en-IN", {
                              style: "currency",
                              currency: currencyUnit,
                            }).format(
                              coinData.market_data.current_price[currencyUnit]
                            )}
                          </>
                        )}
                    </h2>
                  </div>
                  </div>




                  <div className="flex w-full mt-3 justify-between">
                    <div className="flex flex-col">
                      <span className="text-sm capitalize text-gray-100">
                        Market Cap
                      </span>
                      <h2 className="text-base font-bold">
                        {new Intl.NumberFormat("en-IN", {
                          style: "currency",
                          currency: currencyUnit,
                          minimumFractionDigits: 0,
                        }).format(
                          coinData.market_data.market_cap[currencyUnit]
                        )}
                      </h2>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm capitalize text-gray-100">
                        fully diluted valuation
                      </span>
                      <h2 className="text-base font-bold">
                        {new Intl.NumberFormat("en-IN", {
                          style: "currency",
                          currency: currencyUnit,
                          notation: "compact",
                        }).format(
                          coinData.market_data.fully_diluted_valuation[
                            currencyUnit
                          ]
                        )}
                      </h2>
                    </div>
                  </div>

                  <div className="flex flex-col w-full mt-3 justify-between">
                    <span className="text-sm capitalize text-gray-100">
                      total volume
                    </span>
                    <h2 className="text-base font-bold">
                      {new Intl.NumberFormat("en-IN", {
                        style: "currency",
                        currency: currencyUnit,
                        minimumFractionDigits: 0,
                      }).format(
                        coinData.market_data.total_volume[currencyUnit]
                      )}
                    </h2>
                  </div>
              </div>

              {/* Charts here */}
              <div className="w-[55%] h-full p-1 flex flex-col gap-2 bg-green"></div>
            </div>
          </div>
        ) : (
          <div className="flex justify-center items-center h-full">
            <div className="animate-spin rounded-full h-11 w-11 border-t-2 border-b-2 border-gray-100 mr-4"></div>
            <div className=" font-bold text-lg">Loading...</div>
          </div>
        )}
      </div>
    </div>,

    document.getElementById("modal")
  );
}

export default CryptoDetails;
