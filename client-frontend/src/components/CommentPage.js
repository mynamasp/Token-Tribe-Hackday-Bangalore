import React, { useContext, useEffect } from 'react';
import './BountyCard.css';
import './CommentPage.css';
import BountyCardIcon from '../images/MaleUser.png';
import CommentCard from './CommentCard';
import { BountyContext } from '../contexts/bountyContext';
import { useParams } from 'react-router-dom';

const CommentPage = () => {
    const bountyContext = useContext(BountyContext);
    const { comments, getBountyDetails, bounty } = bountyContext;

    const { bountyId } = useParams();

    useEffect(() => {
        getBountyDetails(bountyId);
        // eslint-disable-next-line
    }, [])

    const renderComments = comments.map((comment) => {
        return (<CommentCard comment={comment} />)
    })
    return (
        <div id="commentMain">
            <div className='cardBody2'>
                <div className='posterprof'>
                    <img id="boutnycardpfp" src={BountyCardIcon}></img>
                    <div id="postername">{bounty.name}</div>
                </div>
                <div className='postercontent'>{bounty.description}</div>
                <div className='postFoot'>
                    <div id="postreward">Bounty: {bounty.prize} $Tribe</div>
                </div>
            </div>
            <div className='posterprof posterprof2'>
                <img id="boutnycardpfp" src={BountyCardIcon}></img>
                <div id="postername">Comment as User #196</div>
            </div>
            <div className='commentInput'>
                <textarea id="commentIn" rows="5" ></textarea>
                <button id="commentSubmit">Comment</button>
            </div>
            <div className='commentList'>
                {renderComments}
            </div>
        </div>
    )
}

export default CommentPage