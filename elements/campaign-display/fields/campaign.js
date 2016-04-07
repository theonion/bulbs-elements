import { makeRequest } from 'bulbs-elements/util';
const CampaignField = {
  initialState: {
    data: [],
    requestInFlight: false,
  },

  actions: {
    fetchCampaign(state, campaignUrl, store) {
      state.requestInFlight = true;
      makeRequest(campaignUrl, {
        success: store.actions.fetchCampaignSuccess,
        failure: store.actions.fetchCampaignFailure,
        error: store.actions.fetchCampaignError,
      });
      return state;
    },

    fetchCampaignSuccess(state, data) {
      state.data = data;
      state.requestInFlight = false;
      return state;
    },

    fetchCampaignFailure(state, failure) {
      state.requestFailure = failure;
      state.requestInFlight = false;
      return state;
    },

    fetchCampaignError(state, error) {
      state.requestError = error;
      state.requestInFlight = false;
      return state;
    },
  },
};

export default CampaignField;
