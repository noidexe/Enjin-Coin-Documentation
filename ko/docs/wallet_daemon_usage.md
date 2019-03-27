# Enjin Wallet Daemon Usage - 엔진 지갑 데몬 사용법

## 파일

### Storage - 저장

Wallet Daemon 스토리지 파일은 다음 폴더 위치에 있습니다:

* Windows: `%LOCALAPPDATA%\enjin-wallet-daemon\storage.json`
* macOS: `$HOME\enjin-wallet-daemon\storage.json`
* Linux: `$HOME\enjin-wallet-daemon\storage.json`

### Logs

모든 Wallet Daemon 관련 액티비티는 다음 파일에 로그 되어 있습니다:

* Windows: `%LOCALAPPDATA%\enjin-wallet-daemon\enjin-wallet-daemon-<DATE>.json`
* macOS: `$HOME\enjin-wallet-daemon\enjin-wallet-daemon-<DATE>.json`
* Linux: `$HOME\enjin-wallet-daemon\enjin-wallet-daemon-<DATE>.json`

## Command List

* `account new`
* `account import <PRIVATE KEY>`
* `link <CODE>`
* `run`
* `backup <FILENAME>`
* `decrypt`
* `decrypt <FILENAME>`

## account new

이 지갑을 위해 새로운 계정을 생성하세요. 지갑은 기존 주소가 있으면 안됩니다. 만약 주소가 있을 경우, 이 명령은 아무 소용 없으며 에러가 발생합니다. 
 
새로운 지갑 주소를 생성하려면 저장 파일을 이동하거나 새로 이름 지어야 합니다.
 
예시: 

```bash
node src/main.js account new
```

## acount import

이 명령은 단일 인수를 사용 합니다: 지갑에 사용할 프라이벗 키. 사용할 프라이벗 키의 형태는 160 bit 16진법의 스트링이어야 하며 앞에 `0x`가 붙어야 합니다. 

예시:
```bash
node src/main.js account import 0x37986485ee024917a6cb7748c60d5d58214c7ca6e9a1d5d3880e2d94983012b7
```

## link

Wallet daemon(지갑 데몬)을 Trusted Cloud 아이덴티티와 연동하세요. 여러 다른 Trusted Cloud에서 여러개의 아이덴티티와 연결 가능합니다.

예시:
```bash
node src/main.js link B3DJF4
```

## run

Wallet daemon(지갑 데몬)을 실행하세요. 다른 커맨드가 없다면 이게 디폴트 명령입니다. 멈추거나 (Ctrl-C) 종료 되기 전까지 어플리케이션은 계속 작동됩니다.

예시:
```bash
node src/main.js run
```

## backup

현재 저장 파일을 지정한 위치에 복사하세요. 파일은 안전하게 암호화된 상태로 보관됩니다.

예시:
```bash
node src/main.js backup c:\users\timmy\dropbox\backup\enjin-wallet-daemon-storage.json
```

## decrypt

암호화된 저장 파일을 읽은 후 그 내용을 콘솔로 아웃풋/출력하세요. 만약 지정된 저장 파일이 없다면 디폴트 저장 파일을 읽습니다.

예시:
```bash
node src/main.js decrypt d:\backup\ewd-storage.json
node src/main.js decrypt
```
