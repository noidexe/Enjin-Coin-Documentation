# Integrating Your Tokens

Once you have [minted your tokens](/docs/minting-tokens) and are comfortable with [managing them](/docs/managing-tokens) it's time to start integrating them into your app or game.

Although we have some very useful SDKs that can help you get on your feet, it's **very important** that all of your admin and user data is parsed and stored by a secure server, which means you will need a working knowledge of our Platform API (GraphQL) to complete your  integration.

## Getting your own session token: 
Following on from Cliff's point - Need information about how to get client/app secret which you then use to get your developer Auth token. That allows you to start creating accounts for people.

Get Secret
Find secret key for app for creating auth tokens
query myApp{
EnjinApps(id:XX){
secret
}
}

Get the Bearer Token - how you get your Auth Token
SECURITY: MAKE SURE TO STORE THIS ON SERVERSIDE OFFLINE
PHP EXAMPLE - 
$data = '{"grant_type":"client_credentials","client_id": "XX","client_secret":"xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"}';

    $url = 'https://cloud.enjin.io/oauth/token';
  

        $headers = array(
            "Accept: application/json",
            "Content-Type: application/json"
        );


        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER,1);
        curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);

        $response = curl_exec($ch);
        curl_close($ch);
        var_dump($response);

        return json_decode($response, true);

## Create a user through the Oauth system - checks to see if a user has been created as an enjin user 
If they haven't it creates them as a user.
If they already have then it just tries to log them in instead -> Logging in a player through the Enjin Auth
Create Enjin User
Creates players as an identity for your app
"CreateEnjinUser(name:\"".$playerid."\"){".
"id,".
"access_tokens,".
"identities {".
"ethereum_address,".
"linking_code,".
"linking_code_qr".
"}".
"}".

PHP VERSION - Would be useful to allow devs to click to whatever version of code they use
$query = " {".
      "CreateEnjinUser(name:\"".$playerid."\"){".
      "id,".
      "access_tokens,".
      "identities {".
        "ethereum_address,".
        "linking_code".
        "}".
        "}".
      "}";
    
    $data = [ "query" => "mutation ".$query ];
    
    
      $url = 'https://cloud.enjin.io/graphql';

      $auth_token = "Authorization: Bearer ". $master_token; 
      $app_id = "X-App-Id: ". $appID;
      

    $headers = array(
      $auth_token,
      $app_id,
      "Accept: application/json",
      "Content-Type: application/json"
    );

    $postfields = json_encode($data);

    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $postfields);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER,1);
    curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);

    $response = curl_exec($ch);
    curl_close($ch);
    
    
    $data = json_decode($response, true);
    $linking_code = $data['data']['CreateEnjinUser']['identities'][0]['linking_code'];

If it returns a linking code that means it's not linked 
- if it doesn't it's linked and you can send the user into the game.

You can also check linking code using this

query {
EnjinIdentities (
id: XX
) {
ethereum_address
}
}

Enter the database reference into the game's database to signify that you've created an Enjin account and you don't need to do it again.

Logging in a player through the Enjin Auth
Login OAuth User
Logs player into enjin via OAuth
ogin OAuth User
Logs player into enjin via OAuth
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

##Approve ENJ
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
