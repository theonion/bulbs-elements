export default {
  element: 'bulbs-scroll-top',
  examples: {
    'Basic Example': {
      // Return an html string from the render function
      // This is your example template.
      // Need fixture data? Place files in the directory:
      //  examples/fixtures/my-element/
      //
      // Fixture data can be loaded in examples:
      //    <my-example src="http://localhost:8080/fixtures/my-element/foo.json">
      render () {
        return `
          <bulbs-scroll-top
            attribute="value"
          >
          </bulbs-scroll-top>
        `;
      },

      /*
      Use before/after render calbacks to make modifications to the DOM
      for your example.

      before (container) => {

      },

      after (container) => {

      },
      */
    },
  },
};
