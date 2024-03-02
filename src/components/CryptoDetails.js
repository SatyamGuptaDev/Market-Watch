import React, { useLayoutEffect } from "react";
import ReactDOM from "react-dom";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useContext } from "react";
import { CryptoContext } from "../context/CryptoContext";
import { useEffect, useState } from "react";
import Charts from "./Charts";

function IndicatorBar({ currentPrice, high, low }) {
  const [green, setgreen] = useState(0);

  useEffect(() => {
    const total = high - low;
    const greenZone = ((high - currentPrice) * 100) / total;
    setgreen(Math.ceil(greenZone));
  }, [currentPrice, high, low]);

  return (
    <>
      <span
        className="bg-red h-1.5 rounded-l-lg w-[50%]"
        style={{ width: `${100 - green}%` }}
      >
        &nbsp;
      </span>
      <span
        className="bg-green h-1.5 rounded-r-lg w-[50%]"
        style={{ width: `${green}%` }}
      >
        &nbsp;
      </span>
    </>
  );
}

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
        className="w-[65%] h-[78%] bg-gray-300 bg-opacity-80 rounded-lg text-white relative select-none overflow-y-auto overflow-x-hidden     scrollbar-thin scrollbar-thumb-gray-100 scrollbar-track-gray-200 scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar-thumb-hover-cyan scrollbar-track-hover-gray-100 scrollbar-thumb-active-cyan scrollbar-track-active-gray-100 "
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
              <div className="w-full md:w-[45%] h-full flex flex-col gap-2 pr-2 ">
                <div className="flex w-full mt-6">
                  <div className="flex flex-col w-full">
                    <div className="flex justify-between ">
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

                <div className="flex w-full mt-3 justify-between flex-wrap">
                  <div className="flex flex-col">
                    <span className="text-sm capitalize text-gray-100">
                      Market Cap
                    </span>
                    <h2 className="text-base font-bold">
                      {new Intl.NumberFormat("en-IN", {
                        style: "currency",
                        currency: currencyUnit,
                        minimumFractionDigits: 0,
                      }).format(coinData.market_data.market_cap[currencyUnit])}
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
                    }).format(coinData.market_data.total_volume[currencyUnit])}
                  </h2>
                </div>


                <div className="flex w-full mt-4 justify-between">
                <IndicatorBar
                  currentPrice={coinData.market_data.current_price[currencyUnit]}
                  high={coinData.market_data.high_24h[currencyUnit]}
                  low={coinData.market_data.low_24h[currencyUnit]}
                />
              </div>


                <div className="flex w-full justify-between flex-wrap ">
                  <div className="flex flex-col">
                    <span className="text-sm capitalize text-gray-100 ">
                      24H Low
                    </span>
                    <h2 className="text-base font-bold ">
                      {new Intl.NumberFormat("en-IN", {
                        style: "currency",
                        currency: currencyUnit,
                        minimumFractionDigits: 0,
                      }).format(coinData.market_data.low_24h[currencyUnit])}
                    </h2>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm capitalize text-gray-100 text-right">
                      24H High
                    </span>
                    <h2 className="text-base font-bold text-right">
                      {new Intl.NumberFormat("en-IN", {
                        style: "currency",
                        currency: currencyUnit,
                        minimumFractionDigits: 0,
                      }).format(coinData.market_data.high_24h[currencyUnit])}
                    </h2>
                  </div>
                </div>

                <div className="flex w-full justify-between flex-wrap">
                  <div className="flex flex-col">
                    <span className="text-sm capitalize text-gray-100 ">
                      max supply
                    </span>
                    <h2 className="text-base font-bold  ">
                      {coinData.market_data.max_supply
                        ? new Intl.NumberFormat("en-IN", {
                            style: "decimal",
                            maximumFractionDigits: 0,
                          }).format(coinData.market_data.max_supply)
                        : "N/A"}
                    </h2>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm capitalize text-gray-100 text-right">
                      circulating supply
                    </span>
                    <h2 className="text-base font-bold text-right">
                      {new Intl.NumberFormat("en-IN", {
                        style: "decimal",
                        maximumFractionDigits: 0,
                      }).format(coinData.market_data.circulating_supply)}
                    </h2>
                  </div>
                </div>

                <div className="flex w-full justify-between flex-wrap mt-2 ">
                  <div className="flex flex-col text-[13px] ">
                    <div className="bg-gray-200 m-[2px] pl-2 pr-2 pt-1 pb-1 rounded-md">
                      <a
                        href={coinData?.links?.homepage[0]}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[#ffffffa7] hover:text-white"
                      >
                        {coinData?.links?.homepage[0].length > 25
                          ? coinData?.links?.homepage[0].substring(0, 25) +
                            "..."
                          : coinData?.links?.homepage[0]}
                      </a>
                    </div>
                    <div className="bg-gray-200 m-[2px] pl-2 pr-2 pt-1 pb-1 rounded-md">
                      <a
                        href={coinData?.links?.blockchain_site[0]}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[#ffffffa7] hover:text-white"
                      >
                        {coinData?.links?.blockchain_site[0].length > 25
                          ? coinData?.links?.blockchain_site[0].substring(
                              0,
                              25
                            ) + "..."
                          : coinData?.links?.blockchain_site[0]}
                      </a>
                    </div>

                    {coinData.links.official_forum_url[0] && (
                      <div className="bg-gray-200 pl-2 pr-2 pt-1 pb-1 m-[2px] rounded-md">
                        <a
                          href={coinData?.links?.official_forum_url[0]}
                          target="_blank"
                          rel="noreferrer"
                          className="text-[#ffffffa7] hover:text-white"
                        >
                          {coinData?.links?.official_forum_url[0].length > 25
                            ? coinData?.links?.official_forum_url[0].substring(
                                0,
                                25
                              ) + "..."
                            : coinData?.links?.official_forum_url[0]}
                        </a>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col -mt-2">
                    {/* two div blocks like the coinData.market_data.price_change_percentage_24h block shows green/res with a svg, same do for sentiment down and up */}

                    <span className="text-sm capitalize text-gray-100 text-right mb-1">
                      Sentiment
                    </span>
                    <div
                      className={`text-sm px-1 ml-2 font-medium flex items-center
                          rounded uppercase bg-opacity-25
                               bg-[#00800054] text-green
                        `}
                    >
                      <span>
                        {Number(coinData.sentiment_votes_up_percentage).toFixed(
                          2
                        )}
                        %
                      </span>
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 14 14"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="
                            w-[1rem] ml-0.5
                            fill-green rotate-180"
                          
                      >
                        <path
                          d="M7.47951 11.4153C7.42599 11.493 7.35438 11.5565 7.27085 11.6004C7.18732 11.6444 7.09437 11.6673 7.00001 11.6673C6.90564 11.6673 6.81269 11.6444 6.72916 11.6004C6.64563 11.5565 6.57402 11.493 6.52051 11.4153L1.27051 3.83194C1.20974 3.74447 1.1741 3.64202 1.16747 3.53572C1.16084 3.42943 1.18346 3.32334 1.23289 3.229C1.28232 3.13466 1.35665 3.05567 1.44782 3.0006C1.53899 2.94554 1.6435 2.91652 1.75001 2.91669H12.25C
                            12.3563 2.91713 12.4604 2.94652 12.5512 3.00172C12.642 3.05691 12.716 3.13581 12.7653 3.22993C12.8147 3.32406 12.8374 3.42984 12.8311 3.53591C12.8247 3.64199 12.7896 3.74433 12.7295 3.83194L7.47951 11.4153Z"
                        />
                      </svg>
                    </div>
                    <div
                      className={`text-sm px-1 ml-2 font-medium flex items-center
                          rounded uppercase bg-opacity-25 mt-2
                          bg-[#ff050560] text-[#c49c9c]
                        `}
                    >
                      <span>
                        {Number(
                          coinData.sentiment_votes_down_percentage
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
                            fill-[#ffbbbb]
                          `}
                      >
                        <path
                          d="M7.47951 11.4153C7.42599 11.493 7.35438 11.5565 7.27085 11.6004C7.18732 11.6444 7.09437 11.6673 7.00001 11.6673C6.90564 11.6673 6.81269 11.6444 6.72916 11.6004C6.64563 11.5565 6.57402 11.493 6.52051 11.4153L1.27051 3.83194C1.20974 3.74447 1.1741 3.64202 1.16747 3.53572C1.16084 3.42943 1.18346 3.32334 1.23289 3.229C1.28232 3.13466 1.35665 3.05567 1.44782 3.0006C1.53899 2.94554 1.6435 2.91652 1.75001 2.91669H12.25C
                            12.3563 2.91713 12.4604 2.94652 12.5512 3.00172C12.642 3.05691 12.716 3.13581 12.7653 3.22993C12.8147 3.32406 12.8374 3.42984 12.8311 3.53591C12.8247 3.64199 12.7896 3.74433 12.7295 3.83194L7.47951 11.4153Z"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              {/* Charts here */}
              <div className=" w-full md:w-[55%] md:-mt-2 pl-4  h-full flex flex-col  bg-[#00ffff00] ">
                <div className=" w-full h-[50%]  ">
                  <Charts coinId={coinId} currencyUnit={currencyUnit} />
                </div>
                <div className="w-full mt-5  ">
                  {/* Market Cap Rank:5
                    CoinGecko Rank:
                    CoinGecko Score: */}

                  <div className="flex w-full h-full flex-col gap-2 p-2">
                    <div className="flex w-full  items-center">
                      <span className="text-md capitalize text-gray-100 mr-2">
                        Market Cap Rank:
                      </span>
                      <h2 className="text-md text-[#eaeaea] font-bold">
                        {coinData.market_cap_rank}
                      </h2>
                    </div>
                    <div className="flex w-full items-center">
                      <span className="text-md capitalize text-gray-100 mr-2">
                        CoinGecko Rank:
                      </span>
                      <h2 className="text-md  text-[#cecece] font-bold">
                        {coinData.coingecko_rank}
                      </h2>
                    </div>
                    <div className="flex w-full  items-center">
                      <span className="text-md capitalize text-gray-100 mr-2">
                        CoinGecko Score:
                      </span>
                      <h2 className="text-md text-[#cecece] font-bold">
                        {coinData.coingecko_score}
                      </h2>
                    </div>
                  </div>

                </div>

                </div>
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
