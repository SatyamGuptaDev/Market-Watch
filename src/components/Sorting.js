import React from "react";
import { useContext } from "react";
import { CryptoContext } from "../context/CryptoContext";
import Reset from "./Reset";

const Sorting = () => {

  const { setSorting } = useContext(CryptoContext);
  const { sortingOption } = useContext(CryptoContext);

    const handleOption = (e) => {
        e.preventDefault();
        const option = e.target.value;
        setSorting(option);
    }

  return (
    <form className="w-93 h-full relative font-nunito flex items-center mr-4">
      <label
        htmlFor="sorting"
        className="text-white font-nunito font-bold mr-2"
      >
        Sorting:{" "}
      </label>
      <select
        name="sorting"
        id="sorting"
        className="w-full rounded bg-gray-200 placeholder-text-gray-100 pl-2 pr-2 required outline-none border border-transparent focus:border-cyan"
        onChange={handleOption}
        value={sortingOption}
      >
        <option value="market_cap_desc">Market Cap Desc</option>
        <option value="market_cap_asc">Market Cap Asc</option>
        <option value="volume_desc">Volume Desc</option>
        <option value="volume_asc">Volume Asc</option>
        <option value="id_desc">ID Desc</option>
        <option value="id_asc">ID Asc</option>
        <option value="gecko_desc">Gecko Desc</option>
        <option value="gecko_asc">Gecko Asc</option>
      </select>

      
      
    </form>
  );
};

export default Sorting;
