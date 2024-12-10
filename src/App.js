import React from "react";
import { BrowserRouter,Route, Routes } from "react-router-dom";
import AppScreen from "./components/AppScreen";
import ConnectWallet from "./components/ConnectWallet";
import "./App.css";
import Register from "./components/Register";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import History from "./components/History";

function App() {
  // return "We are currently down for Maintenance";

  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<ConnectWallet />}></Route>
        <Route path="/history" element={<History />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/main" element={<AppScreen />}></Route>
      </Routes>
      </BrowserRouter>
      <ToastContainer theme="dark" />
    </>
  );
}

export default App;
