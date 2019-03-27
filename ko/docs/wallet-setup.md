# Enjin 지갑 시작하기

여기까지 오셨다니 축하 드립니다! [Trusted Cloud에 게임 등록하기](registering-game.md)를 완료 하셨으니 이제 Enjin 지갑 앱을 사용할 차례입니다.

## 메인 지갑 생성하기 (필수)

### Enjin 개발자 지갑 설치하기

구글 플레이 스토어나 [여기](https://drive.google.com/open?id=1zKcWWweKaL8ITpabOZHI6IuU80g5LnHA)에서 Enjin 지갑 최신 버전을 다운 받으세요. 개발자 모드가 허용된 상태로 플랫폼에서 작업 하려면 버전 1.3.37777 이상이 필요합니다. 

개발자 모드 기능은 현재 안드로이드에서만 제공 됩니다. 만약 iOS 기기가 없다면 에뮬레이터를 사용하셔도 됩니다. 방법은 [여기](https://forum.enjin.io/threads/link-not-available-in-ios-wallet.10/)에 나와있습니다.

### 개발자 모드 허용하기

지갑에서 개발자 모드를 허용하려면 메뉴 아래 오른쪽에 위치한 지갑 버전 번호를 10번 탭해주세요. Trusted Cloud에 연동하고 다른 개발자 관련 기능을 허용하기 위해서는 개발자 모드가 필요합니다. 개발자 모드는 현재 안드로이드 버전에서만 가능 합니다.

### 지갑 생성하기

지갑 생성이 처음일 경우 '지갑 생성' 옵션을 선택하세요. 만약 처음이 아니시라면 오른쪽 선택창을 누르신 후 “지갑 관리" 를 탭 하시고, 오른쪽 아래에 있는 + 기호를 탭하세요. '지갑 생성' 을 선택하세요.

지갑에 이름을 지어주세요, 예를 들어 '마스터 지갑'.

코인 목록에서 '이더리움 (Kovan)' 그리고 '엔진코인 (Kovan)'을 선택해주세요. '지갑 생성' 을 탭하세요.

![Enjin 코인 선택하기](../docs/images/wallet_select_coins.png)

지갑 비밀번호를 입력해주세요.

지갑이 생성되었습니다.

### 지갑 백업하기

잠시 1분의 시간을 투자해서 꼭 지갑 12단어 복구문을 백업해주세요. 지갑을 백업하지 않은 상태에서 기기를 잃어버리면 지갑을 복구할 방법이 없습니다. 즉, 지갑에 담긴 모든 아이템과 암호화폐를 잃게 됩니다. 그러니 꼭!!! 꼭!!! 백업 하세요.

![Enjin 백업 지갑](../docs/images/wallet_master_wallet.png)

### 지갑에 자금 넣기

다음 단계는 지갑에 ETH(이더리움), ENJ (엔진코인)을 넣는 것입니다. ETH는 네트워크 트랜잭션 비용에 사용되고, ENJ는 아이템 생성시 필요한 디지털 재료로 사용됩니다. 플랫폼을 성공적으로 활용하기 위해서는 둘 다 필요하며 테스트넷에서는 둘 다 무료입니다.

WALLETS를 탭해서 지갑 주소를 찾으세요. ETH 나 ENJ entry 중 하나를 탭하신 후 왼쪽 위에 있는 RECEIVE를 누르세요. 주소를 복사하세요.

![Enjin 내 주소](../docs/images/wallet_get_address.png)

[Enjin Kovan Testnet Faucet](https://kovan.faucet.enjin.io/)에 가서 주소를 붙이세요. 

몇분 안에 Kovan ETH와 ENJ 둘 다 지갑 안에 들어옵니다. 이제 그 두 개로 트랜잭션 비용을 지불하고 아이템에 ENJ을 입힙니다.

# Linking Your Wallet

앱의 모든 사용자는 그 사용자를 앱에 연결해주는 앱 아이덴티티와 고유 지갑 주소가 필요합니다. 

아이덴티티는 사용자 ID와 별개이며 유저들을 지갑 주소에서부터 분리할 수 있는 방법입니다. 아이덴티티는 연결 (링크) 혹은 비연결 (언링크) 될 수 있습니다. 링크되면 유효한 이더리움 주소를 갖게 됩니다. 언링크 (비연결)된 아이덴티티는 `BXXAZK`와 같은 코드를 갖게 됩니다. 여기서 아셔야 할 중요한 것은 **하나의 앱/게임 당 한명의 유저 당 하나의 아이덴티티만** 가능하다는 것 입니다. 유저 ID를 지갑에 직접적으로 연결할 수 없습니다.

예를 들어 `철수` 라는 유저는 그의 지갑 `0xabcd`를 `Space Monkies`라는 게임에 연결할 수 있지만 여러개의 지갑을 그 게임에 연결할 수 없습니다. 만약 `철수`가 `Space Monkies`에 다른 지갑을 사용하고 싶다면 현재 연결된 지갑을 제거하고 새로운 지갑으로 다시 연결해야 합니다. 

유저를 생성할 때 `X-App-Id`쿠키/헤더에 앱 ID를 설정할 경우 신규 유저를 위한 아이덴티티는 자동적으로 생성됩니다.

트랜잭션을 수락하거나 서명하기 위해서는 Enjin 지갑 (개발자 버전)을 본인의 아이덴티티에 연결해야 합니다. 이를 수행하기 위해서는 본인의  **링크 코드/Linking Code** 를 찾아야 합니다. 

링크 코드는 다음 쿼리로 찾을 수 있습니다:

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

**LINKED APPS** 섹션에서 개발자 지갑 앱에 입력할 수 있는 6 글자의 링크 코드를 받게 됩니다. 메인넷 코드는 “A”로 시작하고 Kovan 코드는 “B”로 시작합니다. (한 개 이상의 지갑을 불러온 경우) 링크할 지갑을 선택해야 합니다. 

링크/연결된 지갑을 초기화 하기 위해서는 아래 쿼리를 사용하세요. Id를 본인의 identity_id로 대체하시면 됩니다. 이 부분은 위에 있는 쿼리를 사용해서 찾을 수 있습니다.

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

## ENJ 승인하기

아이템 생성을 위한 준비 과정으로는 CryptoItems 스마트 컨트랙트에 ENJ를 미리 승인해야 합니다. 처음 지갑을 연결하면 “승인" 트랜잭션이 자동으로 생기니 서명하시면 됩니다. 지갑의 **NOTIFICATIONS** 섹션을 확인하면 거기서 “APPROVE ENJ” 트랜잭션이 서명될 준비가 된 상태로 나타납니다. 트랜잭션 요청을 수락하신 후 ENJ을 승인하시면 됩니다.

자동화된 승인 트랜잭션은 디폴트로 최대 가능한 ENJ를 승인합니다. 만약 사전 승인 금액을 변경하고 싶다면 실제 가치를 승인하기 전 승인을 0으로 설정해야 합니다 (최대 가능한 ENJ으로 설정하려면 -1 사용). 이 요청을 위해서는 가치를 10^18로 곱할 필요가 없습니다. 예전에 이미 충분한 ENJ 금액을 승인했다면 이 작업을 안해도 됩니다 (예를 들어 위에 나온 지갑 트랜잭션 승인 내용).

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

성공적으로 요청이 되면 개발자 지갑의 **NOTIFICATIONS** 에서 트랜잭션을 수락 후 서명하시면 됩니다.

# 아이템 만들기

이제 게임이 준비 되었고, 지갑도 준비 되었고, 곧 아이템도 준비 될 예정입니다. 다음 가이드에서는 [Enjin으로 아이템 만들기](creating-items.md)를 설명하겠습니다.

