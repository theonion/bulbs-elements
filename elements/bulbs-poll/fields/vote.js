import { Field, Action } from 'bulbs-elements/store';

const VoteField = new Field({
  initialState: {},
  getCachedVoteData: new Action(function (state, poll) {
    state.data = localStorage.getItem(`bulbs-poll:vote:${poll.data.id}`);
    return state;
  }),
  makeVoteRequest: new Action(function (state, answer, store) {
    let { poll } = store.state;
    let request = this.request(`http://onion.sodahead.com/api/polls/${poll.data.id}`, {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        /* convert answer into vote data */
      }),
      success: store.actions.voteRequestSuccess,
      failure: store.actions.voteRequestFailure,
      error: store.actions.voteRequestError,
    });

    state.requestInFlight = true;
    return state;
  }),
  voteRequestSuccess: new Action(function (state, data) {
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
    state.requestFailure = undefined;
    state.requestError = undefined;
    return state;
  }),
});

export default VoteField;
