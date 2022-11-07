import { ethers } from "ethers";

const REACT_APP_ALCHEMY_API_KEY = process.env.REACT_APP_ALCHEMY_API_KEY;
const alchemyKey = REACT_APP_ALCHEMY_API_KEY;
const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const web3 = createAlchemyWeb3(alchemyKey);

const contractABI = require("../assets/TokenTribeABI.json")
const contractAddress = "0x483ddB5B6dCFB2906D265CF28AaCe5599E1397B0";


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
                    <a href={`https://mumbai.polygonscan.com/tx/${txHash}`}>
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

export const setBounty = async (address, name, prize, description) => {

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
        data: tokenTribe.methods.AddBounty(name, prize, description).encodeABI(),
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
                    <a href={`https://mumbai.polygonscan.com/tx/${txHash}`}>
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

export const closeBounty = async (address, winner_address, bounty_number) => {

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
        data: tokenTribe.methods.CloseBounty(winner_address, bounty_number).encodeABI(),
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
                    <a href={`https://mumbai.polygonscan.com/tx/${txHash}`}>
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

export const buyTokens = async (address, amount, matics) => {

    //Check if wallet is still connected
    if (!window.ethereum || address === null) {
        return {
            status:
                "Please connect your wallet to procced with your transaction.",
        };
    }

    const parsedAmount = ethers.utils.parseEther(String(matics));

    //Initialise the transcation parameters
    const transactionParameters = {
        to: contractAddress,
        from: address,
        data: tokenTribe.methods.buyTokens(amount).encodeABI(),
        value: parsedAmount._hex,
        gas: '0x7EF40',
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
                    <a href={`https://mumbai.polygonscan.com/tx/${txHash}`}>
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

    let balance = await tokenTribe.methods.balanceOf(address);

    return balance;
}

/**************************************  Function to get token wallet balance   *************************************************** */

export const getTokenBalance = async (address) => {

    let balance = await tokenTribe.methods.TokensOwned(address).call();

    return balance;
}


export const getMaticPrice = async () => {
    let req = await tokenTribe.methods.getMaticPrice().call();

    return req * 83 / (1000000000 * 1000000000);
}

export const subscribedBounties = async (address) => {
    let bounties = await tokenTribe.methods.SubscribedBounties(address).call();

    return bounties;
}

export const retrieveBountyNumber = async (address, name) => {

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
        data: tokenTribe.methods.RetrieveBountyNumber(name).encodeABI(),
        gas: '0x7EF40',
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
                    <a href={`https://mumbai.polygonscan.com/tx/${txHash}`}>
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