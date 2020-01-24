# Using GraphQL

GraphQL is a modern query language that allows you to define the data structure of your queries and ask for exactly what you want and nothing more.

GraphQL queries access not just the properties of one resource but also smoothly follow references between them. While typical REST APIs require loading from multiple URLs, GraphQL APIs get all the data your app needs in a single request. 

## Operations

**Query:** READ operations are performed by GraphQL queries, these do not change data.

**Mutation:** You will use mutations to perform all other operations to modify data.

## Object Types

Object types are sets of fields that are used to define the set of data you can query from the API.

```gql
query {
}
mutation {
}
```

## Fields

Fields are used to ask for specific object properties.

Each object has fields that can be queried by name in order to query for the properties you need.

```gql
query {
   EnjinToken {
      id
   }
}
```

## Arguments

You can determine the return value of a query by passing arguments to it. This narrows down the results and allows you to only get what you're after.

In the following example, the object is “token”, the requested field is “name”, the argument is “id”.

```gql
query Token($name: String,) {
  token: EnjinTokens(
    name: $name
  ) {
    id
  }
}
```

## GraphQL's visual interface - GraphiQL

Probably the most user-friendly feature of GraphQL is its visual interface, an in-browser tool for writing, validating, and testing GraphQL queries.

Before you query the API, it’s recommended to run your queries through the visual interface to make sure they are correct and the data being returned is the data you expect. 

**You can use the following GraphiQL web interfaces to interact with the Trusted Cloud:**

* **Kovan (Testnet)** Trusted Cloud (GraphiQL): [https://kovan.cloud.enjin.io/graphiql](https://kovan.cloud.enjin.io/graphiql)
* **Ethereum (Mainnet)** Trusted Cloud (GraphiQL): [https://cloud.enjin.io/graphiql](https://cloud.enjin.io/graphiql)

## GraphiQL Desktop App
You can also download desktop version of the GraphiQL interface to interact with the Trusted Cloud

https://www.electronjs.org/apps/graphiql

**Here are the endpoints to use within the desktop app:**
* **Kovan (Testnet)** GraphiQL Endpoint: https://kovan.cloud.enjin.io/graphql
* **Ethereum (Mainnet)** GraphiQL Endpoint: https://cloud.enjin.io/graphql

## Querying Enjin Object Types

Querying is the way to ask for data, it’s similar to the GET action in REST-based APIs.

Here is a list of the Enjin object types you can query through the API:
* **EnjinApp:** Use this query to get information about an app on the Enjin Platform.EnjinApps - Use this query to get information about apps on the Enjin Platform.
* **EnjinBalances:** Use this query to get information about balances stored on the Enjin Platform.
* **EnjinBlockHeight:** Use this query to get the last block processed on the Enjin Platform.
* **EnjinIdentities:** Use this query to get information about identities stored on the Enjin Platform.
* **EnjinIdentity:** A user's identity for a game.
* **EnjinOauth:** Use this query to log users in and obtain oAuth access tokens.
* **EnjinPlatform:** Use this query to get information about a project on the Enjin Platform.
* **EnjinRoles:** Use this query to get information about app roles on the Enjin Platform.
* **EnjinSearch:** Use this query to perform searches of the different searchable types.
* **EnjinTokenEvents:** Use this to query the token events that has been recorded by the Enjin Platform.
* **EnjinToken:** Use this query to get token data.
* **EnjinTransactions:** Use this to query transaction requests.
* **EnjinUser:** Use this query to get information about a user on the Enjin Platform.
* **EnjinUsers:** Use this to query user data on the Enjin Platform.
* **EnjinWallet:** Use this query to get wallet data.
* **EnjinWallets:** Use this query to get information about wallets stored on the Enjin Platform.

## Mutating Enjin Object Types

Mutating in GraphQL is the way to modify data, it is the term used to include all non-API functions other than GET. This includes functions such as put, post, and delete that you may be familiar with from REST-based APIs.

Unlike querying, mutating requires adding all the arguments to the mutation. After it runs, you can query the values of the object after the mutation took place.

There are different types of Enjin object types that can be mutated through the API. 

Here is a list of the Enjin object types that can be mutated:
* **CreateEnjinApp:** This mutation allows you to create a new project on the Enjin Platform. You will become the Admin of the project.
* **UpdateEnjinApp:** This mutation can be used to update project information.
* **DeleteEnjinApp:** This mutation deletes an project from the Enjin Platform, please note the project will remain registered on the blockchain.
* **CreateEnjinIdentity:** This mutation allows you to create a new identity for users on the Enjin Platform.
* **UpdateEnjinIdentity:** Use this mutation to update an identity. This mutation is also used to link a wallet with a signed message.
* **DeleteEnjinIdentity:** This mutation deletes an identity from the Enjin Platform.. You can also use this mutation to unlink an identity from a wallet.
* **CreateEnjinRequest:** This mutation allows you to create a new transaction request to send to the blockchain, and is the main way to interact with the different smart contract methods. When creating transaction requests it is important to use the correct Identity ID as the ethereum address that is stored on it will be used as the 'creator' of the request and so needs to match the creator or owner of the token being manipulated. In the case of a Create request the ID will become the 'creator' of the new token.
* **UpdateEnjinRequest:** Use this mutation to update a pending transaction request. Transaction requests cannot be updated once they have been signed and broadcast to the ethereum network.
* **DeleteEnjinRequest:** Use this mutation to update a pending transaction request. Transaction requests cannot be updated once they have been signed and broadcast to the ethereum network.
* **CreateEnjinToken:** This mutation allows you to import an existing token onto the Enjin Platform, the token data will be read from the blockchain and linked to the App ID you specify in the request header.
* **UpdateEnjinToken:** Use this mutation to refresh the token data on the Enjin Platform from the blockchain or change which app the token is linked to.
* **DeleteEnjinToken:** This mutation removes a previously imported token from the Enjin Platform. This mutation can only be used when there is 0 circulating supply. If you try to delete the token while there is a circulating supply it is simply marked for delete. It can then be deleted once there are no more tokens circulating.
* **CreateEnjinUser:** This mutation allows you to create a new user on the Enjin Platform. If you are logged in as an Admin a new Identity will also automatically be created for the new user for the App ID specified in the headers.
* **UpdateEnjinUser:** Use this mutation to update a user account on the Enjin Platform.
* **DeleteEnjinUser:** Use this mutation to remove a user from the Enjin Platform.. Users can later be restored if required.
* **UnlinkApp:** Use this mutation to unlink a wallet from an app.
* **UnlinkIdentity:** Use this mutation to unlink a wallet from an identity.

You can find comprehensive information about what data can be queried and mutated using these Object Types in the **GraphiQL Documentation Explorer.**

**To find it, go to the [GraphiQL visual interface](https://kovan.cloud.enjin.io/graphiql) and click the _"Docs"_ button in the top-right corner.**
