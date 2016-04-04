import makeRequest from 'bulbs-elements/util/make-request';
import { Field, Action } from 'bulbs-elements/store';

function cacheKey (pollId) {
  return `bulbs-poll:${pollId}:vote`;
}

const VoteField = new Field({
  initialState: {
    voted: false,
  },
  getCachedVoteData: new Action(function (state, pollKey) {
    let value = localStorage.getItem(cacheKey(pollKey));
    if (value) {
      state.voted = true;
      state.data = JSON.parse(value);
    }
    return state;
  }),
  makeVoteRequest: new Action(function (state, answer, store) {
    let { poll } = store.state;
    let url = `https://onion.sodahead.com/api/polls/${poll.data.sodahead_id}/vote/`
    makeRequest(url, {
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
  }),
  voteRequestSuccess: new Action(function (state, data, store) {
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
  }),
  voteRequestFailure: new Action(function (state, failure) {
    state.requestFailure = failure;
    state.requestInFlight = false;
    return state;
  }),
  voteRequestError: new Action(function (state, error) {
    state.requestInFlight = false;
    state.requestError = error;
    return state;
  }),
  resetVoteRequest: new Action(function (state) {
    state.requestInFlight = false;
    delete state.requestFailure;
    delete state.requestError;
    return state;
  }),
});

export default VoteField;
