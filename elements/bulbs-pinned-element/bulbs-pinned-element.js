import invariant from 'invariant';

import {
  registerElement,
  BulbsHTMLElement
} from 'bulbs-elements/register';
import {
  moveChildren,
  getScrollOffset
} from 'bulbs-elements/util';
import './bulbs-pinned-element.scss';

export default class BulbsPinnedElement extends BulbsHTMLElement {

  attachedCallback () {

    this.topOffsetAdjustment = parseInt(this.getAttribute('offset-top-px') || 0, 10);
    this.lastPosition = 0;
    this.animationRequest = null;

    let car = this.querySelector('bulbs-pinned-element-car');
    if (car) {
      this.car = car;
    } else {
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
      car: this.car.getBoundingClientRect(),
      parent: this.parentElement.getBoundingClientRect(),
      rail: this.getBoundingClientRect(),
    };
  }

  positionCar () {
    if(!this.animationRequest) {
      this.animationRequest = requestAnimationFrame(() => {
        this.animationRequest = null;

        const boundingRects = this.getBoundingRects();

        this.style.height = `${boundingRects.parent.height}px`;
        this.style.width = `${boundingRects.parent.width}px`;

        if(this.isScrollingDown()) {
          this.handleScrollDown(boundingRects);
        } else {
          this.handleScrollUp(boundingRects);
        }
      });
    }
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
    } else if (boundingRects.rail.top - this.topOffsetAdjustment <= 0) {
      this.pinToWindow();
    }
  }

  handleScrollUp (boundingRects) {

    if (boundingRects.rail.top >= boundingRects.car.top) {
      this.pinToRailTop();
    } else if (boundingRects.rail.bottom - boundingRects.car.height - this.topOffsetAdjustment >= 0) {
      this.pinToWindow();
    }
  }

  pinToRailTop () {
    this.car.classList.remove('pinned', 'pinned-bottom');
    this.car.classList.add('pinned-top');

    this.car.style.bottom = 'initial';
    this.car.style.top = 'initial';
  }

  pinToRailBottom () {
    this.car.classList.remove('pinned', 'pinned-top');
    this.car.classList.add('pinned-bottom');

    this.car.style.bottom = 0;
    this.car.style.top = 'initial';
  }

  pinToWindow () {
    this.car.classList.remove('pinned-bottom', 'pinned-top');
    this.car.classList.add('pinned');

    this.car.style.bottom = 'initial';
    this.car.style.top = `${this.topOffsetAdjustment}px`;
  }
}

registerElement('bulbs-pinned-element', BulbsPinnedElement);

