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

    invariant(element, `<bulbs-pinned-element pinned-to=".selector">: no element with the selector "${selector}" is in the DOM`);

    window.addEventListener('scroll', this.handleScrollEvent.bind(this));
  }

  handleScrollEvent () {
    let elementPinnedTo;
    if(!InViewMonitor.isElementInViewport(this, this.getBoundingClientRect())) { return; }

    const offset = getScrollOffset();
    const pinnedTo = this.getAttribute('pinned-to');

    if(this.parentElement.tagName.toUpperCase() === pinnedTo.toUpperCase()) {
      elementPinnedTo = this.parentElement;
    } else {
      elementPinnedTo = this.parentElement.querySelector(pinnedTo);
    }

    if (offset.y > this.lastPosition) {
      this.handleScrollDown(elementPinnedTo);
    } else {
      this.handleScrollUp(elementPinnedTo);
    }
    this.lastPosition = offset.y;
  }

  handleScrollDown (elementPinnedTo) {
    if (this.pinnedParentTopInViewport(elementPinnedTo)) {
      this.pinToParentTop();
    } else if (this.pinnedElementAtParentBottom(elementPinnedTo)) {
      this.pinToParentBottom();
    } else {
      this.addPinnedClass();
    }
  }

  handleScrollUp (elementPinnedTo) {
    if (this.pinnedElementAtParentTop(elementPinnedTo)){
      this.pinToParentTop();
    } else if (this.pinnedElementBelowTopOfViewport(elementPinnedTo)) {
      this.addPinnedClass();
    }
  }

  pinnedParentTopInViewport (el) {
    let elementTop = $(el).offset().top;
    let windowTop = window.pageYOffset;
    let windowBottom = windowTop + window.innerHeight;
    return elementTop > windowTop && elementTop < windowBottom;
  }

  pinnedElementAtParentBottom (el) {
    let elBottom = el.getBoundingClientRect().bottom;
    let pinnedBottom = this.getBoundingClientRect().bottom;
    return pinnedBottom >= elBottom;
  }

  pinnedElementAtParentTop (el) {
    let elTop = el.getBoundingClientRect().top;
    let pinnedTop = this.getBoundingClientRect().top;
    return pinnedTop <= elTop;
  }

  pinnedElementBelowTopOfViewport (el) {
    return el.getBoundingClientRect().top < 0;
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

  handleOutOfView (element, pinnedClass) {
    return (direction) => {
      if (direction === 'down') {
        this.classList.add(pinnedClass);
      }
      else {
        this.classList.remove(pinnedClass);
      }
    };
  }
}

registerElement('bulbs-pinned-element', BulbsPinnedElement);
