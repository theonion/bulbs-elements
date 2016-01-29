import Answer from './answer';
import React from 'react';
import { assertJSXEqual } from 'bulbs-elements/test/assertions';

describe('<Answer>', function () {
  context('answer is not the selected answer', function () {
    it('renders answer as selected', function () {
      let answer = { answer_text: 'Answer' };
      let otherAnswer = { answer_text: 'Another' };
      let selectAnswer = function () {};
      let renderedAnswer = <Answer
        answer={answer}
        selectedAnswer={otherAnswer}
        selectAnswer={selectAnswer}
      />;
      assertJSXEqual(this.test.title, renderedAnswer,
        <li className="bulbs-poll-answer">
          Answer
        </li>
      );
    });
  });

  context('answer is the selected answer', function () {
    it('renders answer as selected', function () {
      let answer = { answer_text: 'Answer' };
      let selectAnswer = function () {};
      let renderedAnswer = <Answer
        answer={answer}
        selectedAnswer={answer}
        selectAnswer={selectAnswer}
      />;
      assertJSXEqual(this.test.title, renderedAnswer,
        <li className="bulbs-poll-answer selected">
          Answer
        </li>
      );
    });
  });
});
