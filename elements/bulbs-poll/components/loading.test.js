import React from 'react';
import { shallow } from 'enzyme';

import Loading from './loading';

describe('<bulbs-poll> <Loading>', function () {
  context('default', function () {
    it('renders', function () {
      expect(shallow(<Loading/>).equals(
        <div className='bulbs-poll-loading'>
          Loading Poll...
        </div>
      )).to.be.true;
    });
  });
});
