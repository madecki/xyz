import React from 'react';
import './Table.css';

function Table({walletsInfo}) {
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
        <tbody>
          {walletsInfo.map(({ address = 'blabla', balance, create_time, latest_opration_time }) => {
            return (
              <tr>
                <td>{address}</td>
                <td>{balance}</td>
                <td>{create_time}</td>
                <td>{latest_opration_time}</td>
              </tr>
            )
          })}
        </tbody> 
      </table>
  )
}

export default Table;
