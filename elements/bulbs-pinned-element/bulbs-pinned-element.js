import { registerElement, BulbsHTMLElement } from 'bulbs-elements/register';
import invariant from 'invariant';
import { moveChildren, getScrollOffset, InViewMonitor } from 'bulbs-elements/util';
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

    window.addEventListener('scroll', this.handleScrollEvent.bind(this));
  }

  handleScrollEvent () {
    if(!this.animationRequest) {
      this.animationRequest = requestAnimationFrame(() => {
        this.animationRequest = null;

        if(!InViewMonitor.isElementInViewport(this.car, this.car.getBoundingClientRect())) {
          return;
        }

        const boundingRects = this.getBoundingRects();

        if(this.isScrollingDown()) {
          this.handleScrollDown(boundingRects);
        }
        else {
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

  getBoundingRects () {
    return {
      'rail': this.getBoundingClientRect(),
      'pinnedElement': this.car.getBoundingClientRect(),
    };
  }

  handleScrollDown (boundingRects) {

    if (boundingRects.rail.bottom - this.topOffsetAdjustment <= boundingRects.pinnedElement.height) {
      this.pinToParentBottom();
    } else if (boundingRects.rail.top - this.topOffsetAdjustment <= 0) {
      this.addPinnedClass();
    }
  }

  handleScrollUp (boundingRects) {

    if (boundingRects.rail.top >= boundingRects.pinnedElement.top) {
      this.pinToParentTop();
    } else if (boundingRects.rail.bottom - boundingRects.pinnedElement.height - this.topOffsetAdjustment >= 0) {
      this.addPinnedClass();
    }
  }

  pinToParentTop () {
    this.car.classList.remove('pinned-bottom');
    this.car.classList.remove('pinned');
    this.car.classList.add('pinned-top');

    this.car.style.top = 'initial';
    this.car.style.bottom = 'initial';
  }

  pinToParentBottom () {
    this.car.classList.remove('pinned-top');
    this.car.classList.remove('pinned');
    this.car.classList.add('pinned-bottom');

    this.car.style.top = 'initial';
    this.car.style.bottom = 0;
  }

  addPinnedClass () {
    this.car.classList.remove('pinned-top');
    this.car.classList.remove('pinned-bottom');
    this.car.classList.add('pinned');

    this.car.style.top = this.topOffsetAdjustment + 'px';
    this.car.style.bottom = 'initial';
  }
}

registerElement('bulbs-pinned-element', BulbsPinnedElement);

