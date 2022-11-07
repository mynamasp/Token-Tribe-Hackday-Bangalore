import React, { useState, useContext, useEffect } from "react";
import { BountyContext } from "../../contexts/bountyContext";
import { WalletContext } from "../../contexts/walletContext";
import { useNavigate } from "react-router-dom";
import './SetupAdmin.css';
import RoundBall from "../../images/round-ball.png";
import NewNavbar from "../NewNavbar";
import { subscribedBounties, getTokenBalance, setBounty } from "../../utils/interact";

const Admin = () => {
    const [activeSelection, setActiveState] = useState(false);
    // context
    const bountyContext = useContext(BountyContext);
    const { getBounties, bounties } = bountyContext;
    const walletContext = useContext(WalletContext);
    const { currentUser } = walletContext;

    const navigate = useNavigate();

    useEffect(() => {
        if (currentUser) {
            if (!currentUser.registered || !currentUser.admin) {
                navigate("/register");
            }
        }
        // eslint-disable-next-line
    }, [currentUser]);

    useEffect(() => {
        getBounties();
        // eslint-disable-next-line
    }, [])

    return (
        <>
            <div >
                <NewNavbar />
            </div>
            <div
                style={{
                    paddingTop: "5rem",
                    display: "flex",
                    width: "100vw",
                    height: "100vh",
                    justifyContent: "center",
                    alignItems: "center",
                    background: 'url("https://images.unsplash.com/photo-1632220894022-a83eacddae2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1674&q=80")',
                    backgroundSize: "cover"
                }}
            >
                <div style={{ position: "relative" }}>
                    <img
                        style={{
                            width: "30rem",
                        }}
                        src={RoundBall}
                        alt=""
                    />
                    <div
                        style={{
                            position: "absolute",
                            display: "flex",
                            flexDirection: "column",
                            top: 0,
                            bottom: 0,
                            padding: "8rem 5rem",
                            width: "100%",
                            textAlign: "center",
                            justifyContent: "space-between",
                            borderRadius: "100%",
                            fontWeight: "bold",
                        }}
                    >
                        <h1
                            style={{
                                fontSize: "1.7rem",
                            }}
                        >
                            Making Your Community Active is now easier with{" "}
                        </h1>
                        <p
                            style={{
                                fontSize: "2rem",
                                fontWeight: "800",
                            }}
                        >
                            Token Tribe
                        </p>
                        <span
                            style={{
                                cursor: "pointer",
                                display: "inline",
                            }}
                            onClick={() => { navigate('/buytoken') }}>
                            <p
                                style={{
                                    backgroundColor: "#FF00E5",
                                    display: "inline",
                                    padding: "1rem 2rem",
                                    borderRadius: "10rem",
                                }}
                            >
                                Buy $Tribe Token
                            </p>
                        </span>
                    </div>
                </div>
            </div>
            <div
                style={{
                    marginTop: "2rem",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <div
                    style={{
                        border: "2px solid #FF00E5",
                        borderRadius: "8rem",
                        display: "flex",
                    }}
                >
                    <div
                        style={
                            activeSelection
                                ? {
                                    padding: "1rem 2rem",
                                    cursor: "pointer",
                                    fontWeight: "bold",
                                    borderRadius: "8rem",
                                }
                                : {
                                    backgroundColor: "#FF00E5",
                                    padding: "1rem 2rem",
                                    cursor: "pointer",
                                    fontWeight: "bold",
                                    borderRadius: "8rem",
                                }
                        }
                        onClick={() => setActiveState(!activeSelection)}
                    >
                        Active Bounties
                    </div>
                    <div
                        style={
                            activeSelection
                                ? {
                                    backgroundColor: "#FF00E5",
                                    padding: "1rem 2rem",
                                    cursor: "pointer",
                                    fontWeight: "bold",
                                    borderRadius: "8rem",
                                }
                                : {
                                    padding: "1rem 2rem",
                                    cursor: "pointer",
                                    fontWeight: "bold",
                                    borderRadius: "8rem",
                                }
                        }
                        onClick={() => setActiveState(!activeSelection)}
                    >
                        Add Bounty
                    </div>
                </div>
            </div>
            <div style={{ margin: "2rem auto", width: "50rem" }}>
                {!activeSelection ? bounties?.map((item, index) => (
                    <Card key={index} {...item} />
                )) : (<Setup />)}

            </div>
        </>
    );
};

export default Admin;

const Card = ({ name, description, prize, _id, status }) => {
    const navigate = useNavigate()
    return (
        <div
            style={{
                backgroundColor: "black",
                border: "4px solid #FF00E5",
                padding: "2rem 1rem",
                borderRadius: ".5rem",
                margin: "1rem 0",
            }}
        >
            <h3 onClick={() => navigate(`/bounty/${_id}`)} style={{ cursor: 'pointer', color: '#FF00E5', textDecoration: 'underline' }}>{name} &#8599;</h3>
            <br></br>
            <p>
                {description}
            </p>
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginTop: "2rem",
                }}
            >
                <div style={{ display: "flex" }}>
                    <p style={{ margin: "0 .2rem" }}>
                        <span
                            style={{
                                fontWeight: "800",
                            }}
                        >
                            Bounty:
                        </span>{" "}
                        {prize} $TRIBE
                    </p>
                </div>
                <div
                    style={{
                        backgroundColor: "#000",
                        display: "inline",
                        padding: ".4rem .9rem",
                        borderRadius: "5rem",
                        cursor: "pointer",
                        fontWeight: "bold",
                        color: `${status ? '#06d6a0' : '#06d6a0'}`,
                        border: `${status ? '1px solid #06d6a0' : '1px solid #06d6a0'}`
                    }}
                >
                    {
                        status ? 'Completed' : 'Active'
                    }
                </div>
            </div>
        </div>
    );
};

const Setup = () => {

    const walletContext = useContext(WalletContext);
    const { currentAccount } = walletContext;
    const bountyContext = useContext(BountyContext);
    const { addBounties } = bountyContext;

    const [freeBounty, setFreeBounty] = useState("--");
    const [token, setToken] = useState("--");

    const [bountyName, setBountyName] = useState('');
    const [bountyDesc, setBountyDesc] = useState('');
    const [bountyPrize, setBountyPrize] = useState(0);

    const navigate = useNavigate();

    const getSubscribedBounties = async () => {
        const bounties = await subscribedBounties(currentAccount);
        setFreeBounty(bounties);
    }
    const gettokenBalance = async () => {
        const tokens = await getTokenBalance(currentAccount);
        setToken(tokens);
    }

    const addBounty = async () => {
        if (bountyName === '' || bountyDesc === '' || bountyPrize === 0) {
            alert('Please fill the Params');
            return;
        }
        if (token <= 50) {
            alert("You don't have enough tokens!! Buy some :)");
            return;
        }
        const txn = await setBounty(currentAccount, bountyName, bountyPrize, bountyDesc);
        console.log(txn);
        await addBounties(bountyName, bountyDesc, bountyPrize);
        alert('Bounty Added Successfully');
    }

    useEffect(() => {
        if (currentAccount) {
            getSubscribedBounties(currentAccount);
            gettokenBalance(currentAccount);
        }
    }, [currentAccount])

    return (
        <>
            <div className="setupMain">
                <div> Enter Your Task Title : </div>
                <input className="setupInput" type="text" style={{ textAlign: 'left', padding: '10px' }} onChange={(e) => setBountyName(e.target.value)}></input>
                <div> Task Description : </div>
                <textarea className="setupInput" type="text" style={{ textAlign: 'left', padding: '10px' }} onChange={(e) => setBountyDesc(e.target.value)}></textarea>
                <div className="splitHead" style={{ marginTop: '30px' }}>
                    <div style={{ paddingLeft: '30px' }}> Bounty Offered (In $Tribe): </div>
                    <div style={{ paddingRight: '30px' }}> $Tribe Available: </div>
                </div>
                <div className="splitHead">
                    <input className="setupInputHalf" type="number" onChange={(e) => setBountyPrize(e.target.value)}></input>
                    <div style={{ fontWeight: 'bold', fontSize: 'x-large', marginRight: '30px' }}> {token} $Tribe </div>
                </div>
                <div className="buymore">
                    <div>Running low on $Tribe </div>
                    <button className="buynow" onClick={() => navigate('/buytoken')} style={{ cursor: 'pointer' }}>Buy Now</button>
                </div>
            </div>
            <div style={{ margin: 'auto', marginTop: '50px' }}>{(freeBounty === 0) ? "No Free Bounties, 50 $TRIBE will be applied as fee" : `You have ${freeBounty} Posts available`}</div>
            <button className="bigbtn" onClick={() => addBounty()}> {'> >'} Continue {'< <'} </button>
        </>
    )
}
