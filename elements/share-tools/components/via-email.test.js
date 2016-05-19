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
          onClick={subject.share}
        />
      );
      expect(subject.render().type).to.eql(expected.type);
      expect(subject.render().props).to.eql(expected.props);
    });
  });

  describe('share', () => {
    let event;

    beforeEach(() => {
      let container = document.createElement('div');
      container.innerHTML = `
        <share-tools
          share-url='URL'
          share-title='Title'
        >
          <div id='render-target'></div>
        </share-tools>
      `;
      event = {
        preventDefault: () => {},
      };
      sinon.stub(event, 'preventDefault');
      sinon.stub(window, 'open');
      let shareViaEmail = ReactDOM.render(
        <ShareViaEmail message='Message'/>,
        container.querySelector('#render-target')
      );
      shareViaEmail.share(event);
    });

    afterEach(() => {
      window.open.restore();
    });

    it('prevents default', () => {
      expect(event.preventDefault).to.have.been.called;
    });

    it('opens a email popup', () => {
      expect(window.open).to.have.been.calledWith(
       'mailto:?subject=Title&body=URL %0D%0A%0D%0AMessage',
       'email-share',
       'width=580,height=300'
      );
    });
  });
});
