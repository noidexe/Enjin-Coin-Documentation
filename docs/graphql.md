# Using GraphQL

Unlike REST APIs where there is a clearly defined structure of information returned from each endpoint, GraphQL always exposes one endpoint, allowing you to determine the structure of the data that is returned.

The result of each query will be formatted in the same way as the query itself.

In the following section we’re going to have a quick look into to GraphQL components.

## Operations

Query - A GraphQL query performs the READ operation and does not change data.

Mutation - To perform all other operations to modify data you will need mutations. You can think of mutations as CUD (Create, Update, Delete) in REST.

## Object Types

Object types are a collection of fields, which are used to describe the set of possible data you can query from the API.

```bash
query {
}
mutation {
}
```

## Fields

Fields are used to ask for specific properties in objects.

Each object has fields that can be queried by name in order to query for specific properties.

```bash
query {
   token {
      id
      >
   }
}
```

## Arguments

You can pass arguments to a query to determine the return value (eg. filtering search results) and narrow down the results to the specific ones you’re after.

In the following example, the object is “boards”, the requested field is “owner”, the argument is “ids”, and the argument value is 201781755.

## GraphQL visual interface - GraphiQL

One of the most powerful parts of GraphQL is its visual interface. GraphiQL is an in-browser tool for writing, validating, and testing GraphQL queries.

Before diving in and starting querying the API, it’s highly recommended to run your queries through the visual interface to make sure they are correct and the data being returned is the data you expect. GraphiQL is available in the Try It Yourself tab.

**You can use the following GraphiQL interfaces to interact with the Trusted Cloud:**

* **Kovan (Testnet)** Trusted Cloud (GraphiQL): [https://kovan.cloud.enjin.io/graphiql](https://kovan.cloud.enjin.io/graphiql)
* **Ethereum (Mainnet)** Trusted Cloud (GraphiQL): [https://cloud.enjin.io/graphiql](https://cloud.enjin.io/graphiql)

## Querying Enjin Object Types

Querying is the way to ask for data, it’s similar to the GET action in REST-based APIs.

In the following sections we’re going to discuss each of the object types you can query and the different data you can extract from each of them. Here is a list of the Enjin object types you can query through the API:
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

There are different types of Enjin object types that can be mutated through the API. In the following sections we’re going to dive into each of them, the different data you can mutate, and additional details about how to do so.

Here is a list of the Enjin object types that can be mutated:
* **EnjinApp:** An app on the Trusted Platform.
* **EnjinUser:** A user account.
* **EnjinRole:** A user role.
* **EnjinIdentity:** A user's identity for a game.
* **EnjinToken:** A blockchain asset.
* **EnjinRequest:** A transaction sent to the Trusted Platform.
