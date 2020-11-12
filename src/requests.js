export const getWalletData = searchWallet => {
  return fetch("https://api.trongrid.io/wallet/getaccount", {
    "method": "POST",
    "headers": {
      "Content-Type": "application/json"
    },
    "body": JSON.stringify({address: `${searchWallet}`, visible: true})
  })
  .then(resp => resp.json())
}

export const walletValidation = newWallet => {
  return fetch("https://api.trongrid.io/wallet/validateaddress", {
    "method": "POST",
    "headers": {
      "Content-Type": "application/json"
    },
    "body": JSON.stringify({address: `${newWallet}`})
  })
  .then(resp => resp.json())
}