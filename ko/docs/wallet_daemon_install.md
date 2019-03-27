# Enjin 지갑 Daemon(데몬) 설치

여러 OS에 Enjin 지갑 데몬 어플리케이션을 설치할 수 있는 설명서 입니다. 이 문서를 활용하기 위해서는 최신 업데이트 OS와 명령 라인 및 시스템 관리에 대한 이해도가 필요합니다. 

또한 사용할 컴퓨터의 관리자 접근 권한 역시 필요 합니다.

## Windows 10

### Requirements 요약
* node.js
* Python 2
* Visual Studio Build Tools
* git

참고: <https://github.com/nodejs/node-gyp/#on-windows>

### Node.js 설치

공식 사이트 <https://nodejs.org/> 에서 node.js 11을 설치하세요. 그 후 관리자 명령 프롬프트에서 (Windows+R `cmd` run with ctrl-shift-enter):

```bash
npm install --global --production windows-build-tools
```

공식 사이트에서 git를 설치하세요: <https://git-scm.com/download/win>

### Wallet Daemon 설치하기

Wallet daemon 압축 파일을 [여기서](https://drive.google.com/open?id=1rR2675NHSKIGsODn-5h9KgYC78F6WHBo) 받으세요.

`Enjin-wallet-daemon-master.zip` 파일을 오른쪽 클릭한 후 "_Extract All..._"을 선택 하세요. 그리고 command line에 있는 (`<CODE_FOLDER>`에 압축을 푼 파일을 보관한 폴더명으로 대체해주세요):

```bash
cd <CODE_FOLDER>\enjin-wallet-daemon-master
npm install
```

## macOS

### Requirements 요약
* macOS command line developer tools
* node.js

### Homebrew 설치
```bash
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```

### Node.js 설치
```bash
brew install node
```

### Wallet Daemon 설치
```bash
unzip enjin-wallet-daemon-master.zip
cd enjin-wallet-daemon-master
npm install
```

## Linux (Debian 10 _Buster_)

### Requirements 요약
* build tools (gcc, make, etc.) build-essential
* git
* node.js
* unzip

### Node.js 설치
```bash
su -
apt install build-essential curl git unzip
curl -sL https://deb.nodesource.com/setup_11.x | bash -
apt install nodejs
```

### Wallet Daemon 설치
```bash
unzip enjin-wallet-daemon-master.zip
cd enjin-wallet-daemon-master
npm install
```

## Linux (Ubuntu Server 18.04 LTS)
### Requirements 요약
* build tools (gcc, make, etc.) build-essential
* node.js
* unzip

### Node.js 설치
```bash
sudo apt install unzip build-essential
curl -sL https://deb.nodesource.com/setup_11.x | sudo -E bash -
sudo apt install nodejs
```

### ### Wallet Daemon 설치
```bash
unzip enjin-wallet-daemon-master.zip
cd enjin-wallet-daemon-master
npm install
```

## All Platforms

### Wallet Daemon 실행하기_(New Wallet)_

Trust Cloud에서 계정을 열고 링크 코드를 받으세요 (예: XY1ABC). 아래 `<LINK_CODE>` 표시자에 그 코드를 입력해주세요.

```bash
node src/main.js account new
node src/main.js link <LINK_CODE>
node src/main.js
```
