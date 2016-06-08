import React from 'react';
import { shallow } from 'enzyme';

import Answers from './answers';
import Answer from './answer';
import ImageAnswer from './image-answer';

describe('<bulbs-poll> <Answers>', function() {
  context('with no answers', function() {
    it('renders no answers', function() {
      let answers = [];
      let selectAnswer = function() {};
      let props = {
        answers,
        selectAnswer,
        selectedAnswer: {},
        poll: { data: { answer_type: 'text' } },
      };

      expect(shallow(<Answers {...props}/>).equals(
        <ul className="bulbs-poll-answers">{[]}</ul>
      )).to.be.true;
    });
  });

  context('with list of answers', function() {
    it('renders a list of answers', function() {
      let answer1 = {};
      let answer2 = {};
      let answers = [
        answer1,
        answer2,
      ];

      let selectAnswer = function() {};

      let props = {
        answers,
        selectAnswer,
        selectedAnswer: {},
        poll: { data: { answer_type: 'text' } },
      };

      expect(shallow(<Answers {...props}/>).equals(
        <ul className="bulbs-poll-answers">
          <Answer
            answer={answer1}
            {...props}
          />
          <Answer
            answer={answer1}
            {...props}
          />
        </ul>
      )).to.be.true;
    });
  });

  context('answer_type is imageAnswer', function() {
    it('renders answer images', function() {
      let answer1 = {};
      let answer2 = {};
      let answers = [
        answer1,
        answer2,
      ];

      let selectAnswer = function() {};

      let props = {
        answers,
        selectAnswer,
        selectedAnswer: {},
        poll: { data: { answer_type: 'imageText' } },
      };

      expect(shallow(<Answers {...props}/>).equals(
        <ul className="bulbs-poll-image-answers">
          <ImageAnswer
            answer={answer1}
            {...props}
          />
          <ImageAnswer
            answer={answer1}
            {...props}
          />
        </ul>
      )).to.be.true;
    });
  });
});
