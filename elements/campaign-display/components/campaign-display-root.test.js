import React from 'react';
import CampaignDisplayRoot from './campaign-display-root';
import CampaignDisplayName from './campaign-display-name';
import CampaignDisplayImage from './campaign-display-image';
import { createRenderer } from 'react-addons-test-utils';

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
      subject = shallowRenderer.getRenderOutput();
    });

    it('renders the CampaignDisplayName component', () => {
      expect(subject.props.children.type).to.equal(CampaignDisplayName);
    });
  });

  context('with display set to `image`', () => {
    beforeEach(() => {
      props = { display: 'image', data };
      shallowRenderer.render(<CampaignDisplayRoot {...props} />);
      subject = shallowRenderer.getRenderOutput();
    });

    it('renders the CampaignDisplayName component', () => {
      expect(subject.props.children.type).to.equal(CampaignDisplayImage);
    });
  });
});
