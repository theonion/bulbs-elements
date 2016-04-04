import React from 'react';
import CampaignDisplayName from './campaign-display-name';
import { createRenderer } from 'react-addons-test-utils';

describe('<campaign-display> <CampaignDisplayName>', function () {
  let shallowRenderer;
  let props;
  let subject;
  beforeEach(function() {
    props = { name: 'Test Campaign' };
    shallowRenderer = createRenderer();
    shallowRenderer.render(<CampaignDisplayName {...props} />);
    subject = shallowRenderer.getRenderOutput();
  });

  it('renders the campaign name', function () {
    expect(subject.props.children).to.contain('Test Campaign');
  });
});
