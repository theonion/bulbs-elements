import React from 'react';
import { assertJSXEqual } from 'bulbs-elements/test/assertions';
import Cover from '../../components/cover';
import Results from '../../components/results';
import ResultsList from '../../components/results-list';

describe('<bulbs-poll> <Results>', function () {
  context('with vote results', function () {
    it('renders vote results', function () {
      let answer1 = {};
      let answer2 = {};
      let winningAnswers = [answer1];
      let poll = {
        data: {
          total_votes: 10,
          answers: [
            answer1,
            answer2,
          ],
        },
      };
      let vote = {};

      let props = {
        data: {
          poll,
          vote,
          winningAnswers,
        },
      };

      assertJSXEqual(this.test.title, <Results {...props} />,
        <div className='bulbs-poll-results'>
          <Cover poll={poll} />
          <ResultsList
            poll={poll}
            winningAnswers={winningAnswers}
            vote={vote}
          />
          <div className='bulbs-poll-thank-you bulbs-poll-footer'>
            Thanks for voting!
          </div>
        </div>
      );
    });
  });
});
