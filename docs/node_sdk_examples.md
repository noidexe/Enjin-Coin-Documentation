# Node SDK Examples

## Getting Started

The repository for the Node SDK is here: https://github.com/enjin/Enjin-Node-SDK

## Example 1 - Check Inventory

To check our own item inventory. We get our identity and use that to ask the platform
to list our items.  Note that only one Ethereum address can be linked to a game account at a time. This query returns all the items from all games.

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

This example uses the admin user to check the inventory for a specific addresses
that it knows about.
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
