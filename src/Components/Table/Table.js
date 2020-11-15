import React, { useState } from 'react';
import { format } from 'date-fns';
import { v4 as uuidv4 } from 'uuid';
import './Table.css';

function Table({walletsData, setWalletsData}) {
  const [order, setOrder] = useState(false);

  const columnHeaders = [
    { label: 'Address', key: 'address' },
    { label: 'Balance', key: 'balance' },
    { label: 'Create time', key: 'create_time' },
    { label: 'Latest operation time', key: 'latest_opration_time' }
  ]

  const removeRow = (index) => {
    const updatedWalletsData = [...walletsData].filter(wallet => wallet !== walletsData[index])

    setWalletsData(updatedWalletsData);
  }

  const sortColumn = (key) => {
    if(order === false) {
      setOrder(true);
      walletsData = walletsData.sort((a,b) => a[key] > b[key] ? 1 : -1)
    } else {
      setOrder(false);
      walletsData = walletsData.sort((a,b) => a[key] < b[key] ? 1 : -1)
    }
  }

  return(
      <table>
        <thead>
          <tr>
            {columnHeaders.map(( { label, key } ) => {
              return(
              <th key={key} onClick={() => sortColumn(key)}>{label}</th>
              )
            })}
          </tr>
        </thead>
        <tbody>
          {walletsData.map(({ address = 'No data', balance = 'No data', create_time = 'No data', latest_opration_time = 'No data' }, index) => {
            return (
              <tr id={index} key={uuidv4()}>
                <td>{address}</td>
                <td>{balance}</td>
                <td>
                  {`${format(new Date(create_time), 'H:mm dd.MM.yy')}`}
                </td>
                <td>
                  {`${format(new Date(latest_opration_time), 'H:mm dd.MM.yy')}`}
                </td>
                <td>
                <button onClick={() => removeRow(index)}>Remove</button>
                </td>
              </tr>
            )
          })}
        </tbody> 
      </table>
  )
}

export default Table;
