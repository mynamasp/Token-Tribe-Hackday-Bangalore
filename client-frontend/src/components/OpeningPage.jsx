import React from "react";
import "./OpeningPage.css";
import NewNavbar from "./NewNavbar";

const OpeningPage = () => {
  return (
    <div>
      <div style={{ paddingBottom: "5rem" }}>
        <NewNavbar />
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            fontFamily: "Manrope,sans-serif",
            marginTop: "10%",
            marginLeft: "15%",
            marginRight: "40%",
          }}
        >
          <span style={{ fontSize: "50px", fontWeight: "bolder" }}>
            Token Tribe
          </span>
          <div style={{ fontSize: "35px", marginTop: "2%" }}>
            <span>The Only DAO / Community</span>
            <span> platform you will need.</span>
          </div>
          <button
            style={{
              border: "solid white 3px",
              borderRadius: "30px",
              color: "white",
              background: "black",
              padding: "20px 20px 20px 20px",
              fontSize: "20px",
              fontWeight: "bold",
              marginTop: "5%",
              width: "55%",
              cursor: "pointer",
            }}
            className="buttonAni "
          >
            Connect Wallet
          </button>
        </div>

        <div>
          <img
            style={{ height: "650px", alignItems: "flex-end" }}
            src={require("../images/OpeningPage.png")}
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default OpeningPage;
