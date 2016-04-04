import React from 'react';
import { assertJSXEqual } from 'bulbs-elements/test/assertions';
import CampaignName from './campaign-name';

describe('<campaign-display> <CampaignName>', function () {
  context('default', function () {
    it('renders', function () {
      let props = {};

      assertJSXEqual(this.test.title, <CampaignName {...props} />,
        <div className='campaign-display-campaign-name'>
        </div>
      );
    })
  });
});
