import React from 'react';
import { shallow } from 'enzyme';

import VoteButton from './vote-button';

describe('<bulbs-poll> <VoteButton>', function () {
  context('with selectedAnswer', function () {
    it('renders active vote button', function () {
      let props = {
        selectedAnswer: { id: 1 },
        makeVoteRequest () {},
      };

      expect(shallow(<VoteButton {...props} />).equals(
        <button
          data-track-label='Submit'
          className="bulbs-poll-vote bulbs-poll-footer"
          onClick={VoteButton.prototype.makeVoteRequest}
          disabled={false}
        >
          Vote
        </button>
      )).to.be.true;
    });
  });

  context('without selectedAnswer', function () {
    it('renders disabled vote button', function () {
      let props = {
        selectedAnswer: {},
        makeVoteRequest () {},
      };

      expect(shallow(<VoteButton {...props} />).equals(
        <button
          data-track-label='Submit'
          className="bulbs-poll-vote bulbs-poll-footer"
          onClick={VoteButton.prototype.makeVoteRequest}
          disabled={true}
        >
          Vote
        </button>
      )).to.be.true;
    });
  });

  context('without properties', function () {
    it('renders a disabled vote button', function () {
      expect(shallow(<VoteButton/>).equals(
        <button
          data-track-label='Submit'
          className="bulbs-poll-vote bulbs-poll-footer"
          onClick={VoteButton.prototype.makeVoteRequest}
          disabled={true}
        >
          Vote
        </button>
      )).to.be.true;
    });
  });
});
