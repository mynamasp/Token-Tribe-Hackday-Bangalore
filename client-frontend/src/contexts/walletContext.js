import { createContext, useState, useEffect } from "react";
import { client } from "../lib/client";

export const WalletContext = createContext();

export const WalletProvider = ({ children }) => {
    const [appStatus, setAppStatus] = useState('')
    const [currentAccount, setCurrentAccount] = useState('')
    const [currentUser, setCurrentUser] = useState({})

    useEffect(() => {
        checkIfWalletIsConnected()
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

    const registerUser = async (userAccount = currentAccount, name) => {
        const query = `
        *[_type == "users" && _id == "${userAccount}"]{
            name,
            admin,
            registered,
            walletAddress
        }
        `
        const response = await client.fetch(query);
        if (response[0].registered) {
            return;
        }
        await client.patch(currentAccount).set({
            registered: true,
            name: name
        }).commit().then((updatedUser) => {
            console.log('Hurray, the user is updated! New document:')
            console.log(updatedUser)
        }).catch((err) => {
            console.error('Oh no, the update failed: ', err.message)
        })
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
            checkIfWalletIsConnected
        }}>
            {children}
        </WalletContext.Provider>
    )
}