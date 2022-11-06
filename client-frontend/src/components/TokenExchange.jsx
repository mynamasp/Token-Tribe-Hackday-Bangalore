import React from 'react'
import Navbar from "./Navbar.jsx";
import "./Navbar.css";
import "./TokenExchange.css"

const LastPart = () => {
    const maticToken = 123.45;
    const tribeToke = 123;
    return (
        <div className=''>
            <div className='ragul'>
            <div className='first_feild'>
                <span>Enter amount of $ Tribe</span>
                <input className='input_feild' type="text" name="" id="" />
            </div>

            <div className='middle_feild'>
                <div className='left_feild'>
                    <span>{tribeToke}</span>
                    <span>$ Tribe</span>
                </div>

                <div className='middle_middle_feild'>
                    <span>=</span>
                </div>

                <div className='right_feild'>
                    <img src={require("../images/tokenExchange/polygon.png")} alt="" />
                    <span>{maticToken}</span>
                    <span>Matic</span>
                </div>
            </div>

            <div className="end_feild">
                <img className = "arrow" src={require("../images/tokenExchange/left.png")} alt=""/>
                <h2>Mint Now</h2>
                <img className = "arrow" src={require("../images/tokenExchange/right.png")} alt=""/>
            </div>
        </div>
        </div>
    )
}

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

      <div className='laast'>
        <LastPart/>
      </div>
    </div>
  )
}

export default TokenExchange
