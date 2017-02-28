# bulbs-article-body

Provides some basic functionality every article body element needs. The element this is applied to must be a div.

Example usage:

```
<div is="bulbs-article-body">
  <!-- your article body content -->
</div>
```

## Dingbats
A span will be added to the last element in the article body with a class `site-dingbat`. The span will initially be empty, so style the `site-dingbat` class to customize it and get it to show up.

## iframe Resizing
All elements matching `iframe.onionstudios-playlist` will be registered with [iFrameResize](https://github.com/davidjbradshaw/iframe-resizer).
