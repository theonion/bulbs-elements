import React from 'react';
import CampaignDisplay from './campaign-display';
import { createRenderer } from 'react-addons-test-utils';
import fetchMock from 'fetch-mock';

describe('<campaign-display>', () => {
  let subject;
  let props;
  let shallowRenderer;
  let src;
  beforeEach(() => {
    // TODO: Prevent setState warnings spamming the console
    // We sould investigate if this is an issue with lib/bulbs-elements/store/store.js:60
    CampaignDisplay.prototype.setState = chai.spy();

    src = 'http://example.com';
    props = {
      src,
      clickthrough_url: 'http://example.com/clickthrough',
      image_id: 'http://example.com/image.jpg',
      name: 'Test Campaign',
    };
    fetchMock.mock(src, props);
    shallowRenderer = createRenderer();
    shallowRenderer.render(<CampaignDisplay src={src} />);
    subject = new CampaignDisplay(props);
  });

  it('requires a src', () => {
    expect(() => {
      new CampaignDisplay({}); // eslint-disable-line
    }).to.throw('campaign-display component requires a src');
  });

  describe('initialDispatch', () => {
    it('fetches campaign data for display', () => {
      let spy = chai.spy.on(subject.store.actions, 'fetchCampaign');
      subject.initialDispatch();
      expect(spy).to.have.been.called.with(src);
    });
  });
});
