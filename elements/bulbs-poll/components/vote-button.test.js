import VoteButton from './vote-button';
import React from 'react';
import { assertJSXEqual } from 'bulbs-elements/test/assertions';

describe('<bulbs-poll> <VoteButton>', function () {
  context('with selectedAnswer', function () {
    it('renders active vote button', function () {
      let props = {
        selectedAnswer: { id: 1 },
        makeVoteRequest () {},
      };

      assertJSXEqual(this.test.title, <VoteButton {...props} />,
        <button
          data-track-label='Submit'
          className="bulbs-poll-vote bulbs-poll-footer"
          disabled={false}
        >
          Vote
        </button>
      );
    });
  });

  context('without selectedAnswer', function () {
    it('renders disabled vote button', function () {
      let props = {
        selectedAnswer: {},
        makeVoteRequest () {},
      };

      assertJSXEqual(this.test.title, <VoteButton {...props} />,
        <button
          data-track-label='Submit'
          className="bulbs-poll-vote bulbs-poll-footer"
          disabled={true}
        >
          Vote
        </button>
      );
    });
  });

  context('without properties', function () {
    it('renders a disabled vote button', function () {
      assertJSXEqual(this.test.title, <VoteButton/>,
        <button
          data-track-label='Submit'
          className="bulbs-poll-vote bulbs-poll-footer"
          disabled={true}
        >
          Vote
        </button>
      );
    });
  });
});
