# Creating Your Account

To create an account, first, you must sign up to the [Enjin developer portal](https://kovan.cloud.enjin.io/signup). 

This will give you an account and credentials to access the Trusted Cloud services.

There are two different versions of Ethereum that can be accessed via two seperate Trusted Cloud servers, **Testnet** and **Mainnet.** 

**Testnet (Kovan)** is a development version of Ethereum where you can test Enjin's Smart Contracts and obtain pretend Ethereum (KETH) and Enjin Coin (KENJ) to develop your blockchain implementation in a safe, simulated environment without spending any legitimate form of cryptocurrency.

Use the [Faucet for KETH & KENJ](https://kovan.faucet.enjin.io/) to access testing materials.

**Mainnet (Ethereum)** is the live Ethereum Network that can be accessed by anyone in the world. Here, you are using Ethereum and Enjin Coin can be bought and sold via cryptocurrency exchanges for real money. You should be very comfortable with your implementation on testnet before doing anything substantial on Mainnet.

**You can use the following GraphiQL interfaces to interact with the Trusted Cloud:**

* **Kovan (Testnet)** Trusted Cloud (GraphiQL): [https://kovan.cloud.enjin.io/graphiql](https://kovan.cloud.enjin.io/graphiql)
* **Ethereum (Mainnet)** Trusted Cloud (GraphiQL): [https://cloud.enjin.io/graphiql](https://cloud.enjin.io/graphiql)

_NOTE: Accounts are not shared between Testnet & Mainnet TC servers. You will need an account on each server if you want to use both platforms._

## Browsing the API 
We provide an [API Reference](/api-docs) where you can see all the core GraphQL requests and parameters you can use with the Platform API.

While we will provide all necesary information for you to understand GraphQL in the context of using the Enjin Platform we also encourage you to gain a comprehensive understanding of GraphQL by reading up on the [official documentation](https://graphql.org/learn/queries/) 

## Making Requests
In the GraphQL Browser Interface, enter the request you want to send to the Trusted Cloud in the (top) left panel

Press the “Play” button at the top to submit that request and you will receive a response on the right panel.

**GraphQL runs two types of operations, queries and mutations**.

* **Queries** are requests for information from the server by performing a READ operation that does not change data
* **Mutation**s are requests that modify server side data. You can think of mutations as CUD (Create, Update, Delete) in REST.

_NOTE: Most mutations that involve a transfer of value or alteration of blockchain data or metadata will need to be authorized via the blockchain, which means an approval request will appear in your Enjin Wallet._

## Logging in and Authenticating Your Requests
You will need to **authenticate your requests** made via the Trusted Cloud.

Use this request to get your access token:

[Login](../examples/Login.gql)

## Creating Your App
You will need to create at least one App (Collection) to work with the Trusted Cloud. 

An app is a central container for all of your items and players. Your users each of your apps as a seperate collection in their Enjin Wallet. 

You can create an App via our visual interface or by using the following mutation: 

[CreateApp](../examples/CreateApp.gql)

## Identifying Your App
Many operations your perform via GraphQL will require an App ID. 

If you already created an app, but forget the id, you can look it up with the following query:

[Apps](../examples/Apps.gql)


You will need a name, description and an (optional) link to a hosted image for your app. You should get the App ID in the response if it was successful.

## Creating More Users

  If you are an Admin for your app (you are admin by default if you created the app), you can create new user accounts directly in GraphiQL with the following mutation, if desired:

[CreateUser](../examples/CreateUser.gql)

## Updating Users
You can update your user name, email, and password by running the following request. Replacing with your User ID, new name, new email and new password.

[UpdateUser](../examples/UpdateUser.gql)
