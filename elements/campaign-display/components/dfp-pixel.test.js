import React from 'react';
import ReactDOM from 'react-dom';

import DfpPixel from './dfp-pixel';

describe('<campaign-display> <DfpPixel>', () => {

  let reactContainer;
  let renderSubject;

  beforeEach(() => {
    reactContainer = document.createElement('react-container');
    document.body.appendChild(reactContainer);

    renderSubject = function () {
      return ReactDOM.render(
        <DfpPixel
            placement='junk'
            campaignId={1} />,
        reactContainer
      );
    };
  });

  afterEach(() => {
    reactContainer.remove();
  });

  context('on render', () => {

    it('should call AdsManager.reloadAds', () => {
      let reloadAds = chai.spy();
      window.BULBS_ELEMENTS_ADS_MANAGER = { reloadAds };

      let subject = renderSubject();

      delete window.BULBS_ELEMENTS_ADS_MANAGER;

      expect(reloadAds).to.have.been.called.with(subject.refs.container);
    });

    it('should error out if AdsManager is not available', function () {
      chai.spy.on(console, 'warn');

      renderSubject();

      expect(console.warn).to.have.been.called.with(
        '<campaign-display> pixel will not trigger since ' +
        '`window.BULBS_ELEMENTS_ADS_MANAGER` is not configured to an ' +
        'AdsManager instance.'
      );
    });

    it('should error out of AdsManager.reloadAds is not available', function () {
      window.BULBS_ELEMENTS_ADS_MANAGER = {};

      renderSubject();

      expect(console.warn).to.have.been.called.with(
        '<campaign-display> pixel will not trigger since ' +
        '`window.BULBS_ELEMENTS_ADS_MANAGER` is not configured to an ' +
        'AdsManager instance.'
      );
    });
  });

  context('ad unit name', () => {

    it('should always be "campaign-pixel"', () => {

      shallowRenderer.render(<DfpPixel placement='junk' campaignId={1} />);

      let html = shallowRenderer.getRenderOutput();
      expect(html.props['data-ad-unit']).to.equal('campaign-pixel');
    });
  });

  context('targeting parameters', () => {

    it('should include ad unit placement', () => {
      let placement = 'top';

      shallowRenderer.render(<DfpPixel campaignId={1} placement={ placement } />);

      let html = shallowRenderer.getRenderOutput();
      expect(JSON.parse(html.props['data-targeting']).dfp_placement).to.equal(placement);
    });

    it('should require ad unit placement', () => {
      chai.spy.on(console, 'error');

      shallowRenderer.render(<DfpPixel campaignId={1} />);

      expect(console.error).to.have.been.called.with(
        'Warning: Failed propType: Required prop `placement` was not specified in `DfpPixel`.'
      );
    });

    it('should include campaign id', () => {
      let id = 1;

      shallowRenderer.render(<DfpPixel campaignId={ id } placement='junk' />);

      let html = shallowRenderer.getRenderOutput();
      expect(JSON.parse(html.props['data-targeting']).dfp_campaign_id).to.equal(id);
    });

    it('should require campaign id', () => {
      chai.spy.on(console, 'error');

      shallowRenderer.render(<DfpPixel placement='junk' />);

      expect(console.error).to.have.been.called.with(
        'Warning: Failed propType: Required prop `campaignId` was not specified in `DfpPixel`.'
      );
    });
  });
});
