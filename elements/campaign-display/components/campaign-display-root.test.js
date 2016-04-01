import React from 'react';
import { assertJSXEqual } from 'bulbs-elements/test/assertions';
import CampaignDisplayRoot from './campaign-display-root';

describe('<campaign-display> <CampaignDisplayRoot>', function () {
  context('default', function () {
    it('renders', function () {
      let props = {};

      assertJSXEqual(this.test.title, <CampaignDisplayRoot {...props} />,
        <div className='campaign-display-campaign-display-root'>
        </div>
      );
    });
  });
});
