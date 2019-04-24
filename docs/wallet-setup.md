# Getting Started with the Enjin Wallet

Congratulations on making it this far! By now you've completed [registering your game on the Trusted Cloud](registering-game.md) and are ready to begin using the Enjin Wallet app.

## Creating your Primary Wallet (Required)

### Install the Enjin Developer Wallet

Grab the latest version of the Enjin wallet from the Google Play store or with the APK [HERE](https://enjinwallet.io/apk.html). You'll need version
1.3.7.20316 or later to work with the platform with developer mode enabled.

Developer mode features are only available on Android currently. You can use an
emulator if you do not have access to an iOS device. See [here](https://forum.enjin.io/threads/link-not-available-in-ios-wallet.10/) for a quick how-to.

### Enable Developer Mode
To enable developer mode in the wallet, tap the version number located in the lower
right of the menu 10 times. Developer mode is needed in order to link to the Trusted Cloud and enable other developer related features and functions. Developer mode is only available
on the Android version of the wallet at this time.

### Create a wallet
If this is your first wallet, select Create Wallet option. If this is not your first
wallet hit the selector on the right, tap Manage Wallets, and tap the + symbol in the
lower right. Select Create Wallet.

Give the wallet a name, like "Master Wallet".

Select Ethereum (Kovan) and Enjin Coin (Kovan) for Coins. Tap Create Wallet.

![Enjin Select Coins](../docs/images/wallet_select_coins.png)

Enter a password for the wallet.

The wallet is created.

### Backup the Wallet
It is strongly recommended that you take a minute and back up your wallet using the 12 keywords. If you do NOT backup your wallet and your device is lost you will **NOT BE ABLE TO RECOVER** your cryptocurrency and items. You are warned!

![Enjin Backup Wallet](../docs/images/wallet_master_wallet.png)

### Fund the Wallet

The next step is to fund the wallet with ETH (Ethereum) and ENJ (Enjin Coin). ETH is used
to pay for transaction fees on the network, while ENJ is used as the digital casting material
to create your items. You'll need both to use the platform successfully and both are provided
for free on testnet.

Find your wallet address by tapping WALLETS. Tap either the ETH or ENJ entry. Then tap
RECEIVE in the top left. Copy this address.

![Enjin My Address](../docs/images/wallet_get_address.png)

Go to [Enjin Kovan Testnet Faucet](https://kovan.faucet.enjin.io/) and paste your address.

In a couple of minutes, you should have both Kovan ETH and ENJ in your wallet. You'll be
using the ETH and ENJ to pay for transactions and infusing your items with ENJ.

# Linking Your Wallet

Every user for your app requires an app identity which links users to your app,
along with their unique wallet address.

Identities are distinct from user ids, and are a way to decouple users from wallet
addresses. Identities are either linked, or unlinked. If they are linked, they
contain a valid Ethereum address. Unlinked identities have a like code like `BXXAZK`.
It is important to know that **there can only be one identity per user, per app/game.**
You cannot directly connect a user id to a wallet.

For example, user `bob` can link
his wallet `0xabcd`to the game `Space Monkies`, but cannot link multiple wallets to
that particular game.  If `bob` wants to use a different wallet with `Space Monkies`,
he will need to unlink the current wallet, and re-link with the new wallet.

An identity will automatically be created for new users if you set an app id in the `X-App-Id` cookie/header when creating the user.

To accept and sign any transactions, you will need to link your Enjin Wallet (Dev version) app to your identity. To do this, you will need to find your **Linking Code**.

You can find the link code with the following query:

```graphql
query viewIdentities{
  EnjinIdentities (
    pagination: {
      page: 1,
      limit: 50
    }
  ) {
    id
    app {
      name
    }
    linking_code
    enj_allowance
    ethereum_address
  }
}
```
You should be given a 6 character linking code to enter into your dev wallet app in the **LINKED APPS** section. Mainnet code starts with “A”, while Kovan starts with “B”. You will need to choose which wallet to link (if you have multiple wallets imported).

To reset your linked wallet, use the following query and replace the id with your identity_id. You can find this by using the query above.
```graphql
mutation unlinkWallet{
  DeleteEnjinIdentity (
    id: identity_id,
    unlink: true
  ) {
    linking_code
  }
}
```

## Approving ENJ
To prepare for item creation, you will need to pre-approve ENJ to the CryptoItems smart contract.  When linking your wallet for the first time an approve transaction will automatically be created for you to sign.  If you check the **NOTIFICATIONS** section of the wallet you should see and APPROVE ENJ transaction ready to sign.  Accept the transaction request to approve the ENJ.

By default the automatic approval transaction will approve the maximum amount of ENJ possible.  If you wish to change the pre-approval amount you will need to make sure you have set approval to 0 first before approving your actual value (use -1 for max ENJ possible). You do not need to multiply value by 10^18 for this request. You don’t need to do this if you have previously approved a sufficient amount of ENJ to use (i.e approved
wallet transaction above)

```graphql
mutation ApproveENJ{
  CreateEnjinRequest (
    identity_id: 1,
    type: APPROVE,
    approve_enj_data: {
      value: 0
    }
  ) {
    id,
    encoded_data
  }
}

mutation ApproveMAXENJ{
  CreateEnjinRequest (
    identity_id: 1,
    type: APPROVE,
    approve_enj_data: {
      value: -1
    }
  ) {
    id,
    encoded_data
  }
}
```

Once a successful request has been made, you will need to accept and sign the transaction in the **NOTIFICATIONS** section of your dev wallet.

# Creating Items

Your game is ready, your wallet is ready, and soon your items will be ready. In our next guide, we will walk you through the [process of creating items with Enjin](creating-items.md).
