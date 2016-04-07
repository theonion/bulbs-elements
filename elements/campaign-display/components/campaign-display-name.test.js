import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';
import utils, { createRenderer } from 'react-addons-test-utils';
import rquery from 'rquery';
import CampaignDisplayName from './campaign-display-name';
import fetchMock from 'fetch-mock';

const $R = rquery(_, React, ReactDOM, utils);

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
    subject = $R(shallowRenderer.getRenderOutput());
  });

  it('renders the campaign name', () => {
    expect(subject.text()).to.equal('Test Campaign');
  });
});
