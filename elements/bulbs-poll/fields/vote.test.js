import { assert } from 'chai';
import VoteField from './vote';
import PollStore from '../store';

let store = new PollStore();

describe('VoteField', function () {
  let { actions } = VoteField;

  it('initialState', function () {
    assert.deepEqual(VoteField.initialState, {
      /* Intentionally left blank. */
    });
  });

  describe('makeVoteRequest', function() {
    let requestSpy = chai.spy.on(actions.makeVoteRequest, 'request');

    beforeEach(function () {});

    afterEach(function () {
      requestSpy.reset();
    });

    it('makes a POST request to the vote endpoint', function () {
      store.state.poll = {
        data: {
          id: 1,
        },
      };
      let url = 'http://onion.sodahead.com/api/polls/1';

      actions.makeVoteRequest.invoke({}, {}, store);

      requestSpy.should.have.been.called.with(url, {
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({}),
        success: store.actions.voteRequestSuccess,
        failure: store.actions.voteRequestFailure,
        error: store.actions.voteRequestError,
      });
    });

    it('sets requestInFlight to true', function () {
      store.state.poll = {
        data: {
          id: 1,
        },
      };
      let nextState = actions.makeVoteRequest.invoke({}, {}, store);
      assert.isTrue(nextState.requestInFlight);
    });
  });

  describe('voteRequestSuccess', function() {
    it('sets requestInFlight to false', function () {
      let nextState = actions.voteRequestSuccess.invoke({}, {});
      assert.isFalse(nextState.requestInFlight);
    });

    it('sets state.data', function () {
      let vote = {};
      let success = { vote };
      let nextState = actions.voteRequestSuccess.invoke({}, success);
      assert.equal(nextState.data, vote);
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
