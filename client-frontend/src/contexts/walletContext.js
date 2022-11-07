import { createContext, useState, useEffect } from "react";
import { client } from "../lib/client";
import { ethers } from 'ethers';
export const WalletContext = createContext();

export const WalletProvider = ({ children }) => {
    const [appStatus, setAppStatus] = useState('')
    const [currentAccount, setCurrentAccount] = useState('')
    const [currentUser, setCurrentUser] = useState({})
    const [accountBalance, setAccountBalance] = useState(0);

    useEffect(() => {
        checkIfWalletIsConnected();
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        if (!currentAccount && appStatus === 'connected') return
        getCurrentUserDetails(currentAccount)
        // eslint-disable-next-line
    }, [currentAccount, appStatus])

    const checkIfWalletIsConnected = async () => {
        if (!window.ethereum) return setAppStatus('noMetaMask')
        try {
            const addressArray = await window.ethereum.request({
                method: 'eth_accounts',
            })
            if (addressArray.length > 0) {
                setAppStatus('connected')
                setCurrentAccount(addressArray[0])
                createUserAccount(addressArray[0])
            } else {
                setAppStatus('notConnected')
            }
        } catch (err) {
            setAppStatus('error')
        }
    }

    const getAccountBalance = async () => {
        try {
            if (!window.ethereum) return alert("Please install metamask");
            const balance = await window.ethereum.request({ method: 'eth_getBalance', params: [currentAccount, 'latest'] });
            setAccountBalance(ethers.utils.formatEther(balance));
        } catch (error) {
            console.log(error);
        }
    }

    const connectWallet = async () => {
        if (!window.ethereum) return setAppStatus('noMetaMask')
        try {
            setAppStatus('loading')

            const addressArray = await window.ethereum.request({
                method: 'eth_requestAccounts',
            })

            if (addressArray.length > 0) {
                setCurrentAccount(addressArray[0])
                createUserAccount(addressArray[0])
                setAppStatus('connected')
            } else {
                setAppStatus('notConnected')
            }
        } catch (err) {
            setAppStatus('error')
        }
    }

    const createUserAccount = async (userAddress = currentAccount, name) => {
        if (!window.ethereum) return setAppStatus('no MetaMask')
        try {
            const userDoc = {
                _type: 'user',
                _id: userAddress,
                name: 'Unnamed',
                admin: false,
                walletAddress: userAddress,
                registered: false
            }

            await client.createIfNotExists(userDoc)

            setAppStatus('connected')
        } catch (error) {
            setAppStatus('error')
        }
    }

    const getCurrentUserDetails = async (userAccount = currentAccount) => {
        if (appStatus !== 'connected') return

        const query = `
        *[_type == "user" && _id == "${userAccount}"]{
            name,
            admin,
            registered,
            walletAddress
        }
        `
        const response = await client.fetch(query)

        console.log(response);

        setCurrentUser({
            name: response[0].name,
            admin: response[0].admin,
            walletAddress: response[0].walletAddress,
            registered: response[0].registered,
        })
    }

    const registerUser = async (name, type) => {

        if (type === 0) {
            await client.patch(currentAccount).set({
                admin: false,
                registered: true,
                name: name
            }).commit().then((updatedUser) => {
                console.log('Hurray, the user is updated! New document:')
                console.log(updatedUser);
                setCurrentUser(updatedUser);
            }).catch((err) => {
                console.error('Oh no, the update failed: ', err.message)
            })
        } else if (type === 1) {
            await client.patch(currentAccount).set({
                admin: true,
                registered: true,
                name: name
            }).commit().then((updatedUser) => {
                console.log('Hurray, the user is updated! New document:')
                console.log(updatedUser);
                setCurrentUser(updatedUser);
            }).catch((err) => {
                console.error('Oh no, the update failed: ', err.message)
            })
        } else {
            console.log("Nothing to do :)");
        }
    }

    return (
        <WalletContext.Provider value={{
            appStatus,
            currentAccount,
            connectWallet,
            setAppStatus,
            currentUser,
            getCurrentUserDetails,
            registerUser,
            createUserAccount,
            checkIfWalletIsConnected,
            getAccountBalance,
            accountBalance
        }}>
            {children}
        </WalletContext.Provider>
    )
}