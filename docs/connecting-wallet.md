# Connecting Your Enjin Wallet

The Enjin wallet provides an intuitive signing process that makes it easy to execute complex blockchain operations via Enjin's smart contracts.

Most operations that involve a transfer of value or alteration of blockchain data or metadata will need to be authorized via the blockchain, which means an approval request will appear in your Enjin Wallet.

## Creating your Wallet

### Install the Enjin Developer Wallet

You can get the latest version of the Enjin Wallet on both Android and iOS from the Play Store and App Store

For Android devices, you can also install the app by [downloading the APK](https://enjinwallet.io/apk.html). 

You'll need version 1.3.7.20316 or later with developer mode enabled to communicate with the Enjin Platform.

### Enable Developer Mode
To enable developer mode in the wallet head to the settings screen and tap the version number in the bottom right corner 10 times. 

Developer mode is needed in order to link to the Trusted Cloud and enable other developer related features and functions. Developer mode is available on both Android (1.3.7) and iOS (1.3.0).

### Create a wallet
- If this is your first wallet, select the _Create Wallet_ option. 
- If this is not your first wallet hit the selector on the right, tap Manage Wallets, and tap the + symbol in the lower right. Then select _Create Wallet_.

Give the wallet a name that stands out, like "Master Wallet".

- If you are working on Testnet, select _Ethereum (Kovan)_ and _Enjin Coin (Kovan)_ for Coins. Then tap _Create Wallet_.
- If you are working on Mainnet, select _Ethereum_ and _Enjin Coin_ for Coins. Then tap _Create Wallet_.

![Enjin Select Coins](../docs/images/wallet_select_coins.png)

Enter a password for the wallet.

You have now successfully created a wallet.

### Backup the Wallet
It is imperative that you take a minute to save and protect your private keys (12 keywords). 

* If you do NOT backup your wallet and your device is lost you will **NOT BE ABLE TO RECOVER** your cryptocurrency and items. 
* If anyone else gains access to your private keys they will be able to steal your cryptocurrency and items.

![Enjin Backup Wallet](../docs/images/wallet_master_wallet.png)

### Get Your Ethereum Address
To Find your Ethereum address;
1. Tap _Wallets_. 
2. Tap either the _ETH_ or _ENJ_. 
3. Then tap _Receive_ in the top left. 
4. Copy this address.

_NOTE: Your Enjin Coin and all of your blockchain assets are running on Ethereum so they are also managed within the same address._

![Enjin My Address](../docs/images/wallet_get_address.png)

### Fund Your Wallet

To begin creating and managing your blockchain assets you need to pay for your necessary blockchain transactions using Ether and Enjin Coin.

Ether (ETH/KETH) is used to pay for transaction fees on the network, while Enjin Coin (ENJ/KENJ) is used to create and back your items. 

**Kovan Testnet:** To begin transacting on Testnet will need KETH (Kovan Ether) and KENJ (Kovan Enjin Coin). To receive these free resources, go to the [Enjin Kovan Testnet Faucet](https://kovan.faucet.enjin.io/) and input your Ethereum address.
**Ethereum Mainnet:** To begin transacting on Mainnet, you will need ETH (Ether) and ENJ (Enjin Coin). You can purchase these from a cryptocurrency exchange.

## Wallet Linking

Every user of your Enjin App or collection requires an app identity which allows you to identify them as the true owner of their Ethereum address.

Identities are distinct from user ids, and are a way to decouple users from wallet addresses. Identities are either linked, or unlinked. If they are linked, they contain a valid Ethereum address. Unlinked identities have a code like `BXXAZK` that users can sign into their Enjin Wallet to link their Ethereum address and prove that it's theirs.

It is important to know that **there can only be one identity per user, per app/game.**

You cannot directly connect a user id to a wallet.

For example, user `bob` can link his wallet `0xabcd`to the game `Space Monkies`, but cannot link multiple wallets to that particular game. If `bob` wants to use a different wallet with `Space Monkies`, he will need to unlink the current wallet, and re-link with the new wallet.

An identity will automatically be created for new users if you set an app id when creating the user.

### Linking Your Wallet

To authorize and sign any transactions, you will need to link your Enjin Wallet app to your identity. 

To do this, you will need to find your **Linking Code**.

You can find the link code with the following query:

[Identities](../examples/Identities.gql)

You should be given a 6 character linking code to enter into your dev wallet app in the **LINKED APPS** section. Mainnet code starts with “A”, while Kovan starts with “B”. You will need to choose which wallet to link (if you have multiple wallets imported).

To reset your linked wallet, use the following query.
[UnlinkIdentity](../examples/UnlinkIdentity.gql)

### Approving ENJ
Every time a successful request has been made to the blockchain, you will need to accept and sign the transaction in the REQUESTS section of your dev wallet.

Since creating transactions will usually cost Enjin Coin or Ether, to prepare for future expendature you will need to pre-approve the Enjin Smart Contract to create transactions on your behalf.  

When linking your wallet for the first time an approve transaction will automatically be created for you to sign.  

You need to check the _Requests_ section of the wallet, where you should see an _APPROVE ENJ_ transaction request. You must accept this  request to allow the Enjin Smart Contract to do its work.

### Setting Approval Limits
By default, your approval transaction value will be set to the maximum amount of ENJ possible.

In GraphQL this Max approval amount represented by _-1_ in the _value_ field.

If you wish to change the pre-approval amount you would need to make sure that you have set the spending approval value to _0_ first, before approving any value that is different from the default. 

[ApproveENJ](../examples/ApproveENJ.gql)

Once you have set the value to _0_ you can proceed to set your Max ENJ spend to whatever amount you want. 

For example _100_ (ENJ) or _1000_ (ENJ). 

This could protect you from accidentally overspending while minting batches of blockchain assets.
