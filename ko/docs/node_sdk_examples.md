# Node SDK 예시

## 시작하기

Node SDK repository: https://github.com/enjin/Enjin-Node-SDK

## Example 1 - Check Inventory

아이템 인벤토리를 확인하려면 아이덴티티를 통해 플랫폼에게 아이템 목록을 불러오라고 요청합니다. 참고로, 게임 계정에 연결 가능한 이더리움 주소는 한번에 한 개 뿐입니다. 이 쿼리는 모든 게임의 아이템 목록을 불러옵니다.


```javascript
// Check the items owned by a specific user.
async function retrieveInventory () {
  var user = await new User(CREDENTIALS_PATH);
  var identityId = user.getIdentityIds()[0];
  var inventory = await user.getItemsForIdentityId(identityId);

  console.log("Inventory:");
  for (var i = 0; i < inventory.length; i++) {
    var item = inventory[i];
    if (item.balance > 0) {
      if (item.nonFungible) {
        console.log(item.name + " (" + item.index + ") x " + item.balance);
      } else {
        console.log(item.name + " x " + item.balance);
      }
    }
  }
};
```

다음 예시는 관리자 유저를 통해 특정 주소의 인벤토리를 확인하는 방법입니다: 

```javascript
 // Use an admin user to query specific addresses.
 async function queryAddress () {
   var admin = await new Admin(CREDENTIALS_PATH);
   var address = admin.getAddresses()[0];
   console.log("Inventory for " + address + ":");

   var inventory = await admin.getItemsForEthereumAddress(address);
   for (var i = 0; i < inventory.length; i++) {
     var item = inventory[i];
     if (item.balance > 0) {
       if (item.nonFungible) {
         console.log(item.name + " (" + item.index + ") x " + item.balance);
       } else {
         console.log(item.name + " x " + item.balance);
       }
     }
   }
 };
 ```
