import React from "react";
import "./OpeningPage.css";
import NewNavbar from "./NewNavbar";

const OpeningPage = () => {
  return (
    <div>
        <div style = {{ paddingBottom: "0rem"}}>
            <NewNavbar/>
        </div>
        <div style = {{
            display :"flex",
            flexDirection : "row",
            justifyContent:"space-between"
        }}>
            <div style={{
                display: "flex",
                flexDirection :"column",
                fontFamily:"Manrope,sans-serif",
                marginLeft:"15%",
                // marginRight:"40%"
            }}>
                <span style = {{fontSize:"50px",fontWeight:"bolder"}}>Token Tribe</span>
                <div style={{fontSize:"35px",marginTop:"3%",fontWeight:"560"}}>
                    <span >The Only DAO / Community<br/></span>
                    <span style ={{marginRight:"2vw"}}>platform you will need.</span>

                </div>
                <button style = {{
                    border:"solid white 3px",
                    borderRadius:"30px",
                    color:"white",
                    background:"black",
                    padding:"20px 20px 20px 20px",
                    fontSize:"20px",
                    fontWeight:"bold",
                    marginTop:"7%",
                    width:"55%",
                    cursor:'pointer',
                    fontFamily:"Manrope,sans-serif",
                }} className = "buttonAni ">
                    Connect Wallet</button>
            
            </div>

            <div>
                <img style = {{ height:"78vh",alignItems:"flex-end",marginTop:"18vh"}} src= {require("../images/OpeningPage.png")} alt="" />
            </div>
        </div>
      </div>
    
  );
};

export default OpeningPage;
