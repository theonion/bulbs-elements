import { Field, Action } from 'bulbs-elements/store';

const VoteField = new Field({
  initialState: {},
  getCachedVoteData: new Action(function (state, poll) {
    state.data = localStorage.getItem(`bulbs-poll:vote:${poll.data.id}`);
    return state;
  }),
  makeVoteRequest: new Action(function (state, answer, store) {
    let { poll } = store.state;
    let request = this.request(`http://onion.soadhead.com/api/polls/${poll.data.id}`, {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        /* convert answer into vote data */
      }),
    });

    request.success(store.actions.fetchPollDataSuccess);
    request.failure(store.actions.fetchPollDataFailure);
    request.error(store.actions.fetchPollDataError);

    state.requestInFlight = true;
    return state;
  }),
  voteRequestSuccess: new Action(function (state, data) {
    state.data = data.vote;
    state.requestInFlight = false;
    return state;
  }),
  voteRequestFailure: new Action(function (state, failure) {
    state.failure = failure;
    state.requestInFlight = false;
  }),
  voteRequestError: new Action(function (state, error) {
    state.requestInFlight = false;
    state.requestError = error;
    return state;
  }),
});

export default VoteField;
