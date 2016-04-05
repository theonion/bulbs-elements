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

## Releasing

Bump the version in `package.json`.

Run `scripts/tag-and-release`.

Make sure you are not running any build scripts while cutting a release. (such as `scripts/develop-and-test`)

`tag-and-release` will:

1. checkout your current commit as a detached head
1. stash your local `dist/` folder
1. run a production build
1. commit the `dist/` directory
1. tag the commit with the version from `package.json`
1. push the tag to github
1. checkout the branch you were working on originally
1. restory your local `dist/` folder

## Development
Prepare your development environment:

```bash
$ ./scripts/dev-setup
```

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

### Examples

## Crossing The Boundary
### interop with angular.js
