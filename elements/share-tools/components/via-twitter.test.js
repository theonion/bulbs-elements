import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';

import ShareViaTwitter from './via-twitter';
import ShareButton from './share-button';

describe('<share-tools> <ViaTwitter>', () => {
  describe('propTypes', () => {
    let subject = ShareViaTwitter.propTypes;

    it('requires a twitterHandle', () => {
      expect(subject.twitterHandle).to.eql(PropTypes.string.isRequired);
    });
  });

  describe('render', () => {
    let subject;

    beforeEach(() => {
      subject = new ShareViaTwitter({
        icon: true,
        label: true,
        twitterHandle: 'real-slim-shady',
      });
    });

    it('renders a ShareButton', () => {
      expect(subject.render()).to.eql(
        <ShareButton
          className='share-via-twitter'
          data-track-label='Twitter'
          iconClassName='fa fa-twitter'
          icon={true}
          labelText='Tweet'
          label={true}
          onClick={subject.share}
        />
      );
    });
  });

  describe('share', () => {
    let event;

    beforeEach(() => {
      let container = document.createElement('div');
      container.innerHTML = `
        <div
          class='share-tools'
          data-share-url='//example.org'
          data-share-title='Share Title'
        >
          <div id='render-target'></div>
        </div>
      `;
      event = {
        preventDefault: () => {}
      };
      sinon.stub(event, 'preventDefault');
      sinon.stub(window, 'open');
      let shareViaTwitter = ReactDOM.render(
        <ShareViaTwitter twitterHandle='real-slim-shady'/>,
        container.querySelector('#render-target')
      );
      shareViaTwitter.share(event);
    });

    afterEach(() => {
      window.open.restore();
    });

    it('prevents default', () => {
      expect(event.preventDefault).to.have.been.called;
    });

    it('opens a twitter popup', () => {
      expect(window.open).to.have.been.calledWith(
       'http://twitter.com/share?text=Share Title&url=//example.org&via=real-slim-shady&source=webclient',
       'twitter-share',
       'width=550,height=235'
      );
    });
  });
});
