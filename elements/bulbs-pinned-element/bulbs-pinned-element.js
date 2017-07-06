import {
  registerElement,
  BulbsHTMLElement,
} from 'bulbs-elements/register-element';
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
    if(this.animationRequest) {
      cancelAnimationFrame(this.animationRequest);
    }
    this.animationRequest = requestAnimationFrame(() => {
      this.animationRequest = null;

      const boundingRects = this.getBoundingRects();

      this.style.height = `${boundingRects.parent.height - Math.abs(boundingRects.parent.top - boundingRects.rail.top)}px`;
      this.style.width = `${boundingRects.parent.width}px`;

      if (this.hasNewRailHeight(boundingRects)) {
        this.resetCarPosition();
      }

      const offset = getScrollOffset();

      if (offset.y > this.lastPosition) {
        this.scrollDirection = 'down';
      }
      else if (offset.y < this.lastPosition) {
        this.scrollDirection = 'up';
      }
      else {
        this.scrollDirection = null;
      }

      this.lastPosition = offset.y;

      if (this.isInView(boundingRects)) {
        if(this.isScrollingDown()) {
          this.handleScrollDown(boundingRects);
        }
        else if (this.isScrollingUp()) {
          this.handleScrollUp(boundingRects);
        }
      }
      else if (boundingRects.parent.bottom <= 0) {
        this.pinToRailBottom();
      }
      else if (boundingRects.parent.top >= window.innerHeight) {
        this.resetCarPosition();
      }
    });
  }

  isScrollingUp () {
    return this.scrollDirection === 'up';
  }

  isScrollingDown () {
    return this.scrollDirection === 'down';
  }

  hasNewRailHeight (boundingRects) {
    let newRailHeight = false;

    if (boundingRects.rail.height !== this.lastRailHeight) {
      newRailHeight = true;
      this.lastRailHeight = boundingRects.rail.height;
    }

    return newRailHeight;
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

