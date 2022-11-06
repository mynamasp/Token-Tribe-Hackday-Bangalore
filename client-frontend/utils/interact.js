require("dotenv").config();
const REACT_APP_ALCHEMY_API_KEY = process.env.REACT_APP_ALCHEMY_API_KEY;
const alchemyKey = REACT_APP_ALCHEMY_API_KEY;
const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const web3 = createAlchemyWeb3(alchemyKey); 

const contractABI = require("../src/assets/TokenTribeABI.json")
const contractAddress = "0xC91C67E52df4a013C88e591daa202fB6Ba159231";

 const tokenTribe = new web3.eth.Contract(
    contractABI,
    contractAddress
  );


  /**************************************  Function to subcribe to bounties   *************************************************** */
  export const subscribeToBounties = async (address) => {

    //Check if wallet is still connected
    if (!window.ethereum || address === null) {
        return {
          status:
            "Please connect your wallet to procced with your transaction.",
        };
      }
    
    //Initialise the transcation parameters
    const transactionParameters = {
        to: contractAddress,
        from: address,
        };

    //Sign the transcation
    try {
        const txHash = await window.ethereum.request({
            method: "eth_sendTransaction",
            params: [transactionParameters],
          });
          return {
            status: (
              <span>
                <a target="_blank" href={`https://mumbai.polygonscan.com/tx/${txHash}`}>
                  View the status of your transaction
                </a>
                <br />
                Thank you for subscribing
              </span>
            ),
          };
    } catch (error) {
        return {
            status: " Sorry : " + error.message,
          };
    }

  }

  /**************************************  Function to add bounties   *************************************************** */

  export const setBounty = async (address,name,prize,description) => {

    //Check if wallet is still connected
    if (!window.ethereum || address === null) {
        return {
          status:
            "Please connect your wallet to procced with your transaction.",
        };
      }

    if (name.trim() === "" || prize.trim() === "" || description.trim() === "") {
        return {
          status: "Your fields cannot be empty.",
        };
      }
    
    //Initialise the transcation parameters
    const transactionParameters = {
        to: contractAddress,
        from: address,
        data: tokenTribe.methods.AddBounty(name,prize,description).encodeABI(),
        };

    //Sign the transcation
    try {
        const txHash = await window.ethereum.request({
            method: "eth_sendTransaction",
            params: [transactionParameters],
          });
          return {
            status: (
              <span>
                <a target="_blank" href={`https://mumbai.polygonscan.com/tx/${txHash}`}>
                  View the status of your transaction
                </a>
                <br />
                Your bounty will be added soon !
              </span>
            ),
          };
    } catch (error) {
        return {
            status: " Sorry : " + error.message,
          };
    }

  }

  /**************************************  Function to end bounties   *************************************************** */

  export const closeBounty = async (address,winner_address,bounty_number) => {

    //Check if wallet is still connected
    if (!window.ethereum || address === null) {
        return {
          status:
            "Please connect your wallet to procced with your transaction.",
        };
      }
    
    //Initialise the transcation parameters
    const transactionParameters = {
        to: contractAddress,
        from: address,
        data: tokenTribe.methods.CloseBounty(winner_address,bounty_number).encodeABI(),
        };

    //Sign the transcation
    try {
        const txHash = await window.ethereum.request({
            method: "eth_sendTransaction",
            params: [transactionParameters],
          });
          return {
            status: (
              <span>
                <a target="_blank" href={`https://mumbai.polygonscan.com/tx/${txHash}`}>
                  View the status of your transaction
                </a>
                <br />
                Your bounty will be closed added soon !
              </span>
            ),
          };
    } catch (error) {
        return {
            status: " Sorry : " + error.message,
          };
    }

  }
  
/**************************************  Function to purchase coins   *************************************************** */

export const buyTokens = async (address,amount) => {

    //Check if wallet is still connected
    if (!window.ethereum || address === null) {
        return {
          status:
            "Please connect your wallet to procced with your transaction.",
        };
      }
    
    //Initialise the transcation parameters
    const transactionParameters = {
        to: contractAddress,
        from: address,
        data: tokenTribe.methods.buyTokens(amount).encodeABI(),
        };

    //Sign the transcation
    try {
        const txHash = await window.ethereum.request({
            method: "eth_sendTransaction",
            params: [transactionParameters],
          });
          return {
            status: (
              <span>
                <a target="_blank" href={`https://mumbai.polygonscan.com/tx/${txHash}`}>
                  View the status of your transaction
                </a>
                <br />
                Thank you for your purchasse, your tokens will be added soon !
              </span>
            ),
          };
    } catch (error) {
        return {
            status: " Sorry : " + error.message,
          };
    }

  }
  /**************************************  Function to get wallet balance   *************************************************** */

  export const getBalance = async (address) => {

    balance = await contract.methods.balanceOf(address);

    return balance;
  }


