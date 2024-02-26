import React from "react";
import ReactDOM from "react-dom";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

function CryptoDetails() {

  const navigate = useNavigate();

  const {coinId} = useParams();

  function closeModal() {
    navigate("..");
  }

  

  return ReactDOM.createPortal(
    <div
      className="fixed top-0 w-full h-full bg-gray-200 bg-opacity-40 first-letter:
    backdrop-blur-sm flex items-center justify-center font-nunito"
    onClick={closeModal}
    >
    
      <div className="w-[65%] h-[75%] bg-gray-300 bg-opacity-75 rounded-lg text-white relative select-none">

        <h1 className="text-3xl font-bold text-center pt-4">{coinId}</h1>

      </div>

    </div>,

    document.getElementById("modal")
  );
}

export default CryptoDetails;
