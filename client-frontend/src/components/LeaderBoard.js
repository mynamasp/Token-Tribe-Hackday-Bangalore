import React from 'react'
import img1 from '../images/GroupIcons.png'
import './leaderboard.css'
import TribeCard from './TribeCard'
import bg from '../images/backgrad1.png'

const TokenTribe = () => {
    const Tribles = [
        {no:1,name:"Emma887",bounties:78},
        {no:2,name:"JakeLokli",bounties:75},
        {no:3,name:"LadyAmberStar",bounties:71},
        {no:4,name:"DaBoss420",bounties:70},
        {no:5,name:"ProgrammerSID",bounties:69},
        {no:6,name:"StewartLittlePP",bounties:65},
    ];
    const RenderList = Tribles.map((person) => {
        return(<TribeCard person={person}></TribeCard>);
    });
  return (
    <div>
        {/* <header className='header spacing'>
            <p id="TokenTribe">Token Tribe</p>
            <div className='headere'>
                <button id="connectWallet">Connect Wallet</button>
                <div id="usericon"></div>
            </div>
        </header> */}
        <div className='displaycards'>
            <img className='bg fade-image' src={bg}></img>
            <div id="text1">What our top contributors get</div>
            <div className='Cards'>
                <img className='cardimage' src={img1} alt="icon1"></img>
            </div>
        </div>
        <div className='TribeList'>
            {RenderList}
        </div>
    </div>
  )
}

export default TokenTribe
