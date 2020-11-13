import React, { useState } from 'react';
import Table from '../Table/Table';
import { getWalletData, walletValidation } from '../../requests';
import Nav from '../Nav/Nav';
import './MainView.css';

function MainView() {
  const [newWallet, setWallet] = useState('');
  const [wallets, updateWallets] = useState([]);
  const [walletsData, setWalletsData] = useState([]);
  const [isAdded, setAddedState] = useState(false);
  const [isValidated, setValidationState] = useState(true);
  const [isInBase, setIsInBase] = useState(false);

  const getMultipleWalletsData = () => {
    const fetchWalletDataPromises = [];

    wallets.forEach(wallet => {
      const walletData = getWalletData(wallet)
      fetchWalletDataPromises.push(walletData)
    })

    Promise.all(fetchWalletDataPromises).then(values => {
      setWalletsData(values);
    })
  }
  console.log(walletsData)
  const addNewWalet = () => {
    const walletsUpdated = [...wallets];

    if(wallets.includes(newWallet)){
      setIsInBase(true);
      return false;
    }
    setIsInBase(false);

    walletValidation(newWallet).then(resp => {
      const { result } = resp;

      setValidationState(result);

      if(!result){
        return false;
      } else {
        walletsUpdated.push(newWallet);

        updateWallets(walletsUpdated);

        setWallet('');

        setAddedState(true);
      }
    });
  } 

  const removeInput = (index) => {
    const updatedListWallet = [...wallets].filter(wallet => wallet !== wallets[index])
    
    updateWallets(updatedListWallet);

    if(wallets.length === 1) {
      setAddedState(false);
    }
  }

  return(
    <>
      <Nav />
      <div className='container container--mainview'>
        <aside>
          <label htmlFor='walletFinder'>Search for a wallet</label>
          <input
            className={`search-input ${!isValidated ? 'search-input--error' : ''}`}
            id='walletFinder'
            autoComplete='off' 
            // onKeyPress={event => sendRequest(searchWallet, event)}
            onChange={event => {setWallet(event.target.value)}}
            value={newWallet}
            aria-label='Enter the wallet you want to search'
            type='text'
            placeholder='TGmcz6YNqeXUoNryw4LcPeTWmo1DWrxRUK'  
          />
          {!isValidated && (
            <p className='error-info'>The wallet is invalid!</p>
          )}
          {isInBase && (
            <p className='error-info'>The wallet is already in the base!</p>
          )}
          <button className='btn--add' onClick={() => addNewWalet()}>ADD</button>

          {wallets.map((wallet, index) => {
            return (
              <div className='input-and-btn'>
              <input className='wallet-input' type="text" value={wallet} readOnly key={index} />
              <button className='btn--remove-input' onClick={() => removeInput(index)}>X</button>
              </div>
            )
          })}
          {isAdded ? <button className='btn--get' onClick={getMultipleWalletsData}>Get fresh data</button> : ''}
        </aside>
        <Table walletsData={walletsData} setWalletsData={setWalletsData}/>
      </div>
    </>
  )
};

export default MainView;
