import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { WalletProvider } from './contexts/walletContext';
import { BountyProvider } from './contexts/bountyContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <WalletProvider>
            <BountyProvider>
                <App />
            </BountyProvider>
        </WalletProvider>
    </React.StrictMode>
);