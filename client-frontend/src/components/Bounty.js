import React from 'react';
import usericonBounty from '../images/MaleUser.png'
import sideSecIcon from '../images/iconBounties.png'
import searchicon from '../images/MG.png'
import './Bounty.css'
import BountyCard from './BountyCard';

const Bounty = () => {
    const bounties = [ // sample data , to be replaced by props
        {name:"Earnweb3 Dao",desc:"Violence Violence Violence, I don't like, I avoid. But Violence likes me , can't avoid. Help me to avoid Violence. Help me, help. I avoid. This. Violence I avoid, you. I don't like violence. But violence, I like. Violence, violent, violence. Violence. No, I don't like violence. I avoid violence. Violent.",prize:20 },
        {name:"Bankless Dao",desc:"We are working on a new metaverse, contribute to our project to earn some points. This project would make me happy. (disclaimer - nonfiction) I grew up in a fairly conservative home. I saw the world quite differently from the rest of my family. Growing up, I didn't like to be.",prize:69 },
    ];
    const renderBountyList = bounties.map((bountyDetails)=>{
        return(<BountyCard bountyDetails={bountyDetails}/>)
    })
    return(
        <div className='bountymain'>

            <div className='sideSec'>
                <img id="usericonBounty" src={usericonBounty} ></img>
                <div className='sidesecText'>Bounty Won: 20 $Tribe</div>
                <div className='sidesecText'>Bounties Attended: 50</div>
                <img id="sideSecIcon" src={sideSecIcon} ></img>
            </div>

            <div className='focusSec'>
                <div className='searchBar'><input className="nosubmit" type="search" placeholder="Search..."/><img src={searchicon} className="searchbtn"></img></div>
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