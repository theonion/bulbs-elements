import { assert } from 'chai';
import fetchMock from 'fetch-mock';
import VoteField from './vote';
import PollStore from '../bulbs-poll-store';

describe('<bulbs-poll> VoteField', function () {
  let { actions } = VoteField;
  let store;

  beforeEach(function () {
    store = new PollStore();
    store.state.poll = {
      data: {
        id: 1,
        sodahead_id: 10,
        answers: [{
          id: 15,
          sodahead_id: 20,
        }],
      },
    };

    store.state.src = 'STATE-SRC';
  });

  afterEach(function () {
    localStorage.clear();
  });

  it('initialState', function () {
    assert.deepEqual(VoteField.initialState, {
      voted: false,
    });
  });

  describe('getCachedVoteData', function () {
    it('ignores when localstorage value is blank', function () {
      let nextState = actions.getCachedVoteData.invoke({}, 1, store);
      assert.deepEqual(nextState, {});
    });

    it('gets the value from localstorage', function () {
      let data = { answer: { id: 20 } };
      localStorage.setItem('bulbs-poll:1:vote', JSON.stringify(data));
      let nextState = actions.getCachedVoteData.invoke({}, 1, store);
      assert.deepEqual(nextState, {
        voted: true,
        data,
      });
    });
  });

  describe('makeVoteRequest', function() {
    let requestSpy = chai.spy.on(actions.makeVoteRequest, 'request');
    let url = 'https://onion.sodahead.com/api/polls/10/vote/';

    beforeEach(function () {
      fetchMock.mock(url, {
        poll: {
          totalVotes: 10,
        },
        vote: {
          answer: {
            totalVotes: 5,
            id: 'answer-id',
          },
        },
      });
    });

    afterEach(function () {
      requestSpy.reset();
      fetchMock.restore();
    });

    it('makes a POST request to the vote endpoint', function () {
      let answer = {
        sodahead_id: 123456789,
      };

      actions.makeVoteRequest.invoke({}, answer, store);

      requestSpy.should.have.been.called.with(url, {
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: `answer=123456789`,
        success: store.actions.voteRequestSuccess,
        failure: store.actions.voteRequestFailure,
        error: store.actions.voteRequestError,
      });
    });

    it('sets requestInFlight to true', function () {
      let nextState = actions.makeVoteRequest.invoke({}, {}, store);
      assert.isTrue(nextState.requestInFlight);
    });
  });

  describe('voteRequestSuccess', function() {
    let nextState;
    let vote;
    let poll;
    let success;
    let setPollTotalVotesSpy;
    let updateAnswerVoteCountSpy;
    let collectWinningAnswersSpy;

    beforeEach(function () {
      setPollTotalVotesSpy = chai.spy.on(store.actions, 'setPollTotalVotes');
      updateAnswerVoteCountSpy = chai.spy.on(store.actions, 'updateAnswerVoteCount');
      collectWinningAnswersSpy = chai.spy.on(store.actions, 'collectWinningAnswers');
      vote = { id: 1, answer: { totalVotes: 10 } };
      poll = { id: 1, totalVotes: 8 };
      success = { vote, poll };
      nextState = actions.voteRequestSuccess.invoke({}, success, store);
    });

    afterEach(function () {
      setPollTotalVotesSpy.reset();
      updateAnswerVoteCountSpy.reset();
    });

    it('sets requestInFlight to false', function () {
      assert.isFalse(nextState.requestInFlight);
    });

    it('sets state.voted to true', function () {
      assert.equal(nextState.voted, true);
    });

    it('caches response data', function () {
      assert.deepEqual(JSON.parse(localStorage.getItem('bulbs-poll:STATE-SRC:vote')), vote);
    });

    it('sets state.data', function () {
      assert.deepEqual(nextState.data, vote);
    });

    it('calls setPollTotalVotes', function (done) {
      setImmediate(() => {
        setPollTotalVotesSpy.should.have.been.called.once.with(8);
        done();
      });
    });

    it('calls updateAnswerVoteCount', function (done) {
      setImmediate(() => {
        updateAnswerVoteCountSpy.should.have.been.called.once.with(vote);
        done();
      });
    });

    it('calls collectWinningAnswers', function (done) {
      setImmediate(() => {
        collectWinningAnswersSpy.should.have.been.called.once.with(store.state.poll.data.answers);
        done();
      });
    });
  });

  describe('voteRequestFailure', function() {
    it('sets requestInFlight to false', function () {
      let nextState = actions.voteRequestFailure.invoke({}, {});
      assert.isFalse(nextState.requestInFlight);
    });

    it('sets state.requestFailure', function () {
      let failure = {};
      let nextState = actions.voteRequestFailure.invoke({}, failure);
      assert.equal(nextState.requestFailure, failure);
    });
  });

  describe('voteRequestError', function() {
    it('sets requestInFlight to false', function () {
      let nextState = actions.voteRequestError.invoke({}, {});
      assert.isFalse(nextState.requestInFlight);
    });

    it('sets state.requestError', function () {
      let error = {};
      let nextState = actions.voteRequestError.invoke({}, error);
      assert.equal(nextState.requestError, error);
    });
  });
});
