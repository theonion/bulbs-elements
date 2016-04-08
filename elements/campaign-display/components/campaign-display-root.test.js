import React from 'react';
import ReactDOM from 'react-dom';
import _, { first } from 'lodash';
import utils, { createRenderer } from 'react-addons-test-utils';
import rquery from 'rquery';
import CampaignDisplayRoot from './campaign-display-root';
import fetchMock from 'fetch-mock';

const $R = rquery(_, React, ReactDOM, utils);

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
      subject = $R(shallowRenderer.getRenderOutput());
    });

    it('renders the CampaignDisplayName component', () => {
      let campaignDisplayName = subject.find('.campaign-display-name');
      expect(campaignDisplayName).to.exist;
    });
  });

  context('with display set to `image`', () => {
    beforeEach(() => {
      props = { display: 'image', campaign: response };
      shallowRenderer.render(<CampaignDisplayRoot {...props} />);
      subject = $R(shallowRenderer.getRenderOutput());
    });

    it('renders the CampaignDisplayName component', () => {
      let campainDisplayImage = subject.find('.campaign-display-image');
      expect(campainDisplayImage).to.exist;
    });
  });
});
