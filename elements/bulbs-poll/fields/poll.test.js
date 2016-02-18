import { assert } from 'chai';
import fetchMock from 'fetch-mock';
import PollField from './poll';
import PollStore from '../bulbs-poll-store';

let store = new PollStore();

describe('<bulbs-poll> PollField', function () {
  let { actions } = PollField;

  it('initialState', function () {
    assert.deepEqual(PollField.initialState, {
      data: {
        answers: [],
      },
      requestInFlight: false,
    });
  });

  describe('setPollTotalVotes', function () {
    it('sets data.total_votes', function () {
      let state = {
        data: {},
      };
      let nextState = actions.setPollTotalVotes.invoke(state, 15);
      assert.equal(nextState.data.total_votes, 15);
    });
  });

  describe('updateAnswerVoteCount', function () {
    let vote = {
      answer: {
        id: '2',
        totalVotes: 10,
      },
    };
    let state = {
      data: {
        answers: [
          { sodahead_id: '1' },
          { sodahead_id: '2' },
          { sodahead_id: '3' },
        ],
      },
    };
    let nextState;

    beforeEach(function () {
      nextState = actions.updateAnswerVoteCount.invoke(Object.assign({}, state), vote);
    });

    it('updates the matching answer\'s vote count', function () {
      assert.equal(nextState.data.answers[1].total_votes, 10);
    });

    it('makes a copy of the matching answer', function () {
      assert.isTrue(state.data.answers[0] === nextState.data.answers[0]);
      assert.isFalse(state.data.answers[1] === nextState.data.answers[1]);
    });
  });

  describe('markWinningAnswers', function () {
    context('single winning answer', function () {
      let state = {
        data: {
          answers: [
            { total_votes: 10 },
            { total_votes: 5 },
            { total_votes: 0 },
          ],
        },
      };
      let nextState;

      beforeEach(function () {
        nextState = actions.markWinningAnswers.invoke(Object.assign({}, state));
      });

      it('marks the winning answer as winning', function () {
        assert.isTrue(nextState.data.answers[0].winning);
      });

      it('makes a copy of the winning answer', function () {
        assert.isFalse(state.data.answers[0] === nextState.data.answers[0]);
        assert.isTrue(state.data.answers[1] === nextState.data.answers[1]);
        assert.isTrue(state.data.answers[2] === nextState.data.answers[2]);
      });
    });

    context('multiple winning answers', function () {
      let state = {
        data: {
          answers: [
            { total_votes: 10 },
            { total_votes: 5 },
            { total_votes: 10 },
          ],
        },
      };
      let nextState;

      beforeEach(function () {
        nextState = actions.markWinningAnswers.invoke(Object.assign({}, state));
      });

      it('marks the tying answers as winning', function () {
        assert.isTrue(nextState.data.answers[0].winning);
        assert.isTrue(nextState.data.answers[2].winning);
      })

      it('makes a copy of the tying answers', function () {
        assert.isFalse(state.data.answers[0] === nextState.data.answers[0]);
        assert.isTrue(state.data.answers[1] === nextState.data.answers[1]);
        assert.isFalse(state.data.answers[2] === nextState.data.answers[2]);
      });
    });
  });

  describe('fetchPollData', function () {
    let src = 'http://example.tld/poll/:id';
    let requestSpy = chai.spy.on(actions.fetchPollData, 'request');

    beforeEach(function () {
      // just preventing making a network call here
      fetchMock.mock(src, {});
    });

    afterEach(function () {
      requestSpy.reset();
      fetchMock.restore();
    });

    it('makes GET request to the poll endpoint', function () {
      actions.fetchPollData.invoke({}, src, store);
      requestSpy.should.have.been.called.with(src, {
        credentials: 'include',
        success: store.actions.fetchPollDataSuccess,
        failure: store.actions.fetchPollDataFailure,
        error: store.actions.fetchPollDataError,
      });
    });

    it('sets requestInFlight to true', function () {
      let nextState = actions.fetchPollData.invoke({}, src, store);
      assert.isTrue(nextState.requestInFlight);
    });
  });

  describe('fetchPollDataSuccess', function () {
    it('sets requestInFlight to false', function () {
      let nextState = actions.fetchPollDataSuccess.invoke({}, {});
      assert.isFalse(nextState.requestInFlight);
    });

    it('sets state.data', function () {
      let success = {};
      let nextState = actions.fetchPollDataSuccess.invoke({}, success);
      assert.equal(nextState.data, success);
    });
  });

  describe('fetchPollDataFailure', function () {
    it('sets requestInFlight to false', function () {
      let nextState = actions.fetchPollDataFailure.invoke({}, {});
      assert.isFalse(nextState.requestInFlight);
    });

    it('sets state.failure', function () {
      let failure = {};
      let nextState = actions.fetchPollDataFailure.invoke({}, failure);
      assert.equal(nextState.requestFailure, failure);
    });
  });

  describe('fetchPollDataError', function () {
    it('sets requestInFlight to false', function () {
      let nextState = actions.fetchPollDataError.invoke({}, {});
      assert.isFalse(nextState.requestInFlight);
    });

    it('sets state.error', function () {
      let error = {};
      let nextState = actions.fetchPollDataError.invoke({}, error);
      assert.equal(nextState.requestError, error);
    });
  });

  describe('setPollTotalVotes', function () {
    it('sets the total_votes field of poll.data', function () {
      let startState = {
        data: {},
      };
      let nextState = actions.setPollTotalVotes.invoke(startState, 10);
      assert.equal(nextState.data.total_votes, 10);
    });
  });
});
