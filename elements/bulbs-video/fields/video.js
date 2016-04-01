import { Field, Action } from 'bulbs-elements/store';

const VideoField = new Field({
  initialState: {
    data: {},
    requestInFlight: false,
  },
  fetchVideoData: new Action(function (state, url, store) {
    this.request(url, {
      success: store.actions.fetchVideoDataSuccess,
      failure: store.actions.fetchVideoDataFailure,
      error: store.actions.fetchVideoDataError,
    });
  }),
  fetchVideoDataSuccess: new Action(function (state, data, store) {
    state.data = data;
    state.requestInFlight = false;
    return state
  }),
  fetchVideoDataFailure: new Action(function (state, failure) {
    state.requstFailure = failure;
    state.requestInFlight = false;
    return state;
  }),
  fetchVideoDataError: new Action(function (state, error) {
    state.requestError = error;
    state.requestInFlight = false;
    return state;
  }),
});

export default VideoField;
