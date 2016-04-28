import React from 'react';
import { shallow } from 'enzyme';
import Logo from './logo';
import CroppedImage from 'bulbs-elements/components/cropped-image';

describe('<campaign-display> <Logo>', () => {
  let clickthroughUrl = 'http://example.com';
  let props;
  let subject;

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
      expect(subject.equals(
        <div className='campaign-display-logo'>
          <CroppedImage
            imageId={1}
            crop={undefined}
          />
        </div>
      )).to.be.true;
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
      expect(subject.equals(
        <div className='campaign-display-logo'>
          <CroppedImage
            imageId={1}
            crop='custom-crop'
          />
        </div>
      )).to.be.true;
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
      expect(subject.equals(
        <div className='campaign-display-logo'>
          <a href={clickthroughUrl}>
            <CroppedImage
              imageId={1}
              crop={undefined}
            />
          </a>
        </div>
      )).to.be.true;
    });
  });
});
