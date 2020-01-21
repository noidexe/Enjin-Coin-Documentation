# Using GraphQL

GraphQL is a modern syntax that allows you to define the data structure of your queries and ask for exactly what you want and nothing more.

GraphQL queries access not just the properties of one resource but also smoothly follow references between them. While typical REST APIs require loading from multiple URLs, GraphQL APIs get all the data your app needs in a single request. 

## Operations

**Query:** READ operations are performed by GraphQL queries, these do not change data.

**Mutation:** You will use mutations to perform all other operations to modify data.

## Object Types

Object types are sets of fields that are used to define the set of data you can query from the API.

```bash
query {
}
mutation {
}
```

## Fields

Fields are used to ask for specific object propeties.

Each object has fields that can be queried by name in order to query for the properties you need.

```bash
query {
   EnjinToken {
      id
      >
   }
}
```

## Arguments

You can determine the return value of a query by passing arguments to it. This narrows down the results and allows you to only get what you're after.

In the following example, the object is “token”, the requested field is “name”, the argument is “token_id”, and the argument value is 0x6000000000000e13.

```bash
query {
   EnjinToken (token_id: 0x6000000000000e13){
      name
   }
}
```

## GraphQL visual interface - GraphiQL

Probably the most user-friendly feature of GraphQL is its visual interface, an in-browser tool for writing, validating, and testing GraphQL queries.

Before you query the API, it’s recommended to run your queries through the visual interface to make sure they are correct and the data being returned is the data you expect. 

**You can use the following GraphiQL interfaces to interact with the Trusted Cloud:**

* **Kovan (Testnet)** Trusted Cloud (GraphiQL): [https://kovan.cloud.enjin.io/graphiql](https://kovan.cloud.enjin.io/graphiql)
* **Ethereum (Mainnet)** Trusted Cloud (GraphiQL): [https://cloud.enjin.io/graphiql](https://cloud.enjin.io/graphiql)

## Querying Enjin Object Types

Querying is the way to ask for data, it’s similar to the GET action in REST-based APIs.

Here is a list of the Enjin object types you can query through the API:
* **EnjinOauth:** A Trusted Platform access token 
* **EnjinPlatform:** An app on the Trusted Platform
* **EnjinApp:** An app on the Trusted Platform.
* **EnjinUser:** A user account.
* **EnjinRole:** The role of a user account.
* **EnjinPermission:** The permissions of a role of a user account.
* **EnjinIdentity:** A user's identity for a game.
* **EnjinIdentityField:** A field that can be attached to an identity.
* **EnjinToken:** A blockchain asset
* **EnjinBalance:** A balance of tokens in a user account
* **EnjinTokenEvents:** A blockchain asset event.
* **EnjinTokenTransferFeeSettings:** 
* **EnjinTransactions:** A transaction request.
* **EnjinBlock:** A batch of data being processed by the Ethereum network.
* **PaginationCursor:** Representing a single page of data within a list.

## Mutating Enjin Object Types

Mutating in GraphQL is the way to modify data, it is the term used to include all non API functions other than GET. This includes functions such as put, post, and delete that you may be familiar with from REST-based APIs.

Unlike querying, mutating requires adding all the arguments to the mutation. After it runs, you can query the values of the object after the mutation took place.

There are different types of Enjin object types that can be mutated through the API. 

Here is a list of the Enjin object types that can be mutated:
* **EnjinApp:** An app on the Trusted Platform.
* **EnjinUser:** A user account.
* **EnjinRole:** A user role.
* **EnjinIdentity:** A user's identity for a game.
* **EnjinToken:** A blockchain asset.
* **EnjinRequest:** A transaction sent to the Trusted Platform.

For more information, go through the [API Reference](/api-docs) where you can see all the core GraphQL requests and parameters.
