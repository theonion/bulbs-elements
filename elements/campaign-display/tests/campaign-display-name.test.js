import React from 'react';
import { createRenderer } from 'react-addons-test-utils';
import CampaignDisplayName from '../components/campaign-display-name';
import fetchMock from 'fetch-mock';

describe('<campaign-display> <CampaignDisplayName>', () => {
  let shallowRenderer;
  let props;
  let subject;
  let campaignUrl;
  beforeEach(() => {
    campaignUrl = 'http://example.com';
    fetchMock.mock(campaignUrl, 200);
    props = { name: 'Test Campaign' };
    shallowRenderer = createRenderer();
    shallowRenderer.render(<CampaignDisplayName {...props} />);
    subject = shallowRenderer.getRenderOutput();
  });

  it('renders the campaign name', () => {
    expect(subject.props.children).to.equal('Test Campaign');
  });
});
