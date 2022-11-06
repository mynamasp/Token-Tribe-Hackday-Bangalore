import { createContext, useState, useContext } from "react";
import { client } from "../lib/client";
import { WalletContext } from "./walletContext";

export const BountyContext = createContext();

export const BountyProvider = ({ children }) => {
    const [bounties, setBounties] = useState([]);
    const [comments, setComments] = useState([]);
    const [bounty, setBounty] = useState({});
    // Wallet context functions
    const walletContext = useContext(WalletContext);
    const { setAppStatus, currentAccount, currentUser } = walletContext;

    const getBounties = async () => {
        if (!window.ethereum) return setAppStatus('no MetaMask')
        try {
            const query = `*[_type == "bounty"]`;
            const res = await client.fetch(query);
            console.log(res);
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

    const getBountyComments = async (bountyId) => {
        if (!window.ethereum) return setAppStatus('no MetaMask')
        try {
            const query = `*[_type == "comments"]`;
            const res = await client.fetch(query);
            setComments(res);
        } catch (error) {
            setAppStatus('error');
        }
    }

    const getBountyDetails = async (bountyId) => {
        if (!window.ethereum) return setAppStatus('no MetaMask')
        try {
            const query = `*[_type == "bounty" && _id == "${bountyId}"]`;
            const res = await client.fetch(query);
            setBounty({
                _id: res[0]._id,
                author: res[0].author,
                description: res[0].description,
                name: res[0].name,
                prize: res[0].prize,
                status: res[0].status
            })
            getBountyComments();
        } catch (error) {
            setAppStatus('error');
        }
    }

    const addCommentBounty = async (bountyId, content) => {
        if (!window.ethereum) return setAppStatus('no MetaMask')
        try {
            const commentDoc = {
                _type: "comments",
                content: content,
                author: {
                    _ref: currentAccount,
                    _type: "reference"
                },
                bounty: {
                    _ref: bountyId,
                    _type: "reference"
                }
            };
            await client.createIfNotExists(commentDoc);
            getBountyComments();
        } catch (error) {
            setAppStatus(error);
        }
    }

    const closeBounty = async (bountyId, winner) => {
        if (!window.ethereum) return setAppStatus('no MetaMask')
        try {
            await client.patch(bountyId).set({
                status: true,
                closedBy: winner
            }).commit().then((updatedBounty) => {
                console.log('Hurray, the user is updated! New document:')
                console.log(updatedBounty);
            }).catch((err) => {
                console.error('Oh no, the update failed: ', err.message)
            });
        } catch (error) {
            setAppStatus(error);
        }
    }

    return (
        <BountyContext.Provider value={{
            bounties,
            setBounties,
            getBounties,
            addBounties,
            comments,
            bounty,
            getBountyComments,
            getBountyDetails,
            addCommentBounty,
            closeBounty
        }}>
            {children}
        </BountyContext.Provider>
    )

}