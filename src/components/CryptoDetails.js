import React, { useLayoutEffect } from "react";
import ReactDOM from "react-dom";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useContext } from "react";
import { CryptoContext } from "../context/CryptoContext";

function CryptoDetails() {
  const navigate = useNavigate();

  const { getCoinData, coinData, setCoinData } = useContext(CryptoContext);

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
              <h1 className=" text-[2rem] ">{coinData && coinData.name}</h1>
              <p className=" w-fit h-fit pl-2 pr-2 pt-0.5 pb-0.5  place-self-center rounded-sm  bg-[#14ffcc3a] text-cyan  uppercase">
                {coinData && coinData.symbol}
              </p>
            </div>

            <div className=" flex flex-wrap w-full h-full">

              {/* Info here */}
              <div className="w-[45%] h-full flex flex-col gap-2 pr-2">

                <div className="flex flex-col mt-4">
                  <div className="flex justify-between">
                    <span className=" text-[15px] font-light text-gray-100">Price</span>
                    <span className="text-[12px] font-light text-[#65ff65] w-fit h-fit pl-1 pr-1 pt-0.5 pb-0.5 place-self-center rounded-md bg-[rgba(37,218,115,0.15)]">
                      {coinData.market_data.price_change_24h.toFixed(2)}%
                    </span>
                  </div>
                  <div className="text-[20px] font-bold text-white">

                    {coinData.market_data.current_price.usd.toLocaleString("en-US", {
                      style: "currency",
                      currency: "USD",
                    })}
                    
                  </div>
                </div>



              </div>





              {/* Charts here */}
              <div className="w-[55%] h-full p-1 flex flex-col gap-2 bg-green">


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
