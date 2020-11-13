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

  const addNewWalet = () => {
    const walletsUpdated = [...wallets];

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
            <p className='error-info'>Wallet is invalid!</p>
          )}
          <button className='btn--add' onClick={() => addNewWalet()}>ADD</button>

          {wallets.map((wallet, index) => {
            return (
              <input className='wallet-input' type="text" value={wallet} readOnly key={index} />
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
