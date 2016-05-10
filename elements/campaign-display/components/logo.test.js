import React from 'react';
import { shallow } from 'enzyme';
import Logo from './logo';

describe('<campaign-display> <Logo>', () => {
  let imageUrl = 'http://example.com/img.jpg';
  let subject;

  beforeEach(() => {
    subject = shallow(<Logo image_url={imageUrl}/>);
  });

  describe('render', () => {
    it('should render an image with the given src', () => {
      expect(subject).to.contain(<img src={imageUrl}/>);
    });

    it('has a campaign-display-logo class', () => {
      expect(subject).to.have.className('campaign-display-logo');
    });
  });
});
