import React from 'react';
import { assertJSXEqual } from 'bulbs-elements/test/assertions';
import ComingSoon from '../../components/coming-soon';
import VoteButton from '../../components/vote-button';

describe('<bulbs-poll> <ComingSoon>', function () {
  context('default', function () {
    it('renders', function () {
      let props = {};

      assertJSXEqual(this.test.title, <ComingSoon {...props} />,
        <div className='bulbs-poll-coming-soon'>
          <div className='bulbs-poll-coming-soon-message'>Poll Coming Soon</div>
          <VoteButton/>
        </div>
      );
    });
  });
});
