import React from "react";
import Navbar from "./Navbar.jsx";
import GetStartedCart from "./getStartedCart.jsx";
import "./getStarted.css";

const GetStarted = () => {
  return (
    <>
      <Navbar />
      <div style={{ paddingTop: "5rem" }}>
        <div className="Main">
          <div className="middle"></div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div
              style={{
                display: "flex",
                flex: 1,
                width: "50rem",
                margin: "0 auto",
              }}
            >
              <GetStartedCart
                number={1}
                para={"Get your DAO / Community Registered with us."}
              />
              <GetStartedCart
                number={2}
                para={"Generate your unique DAO/Community XXXX Token."}
              />
              <GetStartedCart
                number={3}
                para={
                  "Create Task for Dao/Community Members and award them with your Token."
                }
              />
            </div>
            <div style={{width: "30rem", margin: "3rem auto"}}>
              <GetStartedCart
                number={4}
                para={
                  "Members can redeem various merchs , tech products & NFT Tickets with their earned tokens"
                }
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default GetStarted;
