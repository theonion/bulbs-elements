import React from 'react';
import { assertJSXEqual } from 'bulbs-elements/test/assertions';
import Cover from './cover';
import Results from './results';
import Result from './result';

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
          <div className='bulbs-poll-results-list'>
            <Result
              poll={poll}
              answer={answer1}
              vote={vote}
              winningAnswers={winningAnswers}
            />
            <Result
              poll={poll}
              answer={answer2}
              vote={vote}
              winningAnswers={winningAnswers}
            />
          </div>
        </div>
      );
    });
  });
});
