# Wallet Daemon 가이드

## 어느 앱으로 작업할지 정하세요. 신규 유저 생성 후 앱에 연결하세요.

Trusted Cloud로 작업하려면 플랫폼에 있는 앱과 연결된 지갑이 필요합니다. 또한, 앱에서 지갑 데몬은 고유 유저/아이덴티티가 필요 합니다. 

앱을 만든 후 (혹은 기존 앱을 사용할 경우) 데몬이 사용할 수 있고 게임에 연결할 수 있는 유저가 필요합니다.

플랫폼마다 설명이 다를 수 있으니 앱 생성과 지갑 링크/연결 코드를 얻는 방법에 대해서는 [Unity Guide](./unity.md) 혹은 [Platform API](./cloud_platform.md) 가이드 참고 부탁 드립니다.

링크 코드가 있다면 다음 작업을 진행하세요:

`npm start link <CODE>`

일반 유저처럼 지갑 데몬은 여러 아이덴티티에 연결 가능합니다. 하지만 게임 당 아이덴티티 하나만 가능하다는 점을 기억해주세요.

## 지갑 데몬 시작하기

`npm start`

시작할때 비밀번호를 요청하는 이유는 프라이벗 지갑 키를 포함한 로컬 스토리지를 암호화하기 위해서 입니다.

시작 시 다음과 같은 내용이 나타납니다:

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


이제 데몬은 활성화 됐고 자동으로 지갑을 모니터링하고 들어오는 트랜잭션을 서명합니다. 지갑 남용을 방지하기 위한 규칙 시스템이 있지만, 게임으로 오는 거래 요청이 신뢰할 수 있는 곳에서 온다는 것을 보장해야 합니다 (주로 관리하는 게임 서버나 안전한 인게임 구매 메커니즘 등). 게임 클라이언트를 절대 직접적으로 믿지 마세요.

## 지갑 데몬 지켜보기

ENJ 모바일 지갑으로 지갑 데몬을 지켜볼 수 있습니다. 그러기 위해서는 호환되는 모바일 기기에 모바일 지갑을 설치해야 합니다. 지갑 앱을 연 후, 다음 단계를 통해 지갑 데몬의 이더리움 주소를 관찰하세요:

1. WALLETS -> Manage WALLETS (지갑 -> 지갑 관리)
2. Hit + and WATCH wallet (+을 탭한 후 지갑 관찰)
3. Enter a name for the wallet you want to watch. (지켜보고 싶은 지갑 이름 입력)
4. Enter the ETH address of the wallet. (지갑의 ETH 주소 입력)

## 제한사항 
현재 지갑 데몬은 단일 주소로만 실행됩니다

## 모바일 지갑에서 지갑 데몬으로 이동하기 

모바일 지갑에서 지갑 데몬으로 이동하고 싶다면 다음 순서를 따르세요.

Enjin 모바일 지갑에서:
  1. Enjin 모바일 지갑 -> WALLETS에 가서 내보낼 지갑을 선택한 후 오른쪽 상단 선택 기능을 누른 후 백업 지갑을 탭하기
  2. 비밀번호 입력  
  3. 키스토어 복사를 위해 COPY ETHEREUM KEYSTORE을 탭하기.
  4. 파일을 자신에게 이메일로 보내기 (암호화된 파일이니 염려 마세요)

PC에서:
  1. 키스토어를 텍스트 파일로 저장하세요
  2. [My Ether Wallet](https://www.myetherwallet.com/)로 가세요
  3. 작업하고 있는 네트워크를 선택하세요 (메인넷 혹은 Kovan)  
  4. View Wallet Info (지갑 정보 보기)를 클릭하세요
  5. 키스토어/JSON 파일을 선택하세요
  6. 키스토어는 암호화 됐으니 **개인 지갑 비밀번호로** 해독하세요
  7. **암호화 되지 않은 프라이벗 키** 필드 옆에 있는 eye를 클릭하세요. 이 값을 복사하세요. 

지갑 데몬 설치에서: 
  1. 기존 지갑이 있을 경우 백업하세요 `npm start backup <BACKUP_NAME>`
  2. `%\AppData\Local\enjin-wallet-daemon`에 있는 `storage.json` 을 삭제하거나 이름을 새로 지으세요
  3. `npm start account import 0x<private key>`
  4. 프라이벗 키 앞에 `0x` 을  추가해야 합니다  
  5. GraphQL 혹은 Unity로 로그인하세요
  6. 지갑을 언링크/비연결 하세요 
  7. 새로운 링크 코드를 적으세요 
  8. `npm start link <LINK CODE>`
  9. `npm start`

이쯤에 다음과 같은 내용이 나타납니다: 
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

지갑의 논스 이슈를 예방하기 위해 모바일 앱 지갑을 삭제하세요 (혹시 모르니 꼭 12 백업 복구문을 따로 적어놓으세요). 다수의 사람들이 같은 프라이벗 키로 트랜잭션을 서명하려고 할 때 논스 이슈가 발생합니다.

지갑 데몬 잔고를 모니터링하고 싶다면  **퍼블릭** 키 (이더리움 주소)를 사용해서 퍼블릭 지갑을 "관찰 중인" 지갑으로 다시 추가할 수 있습니다.
