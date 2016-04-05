import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';
import utils, { createRenderer } from 'react-addons-test-utils';
import rquery from 'rquery';
import CampaignDisplayRoot from './campaign-display-root';

const $R = rquery(_, React, ReactDOM, utils);

describe('<campaign-display> <CampaignDisplayRoot>', () => {
  let shallowRenderer;
  let subject;
  let props;
  let data;

  beforeEach(() => {
    data = {
      name: 'Test Campaign',
      image: 'test-campaign-url',
    };
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
