import { makeRequest } from 'bulbs-elements/util';

const CampaignRequestField = {
  initialState: {
    requestInFlight: false,
  },

  actions: {
    fetchCampaign (state, campaignUrl, store) {
      state.requestInFlight = true;
      makeRequest(campaignUrl, {
        credentials: 'include',
        success: (response) => {
          store.actions.fetchCampaignSuccess(response);
          store.actions.handleFetchComplete(response);
        },
        failure: store.actions.fetchCampaignFailure,
        error: store.actions.fetchCampaignError,
      });
      return state;
    },

    fetchCampaignSuccess (state) {
      state.requestInFlight = false;
    },

    fetchCampaignFailure (state, response) {
      state.requestInFlight = false;
      state.requestFailure = response;
      return state;
    },

    fetchCampaignError (state, response) {
      state.requestInFlight = false;
      state.networkError = response;
      return state;
    },
  },
};

export default CampaignRequestField;
