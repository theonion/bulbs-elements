import { registerElement, BulbsHTMLElement } from 'bulbs-elements/register';
import invariant from 'invariant';
import { moveChildren, getScrollOffset, InViewMonitor } from 'bulbs-elements/util';
import './bulbs-pinned-element.scss';

export default class BulbsPinnedElement extends BulbsHTMLElement {

  attachedCallback () {
    invariant(this.hasAttribute('pinned-to'), '<bulbs-pinned-element pinned-to=".selector">: a pinned-to selector is required');

    const selector = this.getAttribute('pinned-to');
    const element = document.querySelector(selector);
    this.topOffsetAdjustment = this.getAttribute('offset-top') || 0;
    this.lastPosition = 0;
    this.animationRequest = null;

    invariant(element, `<bulbs-pinned-element pinned-to=".selector">: no element with the selector "${selector}" is in the DOM`);

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

        let elementPinnedTo = this.getElementPinnedTo();
        const boundingRects = this.getBoundingRects(elementPinnedTo);

        if(this.isScrollingDown()) {
          this.handleScrollDown(elementPinnedTo, boundingRects);
        }
        else {
          this.handleScrollUp(boundingRects);
        }
      });
    }
  }

  getElementPinnedTo () {
    return document.querySelector(this.getAttribute('pinned-to'));
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

  getBoundingRects (elementPinnedTo) {
    return {
      'pinnedElement': this.car.getBoundingClientRect(),
      'elementPinnedTo': elementPinnedTo.getBoundingClientRect(),
    };
  }

  handleScrollDown (elementPinnedTo, boundingRects) {
    if (this.pinnedParentTopInViewport(elementPinnedTo)) {
      this.pinToParentTop();
    }
    else if (this.pinnedElementAtParentBottom(boundingRects)) {
      this.pinToParentBottom();
    }
    else {
      this.addPinnedClass();
    }
  }

  handleScrollUp (boundingRects) {
    if (this.pinnedElementAtParentTop(boundingRects)) {
      this.pinToParentTop();
    }
    else if (this.pinnedElementBelowTopOfViewport(boundingRects)) {
      this.addPinnedClass();
    }
  }

  pinnedParentTopInViewport (el) {
    let elementTop = $(el).offset().top;
    let windowTop = window.pageYOffset;
    let windowBottom = windowTop + window.innerHeight;
    return elementTop > windowTop && elementTop < windowBottom;
  }

  pinnedElementAtParentBottom (boundingRects) {
    return boundingRects.pinnedElement.bottom >= boundingRects.elementPinnedTo.bottom;
  }

  pinnedElementAtParentTop (boundingRects) {
    return boundingRects.pinnedElement.top <= boundingRects.elementPinnedTo.top;
  }

  pinnedElementBelowTopOfViewport (boundingRects) {
    return boundingRects.elementPinnedTo.top < 0;
  }

  pinToParentTop () {
    this.car.classList.remove('pinned-bottom');
    this.car.classList.remove('pinned');
    this.car.classList.add('pinned-top');
    this.car.style.top = 0;
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
    this.car.style.top = this.topOffsetAdjustment;
  }
}

registerElement('bulbs-pinned-element', BulbsPinnedElement);

