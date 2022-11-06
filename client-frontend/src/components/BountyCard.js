import React from 'react';
import './BountyCard.css';
import BountyCardIcon from '../images/MaleUser.png';
import commentIcon from '../images/CommentsIcon.png';

const BountyCard = (props) => {
    const {name,desc,prize} = props.bountyDetails;
    return(
        <div className='cardBody'>
            <div className='posterprof'>
                <img id="boutnycardpfp" src={BountyCardIcon}></img>
                <div id="postername">{name}</div>
            </div>
            <div className='postercontent'>{desc}</div>
            <div className='postFoot'>
                <div id="postreward">Bounty: {prize} $Tribe</div>
                <button id="comments"><img src={commentIcon}/></button>
            </div>
        </div>
    )
}

export default BountyCard