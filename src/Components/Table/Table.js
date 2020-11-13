import React from 'react';
import { format } from 'date-fns';
import { v4 as uuidv4 } from 'uuid';
import './Table.css';

function Table({walletsData, setWalletsData}) {

  const removeRow = (index) => {
    const updatedWalletsData = [...walletsData].filter(wallet => wallet !== walletsData[index])

    setWalletsData(updatedWalletsData);
  }

  return(
      <table>
        <thead>
          <tr>
            <th>Address</th>
            <th>Balance</th>
            <th>Create time</th>
            <th>Latest opration time</th>
          </tr>
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
