import React from 'react';
import { createRenderer } from 'react-addons-test-utils';
import Preamble from './preamble';

describe('<campaign-display> <Preamble>', () => {
  let shallowRenderer;
  let subject;
  let text;
  beforeEach(() => {
    text = 'Presented by';
    shallowRenderer = createRenderer();
    shallowRenderer.render(<Preamble text={text} />);
    subject = shallowRenderer.getRenderOutput();
  });

  it('renders the campaign text', () => {
    expect(subject.props.children).to.equal(text);
  });
});
