# Disclaimer

This documentation is a frequently-updated work in progress. To guarantee you see the most up-to-date documentation, please do not download or store this guide locally. Instead, refer to Enjin's developer portal website. You are responsible for any losses. Working with the most up-to-date materials can prevent accidents. Your feedback and questions are much appreciated in improving these tutorials.

# What is Enjin?

Enjin was founded in 2009 as a company offering easy website creation and hosting for gamers. Enjin's community platform is popular with guilds, clans, and servers for a number of games.

# What about Enjin Coin?

In October of 2017, Enjin leveraged [Ethereum](https://en.wikipedia.org/wiki/Ethereum) to create Enjin Coin, abbreviated as ENJ. By selling ENJ to the public, we raised funds to build our vision for the future of in-game assets.

# Ethereum? A brief introduction.

Ethereum is a public blockchain solution for trustless computation. Developers can upload self-contained programs known as "smart contracts" to be executed in decentralized fashion by a network of miners. In brief, this allows developers to write functions that cannot be tampered with by the hardware which executes them. To realize Enjin's vision for assets in your own game, there is no expectation that you know how to write smart contracts--we have written our own smart contract which handles that work for you. However, to make the most of Enjin Coin's platform, you should understand a few basic facts:
- Ethereum is the name of the blockchain network, and Ether is the name of the currency backing the network.
- Ether is abbreviated as ETH.
- Interacting with the Ethereum network, including Enjin's smart contract, is performed through issuing transactions and requires spending some ETH. This ETH cost is calculated automatically for you as the "gas fee" that incentivizes the network to process your transaction. A transaction is a message which instructs Ethereum how to handle your request. Sending ETH to someone or telling our smart contract to create a new item are examples of transactions.
