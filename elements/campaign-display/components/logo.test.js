import React from 'react';
import ReactDOM from 'react-dom';
import Logo from './logo';

describe('<campaign-display> <Logo>', () => {
  let clickthroughUrl = 'http://example.com';
  let reactContainer;
  let props;
  let subject;

  beforeEach(() => {
    reactContainer = document.createElement('react-container');
    document.body.appendChild(reactContainer);
  });

  afterEach(() => {
    reactContainer.remove();
  });

  context('picturefill', () => {

    it('should be called during render', () => {
      props = {
        name: 'Test Campaign',
        image_id: 1,
        clickthrough_url: clickthroughUrl
      };
      window.picturefill = chai.spy(() => {});

      subject = ReactDOM.render(<Logo {...props} />, reactContainer);

      expect(window.picturefill).to.have.been.called.with(subject.refs.image);
    });
  });

  context('without a clickthrough_url', () => {
    beforeEach(() => {
      props = {
        name: 'Test Campaign',
        image_id: 1,
      };
      subject = ReactDOM.render(<Logo {...props} />, reactContainer);
    });

    it('should render the image container with the required attributes', () => {
      let element = subject.refs.image;

      expect(element.getAttribute('data-type')).to.equal('image');
      expect(element.getAttribute('data-image-id')).to.equal('1');
      expect(element.getAttribute('data-crop')).to.equal('original');
    });

    it('should render the image container with a child div', function () {
      // NOTE : this is required for compatibility with our image.js code :(
      expect(subject.refs.image.children[0].tagName).to.equal('DIV');
    });

    it('allows the crop value to be configured', () => {
      props.crop = 'custom-crop';

      subject = ReactDOM.render(<Logo {...props} />, reactContainer);

      let element = subject.refs.image;
      expect(element.getAttribute('data-crop')).to.equal('custom-crop');
    });
  });

  context('with a clickthrough_url', () => {
    beforeEach(() => {
      props = {
        name: 'Test Campaign',
        image_id: 1,
        clickthrough_url: clickthroughUrl,
      };
      subject = ReactDOM.render(<Logo {...props} />, reactContainer);
    });

    it('wraps the image in a link to the clickthrough_url', () => {

      let element = subject.refs.linkWrapper;
      expect(element.tagName).to.equal('A');
      expect(element.getAttribute('href')).to.equal(props.clickthrough_url);
    });
  });
});
