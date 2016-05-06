import React, { PropTypes } from 'react';
import { shallow } from 'enzyme';

import ShareViaTwitter from './via-twitter';

describe('<share-tools> <ViaTwitter>', () => {
  describe('propTypes', () => {
    let subject = ShareViaTwitter.propTypes;

    it('requires a twitterHandle', () => {
      expect(subject.twitterHandle).to.eql(PropTypes.string.isRequired);
    });
  });

  describe('share', () => {
    let event;

    beforeEach(() => {
      event = {};
      sinon.stub(event, 'preventDefault');
      sinon.stub(window, 'open');
      let shareViaTwitter = new ShareViaTwitter({});
      shareViaTwitter.share(event);
    });

    afterEach(() => {
      window.open.restore();
    });

    it.only('prevents default', () => {
      debugger
      expect(event.preventDefault).to.have.been.called;
    });

    it('opens a twitter popup', () => {
    });
  });
});
