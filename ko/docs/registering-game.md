# 게임 등록하기

[Trusted Cloud에서 아이템 상호 작용](platform-architecture.md)이 어떻게 진행되는지 아시니 이제 작업할 게임 등록을 할 준비가 됐습니다.

아직 가입하지 않으셨다면 우선 [Enjin 개발자 포털](https://kovan.cloud.enjin.io/signup)에 가입하세요. 가입하면 Trusted Cloud 서비스에 접근할 수 있는 계정과 인증 내용을 받게 됩니다. 

Trusted Cloud 서버는 2 개가 있습니다, 테스트넷과 메인넷.

테스트넷은 메인넷의 개발 버전입니다. 실제 암호화폐가 아닌 가상 이더리움과 엔진코인을 받고 안전한 시뮬레이션 환경에서 아이템을 테스트할 수 있습니다. 

메인넷에서는 실제 이더리움과 엔진코인을 사용하기 때문에 트랜잭션을 할 경우 암호화폐를 실제로 사용하게 됩니다. 때문에 메인넷에서 작업 하시기 전 우선 테스트넷에서 충분히 테스트해보시고 테스트넷 작업이 완벽한 후 메인넷으로 가시는걸 추천합니다.

초기 런칭 때에는 Kovan 테스트넷만 공개 지원할 예정입니다. 그 후 Ropsten을 런칭하고 그 다음 최종적으로 완성된 메인넷을 런칭할 예정입니다.

아래 GraphiQL 브라우저 인터페이스를 사용해서 Trusted Cloud와 인터랙트 하시면 됩니다:

* **Kovan Trusted Cloud (GraphiQL):** [https://kovan.cloud.enjin.io/graphiql](https://kovan.cloud.enjin.io/graphiql)

## Schema (스키마) 브라우징 하기

오른쪽을 보시면 문서 패널이 있습니다. 이 문서 패널을 확장하시면 사용 가능한 모든 요청과 파라미터를 검색할 수 있습니다. [여기에서](https://graphql.org/learn/queries/) Query와 Mutation 관련한 문서를 볼 수 있습니다. 간단하게 말하자면 Query는 서버에서 오는 정보를 요청하는 것이고 Mutations는 서버쪽 데이터를 수정하는 요청입니다.

## 요청 생성하기

왼쪽 위 패널에 Trusted Cloud에 보낼 요청을 입력하세요. 위에 있는 “Play” 버튼을 누르고 요청을 제출하면 오른쪽 패널에서 답변이 뜹니다. 어떤 요청을 하느냐에 따라 가끔 개발자 지갑에 트랜잭션 서명 알림이 뜰 수 있습니다. 

## Login and Authenticating Your Requests

Trusted Cloud를 통해 제출한 요청을 인증 받아야 합니다. 인증을 받기 위해서는 엑세스 토큰이 필요합니다. 다음 요청을 통해 엑세스 토큰을 받으시면 됩니다.

```graphql
query login{
  EnjinOauth (
    email: "MY_ACCOUNT_EMAIL",
    password: "MY_ACCOUNT_PASSWORD"
  ) {
    id,
    name,
    email,
    access_tokens,
    identities {
      id,
      app {
        id,
        name
      }
    }
  }
}
```

## 앱 만들기

Trusted Cloud 작업을 위해 적어도 앱 한 개는 만드셔야 합니다. 앱은 모든 아이템과 유저들의 메인 컨테이너 역할을 합니다. 예를 들어, 앱은 유저의 Enjin지갑에서 아이템이 담긴 ‘컬렉션'으로 나타납니다. 

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

중요하게 참고해야 할 부분은 App ID 입니다. 이미 앱을 만들었지만 ID를 잊으셨다면 다음 쿼리로 검색할 수 있습니다:

```graphql
query apps {
  EnjinApps{
    id,
    name
  }
}
```

앱에서 호스팅 된 이미지를 위한 이름, 설명, 그리고 (옵션) 링크를 넣으시면 됩니다. 성공적으로 마무리 되면 App ID를 받게 됩니다. 이제 받은 App ID를 사용할 수 있습니다. 이 쿠키 설정에 대한 정보는 **Authenticating your Requests - 요청 인증하기** 에서 볼 수 있습니다.

## 더 많은 유저 생성하기 (옵션) 

앱의 관리자일 경우 (직접 앱을 만들었다면 디폴트로 관리자), 원하신다면 아래 mutation을 사용하여 GraphiQL에서 새로운 유저 계정을 만들 수 있습니다.

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

_NOTE: 계정은 테스트넷 & 메인넷 Trust Cloud 서버간 공유되지 않습니다. 플랫폼 둘 다 사용하고 싶으시면 각 서버마다 개별 계정이 있어야 합니다._

# 다음 단계

이제 게임은 준비 됐습니다. Trusted Cloud에 나타나며 아이템을 만들 수 있는 단계에 거의 도착했습니다. 하지만 그 전에 [Enjin 지갑 및 필요한 자원](wallet-setup.md)이 준비 되었는지 확인해야 합니다.