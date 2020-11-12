import React, { useState } from 'react';
import Table from '../Table/Table';
import { getWalletData } from '../../requests';
import './MainView.css';

function MainView() {
  const [searchWallet, setWallet] = useState('');
  const [walletInfo, setWalletInfo] = useState({});


  const sendRequest = (searchWallet) => {
    // console.log(searchWallet);

    let wallets = [];
    getWalletData(searchWallet).then(data => {
      console.log(data);
      let {address, balance, create_time, latest_opration_time} = data;

      // const listOfData = {
      //   address,
      //   create_time,
      //   latest_opration_time
      // }

      // let wallets = walletInfo;
      wallets = [...wallets, {address, balance, create_time, latest_opration_time}]
      setWalletInfo(wallets);
    })
    .catch(err => {
      console.error(err);
    });
    setWallet('');
  }
    console.log(walletInfo);

  return(
    <>
      <nav>
        <div className='container'>
          <label htmlFor='walletFinder'>Search for a wallet</label>
          <input 
          id='walletFinder'
          autoComplete='off' 
          // onKeyPress={event => sendRequest(searchWallet, event)}
          onChange={event => {setWallet(event.target.value)}}
          value={searchWallet}
          aria-label='Enter the wallet you want to search'
          type='text'
          placeholder='TGmcz6YNqeXUoNryw4LcPeTWmo1DWrxRUK'  
          />
          <button onClick={() => sendRequest(searchWallet)}>Find</button>
        </div>
      </nav>
      <Table walletInfo={walletInfo}/>
    </>
  )
};

export default MainView;
