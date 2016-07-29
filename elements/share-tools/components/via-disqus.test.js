import React from 'react';
import ReactDOM from 'react-dom';

import CommentViaDisqus from './via-disqus';
import ShareButton from './share-button';

describe('<share-tools> <ViaDisqus>', () => {
  describe('render', () => {
    let subject;

    beforeEach(() => {
      subject = new CommentViaDisqus({
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
          className='share-via-disqus'
          dataTrackLabel='Disqus'
          iconClassName='fa fa-comments'
          icon={true}
          label={true}
          labelText='Disqus'
          onClick={subject.share}
        />
      );
      expect(subject.render().type).to.eql(expected.type);
    });
  });

  describe('share', () => {
    let event;

    context('with a share-url', () => {
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
        let commentViaDisqus = ReactDOM.render(
          <CommentViaDisqus/>,
          container.querySelector('#render-target')
        );
        commentViaDisqus.share(event);
      });

      afterEach(() => {
        window.open.restore();
      });

      it('prevents default', () => {
        expect(event.preventDefault).to.have.been.called;
      });

      it('opens a article comments in new tab', () => {
        expect(window.open).to.have.been.calledWith('URL#comments');
      });
    });

    context('shareUrl is current location', () => {
      beforeEach(() => {
        let container = document.createElement('div');
        container.innerHTML = `
          <share-tools
            share-title='Title'
          >
            <div id='render-target'></div>
          </share-tools>
        `;
        event = {
          preventDefault: () => {},
        };
        let commentViaDisqus = ReactDOM.render(
          <CommentViaDisqus/>,
          container.querySelector('#render-target')
        );
        commentViaDisqus.share(event);
      });

      it('sets window.location.hash to "#comments"', () => {
        expect(window.location.hash).to.eql('#comments');
        window.location.hash = '#';
      });
    });
  });
});
