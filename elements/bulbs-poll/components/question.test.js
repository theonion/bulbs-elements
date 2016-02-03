import React from 'react';

import Question from './question';
import RequestError from './request-error';
import Cover from './cover';
import Answers from './answers';
import VoteButton from './vote-button';

import { assertJSXEqual } from 'bulbs-elements/test/assertions';

describe('<bulbs-poll> <Question>', function () {
  it('renders the question', function () {
    let selectAnswer = function () {};
    let makeVoteRequest = function () {};

    let answers = [];
    let selectedAnswer = {};
    let pollRequestError = {};
    let poll = {
      data: {
        answers,
      },
      requestError: pollRequestError,
    };

    let voteRequestError = {};
    let vote = {
      data: {},
      requestError: voteRequestError,
    };

    let props = {
      actions: {
        selectAnswer, makeVoteRequest,
      },
      data: {
        vote, poll, answers, selectedAnswer,
      },
    };

    assertJSXEqual(this.test.title, <Question {...props} />,
      <div>
        <Cover poll={poll} />
        <RequestError error={pollRequestError} />
        <RequestError error={voteRequestError} />
        <Answers
          answers={answers}
          selectAnswer={selectAnswer}
          selectedAnswer={selectedAnswer}
        />
        <VoteButton
          selectedAnswer={selectedAnswer}
          makeVoteRequest={makeVoteRequest}
        />
      </div>
    );
  });
});
