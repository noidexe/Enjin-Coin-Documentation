# What is the Wallet Daemon?

The wallet daemon is a tool that signs your blockchain transactions on your behalf.

As your game grows, it is possible that you may need to sign thousands of transactions per day using your Enjin wallet, which is impossible.

Even signing a small amount of transactions manually is more trouble than its worth.

The wallet daemon allows you to automate the signing process, so transactions are actioned instantly, creating an instant bridge between your game and the blockchain, and ensuring your players can enjoy a seamless and fluid gaming experience.

## Enjin Wallet Daemon Installation

Here are the instruction to install the Enjin Wallet Daemon application under various OSes. This document necessitates an up-to-date OS, and knowledge of the command line and system administration.

Administrator access to the target computer is required.

### Windows 10

#### Requirements Summary
* node.js
* Python 2
* Visual Studio Build Tools
* git

See <https://github.com/nodejs/node-gyp/#on-windows>

#### Install node.js

Install node.js 11 from the official website <https://nodejs.org/>. Then, in an administrator command prompt (Windows+R `cmd` run with ctrl-shift-enter):

```bash
npm install --global --production windows-build-tools
```

Install git from the official website <https://git-scm.com/download/win>

#### Install Wallet Daemon

Get the zip for the wallet daemon [HERE](https://cdn.enjin.io/downloads/enjin-wallet-daemon/latest).

Right-click `enjin-wallet-daemon-master.zip` and select "_Extract All..._" Then, in a command line (replace `<CODE_FOLDER>` with whatever folder you extracted the archive to):
```bash
cd <CODE_FOLDER>\enjin-wallet-daemon-master
npm install
```

### macOS

#### Requirements Summary
* macOS command line developer tools
* node.js

#### Install homebrew
```bash
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```

#### Install node.js
```bash
brew install node
```

#### Install Wallet Daemon
```bash
unzip enjin-wallet-daemon-master.zip
cd enjin-wallet-daemon-master
npm install
```

### Linux (Debian 10 _Buster_)

#### Requirements Summary
* build tools (gcc, make, etc.) build-essential
* git
* node.js
* unzip

#### Install node.js
```bash
su -
apt install build-essential curl git unzip
curl -sL https://deb.nodesource.com/setup_11.x | bash -
apt install nodejs
```

#### Install Wallet Daemon
```bash
unzip enjin-wallet-daemon-master.zip
cd enjin-wallet-daemon-master
npm install
```

### Linux (Ubuntu Server 18.04 LTS)
#### Requirements Summary
* build tools (gcc, make, etc.) build-essential
* node.js
* unzip

#### Install node.js
```bash
sudo apt install unzip build-essential
curl -sL https://deb.nodesource.com/setup_11.x | sudo -E bash -
sudo apt install nodejs
```

#### Install Wallet Daemon
```bash
unzip enjin-wallet-daemon-master.zip
cd enjin-wallet-daemon-master
npm install
```

### All Platforms

#### Run Wallet Daemon _(New Wallet)_
Open an account on the Trusted Cloud and get a link code (e.g. XY1ABC). Replace the `<LINK_CODE>` placeholder bellow with that code.

```bash
node src/main.js account new
node src/main.js link <LINK_CODE>
node src/main.js
```

## Enjin Wallet Daemon Usage

### Files

#### Storage

The Wallet Daemon storage file is located in the following folder:

* Windows: `%LOCALAPPDATA%\enjin-wallet-daemon\storage.json`
* macOS: `$HOME\enjin-wallet-daemon\storage.json`
* Linux: `$HOME\enjin-wallet-daemon\storage.json`

#### Logs

All Wallet Daemon activity is logged in the following files:

* Windows: `%LOCALAPPDATA%\enjin-wallet-daemon\enjin-wallet-daemon-<DATE>.json`
* macOS: `$HOME\enjin-wallet-daemon\enjin-wallet-daemon-<DATE>.json`
* Linux: `$HOME\enjin-wallet-daemon\enjin-wallet-daemon-<DATE>.json`

### Command List

* `account new`
* `account import <PRIVATE KEY>`
* `link <CODE>`
* `run`
* `backup <FILENAME>`
* `decrypt`
* `decrypt <FILENAME>`

### account new

Create a new account for this wallet. The wallet _must_ not already have an address. If it does, this command will do nothing and you will get an error.

If you want to create a new wallet address, you have to move or rename the storage file first.

Example:
```bash
node src/main.js account new
```

### acount import

This command takes a single argument: the private key to use with the wallet. The format of the private key must be a 160 bit hexadecimal string prefixed with `0x`.

Example:
```bash
node src/main.js account import 0x37986485ee024917a6cb7748c60d5d58214c7ca6e9a1d5d3880e2d94983012b7
```

### link

Connect the wallet daemon with a Trusted Cloud identity. You can link with many different identities, on many different Trusted Clouds.

Example:
```bash
node src/main.js link B3DJF4
```

### run

Start the wallet daemon. This is the default command if none is supplied. The application will keep running until it's stopped (Ctrl-C) or killed.

Example:
```bash
node src/main.js run
```

### backup

Copy the current storage file to the specified location. The file remains safely encrypted.

Example:
```bash
node src/main.js backup c:\users\timmy\dropbox\backup\enjin-wallet-daemon-storage.json
```

### decrypt

Read an encrypted storage file and output its content to the console. If no storage file is specified, the default storage is read.

Examples:
```bash
node src/main.js decrypt d:\backup\ewd-storage.json
node src/main.js decrypt
```

## Enjin Wallet Daemon First Steps

The Enjin Wallet Daemon is a utility that manages an Ethereum address linked to an Enjin Trusted Cloud identity. When a transaction is submitted on the Trusted Cloud, the wallet daemon receives that transaction, signs it, and sends it back to the Trusted Cloud.

### New Wallet Creation

This is the recommended way to initialize a Wallet Daemon.

Run `node src/main.js account new`
Notice the new wallet address is printed on the console.

**Keep a backup of your password somewhere safe! Otherwise there is no way to recover your account**

### Import Existing Private Key

#### From Enjin Wallet

The Enjin Wallet uses the Ledger (ETH) _HD derivation path_ (`m/44'/60'/0'`). You can use MyEtherWallet to rebuild your private key from the 12 word recovery phrase.

This method is _rather insecure_ and should only be used knowing that it exposes your private key to a website that could have been compromised. To mitigate the risk, it's highly recommended to deploy a private copy of MyEtherWallet from <https://github.com/kvhnuke/etherwallet/releases>

If you decide to go this route, click on "View Wallet Info" and follow the onscreen instructions:

* Mnemonic Phrase
* Pasting your 12 words and keeping the password field empty
* Selecting the _Ledger (ETH)_ derivation path
* Choosing the correct address from the suggestion list

#### From MetaMask

Go in account details and select "Export Private Key"

#### From Parity/Geth

Assuming your client installation uses the default data folders, the keys are stored there:

##### Parity

* Windows: `%HOMEPATH%/AppData/Roaming/Parity/Ethereum/keys`
* macOS: `~/Library/Application\ Support/io.parity.ethereum/keys`
* Linux: `$HOME/.local/share/io.parity.ethereum/keys`

##### Geth

* Windows: `%APPDATA%\Ethereum\keystore`
* macOS: `~/Library/Ethereum/keystore`
* Linux: `~/.ethereum/keystore`

Each key is stored in an extensionless json file. Here again, you can use "MyEtherWallet" to extract the private keys.

This method is _rather insecure_ and should only be used knowing that it exposes your private key to a website that could have been compromised. To mitigate the risk, it's highly recommended to deploy a private copy of MyEtherWallet from <https://github.com/kvhnuke/etherwallet/releases>

If you decide to go this route, click on "View Wallet Info" and follow the onscreen instructions:

* Keystore / JSON File
* Select your file, enter your password

### Link To Trusted Cloud

1. Create an account on the Trusted Cloud.
2. Create an identify for the application you want to control with the wallet daemon.
3. Copy the linking code from the identity `<CODE>`.
4. Run `node src/main.js link <CODE>`

### Run The Wallet Daemon
Run `node src/main.js`
