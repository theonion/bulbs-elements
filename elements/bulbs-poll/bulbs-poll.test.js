import BulbsPoll from './bulbs-poll';

describe('<bulbs-poll> <BulbsPoll>', function () {
  let subject;
  let pollEndpoint;

  beforeEach(() => {
    pollEndpoint = 'http://example.tld/api/polls/1';
    subject = new BulbsPoll({ src: pollEndpoint });
    sinon.spy(subject.store.actions, 'setSrc');
    sinon.spy(subject.store.actions, 'fetchPollData');
    sinon.spy(subject.store.actions, 'getCachedVoteData');
  });

  describe('initialDispatch', () => {
    it('invokes setSrc', function () {
      subject.initialDispatch();
      expect(subject.store.actions.setSrc).to.have.been.calledWith(pollEndpoint);
    });

    it('invokes fetchPollData', function () {
      subject.initialDispatch();
      expect(subject.store.actions.fetchPollData).to.have.been.calledWith(pollEndpoint);
    });

    it('invokes getCachedVoteData', function () {
      subject.initialDispatch();
      expect(subject.store.actions.getCachedVoteData).to.have.been.calledWith(pollEndpoint);
    });
  });
});

