import React from 'react'
import './Navbar.css'; 

const navbar = () => {
  return (
    <div className='navbar'>
        <h1 className='logo'>Token Tribe</h1>

        <div className='Middle'>
          <span> Market Place</span>
          <span> Create Token</span>
          <span> WhitePaper</span>
        </div>
        
        <div className='Last'>
          <button className='btn'>Connect Wallet</button>
          <img className='image' src = {require("../images/male_logo_nav.png")} alt="logo" />
        </div>
    </div>
  )
}

export default navbar;
