import { Field, Action } from 'bulbs-elements/store';
import find from 'array-find';

function parsePoll (props) {
  let poll = Object.assign({}, props);

  if (poll.published) {
    poll.published = new Date(poll.published);
  }

  if (poll.end_date) {
    poll.end_date = new Date(poll.end_date);
  }

  return poll;
}

const PollField = new Field({
  initialState: {
    data: {
      answers: [],
    },
    requestInFlight: false,
  },
  setPollTotalVotes: new Action(function (state, count) {
    state.data.total_votes = count;
    return state;
  }),
  updateAnswerVoteCount: new Action(function (state, vote) {
    state.data = Object.assign({}, state.data);
    let answer = find(state.data.answers, (eachAnswer) => {
      return eachAnswer.sodahead_id === vote.answer.id;
    });

    let nextAnswer = Object.assign({}, answer);
    let answerIndex = state.data.answers.indexOf(answer);
    nextAnswer.total_votes = vote.answer.totalVotes;
    state.data.answers = [
      ...state.data.answers.slice(0, answerIndex),
      nextAnswer,
      ...state.data.answers.slice(answerIndex + 1),
    ];

    return state;
  }),
  fetchPollData: new Action(function (state, src, store) {
    src || (src = store.src);
    store.src = src;
    this.request(src, {
      credentials: 'include',
      success: store.actions.fetchPollDataSuccess,
      failure: store.actions.fetchPollDataFailure,
      error: store.actions.fetchPollDataError,
    });
    state.requestInFlight = true;
    return state;
  }),
  fetchPollDataSuccess: new Action(function (state, data, store) {
    state.data = parsePoll(data);
    state.requestInFlight = false;

    setImmediate(() => {
      store.actions.collectWinningAnswers(store.state.poll.data.answers);
    });

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
    delete state.requestFailure;
    delete state.requestError;
    setImmediate(store.actions.fetchPollData);
    return state;
  }),
});

export default PollField;
