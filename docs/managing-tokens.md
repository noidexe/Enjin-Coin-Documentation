# Managing Your Tokens
Once your tokens have been minted, you may want to edit, send, or melt them down and recover the Enjin Coin (ENJ) from within inside the tokens.

The Platform API has been built to provide all the functionality you need to manage a robust blockchain-based gaming economy. 

You will likely use the following queries and mutations quite often when it comes to managing your tokenized assets.


## Change Token URI 
You can change your token metadata at any time. You can do this by setting or updating the token URI. Your token metadata may include the name, description and the image. 

The following mutation can be used to set the URI or update the data:

[Set Item URI](../../../examples/SetItemUri.gql)

## Change Token Name
Tokens have their names specified on the blockchain and within their metadata. 

This means tokens can, technically, be given a different name on the blockchain and in its metadata.

This following mutation can be used to update a token's name on the blockchain:

[Update Token Name](../../../examples/UpdateTokenName.gql)

## Melt Batch Items
There may be times that you make a mistake during the token minting process and you wish to melt all of the tokens you have created. 

To melt any token, the token must be in your wallet. It's important to **quadruple** check your token settings prior to sending them to your users.

Once your tokens have been distributed to your users, there is no going back and the only way to fix any errors is to generate replacement tokens.

[Batch Melt](../../../examples/BatchMelt.gql)

## Release Reserve
When you first create a token, you will be asked to lock an initial reserve on the Enjin Coin (ENJ) into it.

This is to ensure you can mint your tokens fluidly, using the Enjin Coin you have set aside.

If you no longer wish to use the token, and decide not to go ahead with minting the respective tokens, you can destroy the template and return the Enjin Coin that you have set aside by using the following mutation:

[Release Reserve](../../../examples/ReleaseReserve.gql)

**_Note:_** There is a cool down period for releasing reserve and the more Enjin Coin you have locked into the template, the longer you have to wait until you can release it. This waiting period can take days or even weeks.

## Send All Item Types: Advanced Send
The Platform API allows you to send unlimited Fungible and up to 100 Non-Fungible tokens to up to 1000 users, in a single transaction.
The `Advanced Send mutation` is one of the most common mutations to send vast amounts of assets from one address, to another in a single transaction and with ease. 

This is the most robust and popular sending mutation used by developers:

[Advanced Send](../../../examples/AdvancedSend.gql)

## Transfer Whitelisting
If you've created a bound token or a token with transfer fees, and you don't wish for these settings to apply in every circumstance, you can use transfer whitelisting to allow specific users to send tokens to specific addresses.

[Whitelist](../../../examples/Whitelist.gql)

### Whitelist Settings
**Full Rights:** The address has full rights to send and receive the token.
`0x0000000000000000000000000000000000000001`

**No Outgoing:** The address can send but not receive the token. Which means the only way they can get the token, is if you mint it directly to their address.
`0x0000000000000000000000000000000000000002`

**No Incoming:** The address can receive but can't send the token. 
`0x0000000000000000000000000000000000000003`

**No Fees:** The address can send tokens without paying transfer fees.
`0x0000000000000000000000000000000000000004`
