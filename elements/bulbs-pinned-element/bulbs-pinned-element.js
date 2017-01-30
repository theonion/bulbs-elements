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
            setTimeout(() => {
              this.handleScrollUp(boundingRects);
            }, 250);
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
    const body = document.body;
    const html = document.documentElement;
    const documentHeight = Math.max(
      body.scrollHeight,
      body.offsetHeight,
      html.clientHeight,
      html.scrollHeight,
      html.offsetHeight,
    );

    if (boundingRects.rail.bottom <= boundingRects.car.bottom) {
      this.pinToRailBottom();
    }
    else if (boundingRects.rail.top - this.topOffsetAdjustment <= 0) {
      this.pinToWindow();
    }
    else if ($(window).scrollTop() >= documentHeight - window.innerHeight) {
      this.pinToRailBottom();
    }
  }

  handleScrollUp (boundingRects) {
    const rail = boundingRects.rail;
    const car = boundingRects.car;

    if (rail.top >= car.top) {
      this.resetCarPosition();
    }
    else if ($(window).scrollTop() === 0) {
      this.resetCarPosition();
    }
    else if (rail.bottom - car.height - this.topOffsetAdjustment >= 0) {
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

