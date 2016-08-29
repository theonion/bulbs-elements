import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';

import ShareViaTwitter from './via-twitter';
import ShareButton from './share-button';

describe('<share-tools> <ViaTwitter>', () => {
  describe('propTypes', () => {
    let subject = ShareViaTwitter.propTypes;

    it('requires a twitterHandle', () => {
      expect(subject.twitterHandle).to.eql(PropTypes.string);
    });
  });

  describe('render', () => {
    let subject;

    beforeEach(() => {
      subject = new ShareViaTwitter({
        icon: '',
        label: '',
        twitterHandle: 'real-slim-shady',
      });
    });

    it('renders a ShareButton', () => {
      expect(subject.render()).to.eql(
        <ShareButton
          className='share-via-twitter'
          dataTrackLabel='Twitter'
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
        <share-tools
          share-url='//example.org'
          share-title='Share Title'
        >
          <div id='render-target'></div>
        </share-tools>
      `;
      event = {
        preventDefault: () => {},
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

  describe('twitterHandle', () => {
    let subject;

    it('reads twitterHandle from props', () => {
      subject = new ShareViaTwitter({
        icon: '',
        label: '',
        twitterHandle: 'ShaolinFantastic',
      });
      expect(subject.twitterHandle).to.eql('ShaolinFantastic');
    });

    it('reads from meta tag if it exists', () => {
      subject = new ShareViaTwitter({
        icon: '',
        label: '',
      });
      let metaTag = document.createElement('meta');
      metaTag.name = 'twitter:site';
      metaTag.content = '@GrandmasterFlash';
      document.head.appendChild(metaTag);
      expect(subject.twitterHandle).to.eql('GrandmasterFlash');
      metaTag.remove();
    });

    it('favors reading from props', () => {
      subject = new ShareViaTwitter({
        icon: '',
        label: '',
        twitterHandle: 'ShaolinFantastic',
      });
      let metaTag = document.createElement('meta');
      metaTag.name = 'twitter:site';
      metaTag.content = '@GrandmasterFlash';
      document.head.appendChild(metaTag);
      expect(subject.twitterHandle).to.eql('ShaolinFantastic');
      metaTag.remove();
    });
  });

  describe('getShareTitle', () => {
    let subject;

    beforeEach(() => {
      let container = document.createElement('div');
      container.innerHTML = `
        <share-tools
          share-url='//example.org'
          share-title='Share Title'
        >
          <div id='render-target'></div>
        </share-tools>
      `;
      subject = ReactDOM.render(
        <ShareViaTwitter twitterHandle='real-slim-shady'/>,
        container.querySelector('#render-target')
      );
    });

    it('reads from parent <share-tools>', () => {
      expect(subject.shareTitle).to.eql('Share Title');
    });
  });
});
