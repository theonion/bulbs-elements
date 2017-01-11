/* eslint-disable no-return-assign */

import './bulbs-carousel';
import { supportsCalcInTransform } from 'bulbs-elements/util';

// This constructor is inconsistently named across runtimes :trollface:
const NodeListConstructor = document.getElementsByTagName('an-element').constructor;

describe('<bulbs-carousel>', () => {
  let container;
  let subject;
  let carousel;
  let track;
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
    carousel = container.querySelector('bulbs-carousel');
    subject = carousel;
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
    // customElements.define polyfill runs on next microtask in some browsers
    // MUST wait until end of queue for elements to be constructed
    setImmediate(() => {
      track = carousel.track;
      track.style.width = '100px';
      track.style.height = '100px';

      sinon.spy(subject,'applyState');
      sinon.spy(subject.state,'pageToCarouselItem');
      done();
    });
  });

  afterEach(() => {
    document.body.removeChild(container);
  });

  describe('conn', () => {
  });

  describe('connectedCallback', () => {
    context('there is an active carousel item', () => {
      beforeEach(() => {
        secondItem.setAttribute(
          'href', window.location.pathname
        );
      });

      it('pages to the active item in the carousel', () => {
        subject.connectedCallback();
        expect(subject.state.pageToCarouselItem).to.have.been.calledWith(
          secondItem
        );
      });
    });

    it('applies state', () => {
      subject.connectedCallback();
      expect(subject.applyState).to.have.been.called;
    });
  });

  describe('onClick', () => {
    beforeEach(() => {
      sinon.spy(subject.state,'slideToPrevious');
      sinon.spy(subject.state,'slideToNext');
      sinon.spy(subject, 'stateChanged');
    });

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
        expect(() => subject.connectedCallback()).to.throw(
          /MUST contain a <bulbs-carousel-slider>/
        );
      });
    });

    context('called twice', () => {
      it('does not create a second track', () => {
        subject.constructor();
        expect(subject.querySelector('bulbs-carousel-track bulbs-carousel-track')).to.be.null;
      });
    });

    context('click on previous button', () => {
      beforeEach(() => previousButton.click());

      it('slidesToPrevious', () => {
        expect(subject.state.slideToPrevious).to.have.been.called;
      });

      it('applies state', () => {
        expect(subject.applyState).to.have.been.called;
      });

      it('calls `stateChanged` description', function () {
        expect(subject.stateChanged.calledWith('previous'));
      });
    });

    context('click on next button', () => {
      beforeEach(() => nextButton.click());

      it('slidesToNext', () => {
        expect(subject.state.slideToNext).to.have.been.called;
      });

      it('applies state', () => {
        expect(subject.applyState).to.have.been.called;
      });

      it('calls `stateChanged` description', function () {
        expect(subject.stateChanged.calledWith('next'));
      });
    });
  });

  describe('stateChanged', () => {
    it('dispatches a custom event with the state change description', function (done) {
      subject.addEventListener('bulbs-carousel:stateChange', function (detailObj) {
        expect(detailObj.detail.desc).to.equal('next');
        expect(detailObj.detail.state).to.eql(subject.state);
        done();
      });
      subject.stateChanged('next');
    });
  });

  describe('applyState', () => {
    beforeEach(() => {
      carousel.style.width = '200px';
    });

    it('translates the slider track', () => {
      subject.state.props.carouselItems[0].style.marginLeft = '10px';
      subject.state.props.carouselItems[0].style.marginRight = '15px';
      subject.state.updateCurrentIndex(2);
      subject.applyState();
      if (supportsCalcInTransform) {
        expect(track.style.transform).to.eql(
          'translateX(calc(-100% - 25px))'
        );
      }
      else {
        expect(track.style.transform).to.eql(
          'translateX(-100%) translateX(-25px)'
        );
      }
    });
  });
});
