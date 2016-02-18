import { Field, Action } from 'bulbs-elements/store';

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
    let answer = state.data.answers.find((eachAnswer) => {
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
  markWinningAnswers: new Action(function (state) {
    let highScore = 0;
    let winningAnswers = [];

    state.data = Object.assign({}, state.data);

    state.data.answers.forEach((eachAnswer) => {
      if (eachAnswer.total_votes === highScore) {
        winningAnswers.push(eachAnswer);
      }
      else if (eachAnswer.total_votes > highScore) {
        highScore = eachAnswer.total_votes;
        winningAnswers = [eachAnswer];
      }
    });

    state.data.answers = state.data.answers.map((eachAnswer) => {
      if (winningAnswers.indexOf(eachAnswer) === -1) {
        return eachAnswer;
      }
      else {
        let markedAnswer = Object.assign({}, eachAnswer);
        markedAnswer.winning = true;
        return markedAnswer;
      }
    });

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
    delete state.requestFailure;
    delete state.requestError;
    setImmediate(store.actions.fetchPollData);
    return state;
  }),
});

export default PollField;
