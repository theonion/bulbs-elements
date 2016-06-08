import React from 'react';
import { shallow } from 'enzyme';

import PollEnded from './ended';
import Cover from './cover';
import ResultsList from './results-list';

describe('<bulbs-poll> <PollEnded>', function() {
  context('default', function() {
    it('renders', function() {
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

      expect(shallow(<PollEnded {...props} />).equals(
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
      )).to.be.true;
    });
  });
});
