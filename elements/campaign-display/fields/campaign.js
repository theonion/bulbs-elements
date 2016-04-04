import { Field, Action } from 'bulbs-elements/store';

const CampaignField = new Field({
  initialState: {
    data: [],
    requestInFlight: false,
  },

  fetchCampaign: new Action(function (state, campaignUrl, store) {
    state.requestInFlight = true;
    this.request(campaignUrl, {
      success: store.actions.fetchCampaignSuccess,
      failure: store.actions.fetchCampaignFailure,
      error: store.actions.fetchCampaignError,
    });
    return state;
  }),

  fetchCampaignSuccess: new Action(function (state, data) {
    state.requestInFlight = false;
    state.data = data;
    return state;
  }),

  fetchCampaignFailure: new Action(function (state, failure) {
    state.requestInFlight = false;
    state.requestFailure = failure;
    return state;
  }),

  fetchCampaignError: new Action(function (state, error) {
    state.requestInFlight = false;
    state.requestError = error;
    return state;
  }),
});

export default CampaignField;
