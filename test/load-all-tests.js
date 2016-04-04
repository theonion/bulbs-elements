// We're using require contexts to get karma-webpack to build all the tests
// in one big webpack bundle. Otherwise karma-webpack builds an individual
// bundle per test file.
//
// The require.context api is going to confuse the hell out of you.
// Check it out here:
// https://webpack.github.io/docs/context.html#require-context
let libContext = require.context('../lib', true, /.test$/);
let elementsContext = require.context('../elements', true, /.test$/);

libContext.keys().forEach(libContext);
//elementsContext.keys().forEach(elementsContext);
