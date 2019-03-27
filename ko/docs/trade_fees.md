# 거래 수수료 가이드

아이템 거래 수수료를 설정하면 게임 경제에서 수동적 수익을 창출할 수 있습니다. 아래에 거래 수수료 방법 몇가지를 간단하게 요약했습니다:

## 가이드에서 사용할 아이템

이 문서에서 예시로 사용할 아이템입니다.

| ITEM     | SETTING      | FEE/%   | TYPE     |
|----------|--------------|---------| -------- |
| Fish     | PER TRANSFER | 0.1 ENJ | Fungible |
| Apple    | PER ITEM     | 1 ENJ   | Fungible |
| Banana   | RATIO CUT    | 10%     | Fungible |
| Mushroom | RATIO EXTRA  | 10%     | Fungible |
| Shield   | PER ITEM     | 1 ENJ   | Non-fungible |

## Enjin 전송 수수료 설정
                                                                                         
##### PER_XXXX

ENJ으로 지불하는 금액입니다. 이 금액은 늘 `SENDER` 이 지불하고 `CREATOR` 이 받습니다. 참고로 `CREATOR`이 아이템을 보내거나 받을 경우 트랜잭션에 수수료가 적용되지 않습니다.

**PER_TRANSFER** - **트랜잭션 당** 발생하는 고정 비용입니다. `SENDER` 이 `CREATOR` 에게 ENJ으로 지불할 수 있습니다. 예를 들어 물고기 100만개를 보내도 수수료는 0.1ENJ만 내도 됩니다.

**PER_CRYPTO_ITEM** - 전송하는 **아이템 당** 발생하는 비용입니다. `SENDER` 이 `CREATOR` 에게 ENJ으로 지불할 수 있습니다. 예를 들어 사과를 전송할 경우, 10개를 보내면 10ENJ을 지불해야 합니다. 

**RATIO_CUT** - `SENDER`이 보내는 아이템 총 수량의 일부 퍼센티지를 `CREATOR`에게 지불합니다. 수수료에 해당되는 아이템 갯수는 반내림으로 계산합니다. 또한 수수료가 < 1개 아이템일 경우 수수료는 0 입니다.

**RATIO_EXTRA** - `SENDER`이 보내는 아이템 갯수의 일정 비율이 추가적으로 청구 됩니다. 그 추가 비율의 아이템은 `CREATOR`에게 갑니다. 수수료에 해당되는 아이템의 갯수는 반내림으로 계산합니다. 또한 수수료가 <1개 아이템일 경우 수수료는 0입니다.

## 예시

#### Simple Send
* `0xPAT` 이 17 개의 `FISH` 를 `0xBOB`에게 보냅니다. `0xPAT`이 전송 수수료로 지불할 금액은 0.1 ENJ입니다.
* `0xPAT` 이 5 개의 `APPLE` 을 `0xBOB`에게 보냅니다. `0xPAT` 이 전송 수수료로 지불할 금액은 5 ENJ입니다.
* `0xPAT` 이 10 개의 `BANANA` 를 `0xBOB`에게 보냅니다. `0xBOB` 은 9 개의 `BANANA`를 받습니다.
* `0xPAT` 이 10 개의 `MUSHROOM` 을 `0xBOB`에게 보냅니다. `0xPAT` 은 1 개의 `MUSHROOM` 을 지불해야 합니다.

* 이 4 번의 트랜잭션에서 `0xCREATOR` 는 **5.1 ENJ**, 1 개의`BANANA` 그리고 1 개의 `MUSHROOM`을 받았습니다.

#### 고급 전송

`0xPAT` 은 `FISH` 5개, `APPLE` 2개, `BANANA` 5개 그리고 `MUSHROOM` 22개를 `0xBOB`에게 보냅니다. `0xPAT`은 총 2.1ENJ와 `MUSHROOM` 2개를 전송 수수료로 지불합니다. `BANANA` 전송 수수료를 따로 지불하지 않는 이유는 0.5는 반내림 하면 0이기 때문입니다.

#### 거래

서로 거래를 할 경우, 양쪽에서 아이템 전송에 필요한 수수료를 지불해야 합니다. 

예를 들어, `0xPAT` 이 `FISH` 10개를 `0xBOB`의 `APPLE` 3개랑 거래할 경우 `0xPAT`은 0.1ENJ 수수료를 지불하고 `0xBOB`은 3ENJ를 지불 합니다.

#### 대체 불가능한 아이템

대체 불가능한 아이템의 거래 수수료를 **RATIO_CUT** 그리고 **RATIO_EXTRA** 로 설정하면 안되는 이유는 대체 불가능한 아이템은 각각 유니크하기 때문입니다.

**PER_TRANSFER** 그리고 **PER_CRYPTO_ITEM** , 이 두 가지 설정은 대체 불가능한 아이템일 경우 동일하게 행동 합니다. 대체 불가능한 아이템은 각각 유니크 하기 때문에 2개를 보낼 경우 (같은 아이템 타입일지라도) 2개의 개별 전송으로 계산 됩니다.

For example, if `0xPAT` sends two `SHIELD` to `0xBOB` the cost will be 2 ENJ. If the setting
on `0xSHIELD` was **PER_CRYPTO_ITEM** the cost would also be 2 ENJ. 

예를 들어 `0xPAT`이 `SHIELD` 2개를 `0xBOB`한테 보내면 수수료는 2ENJ입니다. `0xSHIELD` 수수료 설정이 **PER_CRYPTO_ITEM** 이라도 수수료는 2ENJ입니다.


