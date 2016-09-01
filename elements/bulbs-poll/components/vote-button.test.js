import React from 'react';
import { shallow } from 'enzyme';

import VoteButton from './vote-button';

describe('<bulbs-poll> <VoteButton>', function () {
  context('with selectedAnswer', function () {
    it('renders active vote button', function () {
      let props = {
        selectedAnswer: { id: 1 },
        makeVoteRequest: sinon.spy(),
      };

      let subject = shallow(<VoteButton {...props} />);
      expect(subject).to.contain('Vote');
      expect(subject).to.have.prop('data-track-label', 'Submit');
      expect(subject).to.have.prop('className', 'bulbs-poll-vote bulbs-poll-footer');
      expect(subject).to.have.prop('disabled', false);
      subject.node.props.onClick();
      expect(props.makeVoteRequest).to.have.been.called.once;
    });
  });

  context('without selectedAnswer', function () {
    it('renders disabled vote button', function () {
      let props = {
        selectedAnswer: {},
        makeVoteRequest () {},
      };

      let subject = shallow(<VoteButton {...props} />);
      expect(subject).to.contain('Vote');
      expect(subject).to.have.prop('data-track-label', 'Submit');
      expect(subject).to.have.prop('className', 'bulbs-poll-vote bulbs-poll-footer');
      expect(subject).to.have.prop('disabled', true);
    });
  });

  context('without properties', function () {
    it('renders a disabled vote button', function () {
      let subject = shallow(<VoteButton/>);
      expect(subject).to.contain('Vote');
      expect(subject).to.have.prop('data-track-label', 'Submit');
      expect(subject).to.have.prop('className', 'bulbs-poll-vote bulbs-poll-footer');
      expect(subject).to.have.prop('disabled', true);
    });
  });
});
