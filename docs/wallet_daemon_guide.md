# Wallet Daemon Guide

## Decide which app you are working with, create a new user, and link to that app.

In order to work with the Trusted Cloud, a wallet needs to be linked to an app on
the platform and the wallet daemon needs it's own user/identity on the app.

Once you have an app created (or are using an existing app) you'll need a user
for the daemon to use and link to your game.

The instructions vary by platform so consult the [Unity Guide](./unity.md) or the [Platform API](./cloud_platform.md) guide on how to create a an apps and users and get a link code for the wallet.

Once you have the link code, execute the following:

`npm start link <CODE>`

Like a normal user, the daemon can link to multiple identities, but remember that you
can only have 1 identity per game.

## Start the wallet daemon

`npm start`

When you start, it will ask you for a password. This is to encrypt local storage,
including the private wallet key.

Upon start, you should see something like this:

```bash
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

The daemon is now active and will automatically watch the wallet and sign transactions as they come in. While there is a rules system to prevent simple abuse of the wallet you need to ensure that trade requests coming to your game are coming via a trusted source (typically a game server you control or via a secure in-app purchase mechanism). Never trust the game client directly.

## Watching the wallet daemon
You can use the ENJ mobile wallet to watch your wallet daemon wallet. You'll need the mobile
wallet installed on a compatible mobile device to do this. Once in the wallet, watch you wallet daemon Ethereum address like so:
1. WALLETS -> Manage WALLETS
2. Hit + and WATCH wallet
3. Enter a name for the wallet you want to watch.
4. Enter the ETH address of the wallet.

## Known Limitations
Currently, the wallet daemon only runs with a single address.

## Migrating from the mobile wallet to the wallet daemon.

If you started out using the mobile wallet, and want to migrate to the wallet daemon, you can
do so using the following process.

In your Enjin Mobile Wallet:
  1. In you ENJ Mobile Wallet, go to WALLETS, select the wallet you want to export
  and tap the selector in the top right and tap Backup Wallet.
  2. Enter Password.
  3. Tap COPY ETHEREUM KEYSTORE to copy the keystore.
  4. Email this file to yourself. (Don't worry, it's encrypted.)

On a PC:
  1. Save the keystore in a text file.
  2. Go to [My Ether Wallet](https://www.myetherwallet.com/)
  3. Select the network you are working on (Mainnet or Kovan)
  4. Click View Wallet Info.
  5. Select Keystore/JSON file.
  6. The keystore is encrypted, use **your wallet password** to decrypt.
  7. Click the eye beside the **Private Key unenecrypted** field. Copy this value.

On your wallet daemon installation:
  1. Backup your previous wallet, if any. `npm start backup <BACKUP_NAME>`
  2. Delete or rename `storage.json` in `%\AppData\Local\enjin-wallet-daemon`
  3. `npm start account import 0x<private key>`
  4. Did you prepend `0x` to your private key? You need that.
  5. Login via GraphQL or Unity.
  6. Unlink the wallet.
  7. Note the new link code.
  8. `npm start link <LINK CODE>`
  9. `npm start`

At this point you should see something like this:
```bash
[info] Enjin Wallet Daemon v0.2
[info] <account {"address":"0x160B6CE9b405a51745334126E0D3BE382AfFFBa4"}> created
[info] <account {"address":"0x160B6CE9b405a51745334126E0D3BE382AfFFBa4"}> nonce 319
[info] <storage> Saving storage to: C:\Users\dethm\AppData\Local\enjin-wallet-daemon\storage.json
[info] <wallet> Beginning to sign transactions.
[info] <identity {"id":400,"appId":65}> Fetching smart contract ABIs
[info] <storage> Saving storage to: C:\Users\dethm\AppData\Local\enjin-wallet-daemon\storage.json
[info] <identity {"id":400,"appId":65}> Fetched smart contract ABIs
[info] <identity {"id":400,"appId":65}> No transactions
```

To prevent potential nonce issues with the wallet, you should delete your wallet in the mobile app (make sure you have the 12 backup words just in case!). Nonce issues happen when multiple parties with the same private key try to sign transactions.

If you want to keep an eye on balances in the wallet app for your daemon, you can re-add the public wallet as a "Watched" wallet using the **public** key (ethereum address).
