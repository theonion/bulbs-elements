let examples = {
  element: 'bulbs-poll',
  examples: {
    'Standard Example': {
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
      },
    },
    'Results': {
      render: function () {
        localStorage.setItem('bulbs-poll:example:vote', JSON.stringify({
          id: 293849,
          total_votes: 23,
        }));
        return `
          <bulbs-poll
            src="http://localhost:8080/fixtures/bulbs-poll/poll-data.json"
            poll-id="example"
          >
          </bulbs-poll>
        `;
      },
    },
    'avclub local': {
      render: function () {
        let pollId = '230932';
        localStorage.removeItem(`bulbs-poll:${pollId}:vote`);
        return `
          <bulbs-poll
            src="http://avclub.local/poll/${pollId}.json"
            poll-id="${pollId}"
          >
          </bulbs-poll>
        `;
      },
    }
  },
};
export default examples;
