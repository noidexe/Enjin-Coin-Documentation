# Integrating Your Tokens

Once you have [minted your tokens](/docs/minting-tokens) and are comfortable with [managing them](/docs/managing-tokens) it's time to start integrating them into your app or game.

Although we have some very useful SDKs that can help you get on your feet, it's **very important** that all of your admin and user data is parsed and stored by a secure server.

This means you will need a working knowledge of our Platform API (GraphQL) to complete your secure integration.

## Getting Your Bearer Token
In the [creating your account](/docs/creating-account) section, you logged into to your account using the following query:

```gql
query login{
  EnjinOauth (
    email: "YOUR EMAIL",
    password: "YOUR PASSWORD"
  ) {
    id,
    name,
    email,
    access_tokens
  }
}
```

However, it's important to note that this connection expires after two weeks, so if you want to create a long-term connection to the Trusted Cloud, the following process will keep you logged in for up to 12 months.

#### Get Secret Key
First, you will need to find your secret key:

```gql
query myApp{
  EnjinApps(id:YOUR_ID){
    secret
  }
}
```

#### Get the Auth Token
**SECURITY: MAKE SURE TO STORE THIS SERVERSIDE**

Next, you will gain your Auth Token by posting the following query to https://cloud.enjin.io/oauth/token.

```REST
{
    "grant_type":"client_credentials",
    "client_id": YOUR_APP_ID,
    "client_secret":"YOUR_SECRET_FROM_OTHER_CALL"
}
```

#### Create a User 
Your authorisation system needs to check to see if a user's account has been created yet.


* If it hasn't, it should create a new account for them. 
* If it has, then the system should try to log them in.


```gql
"CreateEnjinUser(name:\"".$playerid."\"){".
"id,".
"access_tokens,".
"identities {".
"ethereum_address,".
"linking_code,".
"linking_code_qr".
"}".
"}".
```

If the API returns a linking code that means the user's Enjin Wallet is not linked, if no linking code is returned that means the wallet is linked and you can send the user into the game.

You can also check linking code whenever you want using this;

```gql
query {
EnjinIdentities (
id: XX
) {
ethereum_address
}
}
```

Once you have created an Enjin account, it's advisable to enter the reference into your database, so you don't repeat this process unnecesarily in future.

#### Log Your User In
Once you are have confirmed that your user has an existing account, you can log your user into Enjin Auth using the following query:

```gql
"EnjinOauth(name:\"".$playerid."\"){".
"id,".
"access_tokens,".
"identities {".
"id,".
"app_id,".
"ethereum_address,".
"linking_code,".
"linking_code_qr".
"}".
"}".
```

## EnjinIdentities
Shows you your Indentity_Id which is used in most queries and mutations


query viewIdentities {
EnjinIdentities(
pagination: {
page: 1,
limit: 50})
{
id
app {
name
}
linking_code
linking_code_qr
enj_allowance
ethereum_address
}
}

##Unlink Wallet
Unlinks a wallet so a user can re-link


mutation UnlinkWallet {
DeleteEnjinIdentity(id: XXXXXX, unlink: true)
{
linking_code
linking_code_qr
}
}



## View Tokens in a Wallet

used when logging a player into a game - update balance on the database - the game runs on that data
Displays Token_Name and Token_Id for tokens found in wallet


EnjinBalances(ethereum_address: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx", show_zero_balances: false) {
query getBalance {
token {
name
token_id
}
token_index
balance
}
}
show_zero_balances: false -> prevents the display of melted items as they technically still belong to that wallet

View Specific Tokens in a Wallet - - when you want to do a specific action with a token, you can use this to validate whether the token is still there 
Displays Token_Index for a specific token found in wallet


query getBalance {
EnjinBalances(ethereum_address: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx", token_id: "XXXXXXXXXXXXXXXXX", show_zero_balances: false) {
token {
name
token_id
}
token_index
balance
}
}
show_zero_balances: false -> prevents the display of melted items as they technically still belong to that wallet

## Token Holders 
providing rewards to everyone that has a specific token
Returns the addresses that have a specific token


query getBalanceByTokenNotAddress {
EnjinBalances(
token_id: "XXXXXXXXXXXXXXXXX",
) {
token_index
balance
ethereum_address
}
}

## Token Details - 
Gives detailed information about a specific token
e.g. you can use this to show players information about a token, or use it to lookup your information for yourself

query viewTokens {
EnjinTokens(
name: "TOKEN_NAME",
pagination: {
page: 1,
limit: 50})
{
token_id
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
created_at
updated_at
availableToMint
itemURI
}
}

## Token Holders
Returns the addresses that have a specific token


query getBalanceByTokenNotAddress {
EnjinBalances(
token_id: "XXXXXXXXXXXXXXXXX",
) {
token_index
balance
ethereum_address
}
}

## Transaction data
- CONSTANTLY NEEDED
This is how you know that someone's actually completed something


query ViewTransactionData{
EnjinTransactions(
id: xxxxx,
) {
id
transaction_id
type
state
token {
token_id
name
}
}
}

## Approve ENJ
Spending Allowance for your creator wallet and for each player's wallet. We need to explain that this exists, how to use it, examples etc
Player security Player could potentially choose their own spending limit so they don't spend more on each game than they want
Player can change their value - increase/decrease
Game dev Security - set a spending allowance to ensure the game doesn't spend too much

Send request to user to approve enj use on app


mutation ApproveEnj{
CreateEnjinRequest (
identity_id: XX,
type: APPROVE,
approve_enj_data: {
value: XXXXXXX,
}
) {
id,
}
}
Set value as -1 for max value
Note that this value decreases as it is used, like a literal spending allowance, if you set a value fo 10 ENJ and then make 10 transactions for 1 ENJ each your allowance will then be 0 and need to be set again.


## Trade Request
3 steps to a full trade

1: create trade request - confirm in 1st persons wallet - use token id:"0" for ENJ


mutation sendTradeRequest {
CreateEnjinRequest (
identity_id: XXX,
type: CREATE_TRADE,
create_trade_data:
{
asking_tokens: [{ id: "XXXXXXXXXXXXXXXXX", value: 1 }],
offering_tokens: [{ id: "XXXXXXXXXXXXXXXXX", value: 1 }],
second_party_identity_id: XXX
})
{
id
encoded_data
state
}
}

2: get the trade_id - param1

query idForCompleteTrade{
EnjinTransactions(id:XXXXXX){
type,
transaction_id,
events { param1 }
}
}

3: complete the trade request - entering param1 as trade_id, 2nd persons identity_id and confirm in 2nd persons wallet

mutation completeTradeRequest {
CreateEnjinRequest (
identity_id: XXX,
type: COMPLETE_TRADE,
complete_trade_data:
{
trade_id: "XX"
})
{
id
transaction_id
encoded_data
}
}

You can cancel the mutation yourself, using this mutation:

mutation {
  UpdateEnjinRequest(id: 453929, state: CANCELED_USER) {
    id
    state
  }
}

## Marketplace
https://enjinx.io/eth/asset/0x(id)00000000000000000000000000000000(index)
This link allows you to send users to any token based on the token ID
