import React, { useContext, useState, useEffect } from "react";
import "./Navbar.css";
import "./TokenExchange.css";
import NewNavbar from "./NewNavbar.jsx";
import { buyTokens, getMaticPrice, getTokenBalance } from "../utils/interact";
import LeftArrowPng from "../images/tokenExchange/left.png";
import RightArrowPng from "../images/tokenExchange/right.png";
import PolygonIcon from "../images/tokenExchange/polygon.png";
import { WalletContext } from "../contexts/walletContext";
const LastPart = () => {
  const [amount, setAmount] = useState(0);
  const [maticReq, setMaticReq] = useState(0);

  const calculateMaticRequired = async (amount) => {
    const price = await getMaticPrice();
    const inrPrice = amount * 1.2;
    console.log(price, inrPrice);

    setMaticReq(inrPrice / price);
  };

  const walletContext = useContext(WalletContext);
  const { getAccountBalance, accountBalance, currentAccount } = walletContext;

  useEffect(() => {
    getAccountBalance();
  }, [currentAccount]);
  return (
    <div className="">
      <div className="ragul">
        <h1>Buy Tokens</h1>
        <br></br>
        <div className="first_feild">
          <span>Enter amount of $ Tribe</span>
          <input
            className="input_feild"
            type="number"
            name=""
            id=""
            onChange={(e) => {
              setAmount(e.target.value);
              calculateMaticRequired(e.target.value);
            }}
            style={{ padding: "10px", width: "100%" }}
          />
        </div>

        <div className="middle_feild">
          <div className="left_feild">
            <span>1</span>
            <span>$Tribe</span>
          </div>

          <div className="middle_middle_feild">
            <span>=</span>
          </div>

          <div className="right_feild">
            <span>Rs. </span>
            <span> 1.2 </span>
            {/* <img src={PolygonIcon} alt="" /> */}
          </div>
        </div>
        <br></br>
        <div>
          <h2>
            Your Wallet Balance : {accountBalance}{" "}
            <img
              src={PolygonIcon}
              alt="polygon icon"
              style={{ width: "4%" }}
            ></img>
          </h2>
          <h2>
            Matic Required : {maticReq}{" "}
            <img
              src={PolygonIcon}
              alt="polygon icon"
              style={{ width: "4%" }}
            ></img>
          </h2>
        </div>

        <div
          className="end_feild"
          onClick={async () => {
            await buyTokens(currentAccount, amount, maticReq);
          }}
          style={{ cursor: "pointer" }}
        >
          <img className="arrow" src={LeftArrowPng} alt="" />
          <h2>Mint Now</h2>
          <img className="arrow" src={RightArrowPng} alt="" />
        </div>
      </div>
    </div>
  );
};

const Cards = ({ numb, head }) => {
  return (
    <div className="cards">
      <p>{head}</p>
      <span>+ {numb} Bounties Post</span>
      <button>Buy Now </button>
    </div>
  );
};

const TokenExchange = () => {
  const tribeToken = 123;

  const walletContext = useContext(WalletContext);
  const { currentUser, currentAccount } = walletContext;

  const [token, setTokens] = useState(10);

  const gettokenbalance = async () => {
    const tokens = await getTokenBalance(currentAccount);
    console.log(tokens);
    setTokens(tokens);
  };

  useEffect(() => {
    if (currentAccount) {
      gettokenbalance();
    }
    // eslint-disable-next-line
  }, [currentAccount]);

  return (
    <div>
      <div style={{ paddingBottom: "5rem" }}>
        <NewNavbar />
      </div>

      <div className="Top_column">
        <h1>Available Tokens</h1>

        <div className="right_col_inside">
          <span>{token} $Tribe</span>
        </div>
      </div>

      <div className="beech_wala">
        <Cards numb={5} />
        <Cards numb={12} head={"Most Popular"} />
        <Cards numb={10} />
      </div>

      <div className="neeche_wala">
        <LastPart />
      </div>
    </div>
  );
};

export default TokenExchange;
