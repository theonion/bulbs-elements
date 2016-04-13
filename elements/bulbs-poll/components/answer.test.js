import React from 'react';
import { assertJSXEqual } from 'bulbs-elements/test/assertions';

import Answer from './answer';
import SelectionMarker from './selection-marker';

describe('<bulbs-poll> <Answer>', function () {
  context('answer is not the selected answer', function () {
    it('renders answer as not selected', function () {
      let answer = { answer_text: 'Answer', id: 1 };
      let otherAnswer = { answer_text: 'Another', id: 2 };
      let selectAnswer = function () {};
      let props = {
        answer,
        selectedAnswer: otherAnswer,
        selectAnswer,
        poll: { answer_type: 'text' },
      };

      assertJSXEqual(this.test.title, <Answer {...props}/>,
        <li
          data-track-label='Option'
          className="bulbs-poll-answer"
        >
          <SelectionMarker isSelected={false}/>
          Answer
        </li>
      );
    });
  });

  context('answer is the selected answer', function () {
    it('renders answer as selected', function () {
      let answer = { answer_text: 'Answer', id: 1 };
      let selectAnswer = function () {};
      let props = {
        answer,
        selectedAnswer: answer,
        selectAnswer,
        poll: { answer_type: 'text' },
      };

      assertJSXEqual(this.test.title, <Answer {...props}/>,
        <li
          data-track-label='Option'
          className="bulbs-poll-answer bulbs-poll-answer-selected"
        >
          <SelectionMarker isSelected={true}/>
          Answer
        </li>
      );
    });
  });
});
