import { Field, Action } from 'bulbs-elements/store';

const CampaignField = new Field({
  initialState: {
    data: [],
    requestInFlight: false,
  },
  fetchCampaign: new Action(function (state, campaignUrl) {
    this.request(campaignUrl, {
      success: this.actions.fetchCampaignSuccess,
      failure: this.actions.fetchCampaignFailure,
      error: this.actions.fetchCampaignError,
      finally: this.actions.fetchCampaignFinally,
    });
  }),
  fetchCampaignSuccess: new Action(function (state, data) {
    state.data = data;
  }),
  fetchCampaignFailure: new Action(function (state, failure) {
    state.requestFailure = failure;
  }),
  fetchCampaignError: new Action(function (state, error) {
    state.requestError = error;
  }),
  fetchCampaignFinally: new Action(function (state) {
    state.requestInFlight = false;
    return state;
  }),
});

export default CampaignField;
