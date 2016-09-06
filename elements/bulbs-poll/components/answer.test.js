import React from 'react';
import { shallow } from 'enzyme';

import Answer from './answer';
import SelectionMarker from './selection-marker';

describe('<bulbs-poll> <Answer>', function () {
  context('answer is not the selected answer', function () {
    it('renders answer as not selected', function () {
      let answer = { answer_text: 'Answer', id: 1 };
      let otherAnswer = { answer_text: 'Another', id: 2 };
      let selectAnswer = sinon.spy();
      let props = {
        answer,
        selectedAnswer: otherAnswer,
        selectAnswer,
        poll: { answer_type: 'text' },
      };

      let subject = shallow(<Answer {...props}/>);
      expect(subject).to.contain(<SelectionMarker isSelected={false}/>);
      expect(subject).to.have.prop('data-track-label', 'Option');
      expect(subject).to.have.prop('className', 'bulbs-poll-answer');
      subject.simulate('click');
      expect(selectAnswer).to.have.been.calledWith(answer).once;
    });
  });

  context('answer is the selected answer', function () {
    it('renders answer as selected', function () {
      let answer = { answer_text: 'Answer', id: 1 };
      let selectAnswer = sinon.spy();
      let props = {
        answer,
        selectedAnswer: answer,
        selectAnswer,
        poll: { answer_type: 'text' },
      };

      let subject = shallow(<Answer {...props}/>);
      expect(subject).to.contain(<SelectionMarker isSelected={true}/>);
      expect(subject).to.have.prop('data-track-label', 'Option');
      expect(subject).to.have.prop('className', 'bulbs-poll-answer bulbs-poll-answer-selected');
      subject.simulate('click');
      expect(selectAnswer).to.have.been.calledWith(answer).once;
    });
  });
});
