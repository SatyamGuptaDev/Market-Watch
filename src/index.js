import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from './pages/Home';
import Crypto from './pages/Crypto';
import Saved from './pages/Saved';
import Trending from './pages/Trending';
import CryptoDetails from './components/CryptoDetails';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    children: [
      {
        path: "/",
        element: <Crypto />,
        children: [
          {
            path: "/:coinId",
            element: <CryptoDetails />,
          },
        ],

      },
      {
        path: "/trending",
        element: <Trending />,
        children: [
          {
            path: "/trending/:coinId",
            element: <CryptoDetails />,
          },
        ],

      },
      {
        path: "/saved",
        element: <Saved />,
      }
    ],
  },
]);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    
    <RouterProvider router={router} />  
    
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
