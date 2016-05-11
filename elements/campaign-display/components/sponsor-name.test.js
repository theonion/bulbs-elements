import React from 'react';
import SponsorName from './sponsor-name';
import { shallow } from 'enzyme';

describe('<campaign-display> <SponsorName>', () => {
  let subject;
  beforeEach(() => {
    subject = shallow(<SponsorName name='Test Campaign' />);
  });

  it('renders the campaign name', () => {
    expect(subject).to.have.text('Test Campaign');
  });

  it('has a campaign-display-sponsor-name class', () => {
    expect(subject).to.have.className('campaign-display-sponsor-name');
  });
});
