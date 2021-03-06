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
            disable-animation>
          </clickhole-medal-tracker>`;
      },
    },
    'ClickholeMedalTracker (animation options)': {
      render () {
        return `
          <clickhole-medal-tracker
            src="http://localhost:8080/fixtures/clickhole-medal-tracker/medals.json"
            stagger-delay="500"
            update-interval="5000"
            enter-animation="elevator"
            leave-animation="accordion">
          </clickhole-medal-tracker>`;
      },
    },
  },
};

export default examples;
