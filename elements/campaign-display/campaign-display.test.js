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
  let crop;
  let campaign;
  beforeEach(() => {
    // TODO: Prevent setState warnings spamming the console
    // We sould investigate if this is an issue with lib/bulbs-elements/store/store.js:60
    CampaignDisplay.prototype.setState = sinon.spy();

    placement = 'top';
    src = 'http://example.com';
    campaign = {
      active: true,
      clickthrough_url: 'http://example.com/clickthrough',
      image_url: 'http://example.com/campain-img.jpg',
      name: 'Test Campaign',
    };

    props = {
      noLink: '',
      placement,
      src,
    };

    fetchMock.mock(src, campaign);
    shallowRenderer = createRenderer();
    shallowRenderer.render(<CampaignDisplay {...props} />);
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

  it('accepts a logo-crop attribute', () => {
    subject = shallowRenderer.getRenderOutput();
    expect(subject.props.logoCrop).to.equal(crop);
  });

  it('accepts a no-link attribute', () => {
    subject = shallowRenderer.getRenderOutput();
    expect(subject.props.noLink).to.equal(true);
  });

  describe('initialDispatch', () => {
    it('fetches campaign data for display', () => {
      subject = new CampaignDisplay(props);
      let spy = sinon.stub(subject.store.actions, 'fetchCampaign');
      subject.initialDispatch();
      expect(spy).to.have.been.calledWith(src);
    });
  });
});
