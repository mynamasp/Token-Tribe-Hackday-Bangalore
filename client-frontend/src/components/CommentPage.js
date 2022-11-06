import React from 'react';
import './BountyCard.css';
import './CommentPage.css';
import BountyCardIcon from '../images/MaleUser.png';
import CommentCard from './CommentCard';

const CommentPage = () => {
    const {name,desc,prize} = {name:"Earnweb3 Dao",desc:"Violence Violence Violence, I don't like, I avoid. But Violence likes me , can't avoid. Help me to avoid Violence. Help me, help. I avoid. This. Violence I avoid, you. I don't like violence. But violence, I like. Violence, violent, violence. Violence. No, I don't like violence. I avoid violence. Violent.",prize:20 };// Dummy Data, To be fetched by API.
    const comments = [
        {id:200,msg:'Hi, I can help you get over violence , please give me coins, your coins are so nice, I want your coins pls pls pls.'},
        {id:167,msg:'Hi, I am a serious person and I dont understand your strange request, please help me make sence of your bounty so that I can earn some nice sweet coins.'},
        {id:195,msg:'Hi, If you just read the previous two comment, it was just a joke in case this made it into the final version, this was supposed to be removed during production.'}
    ]
    const renderComments = comments.map((comment) => {
        return(<CommentCard comment={comment}/>)
    })
    return(
        <div id="commentMain">
            <div className='cardBody2'>
                <div className='posterprof'>
                    <img id="boutnycardpfp" src={BountyCardIcon}></img>
                    <div id="postername">{name}</div>
                </div>
                <div className='postercontent'>{desc}</div>
                <div className='postFoot'>
                    <div id="postreward">Bounty: {prize} $Tribe</div>
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