Usage

with src attr:
```html
<video src="/video.mp4" is="bulbs-cinemagraph" cinemagraph-duration="1.55"/>
```

with source element
```html
<video is="bulbs-cinemagraph" cinemagraph-duration="1.55">
  <source src="/video.mp4"/>
</video>
```
Duration needs to be figured out and set by hand to prevent the ios polyfill from showing a frame of black at the loop seam.
