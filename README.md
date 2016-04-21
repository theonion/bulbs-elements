# Bulbs Elements

<img src="http://webcomponents.org/img/logo.svg"  width="40" /> <img src="http://assets.onionstatic.com/onion/static/images/onion_logo.png" width="200" />

> Sharpen the knife.

<hr />

Bulbs Elements combines the `document.registerElement` spec and the `React.js` library.

A unidirectional state flow mechanism is also provided.

Builds are processed by Webpack.

Tests run in Karma.

## Installing

```
bower install https://github.com/theonion/bulbs-elements.git
```

You will need files from the `dist/` directory.

`dist/vendor.bundle.js`

This file contains the polyfills and other utilities. You will need this
no matter which elements you intend to use.

`dist/<element-name>.js`

`dist/<element-name>.bulbs-cms.js`

Elements are built in two flavors. For public consumption and for
placement in the editor in bulbs-cms. The cms version does not have
dynamic content.

`dist/<element-name>.css`

Element css should be included AFTER the main css of the application
you are installing into. Bulbs elements employ a broad, but low specificity
css reset that can be easily overridden. So if you include the element
css before the main sitestyles, you'll lose the reset.

Per element custom styling should be included after the bulbs-element styles.

### Creating a new release

To create a new release: stop any running build scripts and ensure you're on the ```master``` branch, then:
```bash
$ ./scripts/tag-and-release <versioning-type>
```
where ```versioning-type``` is one of ```major```, ```minor```, or ```patch```.
See [semver](http://semver.org/) for an explanation of what each of these types
of versionings mean.

This will build, version up, and push the dist to a tag identified by the new version.

## Development
Prepare your development environment:

```bash
$ ./scripts/dev-setup
```

## Common Components

Some components can be used in more than one element.
Those components live at `lib/bulbs-elements/components`

### `<CroppedImage>`

*props*

* `crop`: `<String>` one of: `original` (default), `16x9`, `3x1`, `1x1` 
* `imageId`: `<Number>` (required) The betty-cropper image id.

### Generators

Bulbs Elements comes with code generators to help you develop components.

#### Generating an Element

`scripts/generate-element`

#### Generating Store Fields

`scripts/generate-field`

#### Generating Element Components

`scripts/generate-component`

### Making HTTP Requests

### Testing

To do a single test run:
```bash
$ npm test
```

To start continuous testing:
```bash
$ npm run karma
```

### Examples
