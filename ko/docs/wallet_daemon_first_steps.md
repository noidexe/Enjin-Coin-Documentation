# Enjin Wallet Daemon 첫 단계

Enjin 지갑 데몬은 Enjin Trusted Cloud 아이덴티티에 연동된 이더리움 주소를 관리하는 유틸리티입니다. Trusted Cloud에 트랜잭션이 제출되면 지갑 데몬이 그 트랜잭션을 받고, 서명 후, 다시 Trusted Cloud로 보냅니다.

## 새로운 지갑 생성

지갑 데몬을 초기화 할 때 추천하는 방법입니다.

`Node src/main.js account new` 실행
콘솔에 새로운 지갑 주소가 적힙니다

**비밀번호를 꼭 백업하고 안전한 곳에 보관하세요! 아니면 계정을 복구할 방법이 없습니다.**

## 기존 프라이벗 키 Import 하기 

### Enjin Wallet (엔진 지갑)에서 import 하기

Enjin 지갑은 Ledger (ETH) _HD derivation path_ (`m/44'/60'/0'`) 를 사용합니다. MyEtherWallet을 사용해서 12단어 복구문으로 프라이벗 키를 다시 만들 수 있습니다. 

이 방법은 불안정하기 때문에 사용할 경우 프라이벗키가 안전하지 않은 사이트에 노출될 수 있다는 점을 반드시 감안하셔야 합니다. 리스크를 완화하기 위해 추천드리는 건 MyEtherWallet의 프라이벗 카피를 다음 링크에서 배치하는 것입니다: <https://github.com/kvhnuke/etherwallet/releases>

만약 이 방식을 택할 경우 “View Wallet Info/지갑 정보 보기" 를 클릭하신 후 화면에 나오는 지시 사항을 따르세요:

* Mnemonic/니모닉 문구
* 12 단어를 붙여놓기로 입력하고 비밀번호 입력필드를 비워두는 것
* _Ledger (ETH)_ derivation path 선택
* 추천 목록에서 올바른 주소 선택

### From MetaMask

계정 세부 사항에 들어간 후 ‘프라이벗 키 내보내기' 선택

### From Parity/Geth

클라이언트 설치가 디폴트 데이터 폴더를 사용할 경우 키는 그 폴더에 보관되어 있습니다:

#### Parity

* Windows: `%HOMEPATH%/AppData/Roaming/Parity/Ethereum/keys`
* macOS: `~/Library/Application\ Support/io.parity.ethereum/keys`
* Linux: `$HOME/.local/share/io.parity.ethereum/keys`

#### Geth

* Windows: `%APPDATA%\Ethereum\keystore`
* macOS: `~/Library/Ethereum/keystore`
* Linux: `~/.ethereum/keystore`

Each key is stored in an extensionless json file. Here again, you can use "MyEtherWallet" to extract the private keys.

각 키는 확장되지 않은 json 파일에 보관 됩니다. 여기서도 역시 ‘MyEtherWallet’을 사용해서 프라이벗 키를 추출할 수 있습니다. 

이 방법은 불안정하기 때문에 사용할 경우 프라이벗키가 안전하지 않은 사이트에 노출될 수 있다는 점을 반드시 감안하셔야 합니다. 리스크를 완화하기 위해 추천드리는 건 MyEtherWallet의 프라이벗 카피를 다음 링크에서 배치하는 것입니다: <https://github.com/kvhnuke/etherwallet/releases>

만약 이 방식을 택할 경우 “View Wallet Info/지갑 정보 보기" 를 클릭하신 후 화면에 나오는 지시 사항을 따르세요:

* Keystore / JSON File
* 파일 선택 후 비밀번호를 입력하세요 

## Link To Trusted Cloud

1.	Trusted Cloud 에서 계정 생성 
2.	지갑 데몬으로 관리하고 싶은 어플리케이션용 아이덴티티 생성.
3.	아이덴티티 `<CODE>`에서 연결 코드 복사 
4.	`Node src/main.js link <CODE>` 실행

## Run The Wallet Daemon
Run `node src/main.js`
