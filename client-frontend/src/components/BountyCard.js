import React from 'react';
import './BountyCard.css';
import BountyCardIcon from '../images/MaleUser.png';
import commentIcon from '../images/CommentsIcon.png';
import { useNavigate } from 'react-router-dom';

const BountyCard = (props) => {
    const { name, description, prize, _id } = props.bountyDetails;
    const navigate = useNavigate();
    return (
        <div className='cardBody' key={_id}>
            <div className='posterprof'>
                <img id="boutnycardpfp" src={BountyCardIcon}></img>
                <div id="postername">{name}</div>
            </div>
            <div className='postercontent'>{description}</div>
            <div className='postFoot'>
                <div id="postreward">Bounty: {prize} $Tribe</div>
                <button id="comments" style={{ cursor: 'pointer' }} onClick={() => { navigate(`/bounty/${_id}`) }}><img src={commentIcon} /></button>
            </div>
        </div>
    )
}

export default BountyCard