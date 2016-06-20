import util from 'bulbs-elements/util';

function parsePoll (poll) {
  if (poll.published) {
    poll.published = new Date(poll.published);
  }

  if (poll.end_date) {
    poll.end_date = new Date(poll.end_date);
  }

  return poll;
}

const PollField = {
  initialState: {
    data: {
      answers: [],
    },
    requestInFlight: false,
  },
  actions: {
    setPollTotalVotes (state, count) {
      state.data.total_votes = count;
      return state;
    },
    updateAnswerVoteCount (state, vote) {
      let answer = state.data.answers.find((eachAnswer) => {
        return eachAnswer.sodahead_id === vote.answer.id;
      });

      let answerIndex;
      state.data.answers.forEach((dataAnswer, index) => {
        if (dataAnswer.id === answer.id) {
          answerIndex = index;
        }
      });
      answer.total_votes = vote.answer.totalVotes;
      state.data.answers = [
        ...state.data.answers.slice(0, answerIndex),
        answer,
        ...state.data.answers.slice(answerIndex + 1),
      ];

      return state;
    },
    fetchPollData (state, src, store) {
      src || (src = store.src);
      store.src = src;
      util.makeRequest(src, {
        credentials: 'include',
        success: store.actions.fetchPollDataSuccess,
        failure: store.actions.fetchPollDataFailure,
        error: store.actions.fetchPollDataError,
      });
      state.requestInFlight = true;
      return state;
    },
    fetchPollDataSuccess (state, data, store) {
      state.data = parsePoll(data);
      state.requestInFlight = false;

      setImmediate(() => {
        store.actions.collectWinningAnswers(store.state.poll.data.answers);
      });

      return state;
    },
    fetchPollDataFailure (state, failure) {
      state.requestFailure = failure;
      state.requestInFlight = false;
      return state;
    },
    fetchPollDataError (state, error) {
      state.requestError = error;
      state.requestInFlight = false;
      return state;
    },
    resetFetchPollData (state, _null, store) {
      state.requestInFlight = false;
      delete state.requestFailure;
      delete state.requestError;
      setImmediate(store.actions.fetchPollData);
      return state;
    },
  },
};

export default PollField;
