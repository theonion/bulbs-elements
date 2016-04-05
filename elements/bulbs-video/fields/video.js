import util from 'bulbs-elements/util';

const VideoField = {
  initialState: {
    data: {},
    requestInFlight: false,
  },
  fetchVideoData (state, url, store) {
    util.makeRequest(url, {
      success: store.actions.fetchVideoDataSuccess,
      failure: store.actions.fetchVideoDataFailure,
      error: store.actions.fetchVideoDataError,
    });
  },
  fetchVideoDataSuccess (state, data) {
    state.data = data;
    state.requestInFlight = false;
    return state;
  },
  fetchVideoDataFailure (state, failure) {
    state.requstFailure = failure;
    state.requestInFlight = false;
    return state;
  },
  fetchVideoDataError (state, error) {
    state.requestError = error;
    state.requestInFlight = false;
    return state;
  },
};

export default VideoField;
