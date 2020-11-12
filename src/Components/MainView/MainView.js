import React, { useState } from 'react';
import Table from '../Table/Table';
import { getWalletData } from '../../requests';
import './MainView.css';

function MainView() {
  const [newWallet, setWallet] = useState('');
  const [wallets, updateWallets] = useState([]);
  const [walletsData, setWalletsData] = useState([]);
  const [isAdded, setIsAdded] = useState(false);

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

    walletsUpdated.push(newWallet);
    updateWallets(walletsUpdated);

    setIsAdded(true);
    setWallet('');
  } 

  return(
    <>
      <nav>
        <div className='container'>
        
        </div>
      </nav>
      <div className='container container--mainview'>
        <aside>
          <label htmlFor='walletFinder'>Search for a wallet</label>
          <input
            className='search-input'
            id='walletFinder'
            autoComplete='off' 
            // onKeyPress={event => sendRequest(searchWallet, event)}
            onChange={event => {setWallet(event.target.value)}}
            value={newWallet}
            aria-label='Enter the wallet you want to search'
            type='text'
            placeholder='TGmcz6YNqeXUoNryw4LcPeTWmo1DWrxRUK'  
          />
          <button className='btn--add' onClick={() => addNewWalet()}>ADD</button>

          {wallets.map(wallet => {
            return (
              <input type="text" value={wallet}/>
            )
          })}
          {isAdded ? <button className='btn--get' onClick={getMultipleWalletsData}>Get fresh data</button> : ''}
        </aside>
        <Table walletsInfo={walletsData}/>
      </div>
    </>
  )
};

export default MainView;
