import React from 'react';
import ReactDOM from 'react-dom';
import _, { first } from 'lodash';
import utils, { createRenderer } from 'react-addons-test-utils';
import rquery from 'rquery';
import CampaignDisplayImage from './campaign-display-image';

const $R = rquery(_, React, ReactDOM, utils);

describe('<campaign-display> <CampaignDisplayImage>', () => {
  let shallowRenderer;
  let props;
  let subject;
  let renderOutput;
  beforeEach(() => {
    props = {
      image: 'campaign-image-url',
      url: 'campaign-url',
    };
    shallowRenderer = createRenderer();
    shallowRenderer.render(<CampaignDisplayImage {...props} />);
    subject = $R(shallowRenderer.getRenderOutput());
  });

  it('renders the campaign image', () => {
    let image = first(subject.find('img'));
    expect(image.props.src).to.equal('campaign-image-url');
  });

  it('renders a link to the campaign url', function() {
    let link = first(subject.find('a'));
    expect(link.props.href).to.equal('campaign-url');
  });
});
