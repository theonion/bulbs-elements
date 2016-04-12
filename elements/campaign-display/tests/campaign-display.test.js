import React from 'react';
import CampaignDisplay from '../campaign-display';
import { createRenderer } from 'react-addons-test-utils';
import fetchMock from 'fetch-mock';

describe('<campaign-display>', () => {
  let subject;
  let props;
  let shallowRenderer;
  let campaignUrl;
  beforeEach(() => {
    campaignUrl = 'http://example.com';
    props = {
      campaignUrl,
      display: 'image',
    };
    // Prevent setState warnings spamming the console
    // We sould investigate if this is an issue with lib/bulbs-elements/store/store.js:60
    CampaignDisplay.prototype.setState = chai.spy();
    fetchMock.mock(campaignUrl, props);
    shallowRenderer = createRenderer();
    shallowRenderer.render(<CampaignDisplay {...props} />);
    subject = new CampaignDisplay(props);
  });

  it('requires a campaignUrl', () => {
    expect(() => {
      new CampaignDisplay({ display: 'image' }); // eslint-disable-line
    }).to.throw('campaign-display component requires a campaign url');
  });

  describe('initialDispatch', () => {
    it('fetches campaign data for display', () => {
      let spy = chai.spy.on(subject.store.actions, 'fetchCampaign');
      subject.initialDispatch();
      expect(spy).to.have.been.called.with(campaignUrl);
    });
  });
});
