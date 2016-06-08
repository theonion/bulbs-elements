import fetchMock from 'fetch-mock';
import testElement from 'bulbs-elements/test/element';
import './bulbs-poll';

testElement('<bulbs-poll> <BulbsPoll>', function () {
  let setSrcSpy;
  let fetchPollDataSpy;
  let getCachedVoteDataSpy;
  let pollEndpoint;

  beforeEach(function (done) {
    pollEndpoint = 'http://example.tld/api/polls/1';
    fetchMock.mock(pollEndpoint, {
      body: {
        id: 1,
        sodahead_id: 293829,
        question_text: 'this dope question',
        answers: [{
          id: 1,
          sodahead_id: 'answer_01',
          answer_text: 'answer A',
        },{
          id: 2,
          sodahead_id: 'answer_03',
          answer_text: 'answer B',
        }],
      },
    });
    this.element = this.renderElement({
      done: () => {
        this.actions = this.element.reactElement.store.actions;
        setSrcSpy = sinon.stub(this.actions, 'setSrc');
        fetchPollDataSpy = sinon.stub(this.actions, 'fetchPollData');
        getCachedVoteDataSpy = sinon.stub(this.actions, 'getCachedVoteData');
        this.element.reactElement.initialDispatch();
        done();
      },
      tag: 'bulbs-poll',
      props: {
        src: pollEndpoint,
      },
    });
  });

  it('invokes setSrc', function () {
    expect(setSrcSpy).to.have.been.calledWith(pollEndpoint);
  });

  it('invokes fetchPollData', function () {
    expect(fetchPollDataSpy).to.have.been.calledWith(pollEndpoint);
  });

  it('invokes getCachedVoteData', function () {
    expect(getCachedVoteDataSpy).to.have.been.calledWith(pollEndpoint);
  });
});
