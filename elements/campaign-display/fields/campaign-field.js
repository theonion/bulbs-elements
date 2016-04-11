const CampaignField = {
  initialState: {},

  actions: {
    handleFetchComplete(state, response) {
      state.clickthrough_url = response.clickthrough_url;
      state.image_id = response.image_id;
      state.image_url = response.image_url;
      state.name = response.name;
      return state;
    },
  },
};

export default CampaignField;
