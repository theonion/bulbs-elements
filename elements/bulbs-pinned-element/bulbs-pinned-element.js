import { registerElement, BulbsHTMLElement } from 'bulbs-elements/register';
import invariant from 'invariant';
import { camelCase, isNumber, includes } from 'lodash';
import { isNumericString, getScrollOffset, InViewMonitor } from 'bulbs-elements/util';
import '../../node_modules/waypoints/lib/noframework.waypoints';
import './bulbs-pinned-element.scss';

const Waypoint = window.Waypoint;
const OFFSET_METHODS = [
  'elementOutOfViewTop',
  'elementOutOfViewBottom',
];

export default class BulbsPinnedElement extends BulbsHTMLElement {
  attachedCallback () {
    invariant(this.hasAttribute('pinned-to'), '<bulbs-pinned-element pinned-to=".selector">: a pinned-to selector is required');

    const selector = this.getAttribute('pinned-to');
    const element = document.querySelector(selector);
    this.lastPosition = 0;
    this.animationRequest = null;

    invariant(element, `<bulbs-pinned-element pinned-to=".selector">: no element with the selector "${selector}" is in the DOM`);

    window.addEventListener('scroll', this.handleScrollEvent.bind(this));
  }

  handleScrollEvent () {
    if(!this.animationRequest) {
      this.animationRequest = requestAnimationFrame(() => {
        this.animationRequest = null;

        if(!InViewMonitor.isElementInViewport(this, this.getBoundingClientRect())) { return; }

        let elementPinnedTo = this.getElementPinnedTo();
        const boundingRects = this.getBoundingRects(elementPinnedTo);

        if(this.isScrollingDown()) {
          this.handleScrollDown(elementPinnedTo, boundingRects);
        } else {
          this.handleScrollUp(boundingRects);
        }
      });
    }
  }

  getElementPinnedTo () {
    const pinnedTo = this.getAttribute('pinned-to');
    if(this.parentElement.tagName.toUpperCase() === pinnedTo.toUpperCase()) {
      return this.parentElement;
    } else {
      return this.parentElement.querySelector(pinnedTo);
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

  getBoundingRects(elementPinnedTo) {
    return {
      'pinnedElement': this.getBoundingClientRect(),
      'elementPinnedTo': elementPinnedTo.getBoundingClientRect(),
    }
  }

  handleScrollDown (elementPinnedTo, boundingRects) {
    if (this.pinnedParentTopInViewport(elementPinnedTo)) {
      this.pinToParentTop();
    } else if (this.pinnedElementAtParentBottom(boundingRects)) {
      this.pinToParentBottom();
    } else {
      this.addPinnedClass();
    }
  }

  handleScrollUp (boundingRects) {
    if (this.pinnedElementAtParentTop(boundingRects)){
      this.pinToParentTop();
    } else if (this.pinnedElementBelowTopOfViewport(boundingRects)) {
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

  pinToParentTop() {
    this.classList.remove('pinned-bottom');
    this.classList.remove('pinned');
    this.classList.add('pinned-top');
  }

  pinToParentBottom() {
    this.classList.remove('pinned-top');
    this.classList.remove('pinned');
    this.classList.add('pinned-bottom');
  }

  addPinnedClass() {
    this.classList.remove('pinned-top');
    this.classList.remove('pinned-bottom');
    this.classList.add('pinned');
  }
}

registerElement('bulbs-pinned-element', BulbsPinnedElement);
