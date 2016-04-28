import React from 'react';
import SponsorName from './sponsor-name';
import { createRenderer } from 'react-addons-test-utils';

describe('<campaign-display> <SponsorName>', () => {
  let clickthrough_url = 'http://example.com';
  let props;
  let reactContainer;
  let shallowRenderer;
  let sponsorName = 'Test Campaign';
  let subject;

  beforeEach(() => {
    shallowRenderer = createRenderer();
    props = {
      name: sponsorName,
      clickthrough_url,
    };
  });

  describe('shouldWrapLink', function() {
    beforeEach(() => {
      props = {
        clickthrough_url,
        name: sponsorName,
      };
    });

    it('returns false when no-link attribute is present', () => {
      props.noLink = '';
      subject = new SponsorName(props);
      expect(subject.shouldWrapWithLink()).to.equal(false);
    });

    it('returns true when there is a clickthrough_url', () => {
      subject = new SponsorName(props);
      expect(subject.shouldWrapWithLink()).to.equal(true);
    });
  });

  context('without a clickthrough_url', () => {
    beforeEach(() => {
      shallowRenderer.render(<SponsorName name={props.name} />);
      subject = shallowRenderer.getRenderOutput();
    });

    it('renders the campaign name', () => {
      expect(subject.props.children.props.children).to.equal(sponsorName);
    });
  });

  context('with a clickthrough_url', () => {
    beforeEach(() => {
      shallowRenderer.render(<SponsorName {...props}/>);
      subject = shallowRenderer.getRenderOutput();
    });

    it('wraps the name in a link to the clickthrough_url', () => {
      expect(subject.props.children.type).to.equal('a');
      expect(subject.props.children.props.href).to.equal(props.clickthrough_url);
    });

    context('when no-link attribute is present', () => {
      it('does not wrap the name in a link to the clickthrough_url ', () => {
        shallowRenderer.render(<SponsorName {...props} noLink/>)
        subject = shallowRenderer.getRenderOutput();
        expect(subject.props.children.type).to.equal('span');
      });
    });
  });
});
