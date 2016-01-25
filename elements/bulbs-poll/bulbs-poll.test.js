import { assert } from 'chai';
import { testElement } from '../core';
import fetchMock from 'fetch-mock';

testElement('BulbsPoll', function () {
  beforeEach(function (done) {
    this.element = this.renderElement({
      done,
      tag: 'bulbs-poll',
      props: {
        'poll-data': JSON.stringify({
          question_text: 'take my poll',
          answers: [{
            answer_text: 'answer A',
          },{
            answer_text: 'answer B',
          }],
        }),
      },
    });
    this.actions = this.element.reactElement.store.actions;
  });

  it('renders a poll', function () {
    let answers = this.element.querySelectorAll('.bulbs-poll-answer');
    assert.equal(answers[0].textContent, 'answer A')
    assert.equal(answers[1].textContent, 'answer B')
  });

  it('selects an answer', function () {
    let answer = this.element.querySelector('.bulbs-poll-answer');
    answer.click();
    assert.isTrue(answer.classList.contains('selected'));
  });

  it('toggles an answer if clicked twice', function () {
    let answer = this.element.querySelector('.bulbs-poll-answer');
    answer.click();
    answer.click();
    assert.isFalse(answer.classList.contains('selected'));
  });

  it('deselects an answer if a different anwser is selected', function () {
    let answers = this.element.querySelectorAll('.bulbs-poll-answer');
    answers[0].click();
    answers[1].click();
    assert.isFalse(answers[0].classList.contains('selected'));
    assert.isTrue(answers[1].classList.contains('selected'));
  });

  context('VoteButton', function () {
    it('will not vote when no answer is selected', function () {
      let actionSpy = chai.spy.on(this.actions, 'invoke');
      this.element.querySelector('.bulbs-poll-vote').click();
      actionSpy.should.not.have.been.called();
    });

    it('will make a vote request if an answer is selected', function () {
      let actionSpy = chai.spy.on(this.actions, 'voteRequest');
      this.element.querySelector('.bulbs-poll-answer').click();
      this.element.querySelector('.bulbs-poll-vote').click();
      actionSpy.should.have.been.called();
    });
  });

  context('voteError', function () {
  });

  context('voteSuccess OK', function () {
    it('displays a vote result', function () {
      let { voteSuccess } = this.actions;
      voteSuccess({
        status: 200,
        json: function () {
          return {};
        }
      });
    });
  });

  context('voteSuccess FAILURE', function () {
    it('displays an failure message', function () {
      let { voteSuccess } = this.actions;
      voteSuccess({
        status: 400,
        json: function () {
          return {};
        }
      });
    });
  });

  context('voteError', function () {
    it('displays an error message', function () {
      let { voteError } = this.actions;
      voteError({
        message: 'This is the error!'
      });
    });
  });
});
