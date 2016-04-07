import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';
import utils, { createRenderer } from 'react-addons-test-utils';
import rquery from 'rquery';
import CampaignDisplayRoot from './campaign-display-root';
import fetchMock from 'fetch-mock';

const $R = rquery(_, React, ReactDOM, utils);

describe('<campaign-display> <CampaignDisplayRoot>', () => {
  let shallowRenderer;
  let subject;
  let props;
  let data;
  let campaignUrl;
  let imageUrl;

  beforeEach(() => {
    campaignUrl = 'http://example.com';
    imageUrl = 'http://example.com/image.png';
    data = {
      name: 'Test Campaign',
      image: imageUrl,
    };
    fetchMock
      .mock(campaignUrl, data)
      .mock(imageUrl, 200);
    shallowRenderer = createRenderer();
  });

  context('with display set to `name`', () => {
    beforeEach(() => {
      props = { display: 'name', data };
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
      props = { display: 'image', data };
      shallowRenderer.render(<CampaignDisplayRoot {...props} />);
      subject = $R(shallowRenderer.getRenderOutput());
    });

    it('renders the CampaignDisplayName component', () => {
      let campainDisplayImage = subject.find('.campaign-display-image');
      expect(campainDisplayImage).to.exist;
    });
  });
});
