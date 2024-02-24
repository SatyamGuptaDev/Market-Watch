import React, { useContext, useRef } from "react";
import pageinationArrow from "../assets/pagination-arrow.svg";
import { useState } from "react";
import { CryptoContext } from "../context/CryptoContext";
import { useEffect } from "react";
import submitIcon from "../assets/submit-icon.svg";

const PerPage = () => {
  const { setPerPage } = useContext(CryptoContext);
  const inputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    let val = inputRef.current.value;
    if (val >= 10) {
      setPerPage(val);
      inputRef.current.value = val;
    }
  };

  return (
    <form
      className="relative flex items-center font-nunito
            mr-12
            "
      onSubmit={handleSubmit}
    >
      <label
        htmlFor="perpage"
        className="relative flex justify-center items-center
            mr-2 font-bold
            "
      >
        per page:{" "}
      </label>
      <input
        type="number"
        name="perpage"
        min={10}
        max={100}
        ref={inputRef}
        placeholder="10"
        className="w-16 rounded bg-gray-200 placeholder:text-gray-100
       pl-2 required outline-0 border border-transparent 
       focus:border-cyan leading-4
       "
      />
      <button type="submit" className="ml-1 cursor-pointer">
        <img src={submitIcon} alt="submit" className="w-full h-auto" />
      </button>
    </form>
  );
};



const Pagination = () => {


  const { currentPage, setCurrentPage, totalCoins, perPage, CryptoData  } = useContext(CryptoContext);

  const endPage = Math.floor( totalCoins / perPage );

  const next = () => {
    setCurrentPage((currentPage) => Math.min(currentPage + 1, endPage));
  };

  const prev = () => {
    setCurrentPage((currentPage) => Math.max(currentPage - 1, 1));
  };


 if(CryptoData && CryptoData.length >= perPage)
{  
  return (
    <div className="flex items-center justify-center h-[1.8rem] ">
      <PerPage />

      <ul className="flex items-center justify-center space-x-2">
        <li className="w-8 h-8 mx-2  rounded cursor-pointer">
          <button>
            <img
              src={pageinationArrow}
              alt="arrow-left"
              className="transform rotate-180"
              onClick={prev}
            />
          </button>
        </li>

        {currentPage !== 1 &&
        currentPage !== endPage &&
        currentPage !== endPage - 1 ? (
          <li
            className="w-10  h-10  mx-2  text-2xl   bg-gray-200  rounded-full flex justify-center items-center cursor-pointer size-8"
            onClick={prev}
          >
            <button>{currentPage - 1}</button>
          </li>
        ) : null}

        {currentPage === endPage ? (
          <>
            <li
              className="w-10 h-10  mx-2  text-2xl   bg-gray-200  rounded-full flex justify-center items-center cursor-pointer"
              onClick={() => setCurrentPage(currentPage - 2)}
            >
              <button> ... </button>
            </li>

            <li
              className="w-10 h-10   mx-2 text-2xl   bg-gray-200  rounded-full flex justify-center items-center  cursor-pointer"
              onClick={prev}
            >
              <button> {currentPage - 1}</button>
            </li>

            <li
              className="w-10 h-10  mx-2  text-2xl   bg-cyan font-bold text-black  rounded-full flex justify-center items-center cursor-pointer"
              onClick={() => setCurrentPage(endPage)}
            >
              <button> {endPage} </button>
            </li>
          </>
        ) : currentPage !== endPage - 1 ? (
          <>
            <li className="w-10 h-10   mx-2 text-2xl   bg-cyan text-black font-bold  rounded-full flex justify-center items-center  cursor-pointer">
              <button> {currentPage}</button>
            </li>

            <li
              className="w-10 h-10   mx-2 text-2xl   bg-gray-200  rounded-full flex justify-center items-center  cursor-pointer"
              onClick={next}
            >
              <button> {currentPage + 1}</button>
            </li>

            <li
              className="w-10 h-10  mx-2  text-2xl   bg-gray-200  rounded-full flex justify-center items-center cursor-pointer"
              onClick={() =>
                currentPage < endPage - 1
                  ? setCurrentPage(currentPage + 2)
                  : null
              }
            >
              <button> ... </button>
            </li>

            <li
              className="w-10 h-10  mx-2  text-2xl   bg-gray-200  rounded-full flex justify-center items-center cursor-pointer"
              onClick={() => setCurrentPage(endPage)}
            >
              <button> {endPage} </button>
            </li>
          </>
        ) : (
          // for endpage -1 page
          <>
            <li
              className="w-10 h-10  mx-2  text-2xl   bg-gray-200  rounded-full flex justify-center items-center cursor-pointer"
              onClick={() => setCurrentPage(currentPage - 1)}
            >
              <button> ... </button>
            </li>

            <li className="w-10 h-10   mx-2 text-2xl   bg-cyan text-black font-bold  rounded-full flex justify-center items-center  cursor-pointer">
              <button> {currentPage}</button>
            </li>

            <li
              className="w-10 h-10  mx-2  text-2xl   bg-gray-200  rounded-full flex justify-center items-center cursor-pointer"
              onClick={() => setCurrentPage(endPage)}
            >
              <button> {endPage} </button>
            </li>
          </>
        )}

        <li className="w-8 h-8 mx-2 rounded-md cursor-pointer" onClick={next}>
          <img src={pageinationArrow} alt="arrow-right" className="" />
        </li>
      </ul>
    </div>
  );
}



};

export default Pagination;
