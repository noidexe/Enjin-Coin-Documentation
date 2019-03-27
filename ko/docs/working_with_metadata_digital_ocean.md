# 메타데이터 작업하기 - Digital Ocean

이 가이드는 [Digital Ocean](https://enj.in/digital-ocean) 클라우드 서비스로 아이템의 JSON 메타데이터와 이미지를 호스팅하는 방법을 설명 합니다. 수많은 데이터 호스팅 방법 중 하나이지만, 아이템 메타데이터의 장점을 충분히 활용하기에는 아직 웹 기술이 낯선 개발자들에게 간단하지만 강력한 방법을 선사 합니다.

메타데이터의 전체 JSON schema는 [여기서](./erc1155_metadata_json_schema.md) 확인 하시면 됩니다.

## 시작하기 

Digital Ocean에 계정을 만듭니다. 계정을 만든 후, 신규 프로젝트를 생성하고, [Space](https://www.digitalocean.com/docs/spaces/) 를 만드세요.

화면은 아래 이미지처럼 보입니다:

![Getting Started](../docs/images/metadata_digitalocean_getting_started.png)

## 파일 업로드하기

Space를 클릭하세요.

이미지를 먼저 업로드하세요. JSON `image` 입력값에 이미지 URL을 넣어야 하기 때문 입니다.

이미지 권한을 퍼블릭으로 설정 하세요.

JSON 데이터가 해당 이미지로 가리키도록 수정하세요: 

```json
{
  "description": "Hello from Digital Ocean!",
  "image": "https://enjintest.sfo2.cdn.digitaloceanspaces.com/shcmeckle_export.png",
  "properties": {
    "Quality": "Common"
  }
}
```

완성된 JSON을 Digital Ocean Space에 업로드 하세요. 그럼 아래 이미지처럼 보입니다: 

![Digital Ocean Upload](../docs/images/metadata_digitalocean_upload.png)

## URI 설정 및 테스트

Unity에서 아이템 선택 후 EDIT을 누르세요. URI 필드에 필요한 내용을 입력하세요.

![Digital Ocean Unity](../docs/images/metadata_digitalocean_unity_uri.png)

플랫폼 API (GraphQL)에서는 URI를 다음 같이 설정할 수 있습니다:

```graphql
mutation createTokenRequest {
  CreateEnjinRequest (
    identity_id: 400,
    type: SET_ITEM_URI,
    set_item_uri_data: {
      token_id: "700000000000010e",
      token_index: 0,
      item_uri: "https://enjintest.sfo2.digitaloceanspaces.com/doubloon%7BI%7D.json"
    }
  ) {
    id,
    encoded_data
  }
}
```

URI 설정은 두가지 방식에서 모두 승인이 필요한 블록체인 트랜잭션입니다.

 