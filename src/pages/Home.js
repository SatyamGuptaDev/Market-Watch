import React, { useContext } from "react";
import { Outlet } from "react-router-dom";
import Logo from "../components/Logo";
import Navigation from "../components/Navigation";
import { CryptoContext, CryptoProvider } from "../context/CryptoContext";
import { TrendingProvider } from "../context/TrendingContext";
import { StorageProvider } from "../context/StorageContext";

const Home = () => {
  return (
    <StorageProvider>

    <CryptoProvider>
    <TrendingProvider>


      <div>
        <main className=" w-full h-full flex flex-col first-letter:content-center items-center relative text-white font-nunito">
          <div className=" w-screen h-screen bg-gray-300 fixed -z-10" />

          <Logo />
          <Navigation />

          <Outlet />
        </main>
      </div>
    </TrendingProvider>
    </CryptoProvider>
    </StorageProvider>
  );
};

export default Home;
