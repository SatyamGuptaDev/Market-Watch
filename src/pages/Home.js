import React, { useContext } from "react";
import { Outlet } from "react-router-dom";
import Logo from "../components/Logo";
import Navigation from "../components/Navigation";
import { CryptoContext, CryptoProvider } from "../context/CryptoContext";

const Home = () => {
  return (
    <CryptoProvider>
      <div>
        <main className=" w-full h-full flex flex-col first-letter:content-center items-center relative text-white font-nunito">
          <div className=" w-screen h-screen bg-gray-300 fixed -z-10" />

          <Logo />
          <Navigation />

          <Outlet />
        </main>
      </div>
    </CryptoProvider>
  );
};

export default Home;
