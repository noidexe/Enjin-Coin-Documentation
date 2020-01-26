# Creating Your Integration

Once you have [minted your tokens](/docs/minting-tokens) and are comfortable with [managing them](/docs/managing-tokens), it's time to start integrating them into your project or game.

Although we have some very useful SDKs that can help you get on your feet, it's **very important** that all of your admin and user data is parsed and stored by a secure server.

This means you will need solid knowledge of our Platform API (GraphQL) to complete your secure integration.

## Getting Your Bearer Token
In the [creating your account](/docs/creating-account) section, you would have logged into your account using the following query:

```gql
query Login($email: String!, $password: String!) {
  EnjinOauth(email: $email, password: $password) {
    id
    name
    email
    accessTokens
  }
}
```

However, it's important to note that this connection expires after two weeks, so if you want to create a long-term connection to the Trusted Cloud, the following process will keep you logged in for up to 12 months.

### Get Secret Key
First, you will need to find your secret key:

```gql
query GetAppSecret($id: Int!) {
  EnjinApps(id: $id){
    secret
  }
}
```

### Get the Auth Token
**SECURITY: MAKE SURE TO STORE THIS SERVERSIDE**

Next, you will gain your Auth Token by posting the following query to https://cloud.enjin.io/oauth/token.

```REST
{
    "grant_type": "client_credentials",
    "client_id": $id,
    "client_secret": "$secret"
}
```

## Create a User 
Your authorization system needs to check to see if a user's account has been created yet.


* If it hasn't, it should create a new account for them. 
* If it has, then the system should try to log them in.


```gql
mutation CreateUser($name: String!) {
  CreateEnjinUser(name: $name) {
    id
    accessTokens
    identities {
      linkingCode
      linkingCodeQr
      wallet {
        ethAddress
      }
    }
  }
}
```

Once you have created an Enjin account, it's advisable to enter the reference into your database, so you don't repeat this process unnecessarily in the future.

## Log Your User In
Once you are have confirmed that your user has an existing account, you can log your user into Enjin Auth using the following query:

```gql
query Login($name: String!) {
  EnjinOauth(name: $name) {
    id
    accessTokens
    identities {
      linkingCode
      linkingCodeQr
      wallet {
        ethAddress
      }
    }
  }
}
```

If the API returns a linking code, that means the user's Enjin Wallet is not linked. If no linking code is returned, this means the wallet is linked and you can send the user into the game.

## EnjinIdentities
Most queries and mutations require an indentity ID. You can use this query to locate the Identity ID:

```gql
query GetIdentities {
  EnjinIdentities(pagination: {page: 1, limit: 50}) {
    id
    linkingCode
    linkingCodeQr
    wallet {
      ethAddress
    }
  }
}
```

## Check Linking Code
You can also check your user's linking code whenever you want using this query;

```gql
query GetIdentityLinkingCode($id: Int!) {
  EnjinIdentities(id: $id) {
    linkingCode
    linkingCodeQr
    wallet {
      ethAddress
    }
  }
}
```

## Unlink Wallet
Sometimes your user may want to change wallets, they can do this via the Enjin Wallet or you can initiate this on your end.

This query will unlink their wallet and allow them to re-link it, or link a new one:

```gql
mutation UnlinkWalletAddress($id: Int!) {
  DeleteEnjinIdentity(id: $id, unlink: true) {
    linkingCode
    linkingCodeQr
  }
}
```

## View Tokens in a Wallet

Once a player is logged in and linked, the first thing you will want to do is see their inventory so you can provide them with game items to match their tokens.

It's advisable to update the user's balance on your database. That way, your project or game can run efficiently on the data you are holding. 

```gql
query getBalance($address: String!) {
  EnjinBalances(ethAddress: $address, value_gt: 0) {
    token {
      id
      index
      name
    }
    value
  }
}
```

It's important to include the `value_gt: 0` argument because it prevents the display of melted items. They technically still exist within that blockchain address, even though the user has chosen to destroy/melt them. 

## View Specific Tokens in a Wallet
When you want to perform a specific action with a token, you can use this to validate whether the token is still there.

```gql
query GetWalletTokenBalance($address: String!, $tokenId: String) {
  EnjinBalances(ethereum_address: $address, token_id: $tokenId, value_gt: 0) {
    token {
      id
      index
      name
    }
    value
  }
}
```

This query displays the `token index` and `balance` of the token in question.

You can also choose to request the data for `tokenId` and `identity_id` by adding the fields to the query.

## View ENJ Balance
You can view the amount of Enjin Coin (ENJ) of a user in the wallet. This can be useful, if you need to know if they have enough Enjin Coin to approve certain transactions and requests. 
You can use the following query to retrieve the ENJ balance: 

``` gql
query GetWalletBalance($id: Int!) {
  EnjinUsers(id: $id) {
    identities {
      wallet {
        ethAddress
        enjBalance
      }
    }
  }
}
```

If you don't know the user ID or the Identity ID, you can use the following query to retrieve the same results, simply with the ethreum address instead:
``` gql
query GetWalletBalanceByAddress($address: String!) {
  EnjinWallet(ethAddress: $address) {
    enjBalance
    ethBalance
  }
}
```

## Token Details 
If you wish to provide your users detailed information about a specific token, you can use this query to lookup the data:

```gql
query GetTokenDetails($name: String!) {
  EnjinTokens(name: $name, pagination: {page: 1, limit: 50}) {
    id
    name
    creator
    meltValue
    meltFeeRatio
    meltFeeMaxRatio
    supplyModel
    totalSupply
    circulatingSupply
    reserve
    transferable
    nonFungible
    blockHeight
    markedForDelete
    createdAt
    updatedAt
    availableToMint
    itemURI
  }
}
```

## Token Holders
This query returns a list of addresses who own a specific token:

```gql
query GetBalance($tokenId: String!) {
  EnjinBalances(token_id: $tokenId) {
    token {
      id
      index
    }
    wallet {
      ethAddress
    }
    value
  }
}
```
It can be useful for rewarding all holders of a specific token in one go, through a coordinated airdrop.

## Transaction data
Whenever you issue a send mutation, an `id` will be returned to you. This `id` is very important and it is highly advisable to log this data so you can access it again, at a later date.

Should you want to view the state of any transaction that you have performed on the blockchain, you will need to use this query: 

```gql
query GetTransaction($id: Int!) {
  EnjinTransactions(id: $id) {
    id
    transactionId
    type
    state
    error
    token {
      id
      name
    }
  }
}
```
The Enjin Transactions query will return vvarious pieces of information, depending on the state of the transaction that you have ran. 
You will notice that we added the `error` argument within the query. The `error` argument is useful to have, in case your transaction has failed / dropped for a certain reason, this will display why the transaction in question did not process on the blockchain. 

**This query will return the following values:**

* **PENDING:** Transaction is created on the Trusted Cloud, but has not yet been signed by the user/dev.
* **TP_PROCESSING:** Transaction has been signed and is waiting for the Trusted Cloud/Platform) to process the transaction for broadcast.
* **BROADCAST:** Transaction has been signed and has been broadcast but has not yet been confirmed on the blockchain.
* **EXECUTED:** The transaction has received confirmation on the blockchain and the Trusted Cloud.
* **CANCELED_USER:** The user has canceled the PENDING transaction/not signed.
* **CANCELED_PLATFORM:** The Platform has canceled the PENDING transaction.
* **FAILED:** Transaction has failed on the Trusted Platform.
* **DROPPED:** Transaction was not mined on the blockchain and has since been dropped.



## Set Spending Allowance
If you want to increase the security of your project and set a spending limit for yourself, or allow your players to choose their own spending limited, you can use this mutation to set a spending allowance: 

```gql
mutation ApproveEnj($id: String!, $limit: Int!) {
  CreateEnjinRequest(identity_id: $id, type: APPROVE, approve_enj_data: {value: $limit}) {
    id
  }
}
```

Set `value` as `-1` for max value.

**_Note:_** This value decreases as it is used, like a literal spending allowance. If you set the value to 10 Enjin Coin (ENJ) and then make 10 transactions for 1 ENJ each, your allowance will go down to 0 and it will need to be set again.


## Trade Request
Initiating secure peer-to-peer trades is a three-step process. The way this works is, first, the trade needs to be created, the respective items need to be held in escrow, and once both parties have checked the items, they can complete the trade.

**Step 1:** Create the trade request and confirm in 1st person's wallet.

```gql
mutation SendTradeRequest($initiatorId: Int!, $recipientId: Int!) {
  CreateEnjinRequest(identity_id: $initiatorId, type: CREATE_TRADE, create_trade_data: {asking_tokens: [{id: "XXXXXXXXXXXXXXXXX", value: 1}], offering_tokens: [{id: "XXXXXXXXXXXXXXXXX", value: 1}], second_party_identity_id: $recipientId}) {
    id
    encodedData
    state
  }
}
```

Use the `id: "0"` argument for Enjin Coin (ENJ).

**Step 2:** Get the trade_id - param1.

```gql
query RetrieveTradeId($id: Int!) {
  EnjinTransactions(id: $id) {
    type
    transactionId
    events {
      param1
    }
  }
}
```

**Step 3:** Complete the trade request. Enter param1 as trade_id, 2nd persons identity_id and confirm in 2nd persons wallet.

```gql
mutation CompleteTradeRequest($id: Int!, $tradeId: String!) {
  CreateEnjinRequest(identity_id: $id, type: COMPLETE_TRADE, complete_trade_data: {trade_id: $tradeId}) {
    id
    transactionId
    encodedData
  }
}
```

## Changing Asset Transfer Status
At times, you may want to change the transfer status of a token you have created to give it certain value, whether you want the token to be _permanently transferable_, _temporary transferable_ or _bound_ to an address.  

**_Note_**: If you have set the token to be permanently transferable, you will not be able to alter that setting. 

```gql
mutation ChangeAssetTransferableType($appId: Int!, $identityId: Int!, $tokenId: String!, $transferable: TokenTransferable!) {
  CreateEnjinRequest(appId: $appId, identity_id: $identityId, type: SET_TRANSFERABLE, set_transferable_data: {token_id: $tokenId, transferable: $transferable}) {
    id
    encodedData
  }
}

```

## Blockchain Explorer
Players are inherently interested in the blockchain data behind the assets they own.

If you would like to link your users to the EnjinX listing of a specific token, you can append the token ID to the end of the URL. This allows them to learn everything they can about their tokens. 

Example: 
https://enjinx.io/eth/asset/0x(id)00000000000000000000000000000000(index)
