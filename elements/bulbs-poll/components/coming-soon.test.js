import React from 'react';
import { shallow } from 'enzyme';

import ComingSoon from './coming-soon';
import VoteButton from './vote-button';

describe('<bulbs-poll> <ComingSoon>', function () {
  context('default', function () {
    it('renders', function () {
      let props = {};

      expect(shallow(<ComingSoon {...props} />).equals(
        <div className='bulbs-poll-coming-soon'>
          <div className='bulbs-poll-coming-soon-message'>Poll Coming Soon</div>
          <VoteButton/>
        </div>
      )).to.be.true;
    });
  });
});
