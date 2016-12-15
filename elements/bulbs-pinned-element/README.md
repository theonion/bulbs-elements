# `<bulbs-pinned-element>`

Wrapper that moves content inside a car in a vertical rail relative to the window. Rail takes the height and width of its parent container.

## Attributes

* `offset-top-px` *(optional)* offset in pixels to adjust measurements by. For example, if you have a sticky header, use this to allow the car to stick in the window below the fixed header.

## Example

```html
<parent-element class="foobar">
  <bulbs-pinned-element pinned-to=".foobar">
  </bulbs-pinned-element>
</parent-element>
```
