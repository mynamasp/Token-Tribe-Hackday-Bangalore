import React from "react";
import { useEffect } from "react";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { WalletContext } from "../contexts/walletContext";
import "./ChoosePage.css";
import NewNavbar from "./NewNavbar";

const ChoosePage = () => {
  const [name, setName] = useState("");
  const walletContext = useContext(WalletContext);
  const { registerUser, currentUser } = walletContext;

  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser.registered === true) {
      if (currentUser.admin) {
        navigate("/admin");
      } else {
        navigate("/");
      }
    }
  }, [currentUser]);

  return (
    <div className="ChoosePage">
      <div style={{ paddingBottom: "4.5rem" }}>
        <NewNavbar />
      </div>

      <div className="whole_div bg_img">
        <div className="upparWalaKhokka">
          <h2 style={{ marginRight: "2vh" }}>Name : </h2>
          <input
            type="text"
            name=""
            id="formInput"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <h1>Which side are you on ?</h1>

        <div className="overall_section">
          <div className="image_section">
            <img
              className="img"
              src={require("../images/choosePageLeft.png")}
              alt=""
            />
            <button className="btn" onClick={() => registerUser(name, 1)}>
              Admin
            </button>
          </div>
          <div className="image_section2">
            <img
              className="img"
              src={require("../images/choosePageRight.png")}
              alt=""
            />
            <button className="btn btn2" onClick={() => registerUser(name, 0)}>
              Contributor
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChoosePage;
