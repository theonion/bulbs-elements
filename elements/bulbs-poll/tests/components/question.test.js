import React from 'react';

import Question from '../../components/question';
import RequestError from '../../components/request-error';
import Cover from '../../components/cover';
import Answers from '../../components/answers';
import VoteButton from '../../components/vote-button';

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
          poll={poll}
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
