import React from 'react';
import ReactDOM from 'react-dom';
import _, { first } from 'lodash';
import utils, { createRenderer } from 'react-addons-test-utils';
import rquery from 'rquery';
import CampaignDisplayImage from '../components/campaign-display-image';
import fetchMock from 'fetch-mock';

const $R = rquery(_, React, ReactDOM, utils);

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
    subject = $R(shallowRenderer.getRenderOutput());
  });

  it('renders the campaign image', () => {
    let image = first(subject.find('img'));
    expect(image.props.src).to.equal(imageUrl);
  });

  it('renders a link to the campaign url', function() {
    let link = first(subject.find('a'));
    expect(link.props.href).to.equal(campaignUrl);
  });

  it('renders an alt tag with the campaign name', () => {
    let image = first(subject.find('img'));
    expect(image.props.alt).to.equal(campaignName);
  });
});
