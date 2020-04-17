# Creating Your Integration

Once you have [minted your tokens](/docs/minting-tokens) and are comfortable with [managing them](/docs/managing-tokens), it's time to start integrating them into your project or game.

Although we have some very useful SDKs that can help you get on your feet, it's **very important** that all of your admin and user data is parsed and stored by a secure server.

This means, you will need solid knowledge of our Cloud API (GraphQL) to complete your secure integration.

## Step 1: Getting Your Bearer Token
The first step is acquiring your bearer token. In the [creating your account](/docs/creating-account) section, you would have logged into your account using the following query:


[Login](../../../examples/Login.gql)

## Step 2: Getting the Secret Key
First, you will need to caquire your secret key, which you can do by following this query:

[Get App Secret](../../../examples/GetAppSecret.gql)

## Step 3: Getting the Access Token

**SECURITY: MAKE SURE TO STORE THIS SERVERSIDE!**

Once you have retrieved the app secret from the previous step, you will need the access token, which you can retrieve by following this query: 

[Retrieve Access Token](../../../examples/RetrieveAccessToken.gql)

**Note:** Access tokens expire after 24 hours!

## Step 4: Creating a User 
In this step, with the access token that you retrieved in the previous step, you will need to pass that as the authorization header when performing the create user mutation. 

Your authorization system needs to check to see if a user's account has been created yet.


* If it hasn't, it should create a new account for them. 
* If it has, then the system should try to log them in.

[Create Enjin User](../../../examples/CreateUser.gql)

Once you have created an Enjin account, it's advisable to enter the reference into your database, so you don't repeat this process unnecessarily in the future.

## Step 5: Loggin Your User In
In this final step of integration, once you are have confirmed that your user has an existing account, you can log your user in by following this query: 

[Enjin OAuth Login](../../../examples/EnjinOAuth.gql)

If the API returns a linking code, that means the user's Enjin Wallet is not linked. If no linking code is returned, this means the wallet is linked and you can send the user into the game.

## Enjin Identities
Most queries and mutations require an indentity ID. You can use this query to grab the Identity ID's:


[Get Identities](../../../examples/getIdentities.gql)

Using this query, should return various pieces of information that will help you with further integration, such as:
- The App Id.
- The Linking Code.
- The Linking Code QR (This is rather useful, you can copy the URL of the linking code QR in a new tab, and scan with the Enjin Wallet to link your Identity ID). 
- The wallet address associated with the identity ID. 

## Check Linking Code
You can also check your user's linking code whenever you want, by following this query:

[Get Identity Linking Code](../../../examples/GetIdentityLinkingCode.gql)

## Unlinking a Wallet
At times, your user may want to change wallets, which they can do this via the Enjin Wallet by going to the "Linked Apps" section, tapping on the project, tap on the 3-dot menu and select "Delete". 
Additionally, you can also initiate this on your end.

The following query will unlink their wallet and allow them to re-link it, or link a new one:

[Unlink Wallet Address](../../../examples/UnlinkWalletAddress.gql)

## Viewing Tokens in a Wallet

Once a player is logged in and linked, the first thing you will want to do is see their inventory so you can provide them with game items to match their tokens.

It's advisable to update the user's balance on your database. That way, your project or game can run efficiently on the data you are holding. 

[Get Balance](../../../examples/GetBalance.gql)

It's important to include the `value_gt: 0` argument because it prevents the display of melted items. They technically still exist within that blockchain address, even though the user has chosen to destroy/melt them. 

## View Specific Tokens in a Wallet
When you want to perform a specific action with a token, you can use this to validate whether the token is still there.

[Get Wallet Token Balance](../../../examples/GetWalletTokenBalance.gql)

This query displays the `token index` and `balance` of the token in question.

You can also choose to request the data for `tokenId` and `id` by adding the fields to the query.

## View ENJ Balance
You can view the amount of Enjin Coin (ENJ) of a user in the wallet. This can be useful, if you need to know if they have enough Enjin Coin to approve certain transactions and requests. 
You can use the following query to retrieve the ENJ balance: 

[Get Wallet Balance](../../../examples/GetWalletBalance.gql)

If you don't know the user ID or the Identity ID, you can use the following query to retrieve the same results, simply with the ethreum address instead:

[Get Wallet Balance by Address](../../../examples/GetWalletBalanceByAddress.gql)

## Token Details 
If you wish to provide your users detailed information about a specific token, you can use this query to lookup the data:

[Get Token Details](../../../examples/GetTokenDetails.gql)

## Token Holders
This query returns a list of addresses who own a specific token:

[Get Balance Holders](../../../examples/getBalanceHolders.gql)

It can be useful for rewarding all holders of a specific token in one go, through a coordinated airdrop.

## Transaction data
Whenever you issue a send mutation, an `id` will be returned to you. This `id` is very important and it is highly advisable to log this data so you can access it again, at a later date.

Should you want to view the state of any transaction that you have performed on the blockchain, you will need to use this query: 

[Get Transaction](../../../examples/GetTransaction.gql)

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

[Approve ENJ](../../../examples/ApproveENJ.gql)

Set `value` as `-1` for max value.

**_Note:_** This value decreases as it is used, like a literal spending allowance. If you set the value to 10 Enjin Coin (ENJ) and then make 10 transactions for 1 ENJ each, your allowance will go down to 0 and it will need to be set again.


## Trade Request
Initiating secure peer-to-peer trades is a three-step process. The way this works is, first, the trade needs to be created, the respective items need to be held in escrow, and once both parties have checked the items, they can complete the trade.

**Step 1:** Create the trade request and confirm in 1st person's wallet.

[Send Trade Request](../../../examples/SendTradeRequest.gql)

Use the `id: "0"` argument for Enjin Coin (ENJ).

**Step 2:** Get the trade_id - param1.

[Retrieve Trade ID](../../../examples/RetrieveTradeId.gql)

**Step 3:** Complete the trade request. Enter param1 as trade_id, 2nd persons identity_id and confirm in 2nd persons wallet.

[Complete Trade Request](../../../examples/CompleteTradeRequest.gql)

## Changing Asset Transfer Status
At times, you may want to change the transfer status of a token you have created to give it certain value, whether you want the token to be _permanently transferable_, _temporary transferable_ or _bound_ to an address.  

**_Note_**: If you have set the token to be permanently transferable, you will not be able to alter that setting. 


[Change Asset Transferable](../../../examples/changeAssetTransferable.gql)

## Blockchain Explorer
Players are inherently interested in the blockchain data behind the assets they own.

If you would like to link your users to the EnjinX listing of a specific token, you can append the token ID to the end of the URL. This allows them to learn everything they can about their tokens. 

Example: 
https://enjinx.io/eth/asset/0x(id)00000000000000000000000000000000(index)
