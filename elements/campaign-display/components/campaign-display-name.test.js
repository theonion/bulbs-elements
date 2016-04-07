import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';
import utils, { createRenderer } from 'react-addons-test-utils';
import rquery from 'rquery';
import CampaignDisplayName from './campaign-display-name';

const $R = rquery(_, React, ReactDOM, utils);

describe('<campaign-display> <CampaignDisplayName>', () => {
  let shallowRenderer;
  let props;
  let subject;
  beforeEach(() => {
    props = { name: 'Test Campaign' };
    shallowRenderer = createRenderer();
    shallowRenderer.render(<CampaignDisplayName {...props} />);
    subject = $R(shallowRenderer.getRenderOutput());
  });

  it('renders the campaign name', () => {
    expect(subject.text()).to.equal('Test Campaign');
  });
});
