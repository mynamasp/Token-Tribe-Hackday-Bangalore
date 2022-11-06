import React from 'react'
import Navbar from "./Navbar.jsx";
import "./Navbar.css";
import "./TokenExchange.css"

const TokenExchange = () => {
    const demoToken = 123;
  return (
    <div>
      <div style = {{paddingBottom: "5rem"}}>
        <Navbar/>
      </div>

      <div className="Top_column">
        <h1>Available Tokens</h1>

        <div className='left_col_inside'>
            <span>{demoToken } $Tribe</span>
            <img src= {require("../images/plusSymbol.png")} alt="" />
        </div>
      </div>
    </div>
  )
}

export default TokenExchange
