# ERC1155 Metadata JSON Schema

Assets made on the Enjin Platform may contain metadata that is based on the ERC721 Metadata JSON Schema. We are adding an optional formatting standard to this schema to increase efficiency for games that need to manage metadata for thousands of items.

Correctly formatted metadata is used by:
* Enjin Wallet
* EnjinX Blockchain Explorer
* The Game Client / Server via SDKs

## JSON Format
Example:
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
The properties name, description and image follow the ERC721 metadata schema. Values in the properties JSON object will be rendered in client applications (Enjin Wallet and EnjinX).

### Simple Property
Value must be a string, integer, float, or simple array.

### Rich Property
Must be an object containing:
* Required Properties:
  * value
    * string, integer, float, or simple array
* Optional Properties
  * name
  * display_value
  * class
  * css

### Arrays
The value field may be a simple array of strings, ints, or floats. These will be displayed in table form in the client application.

## Specific Metadata URI
Any token ID may have a metadata URI that can be retrieved by calling uri(_id) on the ERC-1155 contract.

If an individual Non-Fungible token ID has a metadata URI defined, client apps should use this URI. If not defined, client apps should call uri(_id) on the base token id to retrieve the Default URI for the entire set of Non-Fungible tokens.

## Default URI
A Non-Fungible token that defines a Default URI in its base token has the option of using an {id} placeholder in the URI itself. This will get replaced with the distinct ID when accessing NF items.

Example:
```
yoursite.com/{id}.json
->
yoursite.com/0xbd4818c04f57a2ebc473d74ee06d6e0600000000000000000000000000000001.json
```

## Images
If the Default URI contains an image property that in turn contains the {id} placeholder, the image url will be used as the default image for all tokens of this type.

Example:
```
yoursite.com/images/{id}.jpg
->
yoursite.com/images/0xbd4818c04f57a2ebc473d74ee06d6e0600000000000000000000000000000001.jpg
```

The **image** property can also be a static URI without the placeholder, as desired.
