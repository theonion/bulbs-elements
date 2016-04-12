import Answers from '../../components/answers';
import Answer from '../../components/answer';
import ImageAnswer from '../../components/image-answer';
import React from 'react';
import { assertJSXEqual } from 'bulbs-elements/test/assertions';

describe('<bulbs-poll> <Answers>', function () {
  context('with no answers', function () {
    it('renders no answers', function () {
      let answers = [];
      let selectAnswer = function () {};
      let props = {
        answers,
        selectAnswer,
        selectedAnswer: {},
        poll: { data: { answer_type: 'text' } },
      };

      assertJSXEqual(this.test.title, <Answers {...props}/>,
        <ul className="bulbs-poll-answers"></ul>
      );
    });
  });

  context('with list of answers', function () {
    it('renders a list of answers', function () {
      let answer1 = {};
      let answer2 = {};
      let answers = [
        answer1,
        answer2,
      ];

      let selectAnswer = function () {};

      let props = {
        answers,
        selectAnswer,
        selectedAnswer: {},
        poll: { data: { answer_type: 'text' } },
      };

      assertJSXEqual(this.test.title, <Answers {...props}/>,
        <ul className="bulbs-poll-answers">
          <Answer
            answer={answer1}
            selectAnswer={selectAnswer}
          />
          <Answer
            answer={answer1}
            selectAnswer={selectAnswer}
          />
        </ul>
      );
    });
  });

  context('answer_type is imageAnswer', function () {
    it('renders answer images', function () {
      let answer1 = {};
      let answer2 = {};
      let answers = [
        answer1,
        answer2,
      ];

      let selectAnswer = function () {};

      let props = {
        answers,
        selectAnswer,
        selectedAnswer: {},
        poll: { data: { answer_type: 'imageText' } },
      };

      assertJSXEqual(this.test.title, <Answers {...props}/>,
        <ul className="bulbs-poll-image-answers">
          <ImageAnswer
            answer={answer1}
            selectAnswer={selectAnswer}
          />
          <ImageAnswer
            answer={answer1}
            selectAnswer={selectAnswer}
          />
        </ul>
      );
    });
  });
});
