import React from 'react';
import { shallow } from 'enzyme';
import Logo from './logo';
import Croppedimage from 'bulbs-elements/components/cropped-image';

describe('<campaign-display> <Logo>', () => {
  let clickthroughUrl = 'http://example.com';
  let props;
  let subject;

  function shallow (element) {
    let shallowRenderer = createRenderer();
    shallowRenderer.render(element);
    return shallowRenderer.getRenderOutput();
  }

  describe('shouldWrapLink', function() {
    beforeEach(() => {
      props = {
        image_id: 1,
        name: 'Test Campaign',
      };
    });

    it('returns false when no-link attribute is present', () => {
      props.noLink = '';
      subject = new Logo(props);
      expect(subject.shouldWrapWithLink()).to.equal(false);
    });

    it('returns true when there is a clickthrough_url', () => {
      props.clickthrough_url = 'http://example.com';
      subject = new Logo(props);
      expect(subject.shouldWrapWithLink()).to.equal(true);
    });
  });

  context('without a clickthrough_url', () => {
    beforeEach(() => {
      props = {
        name: 'Test Campaign',
        image_id: 1,
      };
      subject = shallow(<Logo {...props}/>);
    });

    it('should render the image container with the required attributes', () => {
      let croppedImage = subject.props.children;
      expect(croppedImage.type).to.eql(Croppedimage);
      expect(croppedImage.props).to.eql({
        crop: undefined, // eslint-disable-line no-undefined
        imageId: 1,
      });
    });
  });

  context('with a crop', () => {
    beforeEach(() => {
      props = {
        name: 'Test Campaign',
        image_id: 1,
        crop: 'custom-crop',
      };
      subject = shallow(<Logo {...props}/>);
    });

    it('allows the crop value to be configured', () => {
      let croppedImage = subject.props.children;
      expect(croppedImage.props.crop).to.eql('custom-crop');
    });
  });

  context('with a clickthrough_url', () => {
    beforeEach(() => {
      props = {
        name: 'Test Campaign',
        image_id: 1,
        clickthrough_url: clickthroughUrl,
      };
      subject = shallow(<Logo {...props}/>);
    });

    it('wraps the image in a link to the clickthrough_url', () => {
      let anchor = subject.props.children;
      expect(anchor.type).to.eql('a');
      expect(anchor.props.href).to.equal(props.clickthrough_url);
    });
  });
});
