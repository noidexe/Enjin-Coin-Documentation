# Managing Your Tokens

Once your tokens are minted you may need to edit, send, or melt them down and recover the Enjin Coin from inside.

```gql
mutation changeURI {
CreateEnjinRequest (
identity_id: XXX,
type: SET_ITEM_URI,
set_item_uri_data:
{
token_id: "xxxxxxxxxxxxxxxx",
token_index: "xxxxxxxxxxxxxxxx",
item_uri: "https://xxxxxxxxxxxxxxxx.com/xxxxxxxxxxxxxxxx"
})
{
id
encoded_data
state
}
}
```
