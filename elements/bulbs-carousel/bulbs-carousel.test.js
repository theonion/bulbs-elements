import './carousel';

describe('<bulbs-carousel>', () => {
  let container;
  let subject;
  let firstItem;
  let secondItem;
  let previous;
  let next;

  beforeEach((done) => {
    container = document.createElement('test-container');
    container.innerHTML = `
      <bulbs-carousel>
        <bulbs-video src="//example.com"></bulbs-video>
        <bulbs-carousel-slider>
          <bulbs-carousel-item id='first'>
          </bulbs-carousel-item>
          <bulbs-carousel-item id='second'>
          </bulbs-carousel-item>
        </bulbs-carousel-slider>
        <bulbs-carousel-previous id='previous'></bulbs-carousel-previous>
        <bulbs-carousel-next id='next'></bulbs-carousel-next>
      </bulbs-carousel>
     `;
    document.body.appendChild(container);
    // document.registerElement polyfill runs on next microtask in some browsers
    // MUST wait until end of queue for elements to be constructed
    setImmediate(() => {
      subject = container.children[0];
      firstItem = container.querySelector('#first');
      secondItem = container.querySelector('#second');
      previous = container.querySelector('#previous');
      next = container.querySelector('#next');
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
        secondItem.setAttribute(
          'href', window.location.pathname
        );
      });

      it('pages to the active item in the carousel', () => {
        subject.attachedCallback();
        expect(subject.slider.pageToCarouselItem).to.have.been.calledWith(
          secondItem
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
        secondItem.setAttribute(
          'href', window.location.pathname
        );
      });

      it('returns that item', () => {
        expect(subject.getActiveCarouselItem()).to.eql(
          secondItem
        );
      });
    });

    context('multiple items are active', () => {
      beforeEach(() => {
        firstItem.setAttribute(
          'href', window.location.pathname
        );
        secondItem.setAttribute(
          'href', window.location.pathname
        );
      });

      it('returns the first active item', () => {
        expect(subject.getActiveCarouselItem()).to.eql(
          firstItem
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
    context('no other items in carousel', () => {
      beforeEach(() => {
        firstItem.setAttribute('now-playing', '');
        secondItem.remove();
      });

      it('does nothing', () => {
        let anchor = firstItem.querySelector('a');
        anchor.click = sinon.stub();
        subject.playerEnded();
        expect(anchor.click).not.to.have.been.called;
      });
    });

    context('an item is currently playing', () => {
      beforeEach(() => {
        firstItem.setAttribute('now-playing', '');
      });

      it('clicks on the next item in carousel', () => {
        let anchor = secondItem.querySelector('a');
        anchor.click = sinon.stub();
        subject.playerEnded();
        expect(anchor.click).to.have.been.called;
      });
    });

    context('the last item is currently playing', () => {
      beforeEach(() => {
        secondItem.setAttribute('now-playing', '');
      });

      it('clicks on the first item in carousel', () => {
        let anchor = firstItem.querySelector('a');
        anchor.click = sinon.stub();
        subject.playerEnded();
        expect(anchor.click).to.have.been.called;
      });
    });
  });

  describe('handleClick', () => {
    context('clicked on carousel-next button', () => {
      it('slides to next page in carousel', () => {
        sinon.spy(subject.slider, 'slideToNext');
        next.click();
        expect(subject.slider.slideToNext).to.have.been.called;
      });
    });

    context('clicked on carousel-previous button', () => {
      it('slides to previous page in carousel', () => {
        sinon.spy(subject.slider, 'slideToPrevious');
        previous.click();
        expect(subject.slider.slideToPrevious).to.have.been.called;
      });
    });
  });
});
