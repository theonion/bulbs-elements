import React from 'react';
import { assertJSXEqual } from 'bulbs-elements/test/assertions';
import ImageResult from './image-result';
import SelectionMarker from './selection-marker';

describe('<bulbs-poll> <ImageResult>', function () {
  context('normal vote', function () {
    it('renders plain answer + image', function () {
      let props = {
        answer: {
          answer_text: 'the answer',
          answer_image_url: 'www.foobar.com',
          total_votes: 100,
          sodahead_id: 1,
        },
        answer_type: 'imageText',
        poll: {
          data: {
            total_votes: 300,
          },
        },
        vote: {},
        winningAnswers: [],
      };

      assertJSXEqual(this.test.title, <ImageResult {...props} />,
        <li className='bulbs-poll-image-result'>
          <div className="result-image-list-item">
            <div
              className='bulbs-poll-image-answer-bar'
              style={{ height: '33%' }}
            />
            <div className="bulbs-poll-image-answer-title">
              <img src='www.foobar.com' />
              <div className='answer-image-text'>
                <SelectionMarker isSelected={false}/>
                <span className='bulbs-poll-image-answer-text'>
                  the answer
                </span>
              </div>
            </div>
          </div>
          <div className='bulbs-poll-answer-result'>
            33%
          </div>
        </li>
      );
    });
  });

  context('no votes cast', function () {
    it('renders 0% vote', function () {
      let props = {
        answer: {
          answer_text: 'the answer',
          answer_image_url: 'www.foobar.com',
          total_votes: 0,
          sodahead_id: 1,
        },
        answer_type: 'imageText',
        poll: {
          data: {
            total_votes: 0,
          },
        },
        vote: {},
        winningAnswers: [],
      };

      assertJSXEqual(this.test.title, <ImageResult {...props} />,
        <li className='bulbs-poll-image-result'>
          <div className="result-image-list-item">
            <div
              className='bulbs-poll-image-answer-bar'
              style={{ height: '0%' }}
            />
            <div className="bulbs-poll-image-answer-title">
              <img src='www.foobar.com' />
              <div className='answer-image-text'>
                <SelectionMarker isSelected={false}/>
                <span className='bulbs-poll-image-answer-text'>
                  the answer
                </span>
              </div>
            </div>
          </div>
          <div className='bulbs-poll-answer-result'>
            0%
          </div>
        </li>
      );
    });
  });
  context('winning vote', function () {
    it('renders winning answer + image', function () {
      let props = {
        answer: {
          answer_text: 'the answer',
          answer_image_url: 'www.foobar.com',
          total_votes: 100,
          sodahead_id: 1,
          winning: true,
        },
        answer_type: 'imageText',
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

      assertJSXEqual(this.test.title, <ImageResult {...props} />,
        <li className='bulbs-poll-image-result bulbs-poll-result-winning'>
          <div className="result-image-list-item">
            <div
              className='bulbs-poll-image-answer-bar'
              style={{ height: '33%' }}
            />
            <div className="bulbs-poll-image-answer-title">
              <img src='www.foobar.com' />
              <div className='answer-image-text'>
                <SelectionMarker isSelected={false}/>
                <span className='bulbs-poll-image-answer-text'>
                  the answer
                </span>
              </div>
            </div>
          </div>
          <div className='bulbs-poll-answer-result'>
            33%
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
          answer_image_url: 'www.foobar.com',
          total_votes: 100,
          sodahead_id: 100,
          winning: true,
        },
        answer_type: 'imageText',
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

      assertJSXEqual(this.test.title, <ImageResult {...props} />,
        <li className='bulbs-poll-image-result bulbs-poll-result-selected'>
          <div className="result-image-list-item">
            <div
              className='bulbs-poll-image-answer-bar'
              style={{ height: '33%' }}
            />
            <div className="bulbs-poll-image-answer-title">
              <img src='www.foobar.com' />
              <div className='answer-image-text'>
                <SelectionMarker isSelected={true}/>
                <span className='bulbs-poll-image-answer-text'>
                  the answer
                </span>
              </div>
            </div>
          </div>
          <div className='bulbs-poll-answer-result'>
            33%
          </div>
        </li>
      );
    });
  });
});
