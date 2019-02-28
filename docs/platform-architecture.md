# Enjin's Architecture

Now that you have a working [understanding of Enjin and Ethereum](enjin.md), it's time for you to understand in more detail how the different components that make up Enjin's platform interact with one another.

The interaction model is intuitive when considering your game alone: first the user sends their input to the game, the game processes it, and then the result is displayed to the user. Consider the following example. In your game, the user wants to sell a sword. Your game removes the sword from the user's inventory and rewards them with gold. Then the user sees the sword disappear from their inventory. But how does this flow change when Ethereum comes into play?

![A diagram of Enjin's Architecture](images/platform-architecture.png)

As this diagram shows, a basic interaction involving one of Enjin's truly-owned game items is a simple six step process. In this example, let us still consider the case of the user trying to sell a sword:
1. The user interacts with your game. They tell the game to sell a sword.
2. Your game issues a web request to Enjin's Trusted Cloud. The request tells Enjin to remove the sword from the user's inventory.
3. The Trusted Cloud sends a transaction request to the user's Enjin Wallet app. The requested transaction is one that would remove the sword.
4. The user has the choice to either accept or deny the transaction request using their app.
5. If the user accepts, the transaction is broadcast to the Ethereum network. Our smart contract handles all the logic for actually operating on the user's inventory. In this case, the user has accepted and our smart contract handles removing their sword.
6. The Trusted Cloud listens to Ethereum to see if the user's transaction was a success. The resulting transaction data is then sent from the Trusted Cloud back to your game, where you can choose how to display it to the user. In this case, you would show to the user that their sword has been removed and reward them with some gold.

# What is the Trusted Cloud?

If you've been following along so far, you'll likely be wondering what this "Enjin Trusted Cloud" is. After all, we hadn't mentioned it in the brief overview. What gives? What does it do?

The Trusted Cloud is Enjin's intermediary server that makes interacting with Ethereum easier. Suffice it to say, Ethereum is a new technology which is not necessarily easy to directly interact with. To spare your game the trouble of having to include logic for interacting with our smart contract or the Enjin Wallet app directly, we provide a server that does so and includes a convenient Application Programming Interface (API). Using this API, it is easy to issue transactions that affect your user's items.

The Trusted Cloud includes better error handling and input validation than directly interacting with our smart contract would allow. It also pushes notifications about a given transaction's state to your game such that you might be able to handle these error cases appropriately should they occur. Our platform server also manages the link between your user's game account (such as their Steam, Xbox Live, or PlayStation identifiers), and their Ethereum wallet address.

Currently, we are using a cloud based solution so the platform is hosted for you. You don't need to worry about setting up things yourself. All you need is a developer account and a subscription. In the future, we will be offering ways for developers to run their own self-hosted platforms to truly decentralize the ecosystem.

# The Trusted Cloud API

You can interact with our Trusted Cloud using the [GraphQL query language](https://graphql.org/learn/). If you can issue HTTP web requests from your game to talk to a web service, you are able to send requests to the Trusted Cloud. While using GraphQL to interact with our Trusted Cloud is a powerful solution and far more wieldy than interacting with our smart contract is, we understand that there is still a learning curve involved. Therefore, we've created some SDKs that make using our platform for managing a user's items even easier.

Over time our team will be creating solutions for the most frequently used game technologies that exist. For now, let's focus on the [Unity game engine](https://unity3d.com/). Unity is a free and popular tool for creating games. We provide a Unity SDK to help you do the most common operations with our platform from directly within your game. Our SDK also includes an editor panel that allows you to manage items from right within Unity's developer interface. You'll see more on that later.

# Registering Your Game

By now you should understand our platform and how it all works together. It's time to make your understanding a little less abstract and get a working example up and running. Next up, we're going to [register your game for development](registering-game.md).
