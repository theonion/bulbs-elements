import './carousel';

describe('<bulbs-video-carousel>', () => {
  let container;
  let subject;

  beforeEach((done) => {
    container = document.createElement('test-container');
    container.innerHTML = `
      <bulbs-video-carousel>
        <bulbs-video src="//example.com"></bulbs-video>
        <bulbs-video-carousel-slider>
          <bulbs-video-carousel-item id='first'>
          </bulbs-video-carousel-item>
          <bulbs-video-carousel-item id='second'>
          </bulbs-video-carousel-item>
        </bulbs-video-carousel-slider>
      </bulbs-video-carousel>
     `;
    document.body.appendChild(container);
    // document.registerElement polyfill runs on next microtask in some browsers
    // MUST wait until end of queue for elements to be constructed
    setImmediate(() => {
      subject = container.children[0];
      done();
    });
  });

  afterEach(() => {
    document.body.removeChild(container);
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

      it('pages to the active item in the carousel', () => {
        subject.attachedCallback();
        expect(subject.slider.pageToCarouselItem).to.have.been.calledWith(
          container.querySelector('#second')
        );
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
