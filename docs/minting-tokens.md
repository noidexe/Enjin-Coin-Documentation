# Minting Tokens

Tokens, also known as blockchain assets, are used to represent the identity of your virtual items on the blockchain. 

When your game items are on the blockchain, their value is more tangible because their identities are immutable, transparent, and incorruptible.

The tokenization and management of virtual items is the core function of the Enjin Platform.

## Token Data

There are two different token types that can be created using the Enjin Platform.

#### Fungible Tokens (FT):
Traditional currencies and cryptocurrencies are fungible; they are identical, interchangeable, and divisible. For currencies to work as a standard payment method, fungibility is essential.

Fungible tokens do not have a unique serial number or history; there is nothing to distinguish one from the next. For example, every $5 note is exactly the same and holds the same value. Every half of one fungible token is equal to two quarters of another.

Fungible tokens are useful for things like currency, reward points, discounts, and promotional materials—any item that doesn't require a unique identity. 

#### Non-Fungible Tokens (NFT):

A non-fungible token is a unique asset.

Non-fungible tokens are not divisible and are stored in the Enjin Wallet as separate tokens with individual data. However, non-fungible tokens are not always 100% unique. For example, a set of tokens may share the same name, description, and image, but they can still be non-fungible if they possess unique, distinguishing properties (identity, history, and metadata).

Non-fungible tokens are suitable for things like identification, certificates, collectibles, gaming characters—any asset that requires its own identity.

There are two types of data that can be attached to each token.

* **Blockchain Data** is committed permanently to the Ethereum Network. The defining properties of a token, including its identity, settings, and ENJ-backed value can impact the demand for a token drastically, therefore, much of this data can never be changed once committed to the blockchain. While some token settings can be updated by replacing old data with new, the previous token settings will remain on record, viewable in the transaction history on the blockchain.

* **Metadata** is the human-readable information that your users will be able to see in your game or app and any other platform where they can see your token. This data can be updated at any time.

### Blockchain Data: Changable

This data can be edited and replaced with new settings at any time.

**name**: The name that will be committed to the blockchain.

**Metadata URI**
See **Working with metadata** section.
The metadata URI allows you to add a URL that contains a JSON that describes properties of your item, including images.

**Transferable**
Determines if items are able to be traded, or are bound to their owners (i.e. non-tradable).
* **Permanent**: Item is always able to be traded with others. This setting is not changable once committed to a token.
* **Bound**: Item is always bound to the owner of the item.
* **Temporary**: Item is currently tradable, but creator can make it non-tradable at a future date.

**transferFeeSettings: value** 

Value of the transfer fee. If using ENJ, multiply the value by 10^18 to include 18 decimals. When you first set a transfer fee, that setting become the maximum fee you can charge. However, you can lower a transfer fee at any time, at which point, you can then raise it back to the amount you initially set.

### Blockchain Data: Permanent

**totalSupply**: This is how many of the item you want to exist in the world. This limit can be
broken or mean different things depending on the supply model you use above. For example, if you
use the COLLAPSING supply type, the initial supply would represent the total number of items that
existed during the original run. The easiest to understand is FIXED, which tells users that there
can only be "this many" items of this kind in existence at any one time.

**initialReserve**:This is how many items you want to pre-pay to mint as part of the initial create operation. Minting items will be deducted from this balance until it is exhausted. You have to
pay for at least one item on creation. Having an initial reserve allows you to create your item without having to spend all the ENJ for your total supply on the create.

**transferFeeSettings: type**

You can choose to charge a transfer fee for every peer-to-peer transaction that your users make. This allows you to monetize the economy that surrounds your game and gain revenue by fostering interesting new social dynamics within your community.

* **None**: No Transfer fees are charged when this item changes hands.

* **Per_Crypto_Item**: Transfer fee *per item* changing hands, in ENJ. For example, if an `Apple`
has a `0.1 ENJ` fee per item and `0xPAT` sends 10 apples to `0xERIC`, `0xPAT` would be charged 1 ENJ for the transaction that would go to the `0xCREATOR` of the apple.

* **Per_Transfer**: Transfer fee per *transfer* when changing hands, in ENJ. For example, if a `Banana` has a `0.1 ENJ` fee per transfer and `0xPAT` sends 10 bananas to `0xERIC`, `0xPAT` would
be charged 0.1 ENJ for the transaction that would go to the `0xCREATOR` of the banana.
* **Ratio_Cut**: Fungible Items only. A % cut of the total items is subtracted from the total for the dev, with the sender paying the total price. For example, if transferring 500 gold with a 10% ratio cut (0.1) the recipient would get 450 gold and the dev 50 gold, with the sender paying 500 total for the transaction.
Another example:

`day_of_subscription` has RATIO_CUT of 100 (results in 1% cut to creator)
`0xPAT` sends 10000 `day_of_subscription` to `0xERIC`
Result: `0xERIC` gets 9,900 items and `0xCREATOR` gets 100.

* **Ratio_Extra**: Fungible items only. A tax that is charged ON TOP of everything. For example if transferring 500 gold with a 10% ratio extra the recipient would get 500 gold, the dev 50 gold, and the sender pays 550 gold total for the transaction.
Another example:
`gold` has RATIO_EXTRA fees of 1,500 (15%)
0xPAT sends 4000 `gold` to `0xERIC`
Result: `0xPAT` loses 4,600 `gold`, `0xERIC` receives 4000, `0xCREATOR` receives 600.

**transferFeeSettings:** token_id
The token ID of the token you want to use as the transfer fee. Use 0 if you want your users to pay you in Enjin Coin.

**meltValue**
The amount of ENJ you want to use per unit of item you are creating. You need to use a minimal
amount of ENJ to back your items depending on how many you are creating in your initial reserve (the min cost will be listed beside the label). In general, the more items of one type you are making, the less ENJ you need **per unit** of item.

**supplyModel**: This is how the item pool behaves with respect to minting and melting. We have the following supply types in the current version on Enjin:
  * **Fixed**: You can have up to TOTAL SUPPLY number of items in circulation at one time.
  * **Settable**: Allows you to edit the total supply at any time.
  * **Infinite**: You can mint as many items as you want, exceeding TOTAL SUPPLY.
  * **Collapsing**: Once melted the items cannot be re-minted.

**meltFeeRatio**
This is the current percentage of ENJ that the player will receive upon melting the item. The remaining ENJ goes to the creator.

**nonFungible**
Whether the item is Non-Fungible or Fungible, true or false.

## Creating a Token Template

A token template contains the core, immutable token data that will be committed to the blockchain.

To create an item, you will need to make a request with the desired item properties. Here is
an example:

[CreateToken](../examples/CreateToken.gql)

Once a successful request has been made, you will need to accept and sign the transaction in the **REQUESTS** section of your dev wallet. 


## Finding the Token ID

A Token ID is a permanent identity given to your Token Template once it has been committed to the blockchain. 

Therefore, once the token template has been created you will need to find the Token ID to MINT the tokens that you have defined within the template.

You can either find the Token ID on the transaction with that item after it confirms via [EnjinX](https://enjinx.io/) or you can search for the item on the Trusted Cloud using the following query

Please note: You will need to wait for it to be confirmed and scraped from the blockchain first.

Enter in the `NAME` to search for that token. Alternatively, you can make the request without the name parameter to return all items on your app.

[Tokens](../examples/Tokens.gql)


## Creating Token Metadata

Once you have defined your token's blockchain data by creating the token template, you can add Metadata to it which is stored in a .json file, hosted somewhere that has public read access.

Technically, item metadata is optional, but if you want to display an image and custom item properties in your game, the Enjin Wallet, and other Enjin Services, you will need to define some metadata.

You can include a name (which would be displayed instead of the blockchain item name), description, and link to an image (which also needs to be publicly readable) in the .json file.

The bare minimum recommended metadata is a name, a description, and an image. You
would define this like so:

```json
{
  "name": "ITEM_NAME",
  "description": "Description line 1.\nDescription line 2.",
  "image": "/IMAGE.jpg"
}
```
Once you have that .json file uploaded with public read access, you can make the request to set the item URI (Uniform Resource Identifier).

See [this guide](/docs/metadata) for more details if you are unfamiliar with hosting files.

**Advanced Users:**
The URI value allows for ID substitution by clients. If the string `{id}` exists in any URI, clients MUST replace this with the actual token ID in hexadecimal form. This allows for large number of tokens to use the same on-chain string by defining a URI once, for a large collection of tokens. Example of such a URI: `https://token-cdn-domain/{id}.json` would be replaced with `https://token-cdn-domain/780000000000001e000000000000000000000000000000000000000000000000.json` if the client is referring to token ID `780000000000001e000000000000000000000000000000000000000000000000`. See [Metadata](/docs/metadata) section in the ERC-1155 standards documentation for full details.

[SetItemUri](../examples/SetItemUri.gql)

Once a successful request has been made, you will need to accept and sign the transaction in the **REQUESTS** section of your dev wallet.

## Minting the Tokens

Now that you have created the template and defined its metadata, it's time to mint your first batch of tokens. 

The request for minting fungible tokens (FTs) vs non-fungible tokens (NFTs) varies slightly. 

You can mint batches of any token type to multiple addresses or mint them to a single address. 

The supply of Fungible Tokens is essentially represented by a quantity field within the token data, as opposed to Non-Fungible Tokens whose supply is represented by the quantity of seperate token identities.

That's why, if you need to mint multiple NFTs in a single transaction, you will need to specify the receiving Ethereum address for each individual item. It is also advisable not to mint over 100 NFTs in a single transaction, because overloading transactions can cause transactions to fail.

FTs do not have the same restriction, you can mint unlimited Fungible Tokens into a Ethereum Address. However, it advisable not to mint any amount of fungible tokens into over 100 different Ethereum Addresses in one transaction. That too could cause the transaction to fail due to network overload.

Here is the same request between 2 different token types, FT and NFT.

**FT:**
[MintFungibleItems](../examples/MintFungibleItems.gql)

This request would mint 5x items to “WALLET_ADDRESS_1” and 3x items to “WALLET_ADDRESS_2”.
You can mint up to `INITIAL RESERVE` of items.

**NFT:**
[MintNonFungibleItems](../examples/MintNonFungibleItems.gql)

This request would mint 5x items to “WALLET_ADDRESS_1” and 3x items to “WALLET_ADDRESS_2”.

Once a successful request has been made, you will need to accept and sign the transaction in the “REQUESTS” section of your dev wallet.
