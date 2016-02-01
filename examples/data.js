import inflection from 'inflection';

let context = require.context('../elements', true, /^\.\/[^\/]+\/examples\.js$/);
let examples = context.keys().map(context).map((example) => example.default);

examples.forEach((example) => {
  Object.keys(example.examples).forEach((key) => {
    example.examples[key].title = key;
    example.examples[inflection.dasherize(key)] = example.examples[key];
    delete example.examples[key];
  });
});

export default examples
