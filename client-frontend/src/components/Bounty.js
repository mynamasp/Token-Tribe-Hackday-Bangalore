import React, { useContext, useEffect, useState } from 'react';
import usericonBounty from '../images/MaleUser.png'
import sideSecIcon from '../images/iconBounties.png'
import searchicon from '../images/MG.png'
import './Bounty.css'
import BountyCard from './BountyCard';
import { BountyContext } from '../contexts/bountyContext';
import { WalletContext } from '../contexts/walletContext';
import { useNavigate } from 'react-router-dom';
import { getTokenBalance } from '../utils/interact';

const Bounty = () => {
    const bountyContext = useContext(BountyContext);
    const { getBounties, bounties } = bountyContext;

    const walletContext = useContext(WalletContext);
    const { currentUser, currentAccount } = walletContext;

    const navigate = useNavigate();

    const [token, setTokens] = useState(10);

    const gettokenbalance = async () => {
        const tokens = await getTokenBalance(currentAccount);
        console.log(tokens);
        setTokens(tokens);
    }

    useEffect(() => {
        getBounties();
        if (currentAccount) {
            gettokenbalance();
        }
        // eslint-disable-next-line
    }, [currentAccount])

    useEffect(() => {
        if (currentUser.admin === true) {
            navigate('/admin');
        }
        // eslint-disable-next-line
    }, [])

    const renderBountyList = bounties.map((bountyDetails) => {
        return (<BountyCard bountyDetails={bountyDetails} />)
    })
    return (
        <div className='bountymain'>

            <div className='sideSec'>
                <img id="usericonBounty" src={usericonBounty} alt='usericon'></img>
                <div className='sidesecText'>Bounty Won: {token} $Tribe</div>
                <div className='sidesecText'>Bounties Attended: 50</div>
                <img id="sideSecIcon" src={sideSecIcon} ></img>
            </div>

            <div className='focusSec'>
                <div className='searchBar'><input className="nosubmit" type="search" placeholder="Search..." /><img src={searchicon} className="searchbtn" alt='search'></img></div>
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