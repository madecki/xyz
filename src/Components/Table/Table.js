import React, { useState } from 'react';
import { format } from 'date-fns';
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
          {walletsInfo.map(({ address, balance, create_time, latest_opration_time }) => {
            return (
              <tr>
                <td>{address}</td>
                <td>{balance}</td>
                <td>
                  {`${format(new Date(create_time), 'h:mm a dd.MM.yy')}`}
                </td>
                <td>
                  {`${format(new Date(latest_opration_time), 'h:mm a dd.MM.yy')}`}
                </td>
              </tr>
            )
          })}
        </tbody> 
      </table>
  )
}

export default Table;
