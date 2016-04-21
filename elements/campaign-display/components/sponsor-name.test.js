import React from 'react';
import ReactDOM from 'react-dom';
import SponsorName from './sponsor-name';

describe('<campaign-display> <CampaignDisplayName>', () => {
  let reactContainer;
  let sponsorName = 'Test Campaign';
  let subject;

  beforeEach(() => {
    reactContainer = document.createElement('react-container');
    document.body.appendChild(reactContainer);
  });

  afterEach(() => {
    reactContainer.remove();
  });

  context('without a clickthrough_url', () => {
    beforeEach(() => {
      subject = ReactDOM.render(<SponsorName name={sponsorName} />, reactContainer);
    });

    it('renders the campaign name', () => {
      expect(subject.refs.name.innerHTML).to.equal('Test Campaign');
    });
  });

  context('with a clickthrough_url', () => {
    let props;

    beforeEach(() => {
      props = {
        name: sponsorName,
        clickthrough_url: 'http://example.com',
      };
      subject = ReactDOM.render(<SponsorName {...props} />, reactContainer);
    });

    it('wraps the image in a link to the clickthrough_url', () => {
      expect(subject.refs.linkWrapper.getAttribute('href'))
        .to.equal(props.clickthrough_url);
    });
  });
});
