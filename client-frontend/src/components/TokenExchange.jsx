import React from 'react'
import Navbar from "./Navbar.jsx";
import "./Navbar.css";
import "./TokenExchange.css"

const Cards = ({numb,head}) =>{
    return(
        <div className='cards' >
            <p>{head}</p>
            <span>+ {numb} Bounties Post</span>
            <button>Buy Now </button>
        </div>
    )
}

const TokenExchange = () => {
    const tribeToken = 123;
    const maticToken = 123.45;
  return (
    <div>
      <div style = {{paddingBottom: "5rem"}}>
        <Navbar/>
      </div>

      <div className="Top_column">
        <h1>Available Tokens</h1>

        <div className='right_col_inside'>
            <span>{tribeToken } $Tribe</span>
            <button>+</button>
        </div>
      </div>
    
      <div className='beech_wala'>
        <Cards numb = {5}/>
        <Cards numb = {12} head={"Most Popular"}/>
        <Cards numb = {10}/>
      </div>

      <div className='neeche_wala'>

      </div>
    </div>
  )
}

export default TokenExchange
