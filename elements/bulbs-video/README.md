# `<bulbs-video>`

This element has many related elements. It is up to question whether they should
hoisted up to top-level directories under 'elements/', or left where they are
in `elements/bulbs-video/elements`

There are three stand-alone elements:

* `<bulbs-video>`
* `<bulbs-video-meta>`
* `<bulbs-video-summary>`

These elements all require a `src` attribute that points at the videohub
video json detail endpoint: `//www.onionstudios.com/video/1234.json`.
(Other endpoints may return the same data structure and are valid.)

And five elements in the `<bulbs-video-carousel>` family. These could likely
be extracted into a more generic carousel element, but for now they have been
built specifically to the requirements of the video carousel.

* `<bulbs-video-carousel>`
* `<bulbs-video-carousel-slider>`
* `<bulbs-video-carousel-item>`
* `<bulbs-video-carousel-previous>`
* `<bulbs-video-carousel-next>`

All the `<bulbs-video-carousel-*>` elements MUST be a child of a
`<bulb-video-carousel>` element.

`-carousel-item>` elements MUST be a child of a `-carousel-slider>` element.

`-previous>` and `-next>` elements may be placed anywhere within the
`<bulbs-video-carousel>`. element

`-carousel-item>` takes an `href` attribute. This is used to manage initial state,
such as paging to the correct item on page load. It also makes the element
behave like a link.

An example implementation:

```html
<bulbs-video-carousel class="fancy-video-carousel">
  <header>
    <h1> Fancy Video Carousel </h1>
    <a href="//example.org">Leave the Fancy Video Carousel</a>
  </header>

  <div>
    <bulbs-video src="//videohub/1234.json"></bulbs-video>
    <bulb-video-meta src="//videohub/1234.json"></bulbs-video>
    <button class="fancy-fun"> Fancy Button Just For Fun </button>
  </div>

  <bulb-video-carousel-slider>
    <bulbs-video-carousel-item href="//example.org/carousel/1">
      <bulbs-video-summary src="//videohub/1235.json"></bulbs-video-summary>
    </bulbs-video-carousel-item>

    <bulbs-video-carousel-item href="//example.org/carousel/2">
      <bulbs-video-summary src="//videohub/1236.json"></bulbs-video-summary>
    </bulbs-video-carousel-item>

    <bulbs-video-carousel-item href="//example.org/carousel/3>
      <bulbs-video-summary src="//videohub/1237.json"></bulbs-video-summary>
    </bulbs-video-carousel-item
  </bulb-video-carousel-slider>

  <footer>
    <bulbs-video-carousel-previous></bulbs-video-carousel-previous>
    <bulbs-video-carousel-next></bulbs-video-carousel-next>
  </footer>
</bulbs-video-carousel>
```
