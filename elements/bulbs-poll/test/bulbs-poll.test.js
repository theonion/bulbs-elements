import fetchMock from 'fetch-mock';
import testElement from 'bulbs-elements/test/element';
import '../bulbs-poll';

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
        setSrcSpy = chai.spy.on(this.actions, 'setSrc');
        fetchPollDataSpy = chai.spy.on(this.actions, 'fetchPollData');
        getCachedVoteDataSpy = chai.spy.on(this.actions, 'getCachedVoteData');
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
    setSrcSpy.should.have.been.called.with(pollEndpoint);
  });

  it('invokes fetchPollData', function () {
    fetchPollDataSpy.should.have.been.called.with(pollEndpoint);
  });

  it('invokes getCachedVoteData', function () {
    getCachedVoteDataSpy.should.have.been.called.with(pollEndpoint);
  });
});
