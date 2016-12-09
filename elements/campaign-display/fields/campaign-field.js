const CampaignField = {
  actions: {
    handleFetchComplete (state, response) {
      state.campaign = {...response};
    },
  },
};

export default CampaignField;
