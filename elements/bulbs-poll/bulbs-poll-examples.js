
let examples = {
  element: 'bulbs-poll',
  examples: {
    'Open For Voting': {
      render: () => {
        return `
          <bulbs-poll
            src="http://localhost:8080/fixtures/bulbs-poll/poll-data.json"
          >
          </bulbs-poll>
        `;
      },
    },
    'Unpublished': {
      render: () => {
        return `
          <bulbs-poll
            src="http://localhost:8080/fixtures/bulbs-poll/unpublished-poll-data.json"
          >
          </bulbs-poll>
        `;
      },
    },
    'Closed': {
      render: () => {
        return `
          <bulbs-poll
            src="http://localhost:8080/fixtures/bulbs-poll/closed-poll-data.json"
          >
          </bulbs-poll>
        `;
      },
    },
    'Cover Image': {
      render: () => {
        return `
          <bulbs-poll
            src="http://localhost:8080/fixtures/bulbs-poll/poll-data-cover-image.json"
          >
          </bulbs-poll>
        `;
      },
    },
    'Request Error': {
      render: () => {
        return `
          <bulbs-poll src="httx://not-a-valid-url:oldsport/">
          </bulbs-poll>
        `;
      },
    },
    'Results': {
      render: () => {
        let src = 'http://localhost:8080/fixtures/bulbs-poll/results-poll-data.json';
        localStorage.setItem(`bulbs-poll:${src}:vote`, JSON.stringify({
          id: 293849,
          total_votes: 23,
          vote: {},
        }));
        return `
          <bulbs-poll
            src="${src}"
          >
          </bulbs-poll>
        `;
      },
    },
    'avclub local': {
      render: () => {
        let pollId = '230936';
        let src = `http://avclub.local/poll/${pollId}/merged.json`;
        //localStorage.removeItem(`bulbs-poll:${src}:vote`);
        return `
          <bulbs-poll
            src="${src}"
          >
          </bulbs-poll>
        `;
      },
    },
    'starwipe local': {
      render: () => {
        let pollId = '2186';
        let src = `http://starwipe.local/poll/${pollId}/merged.json`;
        //localStorage.removeItem(`bulbs-poll:${src}:vote`);
        return `
          <bulbs-poll
            src="${src}"
          >
          </bulbs-poll>
        `;
      },
    },
  },
};
export default examples;
