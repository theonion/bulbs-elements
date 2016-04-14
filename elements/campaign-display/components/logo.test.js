import React from 'react';
import { createRenderer } from 'react-addons-test-utils';
import Logo from './logo';

describe('<campaign-display> <Logo>', () => {
  let clickthroughUrl = 'http://example.com';
  let props;
  let shallowRenderer = createRenderer();
  let subject;

  context('without a clickthrough_url', () => {
    beforeEach(() => {
      props = {
        name: 'Test Campaign',
        image_id: 1,
      };
      shallowRenderer.render(<Logo {...props} />);
      subject = shallowRenderer.getRenderOutput();
    });

    it('renders the image container with the required attributes', () => {
      expect(subject.props['data-type']).to.equal('image');
      expect(subject.props['data-image-id']).to.equal(1);
      expect(subject.props['data-crop']).to.equal('original');
    });

    it('allows the crop value to be configured', () => {
      props.crop = 'custom-crop';
      shallowRenderer.render(<Logo {...props} />);
      subject = shallowRenderer.getRenderOutput();
      expect(subject.props['data-crop']).to.equal('custom-crop');
    });
  });

  context('with a clickthrough_url', () => {
    beforeEach(() => {
      props = {
        name: 'Test Campaign',
        image_id: 1,
        clickthrough_url: clickthroughUrl,
      };
      shallowRenderer.render(<Logo {...props} />);
      subject = shallowRenderer.getRenderOutput();
    });

    it('wraps the image in a link to the clickthrough_url', () => {
      expect(subject.type).to.equal('a');
    });
  });
});
