import React from 'react';
import { shallow } from 'enzyme';

import ImageAnswer from './image-answer';
import SelectionMarker from './selection-marker';

describe('<bulbs-poll> <ImageAnswer>', function() {
  context('answer is not the selected answer', function() {
    it('renders anser as not selected', function() {
      let answer = {
        answer_text: 'Answer',
        id: 1,
        answer_image_url: 'www.suckitjerks.com',
      };
      let otherAnswer = { answer_text: 'Another', id: 2 };
      let selectAnswer = function() {};
      let props = {
        answer,
        selectedAnswer: otherAnswer,
        selectAnswer,
        poll: { answer_type: 'imageText' },
      };

      expect(shallow(<ImageAnswer {...props} />).equals(
        <li
          data-track-label='Option'
          className='bulbs-poll-image-answer'
          onClick={ImageAnswer.prototype.selectAnswer}
        >
          <img src='www.suckitjerks.com'/>
          <div className="answer-image-text">
            <SelectionMarker isSelected={false}/>
            Answer
          </div>
        </li>
      )).to.be.true;
    });
  });

  context('answer is the selected answer', function() {
    it('renders answer as selected', function() {
      let answer = {
        answer_text: 'Answer',
        id: 1,
        answer_image_url: 'www.suckitjerks.com',
      };
      let selectAnswer = function() {};
      let props = {
        answer,
        selectedAnswer: answer,
        selectAnswer,
        poll: { answer_type: 'imageText' },
      };

      expect(shallow(<ImageAnswer {...props}/>).equals(
        <li
          data-track-label='Option'
          className="bulbs-poll-image-answer bulbs-poll-answer-selected"
          onClick={ImageAnswer.prototype.selectAnswer}
        >
          <img src='www.suckitjerks.com'/>
          <div className="answer-image-text">
            <SelectionMarker isSelected={true}/>
            Answer
          </div>
        </li>
      )).to.be.true;
    });
  });
});
