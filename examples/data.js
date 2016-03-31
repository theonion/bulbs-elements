import inflection from 'inflection';

let context = require.context(
  '../elements', true, /^\.\/[^\/]+\/.+-examples\.js$/
);
let examples = context.keys().map(context).map((example) => example.default);
let data = [];

examples.forEach((example) => {
  let datum = { examples: { } };
  datum.element = example.element;
  Object.keys(example.examples).forEach((key) => {
    example.examples[key].title = key;
    datum.examples[inflection.dasherize(key)] = example.examples[key];
  });
  data.push(datum);
});

export default data
