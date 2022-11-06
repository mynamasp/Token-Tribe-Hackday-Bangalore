import React from 'react';
import "./MarketLanding.css";
import NewNavbar from './NewNavbar';

const MarketLanding = () => {
  return (
    <div>
        <div style = {{ paddingBottom: "1rem"}}>
            <NewNavbar/>
        </div>

        <div className='beech_wala'>
            <div className='beech_left'>
                <h1>Redeem Your $TRIBE Tokens</h1>
                <p>Perform Tasks -earn rewards-redeem with Merchs/Tickets</p>
                <button>Visit Marketplace</button>
            </div>

            <div className='beech_right'>
                <img className='beech_image' src= {require("../images/MarketLanding.png")} alt="" />
            </div>
        </div>
    </div>
  )
}

export default MarketLanding
