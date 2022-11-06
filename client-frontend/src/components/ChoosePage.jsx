import React from "react";
import "./ChoosePage.css";
import NewNavbar from "./NewNavbar";

const ChoosePage = () => {
  return (
    <div className="ChoosePage">
      <div style={{ paddingBottom: "4.5rem" }}>
        <NewNavbar />
      </div>

      <div className="whole_div bg_img">
        <div className="upparWalaKhokka">
          <h2 style = {{marginRight:"2vh"}}>Name : </h2>
          <input type="text" name="" id="formInput" />
        </div>
        <h1>Which side are you on ?</h1>

        <div className="overall_section">
          <div className="image_section">
            <img className = "img" src={require("../images/choosePageLeft.png")} alt="" />
            <button className="btn">Admin</button>
          </div>
          <div className="image_section2">
            <img className = "img" src={require("../images/choosePageRight.png")} alt="" />
            <button className="btn btn2">Contributor</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChoosePage;
