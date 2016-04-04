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
    state.data = data;
    state.requestInFlight = false;
    return state;
  }),

  fetchCampaignFailure: new Action(function (state, failure) {
    state.requestFailure = failure;
    state.requestInFlight = false;
    return state;
  }),

  fetchCampaignError: new Action(function (state, error) {
    state.requestError = error;
    state.requestInFlight = false;
    return state;
  }),
});

export default CampaignField;
