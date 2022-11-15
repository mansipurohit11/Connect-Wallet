import React, {use, useState} from 'react';
import {ethers} from 'ethers';

const WalletCard = () => {

    const [errorMessage, setErrorMessage] = useState(null);
    const [defaultAccount, setDefaultAccount] = useState(null);
    const [userBalance, setUserBalance] = useState(null);
    const [connectButtonText, setConnectButtonText] = useState(null);

    const connectWalletHandler = () => {
        if (window.ethereum) {
            window.ethereum.request({method: 'eth_requestAccounts'})
            .then(result => {
                accountChangedHandler(result[0]);
            })
        } else {
            setErrorMessage('Install MetaMask');
        }
    }

    const accountChangedHandler = (newAccount) => {
        setDefaultAccount(newAccount);
        getUserBalance(newAccount.toString());
    }

    const getUserBalance = (address) => {
        window.ethereum.request({method: 'eth_getBalance', params: [address, 'latest']}) 
        .then(balance => {
            setUserBalance(ethers.utils.formatEther(balance));
        })
    }

    const chainChangeHandler = () =>{
        window.location.reload();
    }

    window.ethereum.on('accountsChanged', accountChangedHandler);

    window.ethereum.on('chaninChanged', chainChangeHandler);

    return (
        <div className='walletCard'>
        <h4> {"Connection to Metamask using window.ethereum methods"}</h4>
        <button onClick={connectWalletHandler}>Connect to Wallet{connectButtonText}</button>
        <div className='accountDisplay'>
            <h3>Address: {defaultAccount}</h3>
        </div>
        <div className='balanceDisplay'>
            <h3>Balance: {userBalance}</h3>
        </div>
        </div>
    )
}

export default WalletCard;
