# Creating Your First Items

이제 [제대로 지갑을 생성했으니](wallet-setup.md) 그 지갑을 채울 아이템을 만들 차례입니다. 직접 GraphQL을 통해 아이템을 만들거나 Unity안에 있는 [Enjin SDK 에디터](# Using Unity)에서 만들 수 있습니다.

# GraphQL 사용하기

## 아이템 만들기

아이템을 만드는 것은 아이템을 민팅할 템플릿을 만드는 것과 같습니다.
아이템을 만들기 위해서는 원하는 아이템 속성을 요청해야 합니다. 다음은 예시입니다:

[CreateToken](../examples/CreateToken.gql)


속성 | 설명
---|---
totalSupply (총 공급량) | 아이템의 총 공급량
initialReserve (예치금) | 아이템 예치금. 이 예치금을 위해서는 ENJ을 승인해야 함.
supplyModel (공급 모델) | 아이템 공급 모델. FIXED, SETTABLE, INFINITE, COLLAPSING, ANNUAL_VALUE, ANNUAL_PERCENTAGE.
meltValue (멜팅 가치) | 아이템의 ENJ가치. 가치값을 10^18로 곱하여 소수자리 18개가 들어가야 함. 새로운 아이템들은 최소 멜팅 가치가 요구되며 기존 예치금에서 계산 됨. 다음 TP endpoint에서 예치금의 최소 금액을 확인 가능: `/api/v1/ethereum/get-min-melt-value/{iniitalReserve}` 예를 들어 [https://kovan.cloud.enjin.io/api/v1/ethereum/get-min-melt-value/1000000](https://kovan.cloud.enjin.io/api/v1/ethereum/get-min-melt-value/1000000)
meltFeeRatio (멜팅 수수료 비율) | 제작자에게 돌아갈 멜팅 가치의 퍼센티치 (최대 50%까지 가능). 소수자리 2개까지 가능. 퍼센티지를 100에 곱해야 함. 예를 들어 12.5 %는 1250.
Transferable (전송 가능) | 전송 유형. PERMANENT, TEMPORARY, BOUND.
transferFeeSettings - type (전송 수수료 설정 - 유형) | 전송 수수료 유형. NONE, PER_TRANSFER, PER_CRYPTO_ITEM, RATIO_CUT, RATIO_EXTRA, TYPE_COUNT.
transferFeeSettings - token_id (전송 수수료 설정 - token_id) |  전송 수수료로 사용 하고 싶은 아이템의 Token ID. 엔진코인일 경우 0을 사용.
transferFeeSettings - value (전송 수수료 설정 - 가치) | 전송 수수료의 가치. ENJ을 사용할 경우, 값에 10^18을 곱하여 소수자리 18개 포함.
nonFungible (대체 불가능) | 대체 가능한 혹은 대체 불가능한 아이템인지. True 아니면 false.

[Unity Guide](./unity.md)의 ‘Creating Items - 아이템 생성'을 보면 아이템 속성과 작동법에 대한 상세한 내용을 보실 수 있습니다.

성공적인 요청이 이뤄지면 개발자 지갑의 **NOTIFICATIONS** 섹션에서 트랜잭션을 수락하고 서명해야 합니다. 트랜잭션이 성공적이면 아이템 템플릿이 생성되고 민팅할 아이템 ID를 검색/찾을 수 있습니다.

## Token ID 찾기 (및 추가 세부 사항)

트랜잭션이 컨펌된 후 EnjinX에서 아이템으로 트랜잭션 토큰 ID를 검색하시거나 Trusted Cloud에서 아이템을 검색할 수 있습니다. 허나, 먼저 트랜잭션이 블록체인에서 컨펌되길 기다려야 합니다.

참고: 만약 토큰 ID를 TP가 아닌 블록체인에서 검색한다면 정수 형태로 나타납니다. 그럴 경우 GraphQL mutations에 사용하기 전 이 숫자를 hex로 전환하고 결과 값의 상단 32bits 를 가져가면 됩니다 (결과값은 Base Token ID를 나타냅니다). 이 작업을 위해서는 [Rapid Tables](https://www.rapidtables.com/convert/number/decimal-to-hex.html) 같은 서비스를 사용해도 됩니다.

[Tokens](../examples/Tokens.gql)


아이템 검색을 위해서는 `아이템 이름/ITEM NAME`을 입력하세요. 앱의 전체 아이템을 부르고 싶다면 이름 파라미터 없이 요청 하면 됩니다.

## 아이템 민팅하기

CREATE 단계에서 만든 템플릿으로 블록체인 아이템을 만드는 것을 아이템 민팅이라고 표현합니다. 대체가능한 아이템(FI)을 민팅하는 것과 대체불가능한 아이템(NFI)을 민팅하는 방식은 살짝 다릅니다. 원한다면 여러 주소에 아이템을 묶음으로 민팅할 수 있습니다. 차이점은 대체불가능한 아이템을 여러개 민팅해야 할 경우 각 아이템 당 지정 지갑 주소를 설정해야 합니다. 단일 트랜잭션에 100개 이상의 대체불가능한 아이템을 민팅하는 것은 웬만하면 하지 않는게 좋습니다. 대체 가능한 아이템들은 이런 제한이 따로 없습니다. 아래 예시를 보시면 2가지 다른 아이템 유형의 동일한 요청입니다.

**FI (대체 가능한 아이템):**
[MintFungibleItems](../examples/MintFungibleItems.gql)


“WALLET_ADDRESS_1” 에 아이템 5개, 그리고 “WALLET_ADDRESS_2”에 아이템 3개를 민팅하는 요청입니다. 아이템의 `예치금/INITIAL RESERVE`만큼 민팅 가능합니다.

**NFI (대체 불가능한 아이템):**
[MintNonFungibleItems](../examples/MintNonFungibleItems.gql)


“WALLET_ADDRESS_1” 에 아이템 5개, 그리고 “WALLET_ADDRESS_2”에 아이템 3개를 민팅하는 요청입니다.

요청이 성공적으로 진행되면 개발자 지갑의 “NOTIFICATIONS” 에서 트랜잭션을 수락 및 서명해야 합니다.

## URI 설정하기 (아이템 메타데이터)

아이템 메타데이터는 옵션이지만 Enjin 지갑 및 다른 Enjin 서비스에서 아이템 이미지와 커스텀 속성을 나타내고 싶을 경우 일정 수준의 메타데이터는 넣어야 합니다.

아이템을 메타데이터 파일과 연결하려면 공용 읽기 권한이 있는 곳에 .json 파일을 호스팅 해야 합니다. 그 .json 파일에 이름 (블록체인 아이템 이름 대신 표시될 이름), 설명, 그리고 이미지 링크 (퍼블릭 접근/읽기가 가능해야 합니다)를 넣어야 합니다.

추천하는 최소한의 메타데이터는 이름, 설명, 그리고 이미지 입니다. 다음 예시 참고 부탁 드립니다:

```json
{
  "name": "ITEM_NAME",
  "description": "Description line 1.\nDescription line 2.",
  "image": "/IMAGE.jpg"
}
```

공용 읽기 접근이 되는 곳에 .json 파일을 업로드 한 후 아이템 URI 설정 요청을 할 수 있습니다. 토큰 ID와 .json 파일로 대체 합니다. 파일 호스팅이 낯설다면 [관련 가이드](./working_with_metadata_digital_ocean.md) 참고 부탁 드립니다.

**고급 사용자들:**

URI 값은 클라이언트/고객의 ID 대체를 가능하게 합니다. 어떤 URI라도 만약 스트링 `{id}`가 존재한다면 클라리언트/고객들은 반드시 16진법 형태의 실제 토큰ID로 바꿔야 합니다. 이 작업은 URI를 한번 정의내리는 것으로 많은 개수의 토큰들이 동일한 온체인(on-chain) 스트링을 사용할 수 있게 합니다. 이런 URI 예시는 다음과 같습니디:

만약 클라이언트/고객이 다음 토큰 ID`780000000000001e000000000000000000000000000000000000000000000000`을 사용할 경우, `https://token-cdn-domain/{id}.json` 를 다음 링크로 바꿉니다: `https://token-cdn-domain/780000000000001e000000000000000000000000000000000000000000000000.json`. 더 자세한 내용은 ERC-1155 표준 문서에 나온 [메타데이터](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-1155.md#metadata) 섹션 참고 부탁 드립니다.

[SetItemUri](../examples/SetItemUri.gql)


저희 스키마(개요)에 탑재된 다양한 메타데이터 기능들에 대해 더 자세히 알고 싶으시면 [Enjin 메타데이터 스키마](../erc1155_metadata_json_schema.md)를 참고 부탁 드립니다.

요청이 성공적으로 진행되면 개발자 지갑의 **NOTIFICATIONS** 에서 트랜잭션을 수락하고 서명하시면 됩니다.

# Unity 사용하기

## 시작하기 전

Unity로 작업을 시작하기 전, 우선 Cloud Platform (클라우드 플랫폼) 계정이 필요합니다. 관련 내용은 [링크](./starthere.md) 참고 부탁 드립니다.

또한, 적어도 한개의 지갑에는 ENJ, ETH (Kovan일 경우 KENJ/KETH) 자금이 있어야 합니다. 해당 자금이 없을 경우 많은 제한이 있으니 시작하기 전 지갑에 필요한 금액을 넣으시길 바랍니다. 관련 내용은 [여기](./wallet_quickstart.md) 참고 부탁 드립니다.

이어, 큰 규모의 아이템 민팅을 하시기 전에는 반드시 아이템 경제에 대해 고민하시길 바랍니다. 메인넷으로 가시기 전 Kovan 샌드박스에서 아이템을 충분히 테스팅 해보세요. 암호화폐 아이템으로 작업하면 실제 돈과 트랜잭션 비용이 들기 때문에 메인넷에서 **작업 하기 전** 아이템에 들어갈 비용과 트랜잭션 비용이 얼마 정도 될지 미리 파악하시는 것을 강력히 추천 드립니다.

Unity 패널은 비프로그래머들이 cryptoitems를 생성, 민팅, 그리고 관리할 수 있도록 설계 되었습니다. 하지만, 대규모 아이템 생성 자동화나 확장성을 위해 **설계되지 않았습니다**. 그러니 만약 대량의 아이템을 생성할 계획이라면, 특히 대체불가능한 아이템 같은 경우, Unity runtime API 나 GraphQL API로 스크립트 작성하시는 것을 추천합니다.

## Setup - 설정

Unity 설정은 쉽습니다. Unity Asset Store 에서 [Enjin Blockchain Asset](https://assetstore.unity.com/packages/tools/utilities/blockchain-sdk-by-enjin-124133)을 다운 받으세요. 만약 다른 곳에서 받으셨다면 “Assets -> Import Package -> Custom Package” 방법으로 불러오세요.

![Import Package](../docs/images/unity_import_package.png)

**Window->Enjin SDK**로 유니티 패널에 접근하세요.

가입 할때 사용한 Enjin 계정으로 로그인하세요.

로그인 후, 아직 앱을 만들지 않았다면 개발자 포털을 통해 만드세요. 만드는 방법은 아래 [Home Screen](#home-screen)을 참고 하세요.

마지막으로 지갑과 연결해야 합니다. 개발자 계정에 지갑을 연결하는 방법은 [Wallet](#wallet-screen)에서 볼 수 있습니다.

## Home Screen Logged Out
![Login Screen](../docs/images/unity_login_page_2.png)

#### 플랫폼 선택

플랫폼 선택 메뉴를 통해 작업하고 싶은 플랫폼을 선택하세요. 현재는 옵션이 하나 밖에 없습니다.

* Kovan Testnet - 저희 주요 테스트넷 샌드박스. `https://kovan.cloud.enjin.io/`

메인넷을 포함한 다른 플랫폼들은 향후 추가될 예정입니다.

#### 로그인

계정은 특정 서버에서 작동되기 때문에 로그인할때 어려움이 있으시면 계정 인증 정보가 정확한지 확인해주세요.

### Home Screen
![Home Screen](../docs/images/unity_home_logged_in.png)

로그인 후, 홈스크린에서 로그인 정보를 볼 수 있고 앱을 관리할 수 있습니다. 게임 당 앱 한개를 만드시는 것을 추천합니다.

플랫폼에 앱을 추가하려면 **Create App** 버튼을 클릭해주세요. 입력값에 앱 이름, 이미지 URL 그리고 설명을 설정할 수 있습니다. 지갑에서 이미지가 제대로 보이려면 이미지 공개 접근이 허용 되어야 합니다.

앱 드롭다운 메뉴에서 이번 세션에 작업하고 싶은 앱을 선택하고, 입력 시 실수하면 **Edit App**을 클릭하면 됩니다.

## Team Screen
![Team Screen](../docs/images/unity_team_main.png)

팀 스크린에서는 앱의 팀 멤버를 생성, 수정, 및 제거가 가능합니다. 또한 유저들이 게임을 하는 동안 앱에 추가된 유저 계정을 볼 수 있습니다.

팀 멤버를 생성하려면 **Create Member**를 클릭하시고 사용자이름, 비밀번호, 그리고 역할을 입력하세요.

기존 유저를 수정하려면 유저 선택 후 **Edit**을 클릭해주세요.

**Search** 박스에서 유저를 검색 할 수 있습니다.

![Roles Screen](../docs/images/unity_team_roles.png)

Roles/역할은 앱 내 다양한 작업의 권한 및 접근성을 관리하는 가능 입니다. 게임 니즈에 따라 역할을 **생성**, **수정** 그리고 **삭제** 할 수 있습니다. 전반적으로 2개의 역할이 있습니다. 하나는 모든 권한이 있는 관리자 (본인), 나머지 하나는 제한된 권한이 있는 일반 유저들입니다.

## Identities Screen
![Identitites Screen](../docs/images/unity_identities_main.png)

아이덴티티 스크린에서는 유저 계정을 이더리움 주소로 연결할 수 있습니다. 하나의 앱, 한명의 유저 당 아이덴티티 하나만 가능합니다. 즉, ENJ 생태계에서 유저 한명은 여러 앱에서 사용하는 여러 아이덴티티를 가질 수 있습니다.

아이덴티티는 2가지 형태가 가능합니다: 링크/연결 혹은 언링크/비연결. 연결된 아이덴티티는 유효한 퍼블릭 이더리움 주소를 보여주고 연결되지 않은 주소는 영숫자 집합의 6자리 링크 코드를 보여줍니다.

**개발자는** 링크/연결 코드로 본인의 모바일 혹은 지갑 데몬을 앱에 연동하여 아이템 생성/지급을 할 수 있습니다.

**게임 유저들은** 링크/연결 코드로 플랫폼을 통해 게임 계정과 지갑을 게임에 연동할 수 있습니다.

링크/연결 기능을 통해 개발자들은 앱 아이템을 관리할 수 있고, 게임 유저들은 아이템 거래 같은 게임 내 작업을 진행할 수 있습니다.

![Identities Edit](../docs/images/unity_identities_edit.png)

## Cryptoitems Screen
![Cryptoitems Main Screen](../docs/images/unity_cryptoitems_main.png)

Cryptoitems 스크린은 Enjin Unity SDK의 핵심입니다. 이 메인 스크린에서 아이템을 생성하고 관리합니다. 자세한 내용을 다루기 전 몇 가지 아셔야 할 내용이 있습니다.

#### 아이템 생성은 2 단계 절차 입니다:

1. 첫번째, 아이템을 **생성**해야 합니다. 예를 들어 붕어빵을 찍어낼 붕어빵 기계를 만드는 것입니다.

2. 두번째, 아이템을 **민팅**해야 합니다. 예를 들어 붕어빵 기계로 붕어빵을 만드는 것입니다.

#### 아이템은 2가지 타입이 있습니다: 대체 가능한 아이템 그리고 대체 불가능한 아이템

* **대체 가능한 아이템**은 다 동일하며 기본적으로 호환 가능합니다. 골드 코인, 녹슨 검 등과 같은 아이템들은 이 카테고리에 들어갑니다. 위에 언급한 붕어빵을 예로 들 경우, 대체 가능한 붕어빵들을 거래하면 서로 섞이더라도 알 수 없습니다

* **대체 불가능한 아이템**은 기본 재료는 같아도 각자 고유 특징을 갖춘 유니크한 개별 아이템입니다. 붕어빵을 예로 들 경우, 같은 기계로 굽더라도 붕어빵마다 다 다른 토핑을 얹히면 호환도 안되고 거래할 경우 정확히 무엇이 거래되었는지 즉시 확인 가능합니다.

대체가능한 아이템과 대체불가능한 아이템들간 작업 흐름의 차이점은 앞으로 설명 드리겠습니다.

#### 아이템 생성하기
![Cryptoitems Create Item](../docs/images/unity_cryptoitems_create2.png)

메인 패널에서 **생성**을 클릭하면 'Cryptoitem 생성하기' 패널이 열립니다.

왼쪽 위를 보면 사용하고 있는 지갑과 그 안에 든 ENJ 잔액이 나옵니다. 만약 지갑을 변경해야 하면 현재 지갑을 비연동한 후 작업에 필요한 지갑으로 다시 연동하면 됩니다.

메인 패널에서는 아이템의 특징, 속성을 정할 수 있습니다. 각 속성에 대해서 설명하겠습니다.

**CryptoItem 이름**: 최고의 이름을 지어주세요!

**총 공급량**: 만들고 싶은 아이템의 총 공급량/수량. 어떤 공급 모델을 사용하느냐에 따라 변경 되거나 여러 의미를 가질 수 있습니다. 예를 들어, COLLAPSING 공급 타입을 선택하면 초기 수량은 처음 만들었던 아이템의 개수를 뜻합니다. 제일 이해하기 쉬운 모델은 FIXED 입니다 - 동시에 존재할 수 있는 아이템의 개수는 언제나 ‘고정' 되어 있음을 알려줍니다.

**Initial Reserve/예치금**: 초기 아이템 민팅 작업에 사용될 사전지불 금액입니다. 아이템을 민팅할때마다 예치금의 금액이 차감됩니다. 만들때 적어도 아이템 한개의 비용은 지불해야 합니다. 예치금이 있으면 총 수량 비용을 ENJ으로 즉시 지불하지 않고, 필요한 수량만큼 먼저 생성할 수 있습니다.

**멜팅 가치**
만드는 아이템 개당 사용할 ENJ 금액입니다. 예치금으로 아이템 몇 개를 만드냐에 따라 아이템 개당 필요한 최소 ENJ 금액이 있습니다 (최소 금액은 라벨 옆에 표기됩니다). 대체적으로 한 타입의 아이템을 더 많이 만들수록 **개당** 필요한 ENJ 금액은 줄어듭니다.

**Metadata URI**
**메타데이터 작업하기**를 참고하세요.
Metadata URI는 이미지 및 여러 속성을 설명하는 JSON이 담긴 URL을 추가할 수 있도록 합니다.

**공급 모델**: 아이템 민팅 그리고 멜팅 방식은 공급 모델에 따라 작동합니다. 현재 버전에서는 공급 모델이 다음과 같이 있습니다:

  * **Fixed**: 동시에 유통 가능한 아이템의 총 공급량
  * **Settable**: 언제든지 총 공급량 수정 가능
  * **Infinite**: 원하는 만큼 아이템을 민팅할 수 있고 총 공급량을 초과해도 됨
  * **Collapsing**: 한번 멜팅 된 아이템은 다시 민팅할 수 없음

**전송 가능한 유형**
아이템이 거래 가능한지 아니면 오너에게 귀속되었는지 (예를 들어 거래 불가능) 정하기
* **PERMANENT**: 항상 거래 가능
* **BOUND**: 아이템 제작자에게 귀속됨
* **TEMPORARY**: 현재 거래 가능하지만, 향후 제작자가 원한다면 거래 불가능으로 변경 가능

**전송 수수료 설정**

* **NONE**: 아이템이 전송될때 수수료 없음

* **PER_CRYPTO_ITEM**: *아이템 개당* 전송 수수료를 ENJ로 부과. 예를 들어 `사과` 전송 수수료가 아이템 개당 `0.1 ENJ`일 경우, `0xPAT`이 10개의 사과를 `0xERIC`한테 보내면 `0xPAT`은  사과 아이템 제작자 `0xCREATOR`에게 1ENJ 수수료를 지불해야함.

* **PER_TRANSFER**: *전송 마다* 수수료를 ENJ로 부과. 예를 들어, `바나나` 전송 수수료가 전송 마다 `0.1 ENJ`일 경우, `0xPAT`이 10개의 바나나를 `0xERIC`에게 보내면 `0xPAT`은 바나나 아이템 제작자 `0xCREATOR`에게 0.1ENJ를 지불해야함.

* **RATIO_CUT**: 대체 가능한 아이템에만 해당. 전송자가 지불하는 총 금액 중 총 아이템의 일부 %는 개발자에게 돌아감. 예를 들어, 10% ratio cut (0.1)이 설정된 골드 500개를 전송할 경우, 수령인은 450골드를 받고 개발자는 50을 받는다.

또 다른 예시:

`day_of_subscription` RATIO_CUT이 100일 경우 (제작자에게 1% 지불), `0xPAT`이 10000개의 `day_of_subscription`을 `0xERIC`에게 보냄.

결과: `0xERIC`은 9,900개의 아이템을 받고 `0xCREATOR`은 100개를 받는다.

* **RATIO_EXTRA**: 대체 가능한 아이템에만 적용. 모든 비용 위에 추가되는 금액. 예를 들어, 10% ratio extra로 설정된 골드 500개를 전송하면 수령인은 골드 500개를 받고, 개발자도 50개를 받는다. 즉, 전송자는 550 골드를 지불해야 한다.

또 다른 예시:
`골드`의 RATIO_EXTRA 수수료가 1,500 (15%)이고, `0xPAT`이 4,000 `골드`를 `0xERIC`에게 보냄.

결과: `0xPAT`은 4,600 `골드`를 지불하고, `0xERIC`은 4000개를 받고 `0xCREATOR`은 600개를 받는다.

**전송 수수료 Fee (ENJ or %)**
전송 수수료 설정에 따라 ENJ나 대체 불가능한 아이템의 일정 퍼센티지로 지불 되는 수수료.

**멜팅 수수료 비율**
아이템을 멜팅할 경우 제작자가 받을 ENJ 퍼센티지. 최대 50%까지 가능.

**대체 불가능한 아이템**
대체 가능한 아이템, 아니면 대체 불가능한 아이템을 만드시나요?

### 대체가능한 아이템 생성 예시

**더블룬**이라는 대체가능한 아이템을 만들어봅시다. 더블룬은 게임 화폐, 즉 게임 내 골드처럼 사용 될 예정입니다.

Cryptoitems 스크린에 가서 **Create**를 클릭하세요. 그리고 입력값을 다음과 같이 넣습니다:

![Cryptoitems Create Item](../docs/images/unity_cryptoitems_example1_1.png)

우선 천만개 더블룬을 만들기로 하고 향후 수량이 부족하면 추가해야 하니 공급 모델은 SETTABLE로 정합니다.

한꺼번에 다 민팅할 예정이라서 예치금은 총 수량과 동일한 금액으로 정했습니다. 또한, 비용을 줄기이 위해 최소 ENJ금액으로 아이템을 민팅하기로 했습니다: 아이템을 많이 만들수록 아이템 개당 필요한 ENJ은 적습니다. 멜팅 가치를 0으로 설정할 경우 패널이 자동으로 필요한 최소 ENJ를 사용합니다.

유저들이 더블룬을 거래하면 좋을것 같아서 TRANSFERABLE 설정을 ‘영구적/permanent’로 정합니다. 또한 전송 수수료를 부과하지 않기로 결정해서 NONE으로 설정합니다.

멜팅 수수료 비율도 0 으로 정했습니다. 즉, 유저들이 이 아이템을 멜팅하면 아이템에 들어가 있는 ENJ 모두 다 유저에게 돌아갑니다.

CREATE를 클릭합니다. 이제 이 트랜잭션은 블록체인에 올라가고 지갑 서명이 필요합니다. 이 예시에서는 모바일 지갑을 사용하겠습니다. 다음과 같은 화면이 나타납니다:
![Cryptoitems Create Item](../docs/images/unity_cryptoitems_example1_2.png)

생성 요청을 승인하면 얼마 뒤 Unity가 새로고침을 하고 새로 생성된 아이템을 보여줍니다:

![Cryptoitems Create Item](../docs/images/unity_cryptoitems_example1_3.png)

아이템 밸런스/잔고는 0입니다. 그 이유는 아이템을 실제로 민팅하지 않고 템플릿만 만들었기 때문입니다. 이제 아이템을 선택하고 ‘MINT’를 클릭해서 민팅을 시작합시다.

![Cryptoitems Create Item](../docs/images/unity_cryptoitems_example1_4.png)

민팅할 수량은 자동으로 최대 설정됩니다. 원하시면 변경 가능합니다. 또한 민팅된 아이템들이 전송될 주소 역시 선택할 수 있습니다. 지갑 데몬이 있다면 아주 유용한 기능입니다. MINT를 클릭하세요.

그러면 지갑에서 다음과 같은 알림이 뜹니다:
![Cryptoitems Create Item](../docs/images/unity_cryptoitems_example1_5.png)

수락하시고 기다리세요. 트랜잭션이 블록체인에서 컨펌되면 Unity가 새로고침을 하고 더블룬이 뜹니다. 모바일 지갑으로 민팅했다면 지갑 내 컬렉티블/소장용 아이템 탭에서 볼 수 있습니다.

![Cryptoitems Create Item](../docs/images/unity_cryptoitems_example1_6.png)

하지만 멋진 아이템 이미지? 설명? 커스텀 데이터는 다 어디 있냐고요? 우선 메타데이터를 만들고 설정해야 합니다. 아이템 커스텀을 위해서는 **메타데이터 작업하기**를 참고 해주세요.

#### 대체불가능한 아이템 생성 예시

대체 불가능한 아이템으로 **Vorpal Sword**를 만들어봅시다. 매우 레어한 아이템이며 각 Vorpal Sword는 유니크하며 시간이 지날수록 파워가 강해집니다. 그럼 Create 스크린을 다음과 같이 작성합니다:

![Cryptoitems Create Item 2](../docs/images/unity_cryptoitems_example2_1.png)

이 세상에 존재하는 수량은 딱 10개로 정해놓고 각 아이템마다 1ENJ을 넣습니다. 공급 모델은 FIXED로 정합니다. 즉, 동시에 유통되는 수량은 딱 10개 뿐이지만 원한다면 멜팅 후 다시 10개를 민팅할 수 있습니다.

전송 수수료도 추가해서 Vorpal Sword가 거래 될때마다 0.1ENJ 수수료가 부과 되도록 설정합니다. 전송 수수료는 아이템 제작자에게 갑니다.

이제 **대체 불가능한 아이템**을 선택하신 후 **CREATE**를 클릭하세요.

생성 과정은 대체 가능한 아이템과 동일합니다. 지갑에서 생성 요청을 수락한 후 Unity 패널이 새로고침 할때까지 기다린 후 아이템이 블록체인 위에 생성 되었다는 컨펌을 받으세요.

하지만 대체불가능한 아이템을 민팅하는 과정은 살짝 다릅니다. 한번에 한개씩만 민팅 가능하며 각 민팅은 개별 트랜잭션으로 간주됩니다.

![Cryptoitems Mint NFI](../docs/images/unity_cryptoitems_example2_2.png)

또한, 각 NFI(대체 불가능한 아이템)는 각자 유니크하기 때문에 Unity의 cryptoitem 목록에서 개별 항목으로 나타납니다.

만약 대체불가능한 아이템을 대량으로 민팅할 계획이라면 GraphiQL 콘솔을 사용해서 절차를 간소화하는 것을 추천합니다.

마지막으로 대체불가능한 아이템을 가지고 작업할 때 트랜잭션 숫자에 주의하시길 바랍니다. 각 아이템이 유니크하기 때문에 트랜잭션들이 빨리 누적됩니다.

#### 메타데이터 작업하기

JSON 메타데이터로 아이템에 커스텀 데이터를 추가할 수 있고 아이템 정보가 Enjin 지갑과 같은 앱에 어떻게 나타날지 설정 할 수 있습니다. 전체 JSON 스키마(개요)는 [여기서](./erc1155_metadata_json_schema.md) 볼 수 있습니다.

아래는 일반적인 포맷입니다:

```json
{
	"name": "Asset Name",
	"description": "Lorem ipsum...",
	"image": "https:\/\/s3.amazonaws.com\/your-bucket\/images\/{id}.png",
	"properties": {
		"simple_property": "example value",
		"rich_property": {
			"name": "Name",
			"value": "123"
			"display_value": "123 Example Value"
			"class": "emphasis",
			"css": {
				"color": "#ffffff",
				"font-weight": "bold",
				"text-decoration": "underline"
			}
		},
		"array_property": {
			"name": "Name",
			"value": [1,2,3,4]
			"class": "emphasis"
		}
	}
}
```

이전 예시에 만든 더블룬을 봅시다. 위 포맷을 사용해서 만든 기본 JSON 메타데이터입니다.

```json
{
  "description": "Better than Republic Credits!",
  "image": "https://imgur.com/wSqwbcU.png",
  "properties": {
    "Quality": "Common"
  }
}
```

그리고 1000x1000 크기의 더블룬 이미지를 만들었습니다. 사각형이기만 하면 사이즈는 상관 없습니다. 개인적으로 512x512 이상의 크기를 추천합니다.

![Cryptoitems Metadata Image Example](../docs/images/unity_cryptoitems_metadata_1_2.png)

메타데이터와 이미지가 준비되면 둘 다 공개 호스팅이 되어야 지갑 같은 앱에서 유저들이 볼 수 있습니다. 만약 테스팅만 하려면 [JSON.bin](https://jsonbin.io/)에서 JSON을 호스팅 할 수 있습니다. 이 예시에서는 [imgur](https://imgur.com/)로 이미지 데이터를 호스팅했습니다.

JSON과 이미지 데이터가 업로드 되면 Unity 에디터로 들어가서 아이템들 두 번 클릭한 후 수정하거나 아이템을 선택한 후 **Edit**을 클릭하세요.

![Cryptoitems Metadata Edit](../docs/images/unity_cryptoitems_metadata1_1.png)

그리고 **METADATA URI** 필드에 URI를 붙이신 후 업데이트를 누르세요. URI 설정 및 변경은 오너의 트랙잭션 서명을 요청합니다. 모바일 지갑을 사용할 경우:

![Cryptoitems Metadata Edit](../docs/images/unity_cryptoitems_metadata1_3.png)

됐네요! 지갑 앱에서 컬렉티블 탭을 보면 설정한 이미지와 메타데이터가 나타납니다.

![Cryptoitems Metadata Edit](../docs/images/unity_cryptoitems_metadata1_4.png)

## 지갑 스크린

지갑 스크린은 사용자 아이덴티티와 현재 연동된 지갑과 ETH, ENJ 잔액을 보여줍니다.

![Wallet Main](../docs/images/unity_wallet.png)

연동이 되지 않은 경우 다음과 같은 링크 코드가 뜹니다:

![Wallet Unlinked](../docs/images/unity_wallet_unlinked.png)

개발자 지갑에서 LINKED APPS를 선택 한 후 + LINK APP 그리고 코드 입력 후 나오는 설명을 따르세요. Unity에서 **REFRESH**을 클릭하고 링크가 성공적인지 확인하세요.

플랫폼으로 이 지갑을 연동한게 처음이라면 **APPROVE ENJ** (ENJ 승인) 알림이 뜹니다. 수락하세요. 이제 플랫폼은 아이템 생성, 민팅 등 과 같은 작업을 수행할 때 ENJ을 사용할 권한이 있습니다.

## 설정 스크린

아직 딱히 내용이 없습니다.

# 아이템 사용하기

아이템을 생성했고, 파라미터도 설정했고, 이제 유저들에게 ‘진정한 소유권'을 선사할 아이템을 널리 보급할 준비가 되었습니다. 이제 [새로 만든 아이템 사용하기](using-items.md)로 넘어가세요.
