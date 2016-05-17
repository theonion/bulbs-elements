# `<share-tools>`

Attributes
  * `share-url` *(required)* Used in all nested share tools.
  * `share-title` *(required)* Used in all nested share tools.

#### `<share-via-*>`

All elements that named `<share-via-*>` take an `icon` and `label` attribute.

Attributes
  * `icon` Render an icon for the share tool.
  * `label` Render a label for the share tool.

#### `<share-via-facebook>`
  * _No attributes_

#### `<share-via-twitter>`

Attributes
  * `twitter-handle` *(required)* Used to construct the tweet share message.

#### `<share-via-email>`

Attributes
  * message (required)* Used to construct the email share message.


# Example:

```html
<share-tools
  share-title="Share This!"
  share-url="//example.org/share-me"
>
  <share-via-facebook icon label></share-via-facebook>
  <share-via-twitter icon label twitter-handle="theonion"></share-via-twitter>
  <share-via-email icon label message="via theonion.com"></share-via-email>
</share-tools>
```
