let examples = {
  element: 'bulbs-video',
  examples: {
    'Clickhole Example': {
      render: () => {
        return `
          <bulbs-video
            src="http://localhost:8080/fixtures/bulbs-video/clickhole.json"
          >
          </bulbs-video>
        `;
      },
    },
    'VAST HTML5 Example': {
      render: () => {
        return `
          <bulbs-video
            src="http://localhost:8080/fixtures/bulbs-video/vast-html5.json"
          >
          </bulbs-video>
        `;
      },
    },
    'videohub.local example': {
      render () {
        return `
          <bulbs-video
            twitter-handle="avclub"
            src="//videohub.local/video/3916.json"
          >
          </bulbs-video>
        `;
      },
    },
    'Special Coverage Main': {
      render () {
        return `
          <bulbs-video
            twitter-handle="avclub"
            src="http://localhost:8080/fixtures/bulbs-video/special-coverage.json"
            target-host-channel="specialcoverage_main"
            target-special-coverage="food"
            target-campaign-id="12345"
          >
          </bulbs-video>
        `;
      },
    },
    'Muted, autoplay player': {
      render () {
        return `
          <bulbs-video
            twitter-handle="avclub"
            src="http://localhost:8080/fixtures/bulbs-video/special-coverage.json"
            autoplay muted
          >
          </bulbs-video>
        `;
      },
    },
    'Rail player (LEGACY, pre-rMVP)': {
      render () {
        return `
          <bulbs-video
            src="http://localhost:8080/fixtures/bulbs-video/clickhole.json"
            target-host-channel="right_rail"
            target-campaign-number="campaign_605759"
            autoplay
            muted
          >
          </bulbs-video>
        `;
      },
    },
    'VTT Captioning Example': {
      render () {
        return `
          <bulbs-video
            src="http://localhost:8080/fixtures/bulbs-video/vtt-captioning.json"
            target-host-channel="right_rail"
            target-campaign-number="campaign_605759"
            autoplay
            muted
          >
          </bulbs-video>
        `;
      },
    },
    'Embedded example, no-ad plugin': {
      render () {
        return `
          <bulbs-video
            src="http://localhost:8080/fixtures/bulbs-video/vast-html5.json"
            embedded
          >
          </bulbs-video>
        `;
      },
    },
    'Lazy Load': {
      render () {
        return `
          <marquee
              scrollamount="10"
              style="
                height: 1000px;
                font-size: 50px;
                text-align: center;
              ">
            SPACE FOR LAZY LOADING EMULATION. SCROLL TO SEE THE VIDEO.
          </marquee>
          <bulbs-video
            src="http://localhost:8080/fixtures/bulbs-video/clickhole.json">
          </bulbs-video>
        `;
      },
    },
  },
};

export default examples;
