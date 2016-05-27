import './carousel';

describe('<bulbs-video-carousel>', () => {
  let container;
  let subject;
  beforeEach(() => {
    container = document.createElement('test-container');
    container.innerHTML = `
      <bulbs-video-carousel>
        <bulbs-video></bulbs-video>
        <bulbs-video-carousel-slider>
          <bulbs-video-carousel-item id='first'>
          </bulbs-video-carousel-item>
          <bulbs-video-carousel-item id='second'>
          </bulbs-video-carousel-item>
        </bulbs-video-carousel-slider>
      </bulbs-video-carousel>
     `;
    subject = container.children[0];
  });

  describe('getAnchors', () => {
    it('gets links inside carousel items', () => {
      expect(subject.getAnchors().length).to.eql(2);
      expect(subject.getAnchors()).to.eql(
        container.querySelectorAll('a')
      );
    });
  });

  describe('createdCallback', () => {
    it('finds videoPlayer', () => {
      expect(subject.videoPlayer).not.to.be.null;
      expect(subject.videoPlayer).eql(container.querySelector('bulbs-video'));
    });
  });

  describe('attachedCallback', () => {
    beforeEach(() => {
      sinon.spy(subject.slider, 'pageToCarouselItem');
      sinon.spy(subject.videoPlayer, 'addEventListener');
      sinon.spy(subject, 'scrollPlayerIntoView');
    });

    it('attaches playerEnded handler to videoPlayer', () => {
      subject.attachedCallback();
      expect(subject.videoPlayer.addEventListener).to.have.been.calledWith(
        'ended', subject.playerEnded, true
      );
    });

    context('there is an active carousel item', () => {
      beforeEach(() => {
        container.querySelector('#second').setAttribute(
          'href', window.location.pathname
        );
      });

      it('scrolls to the video player', () => {
        subject.attachedCallback();
        expect(subject.scrollPlayerIntoView).to.have.been.called;
      });

      it('pages to the active item in the carousel', () => {
        subject.attachedCallback();
        expect(subject.slider.pageToCarouselItem).to.have.been.calledWith(
          container.querySelector('#second')
        );
      });
    });

    context('there are no active carousel items', () => {
      it('does not scroll to the video player', () => {
        subject.attachedCallback();
        expect(subject.scrollPlayerIntoView).not.to.have.been.called;
      });
    });
  });

  describe('detachedCallback', () => {
    beforeEach(() => {
      sinon.spy(subject.videoPlayer, 'removeEventListener');
    });

    it('removes playerEnded handler from videoPlayer', () => {
      subject.detachedCallback();
      expect(subject.videoPlayer.removeEventListener).to.have.been.calledWith(
        'ended', subject.playerEnded
      );
    });
  });

  describe('scrollPlayerIntoView', () => {
    // strangly, resetting scrollBy does not work
    beforeEach(() => {
      sinon.spy(window, 'scrollBy');
    });

    afterEach(() => {
      window.scrollBy.restore();
    });

    it('calls videoplayer.scrollIntoView', () => {
      sinon.spy(subject.videoPlayer, 'scrollIntoView');
      subject.scrollPlayerIntoView();
      expect(subject.videoPlayer.scrollIntoView).to.have.been.called;
    });

    context('there is a page <header>', () => {
      let header;
      beforeEach(() => {
        header = document.createElement('header');
        document.body.appendChild(header);
        header.setAttribute('style', `
          width: 100px;
          height: 100px;
        `);
      });

      afterEach(() => {
        document.body.removeChild(header);
      });

      it('engages vertical scroll by the header height', () => {
        subject.scrollPlayerIntoView();
        expect(window.scrollBy).to.have.been.calledWith(0, 100);
      });
    });

    context('there is no page <header>', () => {
      it('does not engage any extra scrolling', () => {
        subject.scrollPlayerIntoView();
        expect(window.scrollBy).not.to.have.been.called;
      });
    });
  });

  describe('getActiveCarouselItem', () => {
    context('an item is active', () => {
      beforeEach(() => {
        container.querySelector('#second').setAttribute(
          'href', window.location.pathname
        );
      });

      it('returns that item', () => {
        expect(subject.getActiveCarouselItem()).to.eql(
          container.querySelector('#second')
        );
      });
    });

    context('multiple items are active', () => {
      beforeEach(() => {
        container.querySelector('#first').setAttribute(
          'href', window.location.pathname
        );
        container.querySelector('#second').setAttribute(
          'href', window.location.pathname
        );
      });

      it('returns the first active item', () => {
        expect(subject.getActiveCarouselItem()).to.eql(
          container.querySelector('#first')
        );
      });
    });

    context('no items are active', () => {
      it('returns null', () => {
        expect(subject.getActiveCarouselItem()).to.eql(null);
      });
    });
  });

  describe('playerEnded', () => {
  });
});
