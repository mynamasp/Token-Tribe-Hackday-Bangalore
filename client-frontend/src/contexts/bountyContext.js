import { createContext, useState, useContext } from "react";
import { client } from "../lib/client";
import { WalletContext } from "./walletContext";

export const BountyContext = createContext();

export const BountyProvider = ({ children }) => {
    const [bounties, setBounties] = useState([]);

    // Wallet context functions
    const walletContext = useContext(WalletContext);
    const { setAppStatus, currentAccount, currentUser } = walletContext;

    const getBounties = async () => {
        if (!window.ethereum) return setAppStatus('no MetaMask')
        try {
            const query = `*[_type == "bounty"]`;
            const res = await client.fetch(query);
            // console.log(res);
            setBounties(res);
        } catch (error) {
            setAppStatus('error');
        }
    }

    const addBounties = async (name, description, prize) => {
        if (!window.ethereum) return setAppStatus('no MetaMask')
        if (!currentUser.admin) return;
        try {
            const bountyDoc = {
                _type: "bounty",
                _id: `${currentAccount}_${Date.now()}`,
                name: name,
                description: description,
                prize: prize,
                author: {
                    _key: `${currentAccount}_${Date.now()}`,
                    _ref: currentAccount,
                    _type: "reference"
                }
            };

            await client.createIfNotExists(bountyDoc);
        } catch (error) {
            setAppStatus('error');
        }
    }

    const getBountyComments = (bountyId) => {
        if (!window.ethereum) return setAppStatus('no MetaMask')
        try {
            const query = `*[_type == "user" && bounty == "${bountyId}"]
`
        } catch (error) {
            setAppStatus('error');
        }
    }

    const getBountyDetails = (bountyId) => {

    }

    const addCommentBounty = (bountyId, content) => {

    }

    return (
        <BountyContext.Provider value={{
            bounties,
            setBounties,
            getBounties,
            addBounties
        }}>
            {children}
        </BountyContext.Provider>
    )

}