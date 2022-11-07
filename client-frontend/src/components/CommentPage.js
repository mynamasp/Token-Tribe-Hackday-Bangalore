import React, { useContext, useEffect, useState } from 'react';
import './BountyCard.css';
import './CommentPage.css';
import BountyCardIcon from '../images/MaleUser.png';
import CommentCard from './CommentCard';
import { BountyContext } from '../contexts/bountyContext';
import { useParams } from 'react-router-dom';
import NewNavbar from './NewNavbar';
import { WalletContext } from '../contexts/walletContext';

const CommentPage = () => {
    const bountyContext = useContext(BountyContext);
    const { comments, getBountyDetails, bounty, closeBounty, addCommentBounty, getBountyComments } = bountyContext;

    const walletContext = useContext(WalletContext);
    const { currentAccount } = walletContext;

    const [commentContent, setCommentContent] = useState("");

    const { bountyId } = useParams();

    const [addr, setAddr] = useState('');

    const addcommentbounty = async () => {
        if (commentContent === '') {
            alert("Enter some value !!!");
            return;
        }
        const res = await addCommentBounty(bountyId, commentContent);
        getBountyComments();
    }

    useEffect(() => {
        getBountyDetails(bountyId);
        // eslint-disable-next-line
    }, [])


    useEffect(() => {
        getBountyDetails(bountyId);
        // eslint-disable-next-line
    }, [comments])


    return (
        <>
            <NewNavbar />
            <div id="commentMain">
                <div className='cardBody2'>
                    <div className='posterprof'>
                        <img id="boutnycardpfp" src={BountyCardIcon}></img>
                        <div id="postername">{bounty.name}</div>
                    </div>
                    <div className='postercontent' style={{ textAlign: 'left' }}>{bounty.description}</div>
                    <div className='postFoot'>
                        <div id="postreward" style={{ color: '#FF00E5' }}>Bounty: {bounty.prize} $Tribe</div>
                    </div >
                    {
                        (bounty.author === currentAccount) ? (
                            <div style={{ padding: '20px' }}>
                                <input placeholder='Enter the Address' style={{ border: '2px solid #fff', width: '70%', padding: '10px', background: 'none', borderRadius: '5px', color: '#fff' }} onChange={(e) => setAddr(e.target.value)}></input>
                                <button style={{ border: '2px solid #fff', padding: '10px', background: 'none', borderRadius: '5px', color: '#fff', cursor: 'pointer' }} onClick={() => closeBounty(addr, 0, bountyId)}>Close Bounty</button>
                            </div>
                        ) : "Bounty not closed yet :)"
                    }
                </div>
                <div className='posterprof posterprof2'>
                    <img id="boutnycardpfp" src={BountyCardIcon}></img>
                    <div id="postername">Comment as User #196
                    </div>
                </div>
                <div className='commentInput'>
                    <textarea id="commentIn" rows="5" onChange={(e) => setCommentContent(e.target.value)}></textarea>
                    <button id="commentSubmit" style={{ cursor: 'pointer' }} onClick={() => addcommentbounty()}>Comment</button>
                </div>
                <div className='commentList'>
                    {
                        comments.map((comment) => {
                            return (<CommentCard comment={comment} />)
                        })
                    }
                </div>
            </div>
        </>
    )
}

export default CommentPage