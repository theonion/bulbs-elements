import React from 'react';
import { createRenderer } from 'react-addons-test-utils';
import CroppedImage from './cropped-image';

describe('<cropped-image>', () => {
  let subject;
  let shallowRenderer;
  beforeEach(() => {
    shallowRenderer = createRenderer();
    shallowRenderer.render(<CroppedImage />);
    subject = shallowRenderer.getRenderOutput();
  });

  it('renders an empty image', () => {
    expect(subject.props.src).to.equal('');
    expect(subject.type).to.equal('img');
  });
});
