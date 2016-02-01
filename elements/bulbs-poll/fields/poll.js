import { Field, Action } from 'bulbs-elements/store';

const PollField = new Field({
  initialState: {
    data: {
      answers: [],
    },
    requestInFlight: false,
  },
  fetchPollData: new Action(function (state, src, store) {
    src || (src = store.src);
    store.src = src;
    let request = this.request(src, {
      success: store.actions.fetchPollDataSuccess,
      failure: store.actions.fetchPollDataFailure,
      error: store.actions.fetchPollDataError,
    });
    state.requestInFlight = true;
    return state;
  }),
  fetchPollDataSuccess: new Action(function (state, data) {
    state.data = data;
    state.requestInFlight = false;
    return state;
  }),
  fetchPollDataFailure: new Action(function (state, failure) {
    state.requestFailure = failure;
    state.requestInFlight = false;
    return state;
  }),
  fetchPollDataError: new Action(function (state, error) {
    state.requestError = error;
    state.requestInFlight = false;
    return state;
  }),
  resetFetchPollData: new Action(function (state, _null, store) {
    state.requestInFlight = false;
    state.requestFailure = undefined;
    state.requestError = undefined;
    setImmediate(store.actions.fetchPollData);
    return state;
  }),
});

export default PollField;
