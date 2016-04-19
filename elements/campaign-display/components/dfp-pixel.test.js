import React from 'react';
import ReactDOM from 'react-dom';

import DfpPixel from './dfp-pixel';

describe('<campaign-display> <DfpPixel>', () => {

  let reactContainer;

  beforeEach(() => {
    reactContainer = document.createElement('react-container');
    document.body.appendChild(reactContainer);
  });

  afterEach(() => {
    reactContainer.remove();
  });

  context('on render', () => {

    it('should call a callback', () => {
      let eventName = 'campaign-display-dfp-pixel-ready';
      let elem;
      let listener = document.addEventListener(
        eventName,
        (e) => {
          elem = e.target;
        }
      );

      let subject = ReactDOM.render(
        <DfpPixel
            placement='junk'
            campaignId={1} />,
        reactContainer
      );

      document.removeEventListener(eventName, listener);

      expect(elem).to.eql(subject.refs.container);
    });
  });

// TODO : add these back
  // context('ad unit name', () => {
  //
  //   it('should always be "campaign-pixel"', () => {
  //
  //     shallowRenderer.render(<DfpPixel placement='junk' campaignId={1} />);
  //
  //     let html = shallowRenderer.getRenderOutput();
  //     expect(html.props['data-ad-unit']).to.equal('campaign-pixel');
  //   });
  // });
  //
  // context('targeting parameters', () => {
  //
  //   it('should include ad unit placement', () => {
  //     let placement = 'top';
  //
  //     shallowRenderer.render(<DfpPixel campaignId={1} placement={ placement } />);
  //
  //     let html = shallowRenderer.getRenderOutput();
  //     expect(JSON.parse(html.props['data-targeting']).dfp_placement).to.equal(placement);
  //   });
  //
  //   it('should require ad unit placement', () => {
  //     chai.spy.on(console, 'error');
  //
  //     shallowRenderer.render(<DfpPixel campaignId={1} />);
  //
  //     expect(console.error).to.have.been.called.with(
  //       'Warning: Failed propType: Required prop `placement` was not specified in `DfpPixel`.'
  //     );
  //   });
  //
  //   it('should include campaign id', () => {
  //     let id = 1;
  //
  //     shallowRenderer.render(<DfpPixel campaignId={ id } placement='junk' />);
  //
  //     let html = shallowRenderer.getRenderOutput();
  //     expect(JSON.parse(html.props['data-targeting']).dfp_campaign_id).to.equal(id);
  //   });
  //
  //   it('should require campaign id', () => {
  //     chai.spy.on(console, 'error');
  //
  //     shallowRenderer.render(<DfpPixel placement='junk' />);
  //
  //     expect(console.error).to.have.been.called.with(
  //       'Warning: Failed propType: Required prop `campaignId` was not specified in `DfpPixel`.'
  //     );
  //   });
  // });
});
