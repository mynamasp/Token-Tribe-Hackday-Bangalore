import React from 'react';
import "./NewNavbar.css";

const NewNavbar = () => {
  return (
    <div className="newNavbar">
      <h1 className='newLogo'>Token Tribe</h1>

      <div className="right_side">
        <button className='newBtn'>Connect Wallet</button>
        <img className='newImage' src= {require("../images/male_logo_nav.png")} alt="" />
      </div>
    </div>
  )
}

export default NewNavbar
