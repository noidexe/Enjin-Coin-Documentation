# Wallet Daemon Guide

## What is the wallet daemon?
The ENJ wallet daemon is a node.js based server side wallet that automates
transaction signing in your game. without having to use the mobile wallet. You
should run this daemon on a secure server that is not the same as your primary
game servers.

## Prerequisites
You'll need to install node.js and python 2.7 to use the wallet deamon.

[Node.js](https://nodejs.org/en/download/)

[Python 2.7](https://www.python.org/download/releases/2.7/)

## Setup
1. Clone the repository:

`git clone https://github.com/enjin/enjin-wallet-daemon.git`

2. Inside the `enjin-wallet-daemon` folder:

`npm install`

3. You should now be ready to test with the wallet daemon.

TODO: Update with final setup instructions later.

## Creating a new Wallet

`npm start account new`

## Decide which app you are working with, and link to that app.

All developer wallets need to be linked to an app in the ENJ platform.

Once you have an app created, you'll need to get a link code to link the wallet
to this app.

The instructions vary by platform so consult the [Unity Guide]() or the [Platform API]()
guide on how to create an app and get a link code for the wallet.

Once you have the link code, execute the following:

`npm start link <CODE>`

## Start the wallet daemon

`npm start`

When you start, it will ask you for a password. This is to encrypt local storage,
including the private wallet key.

Upon start, you should see something like this:

```
> enjin-wallet-daemon@1.0.0 start C:\Users\dethm\Documents\Projects\Enjin\enjin-wallet-daemon
> node ./src/main.js

Logging to C:\Users\dethm\AppData\Local\enjin-wallet-daemon\enjin-wallet-daemon-2018-11-16T16-40-27.857Z.log
Password:
[info] Enjin Wallet Daemon v0.2
[info] <account {"address":"0xE6745983B5e3b3911f9Dab5E984bF0768A5167DC"}> created
[info] <account {"address":"0xE6745983B5e3b3911f9Dab5E984bF0768A5167DC"}> nonce 14
[info] <storage> Saving storage to: C:\Users\dethm\AppData\Local\enjin-wallet-daemon\storage.json
[info] <wallet> Beginning to sign transactions.
[info] <identity {"id":266,"appId":45}> Fetching smart contract ABIs
```

The daemon is now active and will automatically watch the wallet and sign transactions as they come in. While there is a rules system to prevent simple abuse of the wallet you need to ensure that trade requests coming to your game are coming via a trusted source (typically a game server you control). Never trust the game client directly.

## Monitoring the wallet
You can use the ENJ mobile wallet to watch your wallet daemon wallet. You'll need the mobile
wallet installed on a compatible mobile device to do this. Once in the wallet, watch you wallet daemon Ethereum address like so:
1. WALLETS -> Manage WALLETS
2. Hit + and WATCH wallet
3. Enter a name for the wallet you want to watch.
4. Enter the ETH address of the wallet.

## Rules system

## Known Limitations
Currently, the wallet daemon only runs with a single identity (AppID + ethereum address combination).
