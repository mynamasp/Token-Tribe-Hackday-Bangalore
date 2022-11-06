import React from 'react'
import './TribeCard.css'
import usericon from '../images/MaleUser.png'

const TribeCard = (props) => {
    const {no,name,bounties} = props.person;
    if(no===1){
        return(
            <div className='cardbody'>
                <div id="num" className='no1'>{no}</div>
                <div id="usericon2"><img src={usericon} alt="usericon"></img></div>
                <div id="name">{name}</div>
                <div id="bounties">{bounties+" Bounties "}</div>
            </div>
        )
    }
    else if(no===2){
        return(
            <div className='cardbody'>
                <div id="num" className='no2'>{no}</div>
                <div id="usericon2"><img src={usericon} alt="usericon"></img></div>
                <div id="name">{name}</div>
                <div id="bounties">{bounties+" Bounties "}</div>
            </div>
        )
    }
    else if(no===3){
        return(
            <div className='cardbody'>
                <div id="num" className='no3'>{no}</div>
                <div id="usericon2"><img src={usericon} alt="usericon"></img></div>
                <div id="name">{name}</div>
                <div id="bounties">{bounties+" Bounties "}</div>
            </div>
        )
    }
    return(
        <div className='cardbody'>
            <div id="num">{no}</div>
            <div id="usericon2"><img src={usericon} alt="usericon"></img></div>
            <div id="name">{name}</div>
            <div id="bounties">{bounties+" Bounties "}</div>
        </div>
    );
}

export default TribeCard