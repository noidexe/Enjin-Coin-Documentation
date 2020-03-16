# Wallet Quickstart

As mentioned in the [Start Here Guide](./starthere.md), you will need at least one Enjin wallet to work with the platform. This guide shows you how to set up your primary wallet, but
also details how to set up a secondary wallet to use for your game service.

Your primary wallet uses the Enjin Developer Wallet Mobile App, and is used to
store the ENJ/ETH you are using to craft your cryptoitems, as well as assist in the creation
and minting operations. For example, you would use this wallet to create your in-game
currency, and any items you would want interactively.

The secondary wallet is an instance of our wallet deamon running on a secure server that you
control. This is a hot wallet that is used with your game at runtime to automate signing of
transactions dealing with cryptoitems for your game. You don't have to set up this wallet
right away, but if you do, you'll save some work moving items from your primary to
secondary wallets.

This guide assumes you are running on our Kovan testnet beta.

## Creating your Primary wallet (Required)

### Install the Enjin Developer Wallet

Grab the latest version of the developer wallet from [HERE](https://drive.google.com/open?id=17l8pSm2_1m8VF7dH1p9TIdjZDjSja4Tt).

### Create a wallet
If this is your first wallet, select Create Wallet option. If this is not your first
wallet hit the selector on the right, tap Manage Wallets, and tap the + symbol in the
lower right. Select Create Wallet.

Give the wallet a name, like Master Wallet.

Select Ethereum (Kovan) and Enjin Coin (Kovan) for Coins. Tap Create Wallet.

![Enjin Select Coins](../docs/images/wallet_select_coins.png)

Enter a password for the wallet.

The wallet is created.

### Backup the Wallet
It is highly recommended that you back up your wallet using the 12 keywords. If you
do NOT backup your wallet and your device is lost you will **NOT BE ABLE TO RECOVER** your
cryptocurrency and items.

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

In a couple of minutes, you should have both Kovan ETH and ENJ in your wallet. You are now ready to use the platform to make items!

## Creating the Secondary wallet (Optional)

This process can be completed at any time after creating your Primary wallet.

It is highly recommended that you create an secondary wallet on a secure server that you
control somewhere. This does not have to be on the same machine as your game server or
any other service. The secondary wallet will receive items that you mint from the primary
wallet, and will automatically sign incoming transactions without user intervention.

Once you secure a server you want to install the secondary wallet on, look at
[this guide](../docs/wallet_daemon_install.md) on how to install the wallet daemon on
that machine.

After installation, you'll want to use [this guide](../docs/wallet_daemon_first_steps.md)
to create your wallet and/or import a private key from another wallet. Go up to
the "Link To Trusted Cloud" step, as you will need to create a new user for the
Wallet Deamon later on.

![Wallet Daemon Create](../docs/images/wallet_daemon_create.png)

Fund the new Item Vault wallet using the [Enjin Kovan Testnet Faucet](https://kovan.faucet.enjin.io/) by pasting you new item vault address like you did with
your primary wallet.

You can use the ENJ mobile wallet to watch your Item Vault wallet. You'll need the mobile
wallet installed on a compatible mobile device to do this. Once in the wallet, watch you wallet daemon Ethereum address like so:

1. WALLETS -> Manage WALLETS.
2. Hit + and WATCH wallet.
3. Enter a name for the wallet you want to watch. i.e. Item Vault.
4. Enter the ETH address of the daemon wallet.

Now you can see the contents of the wallet daemon, but you can't actually use the
mobile app to sign any transactions, since the private keys reside with the daemon
itself.

## Next steps

Great! With your account set up, and funded wallet(s), you are ready to use the
Platform.

Check out the [Trusted Cloud Guide](./cloud_platform.md)
