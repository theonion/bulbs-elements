import { makeRequest } from 'bulbs-elements/util';

const CampaignRequestField = {
  initialState: {
    requestInFlight: false,
  },

  actions: {
    fetchCampaign(state, campaignUrl, store) {
      state.requestInFlight = true;
      makeRequest(campaignUrl, {
        credentials: 'include',
        success: store.actions.fetchCampaignSuccess,
        failure: store.actions.fetchCampaignFailure,
        error: store.actions.fetchCampaignError,
      });
      return state;
    },

    fetchCampaignSuccess(state, response, store) {
      state.requestInFlight = false;
      setImmediate(() => store.actions.campaign.handleFetchComplete(response));
    },

    fetchCampaignFailure(state, response) {
      state.requestInFlight = false;
      state.requestFailure = response;
      return state;
    },

    fetchCampaignError(state, response) {
      state.requestInFlight = false;
      state.networkError = response;
      return state;
    },
  },
};

export default CampaignRequestField;
