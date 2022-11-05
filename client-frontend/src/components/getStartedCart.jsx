import React from 'react';
import "./getStartedCart.css";

const GetStartedCart = ({number,para}) =>{
    return(
        <div className='main' style={{margin: "0 2rem"}}>
            <h1 className='num'> {number} </h1>
            <p className='text'> {para} </p>
        </div>
    )
}

export default GetStartedCart;
