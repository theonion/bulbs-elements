import util from 'bulbs-elements/util';

const SourceField = {
  initialState: {
    data: [],
    requestInFlight: false,
  },
  actions: {
    fetchSources (state, url, store) {
      util.makeRequest(url, {
        success: store.actions.fetchSourcesSuccess,
        failure: store.actions.fetchSourcesFailure,
        error: store.actions.fetchSourcesError,
      });
    },
    fetchSourcesSuccess (state, data) {
      state.data = data;
      state.requestInFlight = false;
      return state;
    },
    fetchSourcesFailure (state, failure) {
      state.requstFailure = failure;
      state.requestInFlight = false;
      return state;
    },
    fetchSourcesError (state, error) {
      state.requestError = error;
      state.requestInFlight = false;
      return state;
    },
  },
};

export default SourceField;
