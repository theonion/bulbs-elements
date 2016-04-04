import React from 'react';
import CampaignDisplayImage from './campaign-display-image';
import { createRenderer } from 'react-addons-test-utils';

describe('<campaign-display> <CampaignDisplayImage>', () => {
  let shallowRenderer;
  let props;
  let subject;
  beforeEach(() => {
    props = { image: 'some-image-url' };
    shallowRenderer = createRenderer();
    shallowRenderer.render(<CampaignDisplayImage {...props} />);
    subject = shallowRenderer.getRenderOutput();
  });

  it('renders the campaign image', () => {
    expect(subject.props.children.type).to.equal('img');
    expect(subject.props.children.props.src).to.equal('some-image-url');
  });
});
