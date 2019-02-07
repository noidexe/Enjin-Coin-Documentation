# Using Enjin Items in Your Unity Game

Now that you've [created your items](creating-items.md), it's time to walk through the Unity SDK and how to implement it with your project. By now you should have set up your Trusted Cloud account, created your app, funded and linked your wallet, and be ready to proceed with the Unity SDK.

# The Simple Game

To begin exploring the Unity SDK more thoroughly, we're going to look at an example of a very simple game. Included in the Unity SDK is an example under the _Assets > Enjin > Enjin SDK > Simple Game_ directory. Included in that direcory is a scene configured as a simple clicker-style game, and a _Game.cs_ file which demonstrates use of the Unity SDK.

# Required Information

To get this game working with your own tokens that you've created, you'll need to update some configuration options in _Game.cs_. Namely, you'll want to update the configuration variables at the top of the file.

```
private string platformURL = "https://kovan.cloud.enjin.io/";
private string developerUsername = YOUR_EMAIL_HERE;
private string developerPassword = YOUR_PASSWORD_HERE;
private int developerIdentityId = YOUR_IDENTITY_ID_HERE;
private string rewardTokenId = YOUR_TOKEN_ID_HERE;
```

Once these fields have been populated, the game should be configured to reward clickers with the token of your choosing.

# More Resources

Many of the Unity SDK methods are also available as direct GraphQL calls in our [live documentation](https://github.com/enjin/Enjin-Coin-Documentation/tree/master/live_query). The live documentation is a good resource for more in-depth examples of interacting directly with GraphQL on the Trusted Cloud.
