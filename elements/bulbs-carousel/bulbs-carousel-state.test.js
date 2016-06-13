/* eslint-disable no-return-assign */

import './bulbs-carousel';

describe('<bulbs-carousel> BulbsCarouselState', () => {
  let container;
  let subject;
  let carousel;
  let track;
  let firstItem;
  let secondItem;

  beforeEach((done) => {
    container = document.createElement('test-container');
    container.innerHTML = `
      <bulbs-carousel>
        <bulbs-carousel-slider>
          <bulbs-carousel-item id="first"></bulbs-carousel-item>
          <bulbs-carousel-item id="second"></bulbs-carousel-item>
          <bulbs-carousel-item></bulbs-carousel-item>
          <bulbs-carousel-item></bulbs-carousel-item>
          <bulbs-carousel-item></bulbs-carousel-item>
          <bulbs-carousel-item></bulbs-carousel-item>
          <bulbs-carousel-item></bulbs-carousel-item>
          <bulbs-carousel-item></bulbs-carousel-item>
          <bulbs-carousel-item></bulbs-carousel-item>
          <bulbs-carousel-item></bulbs-carousel-item>
        </bulbs-carousel-slider>
      </bulbs-carousel>
     `;
    carousel = container.querySelector('bulbs-carousel');
    subject = carousel.state;
    firstItem = container.querySelector('#first');
    secondItem = container.querySelector('#second');

    firstItem.style.width = '100px';
    firstItem.style.height = '100px';
    secondItem.style.width = '100px';
    secondItem.style.height = '100px';
    firstItem.style.transition = 'none'; // Kill animations for test

    document.body.appendChild(container);
    // document.registerElement polyfill runs on next microtask in some browsers
    // MUST wait until end of queue for elements to be constructed
    setImmediate(() => {
      track = carousel.track;
      track.style.width = '100px';
      track.style.height = '100px';

      done();
    });
  });

  afterEach(() => {
    document.body.removeChild(container);
  });

  it('sets currentIndex to 0', () => {
    expect(subject.props.currentIndex).to.eql(0);
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
      it('returns undefined', () => {
        expect(subject.getActiveCarouselItem()).to.be.undefined;
      });
    });
  });

  describe('getGridRatio', () => {
    context('with no carouselItems', () => {
      beforeEach(() => {
        track.innerHTML = '';
      });

      it('is zero', () => {
        expect(subject.getGridRatio()).to.eql(0);
      });
    });

    context('two-up', () => {
      beforeEach(() => {
        carousel.style.width = '200px';
      });

      it('is 1/2', () => {
        expect(subject.getGridRatio()).to.eql(100 / 200);
      });
    });

    context('three-up', () => {
      beforeEach(() => {
        carousel.style.width = '300px';
      });

      it('is 1/3', () => {
        expect(subject.getGridRatio()).to.eql(1 / 3);
      });
    });

    context('ten-up', () => {
      beforeEach(() => {
        carousel.style.width = '1000px';
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
        track.innerHTML = '';
      });

      it('is zero', () => {
        expect(subject.getItemWidth()).to.eql(0);
      });
    });
  });

  describe('getChildrenPerPage', () => {
    context('there are no items', () => {
      beforeEach(() => {
        track.innerHTML = '';
      });

      it('is zero', () => {
        expect(subject.getChildrenPerPage()).to.eql(0);
      });
    });

    context('two-up', () => {
      beforeEach(() => {
        carousel.style.width = '200px';
      });

      it('is 2', () => {
        expect(subject.getChildrenPerPage()).to.eql(2);
      });
    });

    context('three-up', () => {
      beforeEach(() => {
        carousel.style.width = '300px';
      });

      it('is 3', () => {
        expect(subject.getChildrenPerPage()).to.eql(3);
      });
    });

    context('ten-up', () => {
      beforeEach(() => {
        carousel.style.width = '1000px';
      });

      it('is 10', () => {
        expect(subject.getChildrenPerPage()).to.eql(10);
      });
    });
  });

  describe('getCurrentPage', () => {
    context('there are no items', () => {
      beforeEach(() => {
        track.innerHTML = '';
      });

      it('is zero', () => {
        expect(subject.getCurrentPage()).to.eql(0);
      });
    });

    context('three-up', () => {
      beforeEach(() => {
        carousel.style.width = '300px';
      });

      context('currentIndex is 0', () => {
        it('is zero', () => {
          subject.props.currentIndex = 0;
          expect(subject.getCurrentPage()).to.eql(0);
        });
      });

      context('currentIndex is 2', () => {
        it('is zero', () => {
          subject.props.currentIndex = 2;
          expect(subject.getCurrentPage()).to.eql(0);
        });
      });

      context('currentIndex is 3', () => {
        it('is 1', () => {
          subject.props.currentIndex = 3;
          expect(subject.getCurrentPage()).to.eql(1);
        });
      });

      context('currentIndex is 6', () => {
        it('is 2', () => {
          subject.props.currentIndex = 6;
          expect(subject.getCurrentPage()).to.eql(2);
        });
      });

      context('currentIndex is 9', () => {
        it('is 3', () => {
          subject.props.currentIndex = 9;
          expect(subject.getCurrentPage()).to.eql(3);
        });
      });

      context('currentIndex is 10', () => {
        it('is 3', () => {
          subject.props.currentIndex = 10;
          expect(subject.getCurrentPage()).to.eql(3);
        });
      });

      context('five-up', () => {
        beforeEach(() => {
          carousel.style.width = '500px';
        });

        context('currentIndex is 10', () => {
          it('is 1', () => {
            subject.props.currentIndex = 10;
            expect(subject.getCurrentPage()).to.eql(1);
          });
        });
      });
    });
  });

  describe('updateCurrentIndex', () => {
    context('two-up', () => {
      beforeEach(() => {
        carousel.style.width = '200px';
      });

      it('increments the currentIndex', () => {
        subject.props.currentIndex = 0;
        subject.updateCurrentIndex(4);
        expect(subject.props.currentIndex).to.eql(4);
      });

      it('enforces a lower bound of zero', () => {
        subject.props.currentIndex = 5;
        subject.updateCurrentIndex(-10);
        expect(subject.props.currentIndex).to.eql(0);
      });

      it('pushes back one page if at end of items', () => {
        subject.props.currentIndex = 9;
        subject.updateCurrentIndex(1);
        expect(subject.props.currentIndex).to.eql(8);
      });

      it('pushes back to last page if past end of items', () => {
        subject.props.currentIndex = 9;
        subject.updateCurrentIndex(10);
        expect(subject.props.currentIndex).to.eql(8);
      });
    });
  });

  describe('paging', () => {
    beforeEach(() => {
      sinon.spy(subject,'updateCurrentIndex');
      carousel.style.width = '200px';
    });

    describe('slideToNext', () => {
      it('updates currentIndex positively by the page size', () => {
        subject.slideToNext();
        expect(subject.updateCurrentIndex).to.have.been.calledWith(2);
      });
    });

    describe('slideToPrevious', () => {
      it('updates currentIndex negatively by the page size', () => {
        subject.slideToPrevious();
        expect(subject.updateCurrentIndex).to.have.been.calledWith(-2);
      });
    });
  });

  describe('pageToCarouselItem', () => {
    beforeEach(() => {
      carousel.style.width = '200px';
    });

    it('pages to the correct page if item is start of page', () => {
      subject.pageToCarouselItem(subject.props.carouselItems[4]);
      expect(subject.getCurrentPage()).to.eql(2);
    });

    it('pages to the correct page if item in middle of page', () => {
      subject.pageToCarouselItem(subject.props.carouselItems[5]);
      expect(subject.getCurrentPage()).to.eql(2);
    });

    it('slides items', () => {
      subject.pageToCarouselItem(subject.props.carouselItems[5]);
    });
  });

  describe('isOnfirstPage', () => {
    beforeEach(() => {
      carousel.style.width = '500px';
    });

    context('currentIndex is first page', () => {
      beforeEach(() => subject.props.currentIndex = 0);

      it('is true', () => {
        expect(subject.isOnfirstPage()).to.be.true;
      });
    });

    context('currentIndex is not in first page', () => {
      beforeEach(() => subject.props.currentIndex = 10);

      it('page is not first page', () => {
        expect(subject.isOnfirstPage()).to.be.false;
      });
    });
  });

  describe('isOnLastPage', () => {
    beforeEach(() => {
      carousel.style.width = '500px';
    });

    context('currentIndex is at beginning of last page', () => {
      beforeEach(() => subject.props.currentIndex = 5);

      it('is true', () => {
        expect(subject.isOnLastPage()).to.be.true;
      });
    });

    context('somewhere in last page', () => {
      beforeEach(() => subject.props.currentIndex = 8);

      it('is true', () => {
        expect(subject.isOnLastPage()).to.be.true;
      });
    });

    context('before last page', () => {
      beforeEach(() => subject.props.currentIndex = 4);

      it('is false', () => {
        expect(subject.isOnLastPage()).to.be.false;
      });
    });
  });
});
