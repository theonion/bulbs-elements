import {
  registerElement,
  BulbsHTMLElement,
} from 'bulbs-elements/register';
import {
  InViewMonitor,
  getRoundedBoundingClientRect,
  getScrollOffset,
  moveChildren,
} from 'bulbs-elements/util';
import './bulbs-pinned-element.scss';

export default class BulbsPinnedElement extends BulbsHTMLElement {

  attachedCallback () {

    this.topOffsetAdjustment = parseInt(this.getAttribute('offset-top-px') || 0, 10);
    this.lastPosition = 0;
    this.lastRailHeight = 0;
    this.animationRequest = null;

    let car = this.querySelector('bulbs-pinned-element-car');
    if (car) {
      this.car = car;
    }
    else {
      this.car = document.createElement('bulbs-pinned-element-car');
      moveChildren(this, this.car);
      this.appendChild(this.car);
    }

    this.boundPositionCar = this.positionCar.bind(this);

    window.addEventListener('scroll', this.boundPositionCar);

    this.boundPositionCar();
  }

  detachedCallback () {
    window.removeEventListener('scroll', this.boundPositionCar);
  }

  getBoundingRects () {

    return {
      car: getRoundedBoundingClientRect(this.car),
      parent: getRoundedBoundingClientRect(this.parentElement),
      rail: getRoundedBoundingClientRect(this),
    };
  }

  isInView (boundingRects) {
    return InViewMonitor.isElementInViewport(this, boundingRects.rail);
  }

  positionCar () {
    if(!this.animationRequest) {
      this.animationRequest = requestAnimationFrame(() => {
        this.animationRequest = null;

        const boundingRects = this.getBoundingRects();

        this.style.height = `${boundingRects.parent.height - Math.abs(boundingRects.parent.top - boundingRects.rail.top)}px`;
        this.style.width = `${boundingRects.parent.width}px`;

        if (this.hasNewRailHeight(boundingRects)) {
          this.resetCarPosition();
        }

        if (this.isInView(boundingRects)) {

          if(this.isScrollingDown()) {
            this.handleScrollDown(boundingRects);
          }
          else {
            this.handleScrollUp(boundingRects);
          }
        }
      });
    }
  }

  hasNewRailHeight (boundingRects) {
    let newRailHeight = false;

    if (boundingRects.rail.height !== this.lastRailHeight) {
      newRailHeight = true;
      this.lastRailHeight = boundingRects.rail.height;
    }

    return newRailHeight;
  }

  isScrollingDown () {
    const offset = getScrollOffset();

    let scrollDown = false;
    if (offset.y > this.lastPosition) {
      scrollDown = true;
    }

    this.lastPosition = offset.y;

    return scrollDown;
  }

  handleScrollDown (boundingRects) {

    if (boundingRects.rail.bottom <= boundingRects.car.bottom) {
      this.pinToRailBottom();
    }
    else if (boundingRects.rail.top - this.topOffsetAdjustment <= 0) {
      this.pinToWindow();
    }
  }

  handleScrollUp (boundingRects) {

    let railTop = boundingRects.rail.top;
    let railBottom = boundingRects.rail.bottom;
    let carTop = boundingRects.car.top;
    let carHeight = boundingRects.car.height;
    let parentBottom = boundingRects.parent.bottom;

    if (railTop >= carTop || parentBottom > carTop) {
      this.resetCarPosition();
    }
    else if (railBottom - carHeight - this.topOffsetAdjustment >= 0) {
      this.pinToWindow();
    }
  }

  resetCarPosition () {
    this.car.classList.remove('pinned', 'pinned-bottom');

    this.car.style.bottom = '';
    this.car.style.top = 0;
  }

  pinToRailBottom () {
    this.car.classList.remove('pinned');
    this.car.classList.add('pinned-bottom');

    this.car.style.bottom = 0;
    this.car.style.top = '';
  }

  pinToWindow () {
    this.car.classList.remove('pinned-bottom');
    this.car.classList.add('pinned');

    this.car.style.bottom = '';
    this.car.style.top = `${this.topOffsetAdjustment}px`;
  }
}

registerElement('bulbs-pinned-element', BulbsPinnedElement);

