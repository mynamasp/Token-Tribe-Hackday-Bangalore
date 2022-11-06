import React from 'react';
import BountyCardIcon from '../images/MaleUser.png';
import './CommentCard.css';

const CommentCard = (props) => {
    const {id,msg} = props.comment;
    return(
        <div className='IndiComment'>
            <div id="CommentHead">
                <img src={BountyCardIcon} style={{width:'40px'}}></img>
                <div id="commentername">User#{id}</div>
            </div>
            <div id="commentbody">
                {msg}
            </div>
        </div>
    )
}

export default CommentCard