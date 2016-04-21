import React from 'react';
import CampaignDisplay from './campaign-display';
import { createRenderer } from 'react-addons-test-utils';
import fetchMock from 'fetch-mock';

describe('<campaign-display>', () => {
  let subject;
  let placement;
  let props;
  let shallowRenderer;
  let src;
  beforeEach(() => {
    // TODO: Prevent setState warnings spamming the console
    // We sould investigate if this is an issue with lib/bulbs-elements/store/store.js:60
    CampaignDisplay.prototype.setState = chai.spy();

    placement = 'top';
    src = 'http://example.com';
    props = {
      src,
      clickthrough_url: 'http://example.com/clickthrough',
      image_id: 'http://example.com/image.jpg',
      name: 'Test Campaign',
      placement,
    };
    fetchMock.mock(src, props);
    shallowRenderer = createRenderer();
    shallowRenderer.render(<CampaignDisplay src={src} placement={placement} />);
  });

  it('should require a src', () => {
    expect(() => {
      new CampaignDisplay({ placement: 'top' }); // eslint-disable-line
    }).to.throw('campaign-display component requires a src');
  });

  it('should require a placement', function () {
    expect(() => {
      new CampaignDisplay({ src: 'some/src '}); // eslint-disable-line
    }).to.throw('campaign-display component requires a placement');
  });

  describe('initialDispatch', () => {
    it('fetches campaign data for display', () => {
      subject = new CampaignDisplay(props);
      let spy = chai.spy.on(subject.store.actions, 'fetchCampaign');
      subject.initialDispatch();
      expect(spy).to.have.been.called.with(src);
    });
  });
});
