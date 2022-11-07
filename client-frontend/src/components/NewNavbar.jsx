import React from "react";
import { useContext } from "react";
import { WalletContext } from "../contexts/walletContext";
import "./NewNavbar.css";
import MaleLogoNav from "../images/male_logo_nav.png";
import { useNavigate } from "react-router-dom";

const NewNavbar = () => {
  const walletContext = useContext(WalletContext);
  const navigate = useNavigate();
  const { connectWallet, appStatus, currentAccount } = walletContext;
  return (
    <div className="newNavbar" style={{ zIndex: "100" }}>
      <h1
        className="newLogo"
        onClick={() => navigate("/")}
        style={{ cursor: "pointer" }}
      >
        Token Tribe
      </h1>
      <div className="right_side">
        <button
          className="newBtn"
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
        <img className="newImage" src={MaleLogoNav} alt="" />
      </div>
    </div>
  );
};

export default NewNavbar;
