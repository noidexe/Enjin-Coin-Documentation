# Trusted Cloud Introduction

The Trusted Cloud is the main backend service of ENJ that connects your game to the Ethereum network. The TC acts as a hub, gathering requests from clients and game servers, interacting with the smart contracts on Ethereum, and returning data back to your game. It also manages the link between your users game account (i.e. SteamID,
  XBox Live Id, etc), and their blockchain identity (i.e. currently linked wallet address).

The main way to interface with our service is to use GraphQL, either via API or interactively
using a console like GraphiQL. If you are unfamiliar with GraphQL, check out [this introduction](https://graphql.org/learn/) to get started using the language.

Testnet is a development version of the mainnet, where you can easily obtain fake Ethereum and Enjin Coin to test your items in a safe, simulated environment without using real cryptocurrency.

Mainnet is the real deal. You are using real Ethereum and Enjin Coin (ENJ). Therefore, transactions cost real cryptocurrency. You should be very comfortable with your implementation on testnet before doing anything substantial on mainnet.


## Browsing the Schema
On the right-side, there should be a documentation panel to expand and browse for all the requests and parameters you can use. See [here](https://graphql.org/learn/queries/) for documentation on Queries and Mutations. Queries are requests for information from the
server, where Mutations are requests that modify server side data.

## Making a Request
On the (top) left panel, you would enter in your request to be made to the TC. Press the “Play” button at the top to submit that request, and you will receive a response on the right panel, sometimes a notification will appear in your dev wallet to sign a transaction depending on the request made.

## Creating Your User

  If you have not already signed up, you can create a user account directly in GraphiQL with the following mutation:

[CreateUser](../examples/CreateUser.gql)


_Accounts are not shared between Kovan & Mainnet TP servers. You will need an account on each server if you want to use both platforms._

If you are an Admin user for an app you can also use the above mutation to create new users for your app, the new user's details will be emailed to the user on creation.

## Login and Authenticating Your Requests
You will need to **authenticate your requests** made via the TC. To authenticate your request, you will need an access token. Use this request to get your access token:

[Login](../examples/Login.gql)


## Creating Your Project
You will need to create at least one Project (also known as App) on the Trusted Cloud. A project, is a central
container for all of your items and players. For example, your project will appear as one of the “Collections” where your items will appear in the user’s wallet.

[CreateApp](../examples/CreateApp.gql)


One important thing to know is your App ID. If you already created an app, but forget the id, you can look it up with the following query:

[Apps](../examples/Apps.gql)


You will need a name, description and a link to a hosted image for your app. You should get the App ID in the response if it was successful.

## Linking Your Wallet

Every user for your app requires an app identity which links users to your app,
along with their unique wallet address.

Identities are distinct from user ids, and are a way to decouple users from wallet
addresses. Identities are either linked, or unlinked. If they are linked, they
contain a valid Ethereum address. Unlinked identities have a like code like `BXXAZK`.
It is important to know that **there can only be one identity per user, per app/game.**
You cannot directly connect a user id to a wallet.

For example, user `bob` can link
his wallet `0xabcd`to the game `Space Monkies`, but cannot link multiple wallets to
that particular game.  If `bob` wants to use a different wallet with `Space Monkies`,
he will need to unlink the current wallet, and re-link with the new wallet.

An identity will automatically be created for new users if you set an app id when creating the user.

To accept and sign any transactions, you will need to link your Enjin Wallet (Dev version) app to your identity. To do this, you will need to find your **Linking Code**.

You can find the link code with the following query:

[Identities](../examples/Identities.gql)

You should be given a 6 character linking code to enter into your dev wallet app in the **LINKED APPS** section. Mainnet code starts with “A”, while Kovan starts with “B”. You will need to choose which wallet to link (if you have multiple wallets imported).

To reset your linked wallet, use the following query.
[UnlinkIdentity](../examples/UnlinkIdentity.gql)


## Approving ENJ
To prepare for item creation, you will need to pre-approve ENJ to the CryptoItems smart contract.  When linking your wallet for the first time an approve transaction will automatically be created for you to sign.  If you check the **NOTIFICATIONS** section of the wallet you should see and APPROVE ENJ transaction ready to sign.  Accept the transaction request to approve the ENJ.

By default the automatic approval transaction will approve the maximum amount of ENJ possible.  If you wish to change the pre-approval amount you will need to make sure you have set approval to 0 first before approving your actual value (use -1 for max ENJ possible). You do not need to multiply value by 10^18 for this request. You don’t need to do this if you have previously approved a sufficient amount of ENJ to use (i.e approved
wallet transaction above.)

[ApproveENJ](../examples/ApproveENJ.gql)


Once a successful request has been made, you will need to accept and sign the transaction in the **NOTIFICATIONS** section of your dev wallet.

## Creating an Item

Creating an item is like creating a template that you will use to mint your items.
To create an item, you will need to make a request with the desired item properties. Here is
an example:

[CreateToken](../examples/CreateToken.gql)


Property | Descriptions
---|---
totalSupply | Total Supply for the item
initialReserve | Initial Reserve for the item. You will need ENJ approved for this reserve.
supplyModel | Supply Model for the item. FIXED, SETTABLE, INFINITE, COLLAPSING, ANNUAL_VALUE, ANNUAL_PERCENTAGE.
meltValue | ENJ value of the item. You must multiply the value by 10^18 to include 18 decimals. There is a dynamic minimum melt value, required for creating new assets, which is calculated from the inital reserve.
meltFeeRatio | Percentage of melt value returned to the creator (up to a maximum of 50%), up to 2 decimals. Need to multiply the percentage by 100. i.e. 12.5 % would be 1250.
Transferable | Transfer Type. PERMANENT, TEMPORARY, BOUND.
transferFeeSettings - type | Transfer Fee Type. NONE, PER_TRANSFER, PER_CRYPTO_ITEM, RATIO_CUT, RATIO_EXTRA, TYPE_COUNT.
transferFeeSettings - token_id | Token ID of the item you want to use as the transfer fee. Use 0 for Enjin Coin.
transferFeeSettings - value | Value of the transfer fee. If using ENJ, multiply the value by 10^18 to include 18 decimals.
nonFungible | Whether the item is Non-Fungible or Fungible, true or false.


Once a successful request has been made, you will need to accept and sign the transaction in the **NOTIFICATIONS** section of your dev wallet. If the transaction is successful the
item template is created and you can move onto finding the item's id to MINT.


## Finding the Token ID (and Additional Details)

You can either find the Token ID on the transaction with that item after it confirms via EnjinX or you can search for the item on the Trusted Cloud, you will need to wait for it to be confirmed and scraped from the blockchain first.

NOTE: If you find your Token ID via the blockchain rather than the TP then it will be in integer form, you will need to convert this number to hex and take just the 'upper' 32 bits of the resulting value (which represents the Base Token ID) before using it in many of the GraphQL mutations. You can use a service such as [Rapid Tables](https://www.rapidtables.com/convert/number/decimal-to-hex.html) to do this.

[Tokens](../examples/Tokens.gql)

Enter in the `ITEM NAME` to search for that item. Alternatively, you can make the request without the name parameter to return all items on your app.

## Minting the Item

Minting items is using the template you created in the CREATE step to
instantiate some items on the blockchain. The request for minting fungible items (FIs) vs non-fungible items (NFIs) varies slightly. You can batch mint to multiple addresses if you wish to do so. The differences are that if you need to mint multiple NFIs, you will need to specify the wallet address for each individual item. Ideally try to avoid minting over 100 NFIs in a single transaction, FIs do not have this restriction. Here is the same request between 2 different items types, FI and NFI.

**Fungible Token:**
[MintFungibleItems](../examples/MintFungibleItems.gql)

This request would mint 5x items to “WALLET_ADDRESS_1” and 3x items to “WALLET_ADDRESS_2”.
You can mint up to `INITIAL RESERVE` of items.

**Non-Fungible Token:**
[MintNonFungibleItems](../examples/MintNonFungibleItems.gql)

This request would mint 5x items to “WALLET_ADDRESS_1” and 3x items to “WALLET_ADDRESS_2”.

Once a successful request has been made, you will need to accept and sign the transaction in the “NOTIFICATIONS” section of your dev wallet.

## Setting the URI (Item Metadata)
Item metadata is optional, but if you want to display an image and custom item properties
in the Enjin Wallet (and other Enjin Services) you will need to define some metadata.

In order to link an item to a metadata file, you will need a .json file hosted somewhere that has public read access. You can include a name (which would be displayed instead of the blockchain item name), description, and link to an image (which also needs to be publicly readable) in the .json file.

The bare minimum recommended metadata is a name, a description, and an image. You
would define this like so:

```json
{
  "name": "ITEM_NAME",
  "description": "Description line 1.\nDescription line 2.",
  "image": "/IMAGE.jpg"
}
```
Once you have that .json file uploaded with public read access, you can make the request to set the item URI. Replacing with your token_id and link to your .json file. See
[this guide](./working_with_metadata_digital_ocean.md) for more details if you are
unfamiliar with hosting files.

There are many other built in features for metadata built into our schema,
consult the [Enjin Metadata Schema](../erc1155_metadata_json_schema.md) for details.

Once a successful request has been made, you will need to accept and sign the transaction in the Requests section of your wallet.

