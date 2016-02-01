import React from 'react';

import Question from './question';
import Cover from './cover';
import Answers from './answers';
import VoteButton from './vote-button';

import { assertJSXEqual } from 'bulbs-elements/test/assertions';

describe('<Question>', function () {
  it('renders the question', function () {
    let selectAnswer = function () {};
    let makeVoteRequest = function () {};

    let answers = [];
    let selectedAnswer = {};
    let poll = { data: { answers }};

    let props = {
      actions: {
        selectAnswer, makeVoteRequest,
      },
      data: {
        poll, answers, selectedAnswer,
      },
    };

    assertJSXEqual(this.test.title, <Question {...props} />,
      <div className="bulbs-poll">
        <Cover poll={poll} />
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
