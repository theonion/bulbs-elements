let examples = {
  element: 'clickhole-medal-tracker',
  examples: {
    'ClickholeMedalTracker': {
      render () {
        return `
          <clickhole-medal-tracker
            src="http://localhost:8080/fixtures/clickhole-medal-tracker/medals.json">
          </clickhole-medal-tracker>`;
      },
    },
    'ClickholeMedalTracker (animations disabled)': {
      render () {
        return `
          <clickhole-medal-tracker
            src="http://localhost:8080/fixtures/clickhole-medal-tracker/medals.json"
            disable-animation >
          </clickhole-medal-tracker>`;
      },
    },
  },
};

export default examples;
