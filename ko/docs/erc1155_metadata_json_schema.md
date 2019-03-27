# ERC1155 메타데이터 JSON Schema

엔진 플랫폼에서 만든 자산은 ERC721 Metadata JSON Schema 기반인 메타데이터를 포함할 수 있습니다. 이 schema에 format 표준 옵션을 추가해서 수천개의 아이템 메타데이터를 관리해야 할 게임의 효율성을 늘릴 예정입니다. 

정확하게 포맷된 메타데이터는 다음 서비스에서 사용됩니다:

* Enjin 지갑
* EnjinX 블록체인 탐색기 
* 게임 클라이언트 / 서버 SDK


## JSON Format
예시:
```json
{
	"name": "Asset Name",
	"description": "Lorem ipsum...",
	"image": "https:\/\/s3.amazonaws.com\/your-bucket\/images\/{id}.png",
	"properties": {
		"simple_property": "example value",
		"rich_property": {
			"name": "Name",
			"value": "123",
			"display_value": "123 Example Value",
			"class": "emphasis",
			"css": {
				"color": "#ffffff",
				"font-weight": "bold",
				"text-decoration": "underline"
			}
		},
		"array_property": {
			"name": "Name",
			"value": [1, 2, 3, 4],
			"class": "emphasis"
		}
	}
}
```
속성 이름, 설명, 그리고 이미지는 ERC721 metadata schema를 따릅니다. JSON 오브젝트의 속성 값은 클라이언트 앱에서 렌더링 됩니다 (엔진지갑과 EnjinX).

### Simple Property
값 필드는 은 string, integer, float 혹은 simple array 이어야 합니다.


### Rich Property
다음 속성을 포함한 오브젝트이어야 합니다:
* 필요한 속성:
  * value
    * string, integer, float, or simple array
* 옵션 속성:
  * name
  * display_value
  * class
  * css

### Arrays

값 필드는 strings, ints 혹은 floats의 간단한 배열일 수 있습니다. 클라이언트 어플리케이션에서 이 내용은 표 형태로 디스플레이 됩니다.

## Specific Metadata URI

모든 토큰ID는 ERC-1155 컨트랙트에서 uri(_id)를 부를때 검색 가능한 메타데이터 URI가 있습니다. 

만약 고유 NFT (대체 불가능한 토큰) ID가 정의된 메타데이터 URI를 가지고 있다면 클라이언트 앱은 이 URI를 쓰는게 좋습니다. 만약 정의되지 않았다면, 클라이언트 앱은 base 토큰 ID의 uri(_id)를 불러 대체불가능한 토큰(NFT) 전체 세트의 디폴트 URI를 회수할 수 있습니다.

## Default URI

Base 토큰에서 디폴트 URI를 정의하는 대체 불가능한 토큰 (NFT)은 URI에서 {id} placeholder을 사용할 수 있습니다. 향후 대체 불가능한 아이템을 사용할때 이 내용은 별개의 특정 ID로 대체됩니다.


예시:
```
yoursite.com/{id}.json
->
yoursite.com/0xbd4818c04f57a2ebc473d74ee06d6e0600000000000000000000000000000001.json
```

## Images

만약 디폴트 URI 이미지 속성이 {id} placeholder을 포함하고 있다면 그 이미지 URL은 이 유형의 토큰 디폴트 이미지로 사용됩니다.

Example:
```
yoursite.com/images/{id}.jpg
->
yoursite.com/images/0xbd4818c04f57a2ebc473d74ee06d6e0600000000000000000000000000000001.jpg
```

원할 경우 **Image** 속성은 placeholder 없는 고정 URI일 수 있습니다.
