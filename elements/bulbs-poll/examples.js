let examples = {
  element: 'bulbs-poll',
  examples: {
    'Basic Example': {
      render: function () {
        return `
          <bulbs-poll
            src="http://localhost:8080/fixtures/bulbs-poll/poll-data.json"
          >
          </bulbs-poll>
        `;
      },
    },
    'Cover Image': {
      render: function () {
        return `
          <bulbs-poll
            src="http://localhost:8080/fixtures/bulbs-poll/poll-data-cover-image.json"
          >
          </bulbs-poll>
        `;
      },
    },
    'Request Error': {
      render: function () {
        return `
          <bulbs-poll src="httx://not-a-valid-url:oldsport/">
          </bulbs-poll>
        `;
      }
    }
  },
};

export default examples;
