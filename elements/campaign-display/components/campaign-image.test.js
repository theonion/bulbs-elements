import React from 'react';
import { assertJSXEqual } from 'bulbs-elements/test/assertions';
import CampaignImage from './campaign-image';

describe('<campaign-display> <CampaignImage>', function () {
  context('default', function () {
    it('renders', function () {
      let props = {};

      assertJSXEqual(this.test.title, <CampaignImage {...props} />,
        <div className='campaign-display-campaign-image'>
        </div>
      );
    })
  });
});
