# What is Enjin?

Enjin was founded in 2009 as a company offering easy website creation and hosting for gamers. Enjin's community platform is popular with guilds, clans, and servers for a number of games. Now, Enjin is using Ethereum to empower the true ownership of in-game assets.

# Enjin's Vision: True Ownership

Other games allow their players to craft, trade, and own items in inventories. From skins to loot to custom weapons, gaming has long been familiar with the concept of players "owning" their items. On further inspection, however, what ownership do players actually have over these inventories? What guarantees do they have as to a particular item's rarity or authenticity? Let's unpack ownership.

In a traditional game, your inventory exists as some data stored in a file or database on your computer or a game developer's server. You might be able to trade this item with your friends or craft it into new items. You might even be able to sell that item for real money in a marketplace somewhere. However, you never really control the data that represents the item. A game's servers could shut down some day and your item would simply vanish.

Enjin has built a solution where player's finally _own_ their items. Players alone have final control over their items and nobody, not even Enjin, can ever take them away.

# Ethereum? A brief introduction.

Before speaking further about our vision, we want to discuss the tools that make it possible. [Ethereum](https://en.wikipedia.org/wiki/Ethereum) is a public blockchain solution for trustless computation. Developers can upload self-contained programs known as "smart contracts" to be executed in decentralized fashion by a network of distributed computers called "miners." In brief, this allows developers to write functions that cannot be tampered with by the hardware which executes them. A smart contract serves as an intermediary that always performs the function it was programmed to do. Smart contracts ultimately allow us to support creating and trading game items.

To realize Enjin's vision for assets in your own game, there is no expectation that you know how to write smart contracts&mdash;we have written our own smart contract which handles that work for you. However, to make the most of Enjin Coin's platform, you should understand a few basic facts:
- Ethereum is the name of the blockchain network, and Ether is the name of the currency backing the network.
- Ether is abbreviated as ETH.
- Interacting with the Ethereum network, including Enjin's smart contract, is performed through issuing transactions and requires spending some ETH. This ETH cost is calculated automatically for you as the "gas fee" that incentivizes the network's miners to process your transaction. A transaction is a message which instructs Ethereum how to handle your request. Sending ETH to someone or telling our smart contract to create a new item are examples of transactions.
- Transactions take a variable amount of time to complete, depending on the amount of ETH that you have paid as a gas fee.
- Transactions may sometimes fail or become stuck. Handling these errors is supported by our Software Development Kits (SDKs).
- Ethereum participants can be either smart contracts or people issuing transactions. Both types of participant have "addresses." These addresses are analogous to street addresses. They are publicly available and tell other participants in the network how to send transactions or ETH to you.
- Users typically store their ETH in programs called "wallets," such as the Enjin Wallet mobile app for Android and iOS devices. Internally, a wallet tracks your ETH for your particular address.
- All addresses also have a private key which should be solely controlled by the address owner. In the case of your wallet, imagine a safe containing all of your ETH at a particular street corner. The public address tells people where to find your safe, but only you can open it to access the ETH using your private key. You not only use your private key to access the contents of your wallet, but also to "sign" transactions that come from your address. The act of signing confirms that the transaction is coming from you and that you've authorized it to happen. Most players will probably use the Enjin Wallet for their signing needs.

# What about Enjin Coin?

You might be wondering where Enjin Coin itself comes into play. You've seen it for sale on exchanges, you've seen it in wallets, and maybe you've even traded for some of it. But how exactly does Enjin Coin get used? What does it do? How does it fit into this whole Ethereum thing?

In October of 2017, Enjin leveraged Ethereum to create Enjin Coin, abbreviated as ENJ. ENJ is actually a separate smart contract running on Ethereum. By selling ENJ to the public, we raised the funds needed to build our vision for the future of in-game assets.

Keep in mind that ENJ is more than just a fundraising mechanism, however. In our platform, ENJ has real use beyond just currency.

# Why should I care about ENJ?

The easiest way to understand the role of ENJ is to pretend that it is a real world material, like steel. Steel is used to make all sorts of useful items in the real world, like weapons, nails, and unique pieces of art. Steel can also be bought, sold, and traded with others at various marketplaces.

ENJ is digital steel. ENJ can be bought, sold, and traded on exchanges. ENJ can be used to make a million bullets, or to cast a one-of-a-kind sculpture. The possibilities are really only limited by your imagination.

Digital steel&mdash;so what? I can make an unlimited number of items in my game right now, using better and faster technologies that have been around for decades.

Think again of the real world, and pretend you made a sword. Pretend the sword you have just forged with ENJ is a real world object. What would be the benefits to you as a creator? As a player? Here are a few:

- You created the sword from a raw material. Therefore it has at least _some_ value derived from that material.
- If you make 100 swords, that's how many there are in the world. There is a finite number of them in existence. That's supply.
- If you have something of value and it has supply, you can expect demand for that item. The demand might be small or large. That depends on the item, how it works in your game, and what players are willing to pay for the item.
- Players who buy your sword _really_ own it. You and your game could go offline tomorrow and they would still have it associated with their Ethereum address. A censorship-proof, unchanging smart contract will ensure that the item lives on.
- People can trade items with each other, without needing you to know about it. You can even charge a small fee of ENJ every time one of your items moves from person to person.
- People can recycle items by melting them back into ENJ, allowing them to re-invest that ENJ into new games that they want to play.

These are just a few benefits at the core of Enjin's vision. If you want a more extensive overview of our digital items, check out this [video](https://www.youtube.com/watch?v=7KLpNU6wXEM).

# Sign me up!

Now that you understand Enjin, Ethereum, and what we're trying to do with ENJ, it's time to build a real game that improves ownership for users. We'll be walking through the following steps to do so:
1. [Taking a more detailed look at the Enjin Coin platform architecture](platform-architecture.md),
2. [Understanding how to register your game on Enjin's platform](registering-game.md),
3. [Setting up the Enjin Wallet](wallet-setup.md),
4. [Creating items on Enjin's platform](creating-items.md),
5. [Using those items in your game](using-items.md).

We hope you find these guides useful learning tools as you explore this new technology, and appreciate your support in helping us explore the future of in-game assets.
