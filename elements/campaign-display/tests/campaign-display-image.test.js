import React from 'react';
import { createRenderer } from 'react-addons-test-utils';
import CampaignDisplayImage from '../components/campaign-display-image';
import fetchMock from 'fetch-mock';

describe('<campaign-display> <CampaignDisplayImage>', () => {
  let shallowRenderer;
  let props;
  let subject;
  let campaignUrl;
  let campaignName;
  let imageUrl;
  beforeEach(() => {
    campaignName = 'Test Campaign';
    campaignUrl = 'http://example.com';
    imageUrl = 'http://example.com./image.png';
    props = {
      name: 'Test Campaign',
      image_url: imageUrl,
      image_id: 1,
      clickthrough_url: campaignUrl,
    };
    fetchMock
      .mock(campaignUrl, 200);
    shallowRenderer = createRenderer();
    shallowRenderer.render(<CampaignDisplayImage {...props} />);
    subject = shallowRenderer.getRenderOutput();
  });

  it('renders the campaign image', () => {
    let image = subject.props.children.props.children;
    expect(image.props.src).to.equal(imageUrl);
  });

  it('renders a link to the campaign url', function() {
    let link = subject.props.children;
    expect(link.props.href).to.equal(campaignUrl);
  });

  it('renders an alt tag with the campaign name', () => {
    let image = subject.props.children.props.children;
    expect(image.props.alt).to.equal(campaignName);
  });

  context('without a clickthrough_url', () => {
    xit('does not wrap the image in a link', () => {
      delete props.clickthrough_url;
      shallowRenderer.render(<CampaignDisplayImage {...props} />);
      subject = $R(shallowRenderer.getRenderOutput());
      let link = first(subject.find('a'));
      expect(link).to.be.undefined;
    });
  });
});
