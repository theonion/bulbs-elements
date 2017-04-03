let examples = {
  element: 'bulbs-video',
  examples: {
    'Clickhole without series': {
      render: () => {
        return `
          <bulbs-video
            src="http://localhost:8080/fixtures/bulbs-video/clickhole.json"
          >
          </bulbs-video>
        `;
      },
    },
    'Clickhole with series': {
      render: () => {
        return `
          <bulbs-video
            src="http://localhost:8080/fixtures/bulbs-video/clickhole-series.json"
          >
          </bulbs-video>
        `;
      },
    },
    'Sponsored Special Coverage': {
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
            src="http://localhost:8080/fixtures/bulbs-video/clickhole.json"
            embedded
          >
          </bulbs-video>
        `;
      },
    },
    '`disable-ads` Example': {
      render () {
        return `
          <bulbs-video
            src="http://localhost:8080/fixtures/bulbs-video/clickhole.json"
            disable-ads
          >
          </bulbs-video>
        `;
      },
    },
    'Lazy Load': {
      render () {
        return `
          <div
              style="text-align: center;">
            Open the console<br>
            And inspect the videos<br>
            To see lazy load<br>
          </div>
          <marquee
              scrollamount="10"
              style="
                height: 1000px;
                font-size: 50px;
                text-align: center;
              ">
            SPACE FOR LAZY LOADING EMULATION. SCROLL TO SEE THE VIDEO.
          </marquee>
          <div>The following video is not lazy loaded:</div>
          <bulbs-video
              src="http://localhost:8080/fixtures/bulbs-video/clickhole.json"
              disable-lazy-loading>
          </bulbs-video>
          <div>The following video is lazy loaded:</div>
          <bulbs-video
              src="http://localhost:8080/fixtures/bulbs-video/clickhole.json">
          </bulbs-video>
        `;
      },
    },
    'American Voter Example': {
      render () {
        return `
          <bulbs-video
            src="http://localhost:8080/fixtures/bulbs-video/american-voter.json"
            embedded
            disable-sharing
            no-cover
          >
          </bulbs-video>
        `;
      },
    },
  },
};

export default examples;
