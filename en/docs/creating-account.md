# Creating Your Account

To create an account on the Enjin Platform, first, you must sign up to the [Enjin developer portal](https://cloud.enjin.io/signup). 

This will give you an account and credentials to access the Trusted Cloud services.

We also recommend checking this [support article](https://support.enjin.io/help/creating-your-account-on-the-enjin-platform?version=latest), which goes through step-by-step on how to create your account on the Enjin Platform. 

There are two different versions of Ethereum that can be accessed via two separate Trusted Cloud servers, **Testnet** and **Mainnet.** 

**Testnet (Kovan)** is a development version of Ethereum where you can test Enjin's Smart Contracts and obtain pretend Ethereum (KETH) and Enjin Coin (KENJ) to develop your blockchain implementation in a safe, simulated environment without spending any legitimate form of cryptocurrency.

Use the [Faucet for KETH & KENJ](https://kovan.faucet.enjin.io/) to access testing materials.

**Mainnet (Ethereum)** is the live Ethereum Network that can be accessed by anyone in the world. Here, you are using Ethereum (ETH) and Enjin Coin (ENJ). Both can be bought and sold via cryptocurrency exchanges for real money. You should be very comfortable with your implementation on Testnet before doing anything substantial on Mainnet.

**You can use the following GraphiQL interfaces to interact with the Trusted Cloud:**

* **Kovan (Testnet)** Trusted Cloud (GraphiQL): [https://kovan.cloud.enjin.io/graphiql](https://kovan.cloud.enjin.io/graphiql)
* **Ethereum (Mainnet)** Trusted Cloud (GraphiQL): [https://cloud.enjin.io/graphiql](https://cloud.enjin.io/graphiql)

_NOTE: Accounts are not shared between Testnet & Mainnet TC servers. You will need an account on each server if you want to use both platforms._

## Browsing the API 
We provide an [API Reference](/api-docs) where you can see all the core GraphQL requests and parameters you can use with the Platform API.

It's important to keep in mind, while we will provide all necessary information for you to understand GraphQL in the context of using the Enjin Platform, we also encourage you to gain a comprehensive understanding of GraphQL by reading up on the [official documentation](https://graphql.org/learn/queries/) 

## Making Requests
In the GraphQL Browser Interface, enter the request you want to send to the Trusted Cloud in the (top) left panel

Press the “Play” button at the top to submit that request and you will receive a response on the right panel.

**GraphQL runs two types of operations: queries and mutations**.

* **Queries** are requests for information from the server by performing a READ operation that does not change data.
* **Mutations** are requests that modify server-side data. You can think of mutations as CUD (Create, Update, Delete) in REST.

_NOTE: Most mutations that involve a transfer of value or alteration of blockchain data or metadata will need to be authorized via the blockchain, which means an approval request will be sent in your Enjin Wallet and you will need to either accept or decline the request._

## Logging in and Authenticating Your Requests
You will need to **authenticate your requests** made via the Trusted Cloud.

Use this request to get your access token:

[Login](../examples/Login.gql)

## Creating Your Project
You will need to create at least one Project (a collection) to work with the Trusted Cloud. 

A Project is a central container for all of your items and players. Your users can view each of their pertained projects as a separate collection in their Enjin Wallet, under the Collectibles tab. 

You can create a Project via our visual interface panel or by using the following mutation: 

[CreateApp](../examples/CreateApp.gql)

We also recommend checking this [support article](https://support.enjin.io/help/creating-your-first-enjin-project?version=latest) on how to create your first project, using the Enjin Platform panel. 

## Identifying Your Project
Many operations you perform via GraphQL will require an App ID. 

If you have already created a project, but forgot the id, you can always search for the App ID with the following query:

[Apps](../examples/Apps.gql)

You should get the App ID in the response if it was successful. It's also important to set a name, description and a link to a hosted image for your newly created project. 

## Identifying Your Identity ID
Many operations you perform via GraphQL will also require an Identity ID. 

If you have already created an identity for yourself, but forgot the id, you can always search for your identity ID with the following query:

[Apps](../examples/Users.gql)

You should get the App ID in the response if it was successful. It's also important to set a name, description and a link to a hosted image for your newly created project. 

## Creating More Users

  If you are the Primary Owner (PO) for your project (you are PO by default if you created the project), you can create new user accounts directly in GraphiQL with the following mutation, if desired:

[CreateUser](../examples/CreateUser.gql)

## Updating Users
You can update your user name, email, and password by running the following mutation. Replacing with your User ID, new name, new email, and new password.

[UpdateUser](../examples/UpdateUser.gql)

## Project Team Member Roles
Once you have created your new project, you can set up various team member roles for your team. It's important to know which roles can perform certain requests. You can set up roles for your team members on the Enjin Platform by clicking the **Teams** section, on the left-side panel. 

The following are all available roles in descending order: 

**Member:** The member role has the ability to:
  - View applications.
  - View identities.
  - View requests.
  - View team.
  - View users.
  - View token events.
  
**Minter:** The minter role has the ability to:
  - Manage requests.
  - Mint tokens (mint existing tokens only).
  
**Creator:** The creator role has the ability to:
  - Manage tokens (create new tokens / editing existing tokens).
  
**Admin:** The admin role has the ability to:
  - Manage project settings.
  - Manage team members/minters/creators.
  - Manage identities.
  - Manage users.
  
**Owner:** The owner role has the ability to:
  - View application secret.
  - Manage team admins.
  
**Primary Owner:** The primary owner has the ability to:
  - Delete project.
  - Manage team owners.

_**Note:** Each role inherits the permissions from the above. The Primary Owner, is the individual who created the project and has full control over said project._
