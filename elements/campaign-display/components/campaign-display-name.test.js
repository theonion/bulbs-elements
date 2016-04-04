import React from 'react';
import CampaignDisplayName from './campaign-display-name';
import { createRenderer } from 'react-addons-test-utils';

describe('<campaign-display> <CampaignDisplayName>', () => {
  let shallowRenderer;
  let props;
  let subject;
  beforeEach(() => {
    props = { name: 'Test Campaign' };
    shallowRenderer = createRenderer();
    shallowRenderer.render(<CampaignDisplayName {...props} />);
    subject = shallowRenderer.getRenderOutput();
  });

  it('renders the campaign name', () => {
    expect(subject.props.children).to.contain('Test Campaign');
  });
});
