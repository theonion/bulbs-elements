let examples = {
  element: 'campaign-display',
  examples: {
    'CampaignDisplayName': {
      render() {
        return `
          <campaign-display
            display="name" campaign-url="http://localhost:8080/fixtures/campaign-display/campaign.json"
          >
          </campaign-display>
        `;
      },
    },

    'CampaignDisplayImage': {
      render() {
        return `
          <campaign-display
            display="image" campaign-url="http://localhost:8080/fixtures/campaign-display/campaign.json"
          >
          </campaign-display>
        `
      }
    }
  },
};

export default examples;
