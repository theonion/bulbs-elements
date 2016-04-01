let testsContext = require.context('../elements', true, /.test$/);
testsContext.keys().forEach(testsContext);
