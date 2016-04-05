import util from 'bulbs-elements/util';

function cacheKey (pollId) {
  return `bulbs-poll:${pollId}:vote`;
}

const VoteField = {
  initialState: {
    voted: false,
  },
  actions: {
    getCachedVoteData: function (state, pollKey) {
      let value = localStorage.getItem(cacheKey(pollKey));
      if (value) {
        state.voted = true;
        state.data = JSON.parse(value);
      }
      return state;
    },
    makeVoteRequest: function (state, answer, store) {
      let { poll } = store.state;
      let url = `https://onion.sodahead.com/api/polls/${poll.data.sodahead_id}/vote/`;
      util.makeRequest(url, {
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: `answer=${answer.sodahead_id}`,
        success: store.actions.voteRequestSuccess,
        failure: store.actions.voteRequestFailure,
        error: store.actions.voteRequestError,
      });

      state.requestInFlight = true;
      return state;
    },
    voteRequestSuccess: function (state, data, store) {
      localStorage.setItem(cacheKey(store.state.src), JSON.stringify(data.vote));
      setImmediate(() => {
        store.actions.setPollTotalVotes(data.poll.totalVotes);
        store.actions.updateAnswerVoteCount(data.vote);
        store.actions.collectWinningAnswers(store.state.poll.data.answers);
      });
      state.voted = true;
      state.data = data.vote;
      state.requestInFlight = false;
      return state;
    },
    voteRequestFailure: function (state, failure) {
      state.requestFailure = failure;
      state.requestInFlight = false;
      return state;
    },
    voteRequestError: function (state, error) {
      state.requestInFlight = false;
      state.requestError = error;
      return state;
    },
    resetVoteRequest: function (state) {
      state.requestInFlight = false;
      delete state.requestFailure;
      delete state.requestError;
      return state;
    },
  },
};

export default VoteField;
