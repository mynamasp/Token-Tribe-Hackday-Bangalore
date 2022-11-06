import React, { useEffect } from 'react';
import BountyCardIcon from '../images/MaleUser.png';
import { client } from '../lib/client';
import './CommentCard.css';

const CommentCard = (props) => {
    const { author, content } = props.comment;
    const id = author["_ref"];
    let name;
    const fetchUserName = async () => {
        const query = `*[_type == "user" && _id == "${id}"]`
        const res = await client.fetch(query);
        name = res[0].name;
    }

    useEffect(() => {
        fetchUserName();
    }, [])

    return (
        <div className='IndiComment'>
            <div id="CommentHead">
                <img src={BountyCardIcon} style={{ width: '40px' }}></img>
                <div id="commentername">User# {name}</div>
            </div>
            <div id="commentbody">
                {content}
            </div>
        </div>
    )
}

export default CommentCard;