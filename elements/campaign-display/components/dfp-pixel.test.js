import { createRenderer } from 'react-addons-test-utils';
import React from 'react';

import DfpPixel from './dfp-pixel';

describe('<campaign-display> <DfpPixel>', () => {

  let shallowRenderer = createRenderer();

  context('ad unit name', () => {

    it('should always be "campaign-pixel"', function () {

      shallowRenderer.render(<DfpPixel placement='junk' campaignId={1} />);

      let html = shallowRenderer.getRenderOutput();
      expect(html.props['data-ad-unit']).to.equal('campaign-pixel');
    });
  });

  context('targeting parameters', () => {

    it('should include ad unit placement', function () {
      let placement = 'top';

      shallowRenderer.render(<DfpPixel campaignId={1} placement={ placement } />);

      let html = shallowRenderer.getRenderOutput();
      expect(html.props['data-targeting'].dfp_placement).to.equal(placement);
    });

    it('should require ad unit placement', function () {
      chai.spy.on(console, 'error');

      shallowRenderer.render(<DfpPixel campaignId={1} />);

      expect(console.error).to.have.been.called.with(
        'Warning: Failed propType: Required prop `placement` was not specified in `DfpPixel`.'
      );
    });

    it('should include campaign id', function () {
      let id = 1;

      shallowRenderer.render(<DfpPixel campaignId={ id } placement='junk' />);

      let html = shallowRenderer.getRenderOutput();
      expect(html.props['data-targeting'].dfp_campaign_id).to.equal(id);
    });

    it('should require campaign id', function () {
      chai.spy.on(console, 'error');

      shallowRenderer.render(<DfpPixel placement='junk' />);

      expect(console.error).to.have.been.called.with(
        'Warning: Failed propType: Required prop `campaignId` was not specified in `DfpPixel`.'
      );
    });
  });
});
