# Registering Your Game

You understand what [item interactions on our Trusted Cloud](platform-architecture.md) look like, so you're ready to register a game of your own to work on.

First, you must sign up [on the Enjin developer portal](https://kovan.cloud.enjin.io/signup) if you haven't done so already. This will give you an account and credentials to access the Trusted Cloud services.

There are two separate TC servers, Testnet and Mainnet.

Testnet is a development version of the mainnet, where you can easily obtain fake Ethereum and Enjin Coin to test your items in a safe, simulated environment without using real cryptocurrency.

Mainnet is the real deal. You are using real Ethereum and EnjinCoin, so transactions
here cost real cryptocurrency. You should be very comfortable with your implementation on testnet before doing anything substantial on mainnet.

We will only be publicly supporting Kovan testnet for our initial launch. Soon afterwards,
we will roll out on Ropsten and finally, Mainnet proper.

You can use the following GraphiQL browser interface to interact with the Trusted Cloud:

* **Kovan Trusted Cloud (GraphiQL):** [https://kovan.cloud.enjin.io/graphiql](https://kovan.cloud.enjin.io/graphiql)

## Browsing the Schema
On the right-side there should be a documentation panel to expand and browse for all the requests and parameters you can use. See [here](https://graphql.org/learn/queries/) for documentation on Queries and Mutations. In a nutshell, Queries are requests for information from the server, where Mutations are requests that modify server side data.

## Making a Request
On the (top) left panel, you would enter in your request to be made to the TC. Press the “Play” button at the top to submit that request, and you will receive a response on the right panel, sometimes a notification will appear in your dev wallet to sign a transaction depending on the request made.

## Login and Authenticating Your Requests
You will need to **authenticate your requests** made via the TC. To authenticate your request, you will need an access token. Use this request to get your access token:

[Login](../examples/Login.gql)


## Creating Your App
You will need to create at least one App in order to work with the Trusted Cloud. An app is a central container for all of your items and players. For example your app will appear as one of the “Collections” where your items will appear in the user’s Enjin wallet.

[CreateApp](../examples/CreateApp.gql)


One important thing to note is your App ID. If you already created an app, but forget the id, you can look it up with the following query:

[Apps](../examples/Apps.gql)


You will need a name, description and an (optional) link to a hosted image for your app. You should get the App ID in the response if it was successful.

## Creating More Users (Optional)

  If you are an Admin for your app (you are admin by default if you created the app), you can create new user accounts directly in GraphiQL with the following mutation, if desired:

[CreateUser](../examples/CreateUser.gql)


_NOTE: Accounts are not shared between Testnet & Mainnet TC servers. You will need an account on each server if you want to use both platforms._

# Next Steps

Your game is ready to go. It has a presence on the Trusted Cloud and we're almost at that exciting point where we can begin creating our own items. First, however, we need to make sure that you're ready with an [Enjin Wallet and the necessary resources](wallet-setup.md).
