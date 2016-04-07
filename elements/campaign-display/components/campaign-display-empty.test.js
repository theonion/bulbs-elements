import React from 'react';
import ReactDOM from 'react-dom';
import _, { first } from 'lodash';
import utils, { createRenderer } from 'react-addons-test-utils';
import rquery from 'rquery';
import CampaignDisplayEmpty from './campaign-display-empty';
import fetchMock from 'fetch-mock';

const $R = rquery(_, React, ReactDOM, utils);

describe('<campaign-display> <CampaignDisplayEmpty>', () => {
  let shallowRenderer;
  let subject;
  let campaignUrl;
  beforeEach(() => {
    campaignUrl = 'http://example.com';
    fetchMock.mock(campaignUrl, 400);
    shallowRenderer = createRenderer();
    shallowRenderer.render(<CampaignDisplayEmpty />);
    subject = $R(shallowRenderer.getRenderOutput());
  });

  it('renders nothing', () => {
    let children = first(subject.components).props.children;
    expect(children).to.be.undefined;
  });
});
