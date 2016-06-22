export default {
  element: 'rail-player',
  examples: {
    'with channel logo': {
      render () {
        return `
          <rail-player
            style="width: 300px; margin: 0 auto;"
            recirc-url="http://www.onionstudios.com"
            channel='clickhole'
            src="http://localhost:8080/fixtures/rail-player/clickhole-channel.json"
          >
          </rail-player>
        `;
      },
    },
    'without channel logo': {
      render () {
        return `
          <rail-player
            style="width: 300px; margin: 0 auto;"
            recirc-url="http://www.onionstudios.com"
            channel='theonion'
            src="http://localhost:8080/fixtures/rail-player/clickhole-channel.json"
          >
          </rail-player>
        `;
      },
    },
    'with campaign': {
      render () {
        return `
          <rail-player
            style="width: 300px; margin: 0 auto;"
            recirc-url="http://www.onionstudios.com"
            channel='avclub'
            src="http://localhost:8080/fixtures/rail-player/with-campaign.json"
          >
          </rail-player>
        `;
      },
    },
  },
};
