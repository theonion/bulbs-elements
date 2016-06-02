import './carousel-slider';

describe('<bulbs-video-carousel-slider>', () => {
  let container;
  let subject;
  let firstItem;
  let secondItem;

  beforeEach((done) => {
    container = document.createElement('container');
    container.innerHTML = `
      <bulbs-video-carousel-slider>
       <bulbs-video-carousel-item id="first"></bulbs-video-carousel-item>
       <bulbs-video-carousel-item id="second"></bulbs-video-carousel-item>
       <bulbs-video-carousel-item></bulbs-video-carousel-item>
       <bulbs-video-carousel-item></bulbs-video-carousel-item>
       <bulbs-video-carousel-item></bulbs-video-carousel-item>
       <bulbs-video-carousel-item></bulbs-video-carousel-item>
       <bulbs-video-carousel-item></bulbs-video-carousel-item>
       <bulbs-video-carousel-item></bulbs-video-carousel-item>
       <bulbs-video-carousel-item></bulbs-video-carousel-item>
       <bulbs-video-carousel-item></bulbs-video-carousel-item>
      </bulsb-video-carousel-slider>
     `;
    // ^^ There are ten carousel-items in there ^^

    document.body.appendChild(container);
    // document.registerElement polyfill runs on next microtask in some browsers
    // MUST wait until end of queue for elements to be constructed
    setImmediate(() => {
      subject = container.children[0];

      subject.track.style.width = '100px';
      subject.track.style.height = '100px';

      firstItem = subject.querySelector('#first');
      secondItem = subject.querySelector('#second');

      firstItem.style.width = '100px';
      firstItem.style.height = '100px';
      secondItem.style.width = '100px';
      secondItem.style.height = '100px';
      done();
    });
  });

  afterEach(() => {
    document.body.removeChild(container);
  });

  describe('createdCallback', () => {
    it('wraps content in a <bulbs-carousel-track>', () => {
      expect(subject.children).to.have.length(1);
      expect(
        subject.children[0].querySelectorAll('bulbs-video-carousel-item')
      ).to.have.length(10);
    });

    it('sets currentIndex to 0', () => {
      expect(subject.currentIndex).to.eql(0);
    });

    describe('attachedCallback', () => {
      it('slides items', () => {
        sinon.spy(subject, 'slideItems');
        subject.attachedCallback();
        expect(subject.slideItems).to.have.been.called;
      });
    });
  });

  describe('carouselItems', () => {
    it('is the track children', () => {
      expect(subject.carouselItems).to.eql(subject.track.children);
    });
  });

  describe('getGridRatio', () => {
    context('with no carouselItems', () => {
      beforeEach(() => {
        subject.track.innerHTML = '';
      });

      it('is zero', () => {
        expect(subject.getGridRatio()).to.eql(0);
      });
    });

    context('two-up', () => {
      beforeEach(() => {
        subject.style.width = '200px';
      });

      it('is 1/2', () => {
        expect(subject.getGridRatio()).to.eql(100 / 200);
      });
    });

    context('three-up', () => {
      beforeEach(() => {
        subject.style.width = '300px';
      });

      it('is 1/3', () => {
        expect(subject.getGridRatio()).to.eql(1 / 3);
      });
    });

    context('ten-up', () => {
      beforeEach(() => {
        subject.style.width = '1000px';
      });

      it('is 1/10', () => {
        expect(subject.getGridRatio()).to.eql(1 / 10);
      });
    });
  });

  describe('getItemMargin', () => {
    context('item has no margin', () => {
      it('is zero', () => {
        expect(subject.getItemMargin()).to.eql(0);
      });
    });

    context('item has margins', () => {
      beforeEach(() => {
        firstItem.style.marginLeft = '10px';
        firstItem.style.marginRight = '20px';
      });

      it('adds the margins together', () => {
        expect(subject.getItemMargin()).to.eql(30);
      });
    });
  });

  describe('getItemWidth', () => {
    context('there are no items', () => {
      beforeEach(() => {
        subject.track.innerHTML = '';
      });

      it('is zero', () => {
        expect(subject.getItemWidth()).to.eql(0);
      });
    });
  });

  describe('getChildrenPerPage', () => {
    context('there are no items', () => {
      beforeEach(() => {
        subject.track.innerHTML = '';
      });

      it('is zero', () => {
        expect(subject.getChildrenPerPage()).to.eql(0);
      });
    });

    context('two-up', () => {
      beforeEach(() => {
        subject.style.width = '200px';
      });

      it('is 2', () => {
        expect(subject.getChildrenPerPage()).to.eql(2);
      });
    });

    context('three-up', () => {
      beforeEach(() => {
        subject.style.width = '300px';
      });

      it('is 3', () => {
        expect(subject.getChildrenPerPage()).to.eql(3);
      });
    });

    context('ten-up', () => {
      beforeEach(() => {
        subject.style.width = '1000px';
      });

      it('is 10', () => {
        expect(subject.getChildrenPerPage()).to.eql(10);
      });
    });
  });

  describe('getCurrentPage', () => {
    context('there are no items', () => {
      beforeEach(() => {
        subject.track.innerHTML = '';
      });

      it('is zero', () => {
        expect(subject.getCurrentPage()).to.eql(0);
      });
    });

    context('three-up', () => {
      beforeEach(() => {
        subject.style.width = '300px';
      });

      context('currentIndex is 0', () => {
        it('is zero', () => {
          subject.currentIndex = 0;
          expect(subject.getCurrentPage()).to.eql(0);
        });
      });

      context('currentIndex is 2', () => {
        it('is zero', () => {
          subject.currentIndex = 2;
          expect(subject.getCurrentPage()).to.eql(0);
        });
      });

      context('currentIndex is 3', () => {
        it('is 1', () => {
          subject.currentIndex = 3;
          expect(subject.getCurrentPage()).to.eql(1);
        });
      });

      context('currentIndex is 6', () => {
        it('is 2', () => {
          subject.currentIndex = 6;
          expect(subject.getCurrentPage()).to.eql(2);
        });
      });

      context('currentIndex is 9', () => {
        it('is 3', () => {
          subject.currentIndex = 9;
          expect(subject.getCurrentPage()).to.eql(3);
        });
      });

      context('currentIndex is 10', () => {
        it('is 3', () => {
          subject.currentIndex = 10;
          expect(subject.getCurrentPage()).to.eql(3);
        });
      });

      context('five-up', () => {
        beforeEach(() => {
          subject.style.width = '500px';
        });

        context('currentIndex is 10', () => {
          it('is 1', () => {
            subject.currentIndex = 10;
            expect(subject.getCurrentPage()).to.eql(1);
          });
        });
      });
    });
  });

  describe('updateCurrentIndex', () => {
    context('two-up', () => {
      beforeEach(() => {
        subject.style.width = '200px';
      });

      it('increments the currentIndex', () => {
        subject.currentIndex = 0;
        subject.updateCurrentIndex(4);
        expect(subject.currentIndex).to.eql(4);
      });

      it('enforces a lower bound of zero', () => {
        subject.currentIndex = 5;
        subject.updateCurrentIndex(-10);
        expect(subject.currentIndex).to.eql(0);
      });

      it('pushes back one page if at end of items', () => {
        subject.currentIndex = 9;
        subject.updateCurrentIndex(1);
        expect(subject.currentIndex).to.eql(8);
      });

      it('pushes back to last page if past end of items', () => {
        subject.currentIndex = 9;
        subject.updateCurrentIndex(10);
        expect(subject.currentIndex).to.eql(8);
      });
    });
  });

  describe('paging', () => {
    beforeEach(() => {
      sinon.spy(subject, 'updateCurrentIndex');
      sinon.spy(subject, 'slideItems');
      subject.style.width = '200px';
    });

    describe('slideToNext', () => {
      it('updates currentIndex positively by the page size', () => {
        subject.slideToNext();
        expect(subject.updateCurrentIndex).to.have.been.calledWith(2);
      });

      it('calls slideItems', () => {
        subject.slideToNext();
        expect(subject.slideItems).to.have.been.called;
      });
    });

    describe('slideToPrevious', () => {
      it('updates currentIndex negatively by the page size', () => {
        subject.slideToPrevious();
        expect(subject.updateCurrentIndex).to.have.been.calledWith(-2);
      });

      it('calls slideItems', () => {
        subject.slideToPrevious();
        expect(subject.slideItems).to.have.been.called;
      });
    });
  });

  describe('slideItems', () => {
    beforeEach(() => {
      subject.style.width = '200px';
    });

    it('dispatches a `slide-items` event', (done) => {
      subject.addEventListener('slide-items', (event) => {
        expect(event.detail.currentIndex).to.eql(0);
        expect(event.detail.carouselItems).to.eql(subject.carouselItems);
        expect(event.detail.perPage).to.eql(2);
        done();
      });
      subject.slideItems();
    });

    it('translates the slider track', () => {
      subject.carouselItems[0].style.marginLeft = '10px';
      subject.carouselItems[0].style.marginRight = '15px';
      subject.updateCurrentIndex(2);
      subject.slideItems();
      expect(subject.track.style.transform).to.eql(
        'translateX(calc(-100% - 25px))'
      );
    });
  });

  describe('pageToCarouselItem', () => {
    beforeEach(() => {
      subject.style.width = '200px';
      sinon.spy(subject, 'slideItems');
    });

    it('pages to the correct page if item is start of page', () => {
      subject.pageToCarouselItem(subject.carouselItems[4]);
      expect(subject.getCurrentPage()).to.eql(2);
    });

    it('pages to the correct page if item in middle of page', () => {
      subject.pageToCarouselItem(subject.carouselItems[5]);
      expect(subject.getCurrentPage()).to.eql(2);
    });

    it('slides items', () => {
      subject.pageToCarouselItem(subject.carouselItems[5]);
      expect(subject.slideItems).to.have.been.called;
    });
  });
});
