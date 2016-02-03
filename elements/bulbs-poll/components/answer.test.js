import Answer from './answer';
import React from 'react';
import { assertJSXEqual } from 'bulbs-elements/test/assertions';

describe('<bulbs-poll> <Answer>', function () {
  context('answer is not the selected answer', function () {
    it('renders answer as selected', function () {
      let answer = { answer_text: 'Answer', id: 1 };
      let otherAnswer = { answer_text: 'Another', id: 2 };
      let selectAnswer = function () {};
      let renderedAnswer = <Answer
        answer={answer}
        selectedAnswer={otherAnswer}
        selectAnswer={selectAnswer}
      />;
      assertJSXEqual(this.test.title, renderedAnswer,
        <li className="bulbs-poll-answer">
          <svg width="20px" height="20px">
            <circle cx="10" cy="10" r="8" fill="none" stroke="black" strokeWidth="2px" />
            <circle cx="10" cy="10" r="5" fill="none" />
          </svg>
          Answer
        </li>
      );
    });
  });

  context('answer is the selected answer', function () {
    it('renders answer as selected', function () {
      let answer = { answer_text: 'Answer', id: 1 };
      let selectAnswer = function () {};
      let renderedAnswer = <Answer
        answer={answer}
        selectedAnswer={answer}
        selectAnswer={selectAnswer}
      />;
      assertJSXEqual(this.test.title, renderedAnswer,
        <li className="bulbs-poll-answer selected">
          <svg width="20px" height="20px">
            <circle cx="10" cy="10" r="8" fill="none" stroke="black" strokeWidth="2px" />
            <circle cx="10" cy="10" r="5" fill="black" />
          </svg>
          Answer
        </li>
      );
    });
  });
});
