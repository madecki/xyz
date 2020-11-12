import React from 'react';
import './Table.css';

function Table({walletInfo}) {
  return(
    <div className='container'>
      <table>
        <thead>
          <tr>
            <th>Address</th>
            <th>Balance</th>
            <th>Create time</th>
            <th>Latest opration time</th>
          </tr>
        </thead>
        {/* <tbody>
          <tr>
            <td>{walletInfo.address}</td>
            <td></td>
            <td>{walletInfo.createTime}</td>
            <td>{walletInfo.latestOprationTime}</td>
          </tr>
        </tbody>  */}
      </table>
    </div>
  )
}

export default Table;
