import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';

import ShareViaEmail from './via-email';
import ShareButton from './share-button';

describe('<share-tools> <ViaEmail>', () => {
  describe('propTypes', () => {
    let subject = ShareViaEmail.propTypes;

    it('requires a message', () => {
      expect(subject.message).to.eql(PropTypes.string.isRequired);
    });
  });

  describe('render', () => {
    let subject;

    beforeEach(() => {
      subject = new ShareViaEmail({
        icon: true,
        label: true,
        message: 'Message',
      });

      Object.defineProperty(subject, 'shareTitle', { get: () => { return 'Title' } });
      Object.defineProperty(subject, 'shareUrl', { get: () => { return 'URL' } });
    });

    it('renders a ShareButton', () => {
      let emailUrl = `mailto:subject=Title&body=URL %0D%0A%0D%0AMessage`;
      let expected = (
        <ShareButton
          className='share-via-email'
          href={emailUrl}
          dataTrackLabel='Email'
          iconClassName='fa fa-envelope'
          icon={true}
          label={true}
          labelText='Email'
        />
      );
      expect(subject.render().type).to.eql(expected.type);
      expect(subject.render().props).to.eql(expected.props);
    });
  });
});
