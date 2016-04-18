const CampaignField = {
  initialState: {
    name: '',
  },

  actions: {
    handleFetchComplete(state, response) {
      return response;
    },
  },
};

export default CampaignField;
