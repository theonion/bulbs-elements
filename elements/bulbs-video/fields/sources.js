import { Field, Action } from 'bulbs-elements/store';

const SourceField = new Field({
  initialState: {
    data: [],
    requestInFlight: false,
  },
  fetchSources: new Action(function (state, url, store) {
    this.request(url, {
      success: store.actions.fetchSourcesSuccess,
      failure: store.actions.fetchSourcesFailure,
      error: store.actions.fetchSourcesError,
    });
  }),
  fetchSourcesSuccess: new Action(function (state, data, store) {
    state.data = data;
    state.requestInFlight = false;
    return state
  }),
  fetchSourcesFailure: new Action(function (state, failure) {
    state.requstFailure = failure;
    state.requestInFlight = false;
    return state;
  }),
  fetchSourcesError: new Action(function (state, error) {
    state.requestError = error;
    state.requestInFlight = false;
    return state;
  }),
});

export default SourceField;
