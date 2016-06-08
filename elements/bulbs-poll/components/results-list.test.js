import React from 'react';
import { shallow } from 'enzyme';

import ResultsList from './results-list';
import Result from './result';
import ImageResult from './image-result';

describe('<bulbs-poll> <ResultsList>', function () {
  context('default', function () {
    it('renders', function () {
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
        poll,
        vote,
        winningAnswers,
      };

      expect(shallow(<ResultsList {...props} />).equals(
        <ul className='bulbs-poll-results-list'>
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
        </ul>
      )).to.be.true;
    });
  });

  context('answer_type is imageAnswer', function () {
    it('renders answer images', function () {
      let answer1 = {};
      let answer2 = {};
      let winningAnswers = [answer1];
      let poll = {
        data: {
          answer_type: 'imageText',
          total_votes: 10,
          answers: [
            answer1,
            answer2,
          ],
        },
      };
      let vote = {};

      let props = {
        poll,
        vote,
        winningAnswers,
      };

      expect(shallow(<ResultsList {...props}/>).equals(
        <ul className="bulbs-poll-image-results-list">
          <ImageResult
            poll={poll}
            answer={answer1}
            vote={vote}
            winningAnswers={winningAnswers}
          />
          <ImageResult
            poll={poll}
            answer={answer1}
            vote={vote}
            winningAnswers={winningAnswers}
          />
        </ul>
      )).to.be.true;
    });
  });
});
