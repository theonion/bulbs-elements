import React, { PropTypes } from 'react';
import { shallow } from 'enzyme';

import ShareTools from './share-tools';
import Root from './components/root';

describe('<share-tools>', () => {
  describe('propTypes', () => {
    let subject = ShareTools.propTypes;

    it('requires data-track-action', () => {
      expect(subject.dataTrackAction).to.eql(PropTypes.string.isRequired);
    });

    it('requires data-track-category', () => {
      expect(subject.dataTrackCategory).to.eql(PropTypes.string.isRequired);
    });

    it('requires share-url', () => {
      expect(subject.shareUrl).to.eql(PropTypes.string.isRequired);
    });

    it('requires share-title', () => {
      expect(subject.shareTitle).to.eql(PropTypes.string.isRequired);
    });
  });

  describe('render', () => {
    let subject;
    let props = {
      shareUrl: 'http://example.com',
      shareTitle: 'Example',
      dataTrackAction: 'Action',
      dataTrackCategory: 'Category',
    };

    it('passes children through', () => {
      expect(shallow(
        <ShareTools {...props}/>
      ).equals(
        <Root {...props}/>
      )).to.be.true;
    });
  });
});
