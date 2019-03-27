# Trusted Cloud 소개

Trusted Cloud는 ENJ이 제공하는 백엔드 서비스로 당신의 게임을 이더리움 네트워크에 연결하는 역할을 합니다. TC는 허브 역할을 하면서 클라이언트의 및 게임 서버의 요청들을 저장, 이더리움 스마트 컨트랙트와 연계, 그리고 저장된 데이터를 당신의 게임으로 보내는 기능을 수행합니다. 또한, 당신의 게임을 이용하는 유저들의 게임 어카운트 정보와 (스팀 ID, XBox Live ID 등…) 그들의 블록체인 정보(예를 들면 지갑 주소같은)를 연결합니다.

우리의 서비스를 이용하기 위해서는 API를 통해서 GraphQL을 사용하거나 GraphiQL 같은 콘솔을 이용해야 합니다. 만약 GraphQL에 익숙하지 않다면, 이 [소개자료](https://graphql.org/learn/)를 보시고 언어를 쓰는 법을 배워보세요.

TC 서버에는 테스트넷과 메인넷, 두개의 서버가 존재합니다.

테스트넷은 메인넷의 개발버전 입니다. 그래서 당신은 진짜 암호화폐 말고 가상의 이더리움이나 엔진 코인을 이용하여 실제와 같은 환경에서 당신의 아이템을 테스트 하는데 사용할 수 있습니다. 

메인넷은 진짜 존재하는 곳입니다. 당신은 진짜 이더리움과 엔진 코인을 사용해야 하며 이곳에서 일어나는 트랜잭션에서 발생하는 비용은 실제 암호화폐로 지불합니다. 메인넷에서 무언가를 하기 전에 테스트넷에서 충분히 편해질 정도로 연습을 해보는 것이 좋습니다. 

아래 GraphiQL 브라우저 인터페이스를 사용하여 Trusted Cloud를 연결해보세요 

* **Kovan Trusted Cloud (GraphiQL):** [https://kovan.cloud.enjin.io/graphiql](https://kovan.cloud.enjin.io/graphiql)

## Schema 브라우징
오른쪽에는 모든 요청 및 매개 변수를 확장하고 검색할 수 있는 문서 패널이 있을것입니다. 쿼리(Queries)와 뮤테이션(Mutation)에 대한 자세한 내용은 [여기](https://graphql.org/learn/queries/)를 참조하십시오. 쿼리는 서버에 정보를 요청하는 것이며, 뮤테이션은 서버 측 데이터를 수정하는 요청입니다.

## 요청하기
왼쪽(상단) 패널에서 TC에 대한 요청을 입력합니다. 해당 요청을 제출하려면 상단에 있는 "Play" 버튼을 누릅니다. 누르게 되면 오른쪽 패널에 응답이 수신되며, 요청에 따라 트랜잭션을 서명하기 위한 알림이 개발 지갑에 표시되는 경우도 있습니다.

## 사용자 생성
  아직 등록하지 않은 경우 다음과 같은 뮤테이션으로 GraphiQL에서 직접 사용자 계정을 생성할 수 있습니다:

```graphql
mutation createNewUser{
  CreateEnjinUser (
    name: "USERNAME",
    email: "EMAIL",
    password: "PASSWORD"
  ) {
    id
    name
    email
    access_tokens
  }
}
```

_계정은 Kovan과 메인넷 TP 서버 간에 공유되지 않습니다. 두 플랫폼을 모두 사용하려면 각 서버에 계정이 필요합니다._

앱의 관리자인 경우 위의 뮤테이션을 사용하여 앱의 새 사용자를 생성할 수 있습니다. 새로운 유저의 세부 정보는 생성과 동시에 해당 유저에게 이메일로 전송됩니다.

## 로그인 및 요청 인증하기
TC를 통해 **요청을 인증** 해야 합니다. 요청을 인증하려면 액세스 토큰이 필요합니다. 이 요청을 사용하여 액세스 토큰을 얻을 수 있습니다:

```graphql
query login{
  EnjinOauth (
    email: "MY_ACCOUNT_EMAIL",
    password: "MY_ACCOUNT_PASSWORD"
  ) {
    id,
    name,
    email,
    access_tokens
  }
}
```

브라우저에서, [Chrome Instructions] 에서 DevTools (F12)를 열고, **“Application”** 탭으로 이동한 후, 왼쪽 패널에서 **“Cookies”** 를 확장하고 웹사이트를 선택합니다. `enjin_session`이라는 새로운 쿠키를 만들고 로그인 쿼리에서 `access_token`을 값으로 입력합니다. (키 전체 복붙하기).

 이미 앱이 있는 경우 앱 ID를 `X-App-Id`라는 별도의 쿠키/헤더로 전송할 수 있습니다. 일부 GraphQL 쿼리 및 뮤테이션은 앱 ID 쿠키/헤더를 필수적으로 설정해야 하므로 이를 항상 포함시키도록 합니다.

![Trusted Cloud Cookie](./images/trustedplatform_cookie.png)

**enjin_session** 쿠키 설정이 완료되면, GraphQL 콘솔에서 플랫폼 작업을 시작할 수 있습니다.


## 앱 만들기
Trusted Cloud에 하나 이상의 앱을 만들어야합니다. 앱은 모든 아이템과 플레이어의 중앙 컨테이너 역할을 합니다. 예를 들어 당신의 앱은 당신의 아이템이 들어있는 유저의 지갑에 ‘Collections’중 하나로 표시됩니다.

```graphql
mutation createApp{
  CreateEnjinApp (
    name: "Doge",
    description: "Much apps. Such wow.",
    image: "/doge.jpg"
  ) {
    id
    name
    description
    image
  }
}
```

중요하게 알아 두어야 할 것은 앱 ID입니다. 이미 앱을 만들었지만, 이 ID를 잊어버린 경우 다음 쿼리를 사용하여 찾을 수 있습니다:

```graphql
query apps {
  EnjinApps{
    id,
    name
  }
}
```

앱에 호스팅된 이미지에 대한 이름, 설명 및 링크가 필요합니다. 성공한 경우 App ID를  얻을 수 있습니다. 이제 이 App ID를 `X-App-Id` 쿠키에서 사용할 수 있습니다. 이 쿠키 설정에 대한 정보는 **요청 인증하기** 를 참조하시길 바랍니다.

## 지갑 연결하기

앱을 사용하는 모든 사용자는 고유 지갑 주소와 사용자를 앱에 연결하는 앱 ID가 필요합니다.,

이 ID는 사용자ID와 구별되며 사용자를 지갑 주소에서 분리할 수 있는 방법입니다. ID는 연결되거나 연결 해제될 수 있습니다. ID가 만약 연결이 되어 있으면 유효한 이더리움 주소를 포함합니다. 결 해제 된 ID는 `BXXAZK`같은 코드를 갖고 있습니다.
**유저나 앱/게임당 하나의 ID만** 존재합니다. 
사용자 아이디는 지갑에 직접 연결할 수 없습니다.

예를 들어, 사용자 `bob`은 그의 지갑 `0xabcd`를 `Space Monkies`라는 게임에 연결할 수 있습니다. 
하지만 여러 개의 지갑을 특정 게임에 연결할 수는 없습니다. 
만약 `bob`이 `Space Monkies`에서 다른 지갑을 사용하고 싶으면,
현재 지갑 연결을 해제하고 새 지갑과 다시 연결해야 합니다.

앱 ID를 `X-App-Id` 쿠키/헤더에 설정하면 새로운 사용자를 생성 할 때 해당 유저에 대한 ID가 자동으로 생성됩니다. 

트랜잭션을 수락하고 서명하려면 엔진 지갑 (개발자 버전) 앱을 ID에 연결해야 합니다. 이를 위해서는 **Linking Code**를 찾아야 합니다.

다음 쿼리를 사용하여 링크 코드를 찾을 수 있습니다:

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
**LINKED APPS** 섹션에서 개발자 지갑 앱에 들어가려면 6 문자의 링크 코드가 주어져야 합니다. 메인넷 코드는 “A”로 시작하고 Kovan은 “B”로 시작됩니다. 그리고 어떤 지갑을 연결할지 선택해야 합니다 (불러온 지갑이 여러 개인 경우).

링크 된 지갑을 재설정하려면 다음 쿼리를 사용하면 되고 id는 당신의  identity_id로 바꿉니다. 이는 위의 쿼리를 사용하여 찾을 수 있습니다.
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
아이템 생성을 준비하려면 ENJ을 CryptoItems 스마트 컨트랙트에 사전 승인해야 합니다.  지갑을 맨 처음 연결할 때는 서명 할 수 있는 승인 트랜잭션이 자동으로 생성됩니다.  지갑의 **NOTIFICATIONS** 섹션을 확인하면 바로 서명할 수 있는 APPROVE ENJ 트랜잭션을 보실 수 있습니다. 트랜잭션 요청을 수락하여 ENJ을 승인합니다.

기본적으로 자동 승인 트랜잭션은 가능한 최대 ENJ의 양을 승인합니다.  사전 승인 금액을 변경하려면 실제 가치를 승인하기 전에 승인을 0으로 설정해야합니다 (가능한 최대 ENJ에는 -1 사용). 이 요청에는 10 ^ 18의 값을 곱할 필요가 없습니다. 이전에 사용하기에 충분한 양의 ENJ를 승인한 경우(예를 들면, 위에서 승인된 지갑 거래) 이 작업은 수행할 필요가 없습니다.

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

요청이 성공적으로 이루어지면 개발자 지갑의 **NOTIFICATIONS** 섹션에서 거래를 수락하고 서명해야합니다.

## 아이템 만들기

아이템을 만드는 것은 아이템을 민팅할때 사용하는 템플렛을 만드는 것과 같습니다. 아이템을 만들려면 원하는 아이템 속성값을 요청해야 합니다. 다음은 그 예입니다:

```graphql
mutation createTokenRequest{
  CreateEnjinRequest (
    identity_id: 1,
    type: CREATE,
    create_token_data: {
      name: "ITEM_NAME",
      totalSupply: 100,
      initialReserve: 50,
      supplyModel: FIXED,
      meltValue: "15000000000000000000",
      meltFeeRatio: 1250,
      transferable: PERMANENT,
      transferFeeSettings: {
        type: PER_TRANSFER,
        token_id: "0",
        value: "1000000000000000000"
      }
      nonFungible: false
    }
  ) {
    id,
    encoded_data
  }
}
```

속성 | 설명
---|---
총 공급량 | 아이템 총 공급량
초기 예치금 | 아이템 초기 예치금. 이 예치금은 승인된 ENJ이 필요합니다.
공급 모델 | 아이템 공급 모델. FIXED, SETTABLE, INFINITE, COLLAPSING, ANNUAL_VALUE, ANNUAL_PERCENTAGE.
멜팅 가치 | 아이템의 ENJ 값. 18개의 소수점을 포함하려면 값을 10^18만큼 곱해야 합니다. 초기 예치금을 토대로 계산되는 새 아이템에 필요한 최소 멜팅 값이 있습니다. 이 TP 엔드 포인트를 사용하여 주어진 예치금 대비 최소 금액을 찾을 수 있습니다: `/api/v1/ethereum/get-min-melt-value/{iniitalReserve}` e.g. [https://kovan.cloud.enjin.io/api/v1/ethereum/get-min-melt-value/1000000](https://kovan.cloud.enjin.io/api/v1/ethereum/get-min-melt-value/1000000)
멜팅 수수료 비율 | 아이템 생성자에게 돌아가는 멜팅 가치 비율 (최대 50%까지), 2 소수점 이하. 백분율에 100을 곱해야 합니다. 즉 12.5%는 1250이 됩니다. 
전송 가능한 | 전송 유형. PERMANENT, TEMPORARY, BOUND.
전송 수수료 세팅 - 유형 | 전송 수수료 유형. NONE, PER_TRANSFER, PER_CRYPTO_ITEM, RATIO_CUT, RATIO_EXTRA, TYPE_COUNT.
전송 수수료 세팅 - token_id | 전송 수수료로 사용할 아이템의 토큰 ID입니다. 엔진 코인은 0을 사용하십시오.
전송 수수료 세팅 - 가치 | 전송 수수료의 금액. ENJ를 사용하는 경우 값을 10 ^ 18로 곱하면 18 개의 소수를 포함 할 수 있습니다.
대체 불가능 | 아이템이 대체 불가능 혹은 가능한 지, true or false로 설정합니다.

[Unity Guide](./unity.md)의 "Creating Items" 섹션을 참조하여 아이템 속성과 작동 방식에 대해 자세히 알아보십시오.

요청이 성공적으로 이루어지면 개발자 지갑의 **NOTIFICATIONS** 섹션에서 거래를 수락하고 서명해야합니다. 트랜잭션이 성공하면 아이템 템플릿이 만들어지고 아이템 ID를 찾아 민팅을 진행할 수 있습니다. 


## 토큰 ID 찾기 (및 추가 정보)

아이템 트랜잭션이 이루어지면 엔진X를 통해 토큰 ID를 찾거나 Trusted Cloud에서 아이템을 검색 할 수 있습니다. 먼저 컨펌을 기다리고 블록체인에서 스크랩 해야 합니다.

참고 : TP가 아닌 블록체인을 통해 토큰 ID를 찾으면 정수 형식이됩니다. 이 숫자를 16 진수로 변환하고 결과 값의 '상위' 32 비트를 취해야합니다. 이는 Base Token ID를 뜻합니다. 이는 많은 GraphQL 뮤테이션에서 사용할 수 있습니다. [Rapid Tables](https://www.rapidtables.com/convert/number/decimal-to-hex.html)과 같은 서비스를 사용하여 이를 수행 할 수 있습니다.

```graphql
query viewTokens{
  EnjinTokens (
    name: "ITEM_NAME",
    pagination: {
      page: 1,
      limit: 50
    }
  ) {
    token_id
    name
    creator
    meltValue
    meltFeeRatio
    meltFeeMaxRatio
    supplyModel
    totalSupply
    circulatingSupply
    reserve
    transferable
    nonFungible
    blockHeight
    markedForDelete
    created_at
    updated_at
    availableToMint
    itemURI
  }
}
```
해당 아이템을 검색하려면 `ITEM NAME`을 입력하십시오. 또는 이름 매개 변수없이 요청을 하면 앱의 모든 아이템을 반환 할 수 있습니다.

## 아이템 민팅

아이템 민팅은 CREATE 단계에서 만든 템플릿을 사용하여 블록체인에 있는 일부 아이템을 인스턴스화합니다. 대체 가능 아이템(FIs)과 대체 불가능한 아이템(NFI)에 대한 요청은 약간 다릅니다. 원하는 경우 여러 주소에 배치 할 수 있습니다. 차이점은 여러 개의 NFI를 작성해야 할 경우 개별 아이템마다 지갑 주소를 지정해야한다는 것입니다. 이상적으로 단일 거래에서 100 개 이상의 NFI를 발행하는 것은 피하는 것이 좋습니다. FI에는 이러한 제한이 없습니다. 다음은 FI와 NFI의 두 가지 아이템 유형간에 동일한 요청입니다.

**FI:**
```graphql
mutation mintFungibleItems {
  CreateEnjinRequest (
    identity_id: 1,
    type: MINT,
    mint_token_data: {
      token_id: "TOKEN_ID",
      recipient_address_array: [
        "WALLET_ADDRESS_1","WALLET_ADDRESS_2"
      ]
      value_array: [
        5,3
      ]
    }
  ) {
    id,
    encoded_data
  }
}
```
이 요청은 “WALLET_ADDRESS_1”에 5개 아이템을 민팅하고, “WALLET_ADDRESS_2” 에 3가지 아이템을 민팅합니다. 아이템 `INITIAL RESERVE`만큼 민팅할 수 있습니다. 

**NFI:**
```graphql
mutation mintNonFungibleItems {
  CreateEnjinRequest (
    identity_id: 1,
    type: MINT,
    mint_token_data: {
      token_id: "TOKEN_ID",
      token_index: "0",
      recipient_address_array: [
        "WALLET_ADDRESS_1",
        "WALLET_ADDRESS_1",
        "WALLET_ADDRESS_1",
        "WALLET_ADDRESS_1",
        "WALLET_ADDRESS_1",
        "WALLET_ADDRESS_2",
        "WALLET_ADDRESS_2",
        "WALLET_ADDRESS_2"
      ]
    }
  ) {
    id,
    encoded_data
  }
}
```
이 요청은 “WALLET_ADDRESS_1”에 5개 아이템을 민팅하고 “WALLET_ADDRESS_2” 에 3개의 아이템을 민팅합니다.

요청이 성공적으로 이루어지면, 개발자 지갑 “NOTIFICATIONS” 섹션에서 트랜잭션을 동의하고 사인해야 합니다. 

## URI (아이템 메타 데이터) 설정
아이템 메타 데이터는 선택 사항이지만 엔진 지갑(및 기타 엔진 서비스)에서 이미지 및 사용자 정의 아이템 속성을 표시하려면 일부 메타 데이터를 설정해야합니다.

아이템을 메타 데이터 파일에 연결하려면 공개 읽기 권한이있는 어딘가에서 호스팅되는 .json 파일이 필요합니다. .json 파일에 이미지(블록체인 아이템 이름 대신 표시되는 이름), 설명 및 이미지(공개적으로 읽을 수 있어야 함)를 포함 할 수 있습니다.

최소 권장 메타 데이터는 이름, 설명 및 이미지입니다. 이것을 다음과 같이 정의 할 수 있습니다 :

```json
{
  "name": "ITEM_NAME",
  "description": "Description line 1.\nDescription line 2.",
  "image": "/IMAGE.jpg"
}
```
퍼블릭 액세스 권한이 있는 .json 파일을 업로드하면 아이템 URI를 설정하도록 요청할 수 있습니다. token_id로 바꾸고 .json 파일에 연결하십시오. 파일 호스팅에 익숙하지 않은 사용자는 이 [this guide](./working_with_metadata_digital_ocean.md)를 참조하십시오.

**고급 사용자:**
URI 값은 클라이언트에 의한 ID 대체를 허용합니다. `{id}`문자열이 어떤 URI에 존재한다면 클라이언트는 실제 토큰 ID를 16 진수 형식으로 바꿔야만 합니다. 이것은 URI를 한번만 설정하여 많은 수의 토큰이 하나의 온-체인 스트링을 사용할 수 있게 합니다. 이를 위한 URI 예시는 다음과 같습ㄴ디ㅏ: `https://token-cdn-domain/{id}.json` 는 다음으로 대체될 수 있습니다 `https://token-cdn-domain/780000000000001e000000000000000000000000000000000000000000000000.json` 만약 클라이언트가 해당 토큰 ID를 참조한다면 말이죠 `780000000000001e000000000000000000000000000000000000000000000000`. ERC-1155 표준 문서에 있는 [Metadata](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-1155.md#metadata) 섹션을 참조하여 전체 내용을 확인해보세요.

```graphql
mutation setItemURI{
  CreateEnjinRequest (
    identity_id: 1,
    type: SET_ITEM_URI,
    set_item_uri_data: {
      token_id: "TOKEN_ID",
      token_index: 0,
      item_uri: "/METADATA.json"
    }
  ) {
    id,
    encoded_data
  }
}
```

우리 스키마(schema)에 내장 된 메타 데이터에는 다양한 기능이 존재합니다. 자세한 내용은 [Enjin Metadata Schema](../erc1155_metadata_json_schema.md)를 참조하십시오.

요청이 성공적으로 이루어지면, 개발자 지갑 **NOTIFICATIONS** 섹션에서 트랜잭션을 동의하고 사인해야 합니다. 


## 역할 작업

역할을 다음과 같이 나열 할 수 있습니다:

```graphql
query all_roles {
  EnjinRoles
	{
    id,
    name,
    app_id
  }
}
```

사용자를 업데이트하려면 `X-App-Id`에 app_id를 설정해야합니다. 사용자가 원하는 **all** 역할을 한 번에 설정해야합니다. 전달되지 않은  역할은 사용자에게 표시되지 않습니다. 

```graphql
mutation setRoles{
  UpdateEnjinUser(id:1, roles:["Admin"]){
    id,
    roles{
      id,
      name,
      app_id
    }
  }
}
```

## 사용자 업데이트 (자신 포함)
다음 요청을 실행하여 사용자 이름, 이메일 및 암호를 업데이트 할 수 있습니다. 사용자 ID, 새 이름, 새 이메일 및 새 암호로 대체하십시오.

```graphql
mutation updateUser{
  UpdateEnjinUser (
    id: USER_ID
    name: "NEW NAME",
    email: "NEW EMAIL",
    password: "NEW PASSWORD"
  ) {
    id
    name
    email
  }
}
```

## 팁과 트릭

만약 지갑 데몬이 되돌려야 할 잘못된 매개 변수가 있는 트랜잭션에 대해 불만을 제기하면, 트랜잭션을 되돌릴 수 있습니다.

```graphql
mutation CancelTransaction {
  UpdateEnjinRequest(id:XXXX state:CANCELED_USER) {
    id
    title
    state
  }
}
```
