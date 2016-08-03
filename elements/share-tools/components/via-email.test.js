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
        icon: '',
        label: '',
        message: 'Message',
      });

      Object.defineProperty(subject, 'shareTitle', { get: () => { return 'Title'; } });
      Object.defineProperty(subject, 'shareUrl', { get: () => { return 'URL'; } });
    });

    it('renders a ShareButton', () => {
      let expected = (
        <ShareButton
          className='share-via-email'
          dataTrackLabel='Email'
          iconClassName='fa fa-envelope'
          icon={true}
          label={true}
          labelText='Email'
          href={undefined}
        />
      );
      expect(subject.render().type).to.eql(expected.type);
      expect(subject.render().props).to.eql(expected.props);
    });

    it('renders a ShareButton', () => {
      let expected = (
        <ShareButton
          className='share-via-email'
          dataTrackLabel='Email'
          iconClassName='fa fa-envelope'
          icon={true}
          label={true}
          labelText='Email'
          href='URL'
        />
      );
      subject.state.emailUrl = 'URL';
      expect(subject.render().props).to.eql(expected.props);
    });
  });
});
