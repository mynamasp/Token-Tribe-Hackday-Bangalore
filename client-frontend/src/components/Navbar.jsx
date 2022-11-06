import React from "react";
import { useContext } from "react";
import { WalletContext } from "../contexts/walletContext";
import "./Navbar.css";

const Navbar = () => {
  const walletContext = useContext(WalletContext);
  const { connectWallet, appStatus, currentAccount } = walletContext;
  return (
    <div className="navbar">
      <h1 className="logo">Token Tribe</h1>

      <div className="Middle">
        <span> Market Place</span>
        <span> Create Token</span>
        <span> WhitePaper</span>
      </div>

      <div className="Last">
        <button
          className="btn"
          onClick={() => {
            if (appStatus !== "connected") {
              connectWallet();
            } else {
              console.log("Wallet Already Connected !!!");
            }
          }}
        >
          {appStatus === "connected"
            ? `${currentAccount.substring(1, 6)}...${currentAccount.substring(
                37,
                42
              )}`
            : "Connect Wallet"}
        </button>
        <img
          className="image"
          src={require("../images/male_logo_nav.png")}
          alt="logo"
        />
      </div>
    </div>
  );
};

export default Navbar;
