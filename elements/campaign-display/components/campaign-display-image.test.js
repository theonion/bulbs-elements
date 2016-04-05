import React from 'react';
import CampaignDisplayImage from './campaign-display-image';
import { createRenderer } from 'react-addons-test-utils';
import { renderToStaticMarkup } from 'react-dom/server';

describe('<campaign-display> <CampaignDisplayImage>', () => {
  let shallowRenderer;
  let props;
  let subject;
  let renderOutput;
  beforeEach(() => {
    props = {
      image: 'campaign-image-url',
      url: 'campaign-url',
    };
    shallowRenderer = createRenderer();
    shallowRenderer.render(<CampaignDisplayImage {...props} />);
    renderOutput = shallowRenderer.getRenderOutput();
    subject = $(renderToStaticMarkup(renderOutput));
  });

  it('renders the campaign image', () => {
    let image = subject.find('img');
    expect(subject).to.have.descendants('img');
    expect(image).to.have.attr('src', 'campaign-image-url');
  });

  it('renders a link to the campaign url', function() {
    let link = subject.find('a');
    expect(subject).to.have.descendants('a');
    expect(link).to.have.attr('href', 'campaign-url');
  });
});
