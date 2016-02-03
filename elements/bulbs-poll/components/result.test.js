import React from 'react';
import { assertJSXEqual } from 'bulbs-elements/test/assertions';
import Result from './result';

describe('<bulbs-poll> <Result>', function () {
  context('vote is not users vote', function () {
    it('renders plain answer', function () {
      let props = {
        answer: {
          answer_text: 'the answer',
          total_votes: 50,
          sodahead_id: 1,
        },
        poll: {
          total_votes: 200,
        },
      };

      assertJSXEqual(this.test.title, <Result {...props} />,
        <div className='bulbs-poll-result'>
          <div
            className='bulbs-poll-answer-bar'
            style={{ width: '25%' }}
          />
          <p className='bulbs-poll-answer-title'>
            <span className='bulbs-poll-answer-result'>
              25%
            </span>
            the answer
          </p>
        </div>
      );
    });
  });
});
