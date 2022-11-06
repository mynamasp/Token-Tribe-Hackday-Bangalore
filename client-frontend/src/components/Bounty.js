import React, { useContext, useEffect } from 'react';
import usericonBounty from '../images/MaleUser.png'
import sideSecIcon from '../images/iconBounties.png'
import searchicon from '../images/MG.png'
import './Bounty.css'
import BountyCard from './BountyCard';
import { BountyContext } from '../contexts/bountyContext';
import { WalletContext } from '../contexts/walletContext';
import { useNavigate } from 'react-router-dom';

const Bounty = () => {
    const bountyContext = useContext(BountyContext);
    const { getBounties, bounties } = bountyContext;

    const walletContext = useContext(WalletContext);
    const { currentUser } = walletContext;

    const navigate = useNavigate();

    useEffect(() => {
        getBounties();
    }, [])

    useEffect(() => {
        if (currentUser.admin === true) {
            navigate('/admin');
        }
    }, [])

    const renderBountyList = bounties.map((bountyDetails) => {
        return (<BountyCard bountyDetails={bountyDetails} />)
    })
    return (
        <div className='bountymain'>

            <div className='sideSec'>
                <img id="usericonBounty" src={usericonBounty} ></img>
                <div className='sidesecText'>Bounty Won: 20 $Tribe</div>
                <div className='sidesecText'>Bounties Attended: 50</div>
                <img id="sideSecIcon" src={sideSecIcon} ></img>
            </div>

            <div className='focusSec'>
                <div className='searchBar'><input className="nosubmit" type="search" placeholder="Search..." /><img src={searchicon} className="searchbtn"></img></div>
                <div className='searchFilter'>
                    <div className="filterAll">All</div>
                    <div className="filterEle">Recomended for you (18)</div>
                    <div className='filterEle'>Filters</div>
                </div>
                <div className='BountyCardList'>
                    {renderBountyList}
                </div>
            </div>

        </div>
    );
}

export default Bounty;