# Managing Your Tokens
Once your tokens are minted you may need to edit, send, or melt them down and recover the Enjin Coin from inside.

The Platform API has been built to provide all the functionality you need to manage a robust blockchain-based gaming economy. 

You will likely use the following queries and mutations quite often.


## Change Token URI 
To change your token metadata, including the name, description, and images of your tokens, you will need to update your URI.

The following mutation can be used to alter the URI or reload the data:

```gql
mutation changeURI {
CreateEnjinRequest (
identity_id: XXX,
type: SET_ITEM_URI,
set_item_uri_data:
{
token_id: "xxxxxxxxxxxxxxxx",
token_index: "xxxxxxxxxxxxxxxx",
item_uri: "https://xxxxxxxxxxxxxxxx.com/xxxxxxxxxxxxxxxx"
})
{
id
encoded_data
state
}
}
```

## Change Token Name
Tokens have their names specified on the blockchain and within their metadata. 

This means tokens can, technically, be given a different name on the blockchain and in its metadata.

You can update a token's name on the blockchain by using the following mutation:

```gql
mutation changeNFTname {
CreateEnjinRequest(
identity_id: XX,
type: UPDATE_NAME,
update_item_name_data: {
token_id: "xxxxxxxxxxxxxxxx",
name: "NEW NAME HERE",
})
{
id
encoded_data
}
}
```

## Melt Batch Items
There may be times that you make a mistake during the token minting process and you wish to melt all of the tokens you have created. 

To melt any token, it needs to be in your wallet, so it's important to qudruple check your token settings prior to sending them to your users.

Once your tokens have been distributed to your users there is no going back and the only way to fix any errors is to issue replacement tokens.


```gql
mutation BatchMelt{
CreateEnjinRequest (
identity_id: YOUR_IDENTITY_ID,
type:MELT,
melt_token_data: {
token_id: "xxxxxxxxxxxxxxxx",
token_index_array: [
"xxxxxxxxxxxxxxxx",
"xxxxxxxxxxxxxxxx",
"xxxxxxxxxxxxxxxx",
"xxxxxxxxxxxxxxxx",
"xxxxxxxxxxxxxxxx",
"xxxxxxxxxxxxxxxx",
],
#value_array: "",
}
) {
identity_id
token_id
}
}
```

## Release Reserve
Returns ENJ that was locked in as Initial Reserve for an item you no longer wish to use
The more items you have the longer you have to wait after release - can add up to days or weeks if it's thousands of items - get exact figure

```gql
mutation releaseReserve {
CreateEnjinRequest(
identity_id: XXX,
type: RELEASE_RESERVE,
release_reserve_data: {
token_id: "xxxxxxxxxxxxxxxx",
value: X,
}
)
{
token_id
}
}
```

## Send All Item Types - Advanced Send - most used send command
Send multiple Fungible and nonFungible together, no index on Fungible tokens

```gql
mutation advancedSendAll {
CreateEnjinRequest(
identity_id: YOUR_IDENTITY_ID,
type: ADVANCED_SEND,
advanced_send_token_data: {transfers: [
{token_id: "xxxxxxxxxxxxxxxx", token_index: "xxxxxxxxxxxxxxxx", to: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx", value:"1" },
{token_id: "xxxxxxxxxxxxxxxx", token_index: "xxxxxxxxxxxxxxxx", to: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx", value:"1" },
{token_id: "xxxxxxxxxxxxxxxx", token_index: "xxxxxxxxxxxxxxxx", to: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx", value:"1" },
{token_id: "xxxxxxxxxxxxxxxx", token_index: "xxxxxxxxxxxxxxxx", to: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx", value:"1" },
{token_id: "xxxxxxxxxxxxxxxx", to: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx", value:"1" },
{token_id: "xxxxxxxxxxxxxxxx", to: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx", value:"1" }
]})
{
id
encoded_data
}
}
```

## Whitelist Address - Whitelist fees on sending & recieving
Removes fees for a give wallet address per token

```gql
mutation WhiteList{
CreateEnjinRequest (
identity_id: XXX,
, appId: XXX, type: SET_WHITELISTED,
set_whitelisted_data: {
token_id: "XXXXXXXXXXXXXXXXX",
account: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
whitelisted: "0x0000000000000000000000000000000000000004",
on: true
}
) {
id,
encodedData
}
}
```

account = address
0x0000000000000000000000000000000000000001 - you can Send & Receive - full rights
0x0000000000000000000000000000000000000002 - you can Send - can't recieve items
0x0000000000000000000000000000000000000003 - you can Receive - can't send items
0x0000000000000000000000000000000000000004 - No Fees
