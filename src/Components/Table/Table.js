import React, { useState } from 'react';
import { format } from 'date-fns';
import { v4 as uuidv4 } from 'uuid';
import './Table.css';

function Table({walletsData, setWalletsData}) {
  const [order, setOrder] = useState(false);
  const headersArray = [
    { name: 'Address', index: 'address' },
    { name: 'Balance', index: 'balance' },
    { name: 'Create time', index: 'create_time', order: {order}  },
    { name: 'Latest operation time', index: 'latest_opration_time' }
  ]
  const removeRow = (index) => {
    const updatedWalletsData = [...walletsData].filter(wallet => wallet !== walletsData[index])

    setWalletsData(updatedWalletsData);
  }

  const sortColumn = (index, address) => {
    const column = walletsData[index].address;
    // false === 'desc'
    console.log(walletsData[index].address);
    if(order === false) {
      setOrder(true);
      walletsData = walletsData.sort((a,b) => a[column] > b[column] ? 1 : -1)
      console.log(walletsData)
    } else {
      setOrder(false);
      walletsData = walletsData.sort((a,b) => a[column] < b[column] ? 1 : -1)
      console.log(walletsData)
    }
  }

  return(
      <table>
        <thead>
          <tr>
          {walletsData.map(({ address }, index ) => {
            return(
            <th onClick={() => sortColumn(index, address)}>XXXXXX</th>
            )
          })}
          </tr>
          {/* <tr>
            <th name='address' onClick={(name) => sortColumn(name)}>Address</th>
            <th name='balance' onClick={(name) => sortColumn(name)}>Balance</th>
            <th name='createTime' onClick={(name) => sortColumn(name)}>Create time</th>
            <th name='latestOpration' onClick={(name) => sortColumn(name)}>Latest opration time</th>
          </tr> */}
        </thead>
          {walletsData.map(({ address = 'No data', balance = 'No data', create_time = 'No data', latest_opration_time = 'No data' }, index) => {
            return (
              <tbody key={uuidv4()}>
              <tr id={index} key={uuidv4()}>
                <td>{address}</td>
                <td>{balance}</td>
                <td>
                  {`${format(new Date(create_time), 'h:mm a dd.MM.yy')}`}
                </td>
                <td>
                  {`${format(new Date(latest_opration_time), 'h:mm a dd.MM.yy')}`}
                </td>
                <td>
                <button onClick={() => removeRow(index)}>Remove</button>
                </td>
              </tr>
              </tbody> 
            )
          })}
      </table>
  )
}

export default Table;
