import React from 'react';
import { assertJSXEqual } from 'bulbs-elements/test/assertions';
import Result from './result';
import SelectionMarker from './selection-marker';

describe('<bulbs-poll> <Result>', function () {
  context('normal vote', function () {
    it('renders plain answer', function () {
      let props = {
        answer: {
          answer_text: 'the answer',
          total_votes: 100,
          sodahead_id: 1,
        },
        poll: {
          data: {
            total_votes: 300,
          },
        },
        vote: {},
        winningAnswers: [],
      };

      assertJSXEqual(this.test.title, <Result {...props} />,
        <li className='bulbs-poll-result'>
          <div
            className='bulbs-poll-answer-bar'
            style={{ width: '33%' }}
          />
          <div className='bulbs-poll-answer-title'>
            <SelectionMarker isSelected={false}/>
            <span className='bulbs-poll-answer-text'>
              the answer
            </span>
            <span className='bulbs-poll-answer-result'>
              33%
            </span>
          </div>
        </li>
      );
    });
  });

  context('no votes cast', function () {
    it('renders 0% results', function () {
      let props = {
        answer: {
          answer_text: 'the answer',
          total_votes: 0,
          sodahead_id: 1,
        },
        poll: {
          data: {
            total_votes: 0,
          },
        },
        vote: {},
        winningAnswers: [],
      };

      assertJSXEqual(this.test.title, <Result {...props} />,
        <li className='bulbs-poll-result'>
          <div
            className='bulbs-poll-answer-bar'
            style={{ width: '0%' }}
          />
          <div className='bulbs-poll-answer-title'>
            <SelectionMarker isSelected={false}/>
            <span className='bulbs-poll-answer-text'>
              the answer
            </span>
            <span className='bulbs-poll-answer-result'>
              0%
            </span>
          </div>
        </li>
      );
    });
  });

  context('winning vote', function () {
    it('renders winning answer', function () {
      let props = {
        answer: {
          answer_text: 'the answer',
          total_votes: 100,
          sodahead_id: 1,
          winning: true,
        },
        poll: {
          data: {
            total_votes: 300,
          },
        },
        vote: {},
        winningAnswers: [{
          sodahead_id: 1,
        }],
      };

      assertJSXEqual(this.test.title, <Result {...props} />,
        <li className='bulbs-poll-result bulbs-poll-result-winning'>
          <div
            className='bulbs-poll-answer-bar'
            style={{ width: '33%' }}
          />
          <div className='bulbs-poll-answer-title'>
            <SelectionMarker isSelected={false}/>
            <span className='bulbs-poll-answer-text'>
              the answer
            </span>
            <span className='bulbs-poll-answer-result'>
              33%
            </span>
          </div>
        </li>
      );
    });
  });

  context('selected vote', function () {
    it('renders answer as selected', function () {
      let props = {
        answer: {
          answer_text: 'the answer',
          total_votes: 100,
          sodahead_id: 100,
          winning: true,
        },
        poll: {
          data: {
            total_votes: 300,
          },
        },
        vote: {
          voted: true,
          data: {
            answer: {
              id: 100,
            },
          },
        },
        winningAnswers: [{
          sodahead_id: 1,
        }],
      };

      assertJSXEqual(this.test.title, <Result {...props} />,
        <li className='bulbs-poll-result bulbs-poll-result-selected'>
          <div
            className='bulbs-poll-answer-bar'
            style={{ width: '33%' }}
          />
          <div className='bulbs-poll-answer-title'>
            <SelectionMarker isSelected={true}/>
            <span className='bulbs-poll-answer-text'>
              the answer
            </span>
            <span className='bulbs-poll-answer-result'>
              33%
            </span>
          </div>
        </li>
      );
    });
  });
});
