import React from 'react';
import { assertJSXEqual } from 'bulbs-elements/test/assertions';
import PollEnded from '../../components/ended';
import Cover from '../../components/cover';
import ResultsList from '../../components/results-list';

describe('<bulbs-poll> <PollEnded>', function () {
  context('default', function () {
    it('renders', function () {
      let poll = {};
      let winningAnswers = [];
      let vote = {};
      let props = {
        data: {
          poll,
          winningAnswers,
          vote,
        },
      };

      assertJSXEqual(this.test.title, <PollEnded {...props} />,
        <div className='bulbs-poll-ended'>
          <Cover poll={poll}/>
          <ResultsList
            poll={poll}
            winningAnswers={winningAnswers}
            vote={vote}
          />
          <div className='bulbs-poll-ended-message bulbs-poll-footer'>
            Poll Closed
          </div>
        </div>
      );
    });
  });
});
