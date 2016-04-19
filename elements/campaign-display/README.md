Campaign Display
================

The `campaign-display` renders campaign sponsorship information for a given campaign.  Given a valid campaign URL, `campaign-display` will render the campaign information including the sponsor name, sponsor logo and premable text. You know, this thing:

![](https://raw.githubusercontent.com/theonion/bulbs-elements/master/examples/fixtures/campaign-display/campaign-display-example.png)


Examples:
---------

### Default campaign-display

```html
<campaign-display
  placement="my-custom-placement"
  src="http://localhost:8080/fixtures/campaign-display/campaign.json"
  preamble-text="Presented by"></campaign-display>
```
will produce:

```html
<div class="campaign-display" data-label="http://example.com">
  <div data-ad-unit="campaign-pixel" data-targeting="{"dfp_placement":"my-custom-placement"}"></div>
  <div class="campaign-display-logo">
    <a href="http://example.com">
      <div data-type="image" data-image-id="1234" data-crop="original">
        <div></div>
      </div>
    </a>
  </div>
  <span class="campaign-display-preamble">Presented by</span>
  <span class="campaign-display-sponsor-name">
    <a href="http://example.com">
      <span>Example Campaign</span>
    </a>
  </span>
</div>
```

### No logo

```html
<campaign-display
  placement="my-custom-placement"
  src="http://localhost:8080/fixtures/campaign-display/campaign.json"
  preamble-text="Sponsored by"
  name-only></campaign-display>
```

will produce: 

```html
<div class="campaign-display" data-label="http://example.com">
  <div data-ad-unit="campaign-pixel" data-targeting="{"dfp_placement": "my-custom-placement"}"></div>
  <span class="campaign-display-preamble">Sponsored by</span>
  <span class="campaign-display-sponsor-name">
    <a href="http://example.com">
      <span>Example Campaign</span>
    </a>
  </span>
</div>
```

### Logo only

```html
<campaign-display
  placement="my-custom-placement"
  src="http://localhost:8080/fixtures/campaign-display/campaign.json"
  preamble-text="Sponsored by"
  image-only></campaign-display>
```

will produce: 

```html
<div class="campaign-display" data-label="http://example.com">
  <div data-ad-unit="campaign-pixel" data-targeting="{"dfp_placement": "my-custom-placement"}"></div>
  <div class="campaign-display-logo">
    <a href="http://example.com">
      <div data-type="image" data-image-id="1234" data-crop="original">
        <div></div>
      </div>
    </a>
  </div>
  <span class="campaign-display-preamble">Sponsored by</span>
  <span class="campaign-display-sponsor-name">
    <a href="http://example.com">
      <span>Example Campaign</span>
    </a>
  </span>
</div>
```
