# Registering Your Game

You understand what [item interactions on our Trusted Cloud](platform-architecture.md) look like, so you're ready to register a game of your own to work on.

First, you must sign up and subscribe [on the Enjin developer portal](https://feature-front-end.tp-enj.in/#/signup). This will give you an account and credentials to access the Trusted Cloud.

There are two separate TC servers, Testnet and Mainnet.

Testnet is a development version of the mainnet, where you can easily obtain fake Ethereum and Enjin Coin to test your items in a safe, simulated environment without using real cryptocurrency.

Mainnet is the real deal. You are using real Ethereum and EnjinCoin, so transactions
here cost real cryptocurrency. You should be very comfortable with your implementation on testnet before doing anything substantial on mainnet.

You can use the following GraphiQL browser interface to interact with the Trusted Cloud:

* **Kovan Trusted Cloud (GraphiQL):** [https://kovan.cloud.enjin.io/graphiql](https://kovan.cloud.enjin.io/graphiql)

## Browsing the Schema
On the right-side there should be a documentation panel to expand and browse for all the requests and parameters you can use. See [here](https://graphql.org/learn/queries/) for documentation on Queries and Mutations. Queries are requests for information from the
server, where Mutations are requests that modify server side data.

## Making a Request
On the (top) left panel, you would enter in your request to be made to the TC. Press the “Play” button at the top to submit that request, and you will receive a response on the right panel, sometimes a notification will appear in your dev wallet to sign a transaction depending on the request made.

## Creating Your User

  If you have not already signed up, you can create a user account directly in GraphiQL with the following mutation:

```
mutation createNewUser{
  CreateEnjinUser (
    name: "USERNAME",
    email: "EMAIL",
    password: "PASSWORD"
  ) {
    id
    name
    email
    access_tokens
  }
}
```

_Accounts are not shared between Kovan & Mainnet TP servers. You will need an account on each server if you want to use both platforms._

If you are an Admin user for an app you can also use the above mutation to create new users for your app, the new user's details will be emailed to the user on creation.

## Login and Authenticating Your Requests
You will need to **authenticate your requests** made via the TC. To authenticate your request, you will need an access token. Use this request to get your access token:

```
query login{
  EnjinOauth (
    email: "MY_ACCOUNT_EMAIL",
    password: "MY_ACCOUNT_PASSWORD"
  ) {
    id,
    name,
    email,
    access_tokens
  }
}
```

In your browser, [Chrome Instructions] open DevTools (F12), navigate to the **“Application”** tab, expand **“Cookies”** on the left panel and select the website. Create a new cookie called `enjin_session` and enter in your `access_token` from the login query as the value (cut and paste the key in quotes).

 If you have an app already you can send its app id in as a separate cookie/header called `X-App-Id`.  Some GraphQL queries and mutations require the app id cookie/header to be set so make sure you always include it.

![Trusted Cloud Cookie](./images/trustedplatform_cookie.png)

Once you have set up your **enjin_session** cookie, you can start working with
the platform in the GraphQL console.


## Creating Your App
You will need to create at least one App on the Trusted Cloud. An app is a central
container for all of your items and players. For example your app will appear as one of the “Collections” where your items will appear in the user’s wallet.

```
mutation createApp{
  CreateEnjinApp (
    name: "Doge",
    description: "Much apps. Such wow.",
    image: "/doge.jpg"
  ) {
    id
    name
    description
    image
  }
}
```

One important thing to know is your App ID. If you already created an app, but forget the id, you can look it up with the following query:

```
query apps {
  EnjinApps{
    id,
    name
  }
}
```

You will need a name, description and a link to a hosted image for your app. You should get the App ID in the response if it was successful. You can now use this App ID in your `X-App-Id` cookie. See **Authenticating your Requests** for info about setting this cookie.


# Next Steps

Your game is ready to go. It has a presence on the Trusted Cloud and we're almost at that exciting point where we can begin creating our own items. First, however, we need to make sure that you're ready with an [Enjin Wallet and the necessary resources](wallet-setup.md).
