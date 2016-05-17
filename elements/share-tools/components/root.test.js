import React, { PropTypes } from 'react';
import { shallow } from 'enzyme';

import Root from './root';

describe('<share-tools> <Root>', () => {
  describe('propTypes', () => {
    let subject = Root.propTypes;

    it('requires share-title', () => {
      expect(subject.shareTitle).to.eql(PropTypes.string.isRequired);
    });

    it('requires share-url', () => {
      expect(subject.shareTitle).to.eql(PropTypes.string.isRequired);
    });

    it('accepts children', () => {
      expect(subject.children).to.eql(PropTypes.node);
    });
  });

  describe('render', () => {
    it('passes children through', () => {
      expect(shallow(
        <Root
          shareTitle='Share Title'
          shareUrl='//example.org/share-me'
          children={<div/>}
       />
      ).equals(
        <div
          className='share-tools'
          data-share-title='Share Title'
          data-share-url='//example.org/share-me'
        >
          <div/>
        </div>
      )).to.be.true;
    });
  });
});
