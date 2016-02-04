import React from 'react';
import { assertJSXEqual } from 'bulbs-elements/test/assertions';
import Result from './result';

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
      };

      assertJSXEqual(this.test.title, <Result {...props} />,
        <div className='bulbs-poll-result'>
          <div
            className='bulbs-poll-answer-bar'
            style={{ width: '33%' }}
          />
          <div className='bulbs-poll-answer-title'>
            <span className='bulbs-poll-answer-result'>
              33%
            </span>
            <p>the answer</p>
          </div>
        </div>
      );
    });
  });
});
