import React from 'react';
import { createRenderer } from 'react-addons-test-utils';
import CampaignDisplayRoot from './campaign-display-root';
import CampaignDisplayName from './campaign-display-name';
import CampaignDisplayImage from './campaign-display-image';
import fetchMock from 'fetch-mock';

describe('<campaign-display> <CampaignDisplayRoot>', () => {
  let shallowRenderer;
  let subject;
  let props;
  let response;
  let campaignUrl;
  let imageUrl;

  beforeEach(() => {
    campaignUrl = 'http://example.com';
    imageUrl = 'http://example.com/image.png';
    response = {
      clickthrough_url: campaignUrl,
      image_url: imageUrl,
      name: 'Test Campaign',
    };
    fetchMock
      .mock(campaignUrl, response)
      .mock(imageUrl, 200);
    shallowRenderer = createRenderer();
  });

  context('with display set to `name`', () => {
    beforeEach(() => {
      props = { display: 'name', campaign: response };
      shallowRenderer.render(<CampaignDisplayRoot {...props} />);
      subject = shallowRenderer.getRenderOutput();
    });

    it('renders the CampaignDisplayName component', () => {
      expect(subject.props.children.type).to.equal(CampaignDisplayName);
    });
  });

  context('with display set to `image`', () => {
    beforeEach(() => {
      props = { display: 'image', campaign: response };
      shallowRenderer.render(<CampaignDisplayRoot {...props} />);
      subject = shallowRenderer.getRenderOutput();
    });

    it('renders the CampaignDisplayName component', () => {
      expect(subject.props.children.type).to.equal(CampaignDisplayImage);
    });
  });
});
