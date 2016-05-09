import React from 'react';
import { shallow } from 'enzyme';
import Logo from './logo';

describe('<campaign-display> <Logo>', () => {
  let clickthroughUrl = 'http://example.com';
  let imageUrl = 'http://example.com/img.jpg';
  let props;
  let subject;

  beforeEach(() => {
    props = {
      name: 'Test Campaign',
      image_url: imageUrl,
    };
  });

  describe('shouldWrapLink', function() {
    it('returns false when no-link attribute is present', () => {
      props.noLink = true;
      subject = new Logo(props);
      expect(subject.shouldWrapWithLink()).to.equal(false);
    });

    it('returns true when there is a clickthrough_url', () => {
      props.clickthrough_url = 'http://example.com';
      subject = new Logo(props);
      expect(subject.shouldWrapWithLink()).to.equal(true);
    });
  });

  describe('render', () => {
    it('should render an image with the given src', () => {
      expect(shallow(<Logo {...props}/>).equals(
        <div className='campaign-display-logo'>
          <img src={imageUrl}/>
        </div>
      )).to.be.true;
    });

    context('with a clickthrough_url', () => {
      it('wraps the image in a link to the clickthrough_url', () => {
        props.clickthrough_url = clickthroughUrl;
        expect(shallow(<Logo {...props}/>).equals(
          <div className='campaign-display-logo'>
            <a href={clickthroughUrl}>
              <img src={imageUrl}/>
            </a>
          </div>
        )).to.be.true;
      });
    });
  });
});
