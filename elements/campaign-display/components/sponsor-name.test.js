import React from 'react';
import { createRenderer } from 'react-addons-test-utils';
import SponsorName from './sponsor-name';

describe('<campaign-display> <CampaignDisplayName>', () => {
  let shallowRenderer = createRenderer();
  let sponsorName = 'Test Campaign';
  let subject;

  context('without a clickthrough_url', () => {
    beforeEach(() => {
      shallowRenderer.render(<SponsorName name={sponsorName} />);
      subject = shallowRenderer.getRenderOutput();
    });

    it('renders the campaign name', () => {
      expect(subject.props.children).to.equal('Test Campaign');
    });
  });

  context('with a clickthrough_url', () => {
    let props;
    beforeEach(() => {
      props = {
        name: sponsorName,
        clickthrough_url: 'http://example.com',
      };
      shallowRenderer.render(<SponsorName {...props} />);
      subject = shallowRenderer.getRenderOutput();
    });

    it('wraps the image in a link to the clickthrough_url', () => {
      expect(subject.type).to.equal('a');
    });
  });
});
