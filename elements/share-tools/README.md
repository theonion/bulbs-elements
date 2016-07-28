# `<share-tools>`

Attributes
  * `share-url`  Used in all nested share tools. Default: `window.location.toString()`
  * `share-title` *(required)* sed in all nested share tools.

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

# Clicktracking

The `<share-via-*>` elements have a `data-track-label` attribute set (Facebook, Twitter, Email). Set `data-track-action` and `data-track-category` somewhere above them and clicktracking will be your reward.

# Example:

```html
<share-tools
  share-title="Share This!"
  share-url="//example.org/share-me"
  data-track-category="Super Cool Category"
  data-track-action="Share"
>
  <share-via-facebook icon label></share-via-facebook>
  <share-via-twitter icon label twitter-handle="theonion"></share-via-twitter>
  <share-via-email icon label message="via theonion.com"></share-via-email>
</share-tools>
```

