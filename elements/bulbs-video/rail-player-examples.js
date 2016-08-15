export default {
  element: 'rail-player',
  examples: {
    'with ClickHole channel logo': {
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
    'with The Onion channel logo': {
      render () {
        return `
          <rail-player
            style="width: 300px; margin: 0 auto;"
            recirc-url="http://www.onionstudios.com"
            channel='the-onion'
            src="http://localhost:8080/fixtures/rail-player/onion-channel.json"
          >
          </rail-player>
        `;
      },
    },
    'with The A.V. Club channel logo': {
      render () {
        return `
          <rail-player
            style="width: 300px; margin: 0 auto;"
            recirc-url="http://www.onionstudios.com"
            channel='the-av-club'
            src="http://localhost:8080/fixtures/rail-player/avclub-channel.json"
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
            target-campaign-id="1234"
          >
          </rail-player>
        `;
      },
    },
    'with captioning': {
      render () {
        return `
          <rail-player
            style="width: 300px; margin: 0 auto;"
            recirc-url="http://www.onionstudios.com"
            channel='avclub'
            src="http://localhost:8080/fixtures/rail-player/with-captioning.json"
            target-campaign-id="1234"
          >
          </rail-player>
        `;
      },
    },
  },
};
