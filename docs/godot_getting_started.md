# Getting Started

## Downloading The SDK

1. Open the AssetLib tab in Godot.
2. Search for `Blockchain SDK by Enjin`.
3. Select the asset name and click `Download` on the popup.
4. When download has completed click `Install...`, then click `Install` on the popup.
5. Click `OK`.

You may also find the [Godot SDK](https://godotengine.org/asset-library/asset/1968) on the asset library website.

You've now downloaded the SDK and are ready to start using it in your project!

## Setup And Run SDK Example

By default the example project is configured to connect to Enjin's hosted example server (hostname: enjinrun.demo.enjin.io), however, if you wish to host your own server there are a couple options available to you:

1. Running the server in Godot with an auto-load script. (see below)
2. Cloning the Godot SDK repository. (see below)
3. Running the Java SDK [platformer server example](https://github.com/enjin/enjin-java-sdk/tree/master/examples/platformer-server).

### Configuring The Server Auto-Load Script

Before we can run the example game you must add the `PlatformServer` script as an auto-load for your project.

1. Open the project settings: `Project > Project Settings`.
2. Switch to the `AutoLoad` tab.
3. Add `res://addons/enjin/example/scripts/server/PlatformerServer.gd` to the your auto-loads.
4. Enable the `PlatformServer` singleton.

### Cloning The Godot SDK

Alternatively you can clone the Godot SDK [repository](https://github.com/enjin/enjin-godot-sdk) and import it as a project in Godot.

### Creating A Project For The Example

To run the demo open and run the `res://addons/enjin/example/scenes/Game.tscn` scene. This will start the demo, creating a working directory in the root of your project. You will find a `config` folder that contains a `client.cfg` and `server.cfg`. Before you can run the game you will need to create a project on the [Enjin Platform (Kovan)](https://kovan.cloud.enjin.io) and create four assets for the items in the demo.

#### Create Example Project

1. [Register](https://kovan.cloud.enjin.io/signup) if you haven't already.
2. Select `Create Project` from the `Platform` page.
3. Give the project a name and description. The image is optional.
4. Click `Save Changes` to create the project.

#### Create Example Assets

You will need to do this four times for the following assets: shard, crown, key, and health upgrade.

1. Open your project by selecting it from the `Platform` page.
2. Go to `Assets` and click `Create Asset`
3. Set the name, total supply, value per asset, enj returned on melt, and the starting supply. All other settings can be left as the default.
4. Click `Create Asset`

#### Configuring The Example

Next we need to configure the `server.cfg` with the required details. You will need the id of the identity linked to your wallet, the id and secret of the project you created, and the ids of the assets you created.

##### Getting The Project ID And Secret

To get the id and secret of the project you created you can go [here](https://kovan.cloud.enjin.io/graphiql) and execute the following query:

```graphql
query {
  EnjinUser {
    apps {
      id
      name
      secret
    }
  }
}
```

##### Getting The Developer Identity ID

The following query can be used to get the id of the developer identity associated with your project:

```graphql
query {
  EnjinUser {
    identities {
      id
      appId
      wallet {
        ethAddress
      }
    }
  }
}
```

##### Getting The Asset IDs

You can find the IDs of the assets you created by going to the assets tab of your project. The IDs are under the `item id` column.

### Conclusion

Congratulations! You have now successfully created an project for the example and should now be able to run and play the example game.

Next: [Authentication](/docs/godot_authentication.md)
