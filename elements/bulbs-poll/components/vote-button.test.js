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
        <button className="bulbs-poll-vote bulbs-poll-footer">
          Vote
        </button>
      );
    });
  });

  context('without selectedAnswer', function () {
    it('renders inactive vote button', function () {
      let props = {
        selectedAnswer: {},
        makeVoteRequest () {},
      };

      assertJSXEqual(this.test.title, <VoteButton {...props} />,
        <button className="bulbs-poll-vote bulbs-poll-footer">
          Vote
        </button>
      );
    });
  });
});
