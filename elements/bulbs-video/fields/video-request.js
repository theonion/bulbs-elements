import util from 'bulbs-elements/util';

export default {
  initialState: {
    requestInFlight: false,
  },

  actions: {
    fetchVideo (state, url, store) {
      if (url) {
        state.requestInFlight = true;
        util.makeRequest(url, {
          success (response) {
            store.actions.fetchVideoSuccess(response);
            store.actions.setVideoField(response);
          },
          failure: store.actions.fetchVideoFailure,
          error: store.actions.fetchVideoError,
        });
      }
      return state;
    },
    fetchVideoSuccess (state) {
      state.requestInFlight = false;
      return state;
    },
    fetchVideoFailure (state, failure) {
      state.requstFailure = failure;
      state.requestInFlight = false;
      return state;
    },
    fetchVideoError (state, error) {
      state.requestError = error;
      state.requestInFlight = false;
      return state;
    },
  },
};
