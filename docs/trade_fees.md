# Trade Fee Guide

Setting trade fees for your items is a great way to generate passive income
for your in-game economy. There are a number of ways you can charge trading fees
briefly summarized below:

## Items Used in this Guide

Here are the items we will be using for the examples in this document.

| ITEM     | SETTING      | FEE/%   | TYPE     |
|----------|--------------|---------| -------- |
| Fish     | PER TRANSFER | 0.1 ENJ | Fungible |
| Apple    | PER ITEM     | 1 ENJ   | Fungible |
| Banana   | RATIO CUT    | 10%     | Fungible |
| Mushroom | RATIO EXTRA  | 10%     | Fungible |
| Shield   | PER ITEM     | 1 ENJ   | Non-fungible |

## Enjin Transfer Fees Settings

##### PER_XXXX

These are simple fees paid in ENJ. The fees are always paid by the `SENDER` and
the fees go to the `CREATOR` of the item. Note that if the `CREATOR` is sending or
receiving items no fees will apply in the transaction.

**PER_TRANSFER** - This is a flat fee **per transaction**, payable by `SENDER` to the
`CREATOR`, in ENJ. You could be sending a million `FISH` and it would only cost you
0.1 ENJ for the fee.

**PER_CRYPTO_ITEM** - This is a fee **per item** being transferred, payable by `SENDER` to
the `CREATOR` in ENJ. Watch out when sending `APPLES`, sending 10 will cost you 10 ENJ!

**RATIO_CUT** - A percentage of items is taken from the total being transferred from
the `SENDER` and given to the `CREATOR`. The number of items for the fee is rounded down,
and if the fee is < 1 item, the fee is 0.

**RATIO_EXTRA** - A percentage of items is taken from the `SENDER` in addition to the items
being sold. The percentage of items goes to the `CREATOR`. The number of items for the fee is rounded down, and if the fee is < 1 item, the fee is 0.

## Examples

#### Simple Send
* `0xPAT` sends 17  `FISH` to `0xBOB`. `0xPAT` would pay 0.1 ENJ fees for this send.
* `0xPAT` sends 5 `APPLE` to `0xBOB`. `0xPAT` would pay 5 ENJ fees for this send.
* `0xPAT` sends 10 `BANANA` to `0xBOB`. `0xBOB` would get 9 `BANANA`.
* `0xPAT` send 10 `MUSHROOM` to `0xBOB`. `0xPAT` would pay 1 `MUSHROOM` for this send.
* On these 4 transactions `0xCREATOR` has received **5.1 ENJ**, 1 `BANANA` and 1 `MUSHROOM`.

#### Advanced Send
`0xPAT` sends 5 `FISH`, 2 `APPLE`, 5 `BANANA` and 22 `MUSHROOM` to `0xBOB`. `0xPAT` will pay
a total of 2.1 ENJ, 2 `MUSHROOM` for this type of send. 0 `BANANA` is paid because 0.5 is rounded
down to 0.

#### Trade
During a trade, each party pays the fees associated with moving the items to the other
party if the trade is successful.

For example, if `0xPAT` trades 10 `FISH` for 3 `APPLE` with `0xBOB`, `0xPAT` would pay 0.1 ENJ
in fees for the trade, while `0xBOB` would pay 3 ENJ.

#### Non-fungibles
**RATIO_CUT** and **RATIO_EXTRA** settings for transfer fees don't make sense for non-fungible items, as each non-fungible item is unique.

**PER_TRANSFER** and **PER_CRYPTO_ITEM** basically behave the same way when it comes to NFIs. That is, because each NFI is unique, sending two NFIs (even of the same type) counts as 2
transfers.

For example, if `0xPAT` sends two `SHIELD` to `0xBOB` the cost will be 2 ENJ. If the setting
on `0xSHIELD` was **PER_CRYPTO_ITEM** the cost would also be 2 ENJ. 
