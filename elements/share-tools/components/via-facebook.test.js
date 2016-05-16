import React from 'react';
import ReactDOM from 'react-dom';
import ShareViaFacebook from './via-facebook';
import ShareButton from './share-button';

describe('<share-tools> <ViaFacebook>', () => {
  describe('render', () => {
    let subject;

    beforeEach(() => {
      subject = new ShareViaFacebook({
        icon: true,
        label: true,
      });
    });

    it('renders a ShareButton', () => {
      expect(subject.render()).to.eql(
        <ShareButton
          className='share-via-facebook'
          data-track-label='Facebook'
          iconClassName='fa fa-facebook'
          icon={true}
          labelText='Share'
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
      let shareViaFacebook = ReactDOM.render(
        <ShareViaFacebook/>,
        container.querySelector('#render-target')
      );
      shareViaFacebook.share(event);
    });

    afterEach(() => {
      window.open.restore();
    });

    it('prevents default', () => {
      expect(event.preventDefault).to.have.been.called;
    });

    it('opens a facebook share popup', () => {
      expect(window.open).to.have.been.calledWith(
        'https://www.facebook.com/sharer/sharer.php?u=//example.org',
        'facebook-share',
        'width=580,height=296'
      );
    });
  });
});
