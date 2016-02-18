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
