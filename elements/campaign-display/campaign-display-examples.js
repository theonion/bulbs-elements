let examples = {
  element: 'campaign-display',
  examples: {
    'CampaignDisplay': {
      render () {
        return `
          <campaign-display
            placement="my-custom-placement"
            src="http://localhost:8080/fixtures/campaign-display/campaign.json"
            preamble-text="Presented by"
          >
          </campaign-display>
        `;
      },
    },

    'CampaignDisplay (no image)': {
      render () {
        return `
          <campaign-display
            placement="my-custom-placement"
            src="http://localhost:8080/fixtures/campaign-display/campaign.json"
            preamble-text="Sponsored by"
            name-only
          >
          </campaign-display>
        `;
      },
    },

    'CampaignDisplay (no name)': {
      render () {
        return `
          <campaign-display
            placement="my-custom-placement"
            src="http://localhost:8080/fixtures/campaign-display/campaign.json"
            preamble-text="Sponsored by"
            image-only
          >
          </campaign-display>
        `;
      },
    },

    'CampaignDisplay (campaign not found)': {
      render () {
        return `
          <campaign-display
            placement="my-custom-placement"
            src="http://localhost:8080/fixtures/campaign-display/missing-campaignx.json"
            preamble-text="Sponsored by"
            image-only
          >
          </campaign-display>
        `;
      },
    },
  },
};

export default examples;
