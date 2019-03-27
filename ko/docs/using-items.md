# Unity 게임에서 Enjin 아이템 사용하기

이제 [아이템을 만들었으니](creating-items.md) Unity SDK를 둘러보고 프로젝트를 구축할 차례입니다. 여기까지 오셨다면 Trusted Cloud 계정 생성, 앱 생성, 지갑에 자금 넣고 연동, 그리고 민팅 가능한 아이템을 적어도 1개 생성 하셨습니다. 이제 Unity SDK로 넘어갈 차례입니다.

# The Simple Game

Unity SDK를 제대로 이해하기 위해 우선 간단한 게임 예시를 볼 예정입니다. Unity SDK에서_Assets > Enjin > Enjin SDK > Simple Game_ 디렉토리로 가세요. 그 디렉토리 안에는 간단한 클리커 스타일의 게임으로 구성된 Unity scene과 그 기능을 구현하는 자산들이 있습니다. 제일 중요한 건 Enjin Unity SDK의 올바른 사용법을 스크립트로 시연하는 Game.cs 파일입니다.

Simple Game scene 자체는 매우 간단한 예시입니다. 유저들은 신규 가입 혹은 기존 Enjin Trusted Cloud 계정으로 로그인 할 수 있는 인증 화면을 보게 됩니다. 다음으로 유저들은 Enjin 모바일 지갑을 Simple Game과 연동 하라는 프롬프트를 받게 됩니다. 그 후 게임 플레이가 시작되고 유저들은 버튼을 일정 횟수 이상 클릭하면 민팅된 아이템을 보상으로 받게 됩니다.

# 필요한 사용자 설정 정보

본인이 제작한 토큰을 게임을 적용하려면 몇가지의 구성 옵션을 업데이트해야 합니다. 우선 Unity 에디터에서  _Simple Game_ scene을 열고 Unity hierarchy 패널에서 게임 오브젝트를 선택하세요. 이 오브젝트는 저희 예시 스크립트가 첨부된 Unity  [GameObject](https://docs.unity3d.com/ScriptReference/GameObject.html) 입니다. 선택한 후 Unity inspector 패널에 나타나는 필수 필드를 채웁니다.

|![Unity hierarchy 에서 보이는 게임 오브젝트](images/sg_hierarchy.png)|![Unity inspector에 있는 게임 오브젝트 구성 변수](images/sg_inspector.png)|
|:-:|:-:|
|Unity hierarchy view에서 보이는 게임 오브젝트.|Unity inspector에 있는 게임 오브젝트 구성 변수.|

이 구성 변수 모두 _Game.cs_에서 노출되고 사용됩니다.

* `PLATFORM_URL`: 이 변수는 Enjin SDK가 연결을 시도하고 상호 작용해야 할 Trusted Cloud가 어느 건지 명시합니다. 테스트용으로 추천하는 옵션은 이더리움 Kovan Test 네트워크의 Enjin 서버입니다, `https://kovan.cloud.enjin.io/`.

* `DEVELOPER_USERNAME`: 이 변수는 선택한 Trusted Cloud 서버의 개발자 사용자 이름을 명시합니다. 이 예시 게임에서는 이 사용자 이름을 사용하세요.

* `DEVELOPER_PASSWORD`: 이 변수는 선택한 Trusted Cloud 서버의 개발자 비밀번호를 명시합니다. `DEVELOPER_USERNAME` 과 더불어 이 변수는 Enjin SDK가 개발자를 대신하여 인증할 수 있는 인증 데이터를 제공합니다. 인증 완료 후 SDK는 유저들을 위한 아이템을 새로 민팅하는 등 관리자 작업을 수행할 수 있습니다. 이 예시 게임에서는 이 비밀번호를 사용하세요.

* `DEVELOPER_IDENTITY_ID`: 이 변수는 리워드 아이템을 민팅할 때 사용할 개발자 아이덴티티를 명시합니다. Enjin Trusted Cloud 서버에서는 유저들이 여러개의 아이덴티티를 가질 수 있기 때문에 이 내용은 중요한 부분입니다. 각 아이덴티티마다 지갑으로 사용될 이더리움 주소를 명시하기에 이 변수는 Enjin SDK에게 어느 지갑이 리워드 아이템을 보관하고 있는지 알려줍니다. 이 가치값은 앱에서 Enjin SDK 에디터 윈도우를 열고 _Teams_ 탭에 들어가서 개발자 항목을 보면 찾을 수 있습니다.

|![This is where you can find your developer Identity ID.](images/sg_developer_identity.png)|
|:-:|
|여기서 개발자 아이덴티티 ID를 찾을 수 있습니다|

* `APP_ID`: 이 변수는 Simple Game이 사용해야 할 개발자 앱이 무엇인지 명시합니다. 개발자는 여러개의 앱을 가질 수 있기 때문에 Enjin SDK 에디터 윈도우에서 아이템을 생성할 때 정확한 앱을 선택하는 것이 중요합니다. 개발자 지갑과 연동한 후 Enjin 지갑 모바일 앱의 ‘Linked Apps’를 보시면 앱 아이덴티티 번호를 찾을 수 있습니다.

* `REWARD_TOKEN_ID`: 이 변수는 게임 클릭 횟수를 채운 유저들에게 줄 리워드 용도로 민팅할 개발자 아이템이 무엇인지 명시합니다. 개발자는 선택된 `DEVELOPER_IDENTITY_ID` 를 사용해 이 아이템을 여러번 더 민팅할 수 있어야 합니다. 이 가치값은 앱에서 Enjin SDK 에디터 윈도우를 열고 _CryptoItems_  탭에 들어가서 리워드 아이템을 보면 찾을 수 있습니다.

|![This is where you can find your reward token's ID.](images/sg_token_id.png)|
|:-:|
|여기서 리워드 토큰 ID를 찾을 수 있습니다.|

* `SCORE_THRESHOLD`: 이 변수는 Simple Game에서 유저가 리워드 아이템을 얻기 위해 채워야 할 클릭수를 명시합니다.

구성 변수가 다 채워지면 선택한 토큰이 유저들에게 리워드로 지급 되도록 Simple Game 예시가 설정 됩니다.

# Simple Game 둘러보기

예시로 사용할 Simple Game에서 Enjin SDK 사용법을 이해하기 제일 좋은 방법은 Unity 에디터에서 이 게임을 구성하고 실행하는 것입니다. 예시 게임에서는 여러개의 튜토리얼이 제공됩니다. 또한, Simple Game이 Enjin SDK과 상호 작용하는 다양한 단계들을 설명합니다. 이 단계들은 향후 본인 게임에서 SDK로 아이템을 지원할 때 적용해야 할 내용입니다.

우선, Enjin SDK는 앱의 계정 시스템 역할을 할 수 있습니다.

|![The player is first presented with a screen showing authentication options.](images/sg_authentication.png)|
|:-:|
|유저는 로그인 인증 화면을 먼저 보게 됩니다.|

이 계정 시스템은 매우 강력합니다. 유저 한 명에게 해당되는 한 세트의 인증 내용을 지원하고 또한 내부적으로 여러 앱에서 사용하는 다른 아이덴티티들과 주소를 소유한 엔드유저 역시 지원합니다. 처음 앱을 실행할때 유저는 앱에 이메일 등록 요청을 할 수 있습니다. Enjin SDK는 유저가 앱과 관련된 하나의 아이덴티티를 포함한 신규 계정을 생성할 수 있도록 지원합니다. 유저는 이메일로 계정 인증 내용을 받아볼 수 있습니다.

|![If the player is new, they are prompted to register by email for the Simple Game app.](images/sg_register.png)|
|:-:|
|신규 유저일 경우, Simple Game 앱에 이메일로 등록하도록 프롬프트가 뜹니다.|

이미 Enjin Trusted Cloud 서버 계정이 있다면, 기존 유저 계정에서 앱과 연결된 새로운 아이덴티티를 생성 합니다. 그럴 경우 유저는 계정 인증 내용 대신 앱에 성공적으로 연결 되었고 정상적으로 로그인이 가능하다는 알림을 받게 됩니다.

|![The player can also choose to log in with their existing account.](images/sg_login.png)|
|:-:|
|유저는 기존 계정으로 로그인할 수 있습니다.|

신규 가입/기존 유저 상태와 별개로, 앱과 연관된 유저 아이덴티티가 아직 이더리움 주소를 트래킹 하지 않을 수 있습니다. 이럴 경우, Enjin SDK는 유저에게 Enjin 모바일 지갑에 입력해야 할 링크/linking 코드를 프롬프트 할 수 있습니다.

|![If the player logs in but has no associated wallet, they are prompted to link one.](images/sg_link.png)|
|:-:|
|로그인했는데 연관된 지갑이 없다면 연결 프롬프트가 뜹니다.|

유저가 지갑을 앱에 성공적으로 연결하면, 게임 메인 플레이 화면으로 이동합니다. 여기서 Simple Game은 유저가 얻고자 하는 리워드 아이템의 이름, 이미지, 그리고 잔액을 회수하는 방법을 보여줍니다.

|![The game view as the player interacts with it.](images/sg_game.png)|
|:-:|
|유저가 인터랙트하는 게임 화면.|

유저가 클릭수를 충분히 채워서 리워드 토큰 이미지가 공개되면, Simple Game 구성 변수에서 명시된 개발자 아이덴티티는 유저에게 리워드 토큰 하나를 민팅해줍니다. 개발자는 이 민팅 작업에 대한 수락/거부 알림을 지갑에서 받게 됩니다. 

또한, 이 페이지는 이더리움 네트워크에서 보류중인 작업들이 유저에게 어떤 식으로 나타나야 할지 알려줍니다. 이 경우, 개발자가 민팅을 승인하기 전까지는 유저가 토큰을 얻을때마다 나타나는 첫 화면은 “보류중/pending”입니다.

# 추가 리소스

Unity SDK 방법은 저희 [live documentation](/docs/livequery/intro)에 있는 디렉트 GraphQL call 로도 제공 됩니다. Trusted Cloud에서 GraphQL을 다루는 법에 대해 더 상세하게 알고 싶다면 Live documentation은 아주 좋은 자원입니다. 

실제로 이런 게임들은 Enjin 지갑 데몬으로 게임 아이템 트랜잭션을 자동 수락 및 거부 하도록 설정 하는게 좋습니다. 설정하는 방법을 배우기 위해 더 어려운 고급 예시를 한번 들여다봅시다.