import React, { PropTypes } from 'react';
import { shallow } from 'enzyme';

import ShareTools from './share-tools';

describe('<share-tools>', () => {
  describe('propTypes', () => {
    let subject = ShareTools.propTypes;

    it('requires url', () => {
      expect(subject.url).to.eql(PropTypes.string.isRequired);
    });

    it('requires title', () => {
      expect(subject.title).to.eql(PropTypes.string.isRequired);
    });
  });

  describe('render', () => {
    let subject;
    let props = {
      url: 'http://example.com',
      title: 'Example',
    };

    it('renders share tools wrapper', () => {
      expect(shallow(<ShareTools {...props}/>).equals(
        <div className='bulbs-share-tools'>
          {undefined}
        </div>
      )).to.be.true;
    });

    it('passes children through', () => {
      expect(shallow(
        <ShareTools {...props}>
          <div/>
        </ShareTools>
      ).equals(
        <div className='bulbs-share-tools'>
          <div/>
        </div>
      )).to.be.true;
    });
  });
});
