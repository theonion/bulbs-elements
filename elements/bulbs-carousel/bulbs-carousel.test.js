/* eslint-disable no-return-assign */

import './bulbs-carousel';
import { supportsCalcInTransform } from 'bulbs-elements/util';

// This constructor is inconsistently named across runtimes :trollface:
const NodeListConstructor = document.getElementsByTagName('an-element').constructor;

describe('<bulbs-carousel>', () => {
  let container;
  let subject;
  let firstItem;
  let secondItem;
  let previousButton;
  let nextButton;
  let slider;

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
        <bulbs-carousel-previous id='previous'></bulbs-carousel-previous>
        <bulbs-carousel-next id='next'></bulbs-carousel-next>
      </bulbs-carousel>
     `;
    subject = container.querySelector('bulbs-carousel');
    firstItem = container.querySelector('#first');
    secondItem = container.querySelector('#second');
    previousButton = container.querySelector('#previous');
    nextButton = container.querySelector('#next');
    slider = container.querySelector('bulbs-carousel-slider');

    firstItem.style.width = '100px';
    firstItem.style.height = '100px';
    secondItem.style.width = '100px';
    secondItem.style.height = '100px';
    firstItem.style.transition = 'none'; // Kill animations for test

    document.body.appendChild(container);
    // document.registerElement polyfill runs on next microtask in some browsers
    // MUST wait until end of queue for elements to be constructed
    setImmediate(() => {
      subject.track.style.width = '100px';
      subject.track.style.height = '100px';

      sinon.spy(subject,'applyState');
      sinon.spy(subject,'pageToCarouselItem');
      done();
    });
  });

  afterEach(() => {
    document.body.removeChild(container);
  });

  describe('createdCallback', () => {
    it('wraps slider content in a <bulbs-carousel-track>', () => {
      expect(slider.childNodes).to.have.length(1);
      expect(
        slider.firstChild.querySelectorAll('bulbs-carousel-item')
      ).to.have.length(10);
    });

    it('tracks previousButtons', () => {
      expect(subject.previousButtons).to.be.instanceOf(NodeListConstructor);
      expect(subject.previousButtons.item(0)).to.eq(previousButton);
    });

    it('tracks nextButtons', () => {
      expect(subject.nextButtons).to.be.instanceOf(NodeListConstructor);
      expect(subject.nextButtons.item(0)).to.eq(nextButton);
    });

    context('without a <bulbs-carousel-slider> present', () => {
      beforeEach(() => slider.remove());

      it('throws an execption', () => {
        expect(() => subject.createdCallback()).to.throw(
          /MUST contain a <bulbs-carousel-slider>/
        );
      });
    });

    it('sets currentIndex to 0', () => {
      expect(subject.currentIndex).to.eql(0);
    });
  });

  describe('attachedCallback', () => {
    context('there is an active carousel item', () => {
      beforeEach(() => {
        secondItem.setAttribute(
          'href', window.location.pathname
        );
      });

      it('pages to the active item in the carousel', () => {
        subject.attachedCallback();
        expect(subject.pageToCarouselItem).to.have.been.calledWith(
          secondItem
        );
      });
    });

    it('applies state', () => {
      subject.attachedCallback();
      expect(subject.applyState).to.have.been.called;
    });
  });

  describe('onClick', () => {
    beforeEach(() => {
      sinon.spy(subject,'slideToPrevious');
      sinon.spy(subject,'slideToNext');
    });

    context('click on previous button', () => {
      beforeEach(() => previousButton.click());

      it('slidesToPrevious', () => {
        expect(subject.slideToPrevious).to.have.been.called;
      });

      it('applies state', () => {
        expect(subject.applyState).to.have.been.called;
      });
    });

    context('click on next button', () => {
      beforeEach(() => nextButton.click());

      it('slidesToNext', () => {
        expect(subject.slideToNext).to.have.been.called;
      });

      it('applies state', () => {
        expect(subject.applyState).to.have.been.called;
      });
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
      sinon.spy(subject,'updateCurrentIndex');
      subject.style.width = '200px';
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

  describe('applyState', () => {
    beforeEach(() => {
      subject.style.width = '200px';
    });

    it('translates the slider track', () => {
      subject.carouselItems[0].style.marginLeft = '10px';
      subject.carouselItems[0].style.marginRight = '15px';
      subject.updateCurrentIndex(2);
      subject.applyState();
      if (supportsCalcInTransform) {
        expect(subject.track.style.transform).to.eql(
          'translateX(calc(-100% - 25px))'
        );
      }
      else {
        expect(subject.track.style.transform).to.eql(
          'translateX(-100%) translateX(-25px)'
        );
      }
    });
  });

  describe('pageToCarouselItem', () => {
    beforeEach(() => {
      subject.style.width = '200px';
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
    });
  });

  describe('isOnfirstPage', () => {
    beforeEach(() => {
      subject.style.width = '500px';
    });

    context('currentIndex is first page', () => {
      beforeEach(() => subject.currentIndex = 0);

      it('is true', () => {
        expect(subject.isOnfirstPage()).to.be.true;
      });
    });

    context('currentIndex is not in first page', () => {
      beforeEach(() => subject.currentIndex = 10);

      it('page is not first page', () => {
        expect(subject.isOnfirstPage()).to.be.false;
      });
    });
  });

  describe('isOnLastPage', () => {
    beforeEach(() => {
      subject.style.width = '500px';
    });

    context('currentIndex is at beginning of last page', () => {
      beforeEach(() => subject.currentIndex = 5);

      it('is true', () => {
        expect(subject.isOnLastPage()).to.be.true;
      });
    });

    context('somewhere in last page', () => {
      beforeEach(() => subject.currentIndex = 8);

      it('is true', () => {
        expect(subject.isOnLastPage()).to.be.true;
      });
    });

    context('before last page', () => {
      beforeEach(() => subject.currentIndex = 4);

      it('is false', () => {
        expect(subject.isOnLastPage()).to.be.false;
      });
    });
  });
});
