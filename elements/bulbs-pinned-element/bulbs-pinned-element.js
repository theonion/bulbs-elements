import { registerElement, BulbsHTMLElement } from 'bulbs-elements/register';
import invariant from 'invariant';
import { camelCase, isNumber, includes } from 'lodash';
import { isNumericString, getScrollOffset } from 'bulbs-elements/util';
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

    const offset = this.getOffset(this.getAttribute('offset'), element);

    const pinnedClass = this.hasAttribute('pinned-class') ? this.getAttribute('pinned-class') : 'pinned';
    this.outOfViewWaypoint = this.createOutOfViewWaypoint(element, offset, pinnedClass);
    window.addEventListener('scroll', this.handleScrollEvent.bind(this));
  }

  createOutOfViewWaypoint (element, offset, pinnedClass) {
    invariant(element, 'BulbsPinnendElement.createOutOfViewWaypoint(element, offset): element is undefined');
    invariant(offset, 'BulbsPinnendElement.createOutOfViewWaypoint(element, offset): offset is undefined');

    return new Waypoint({
      element,
      offset,
      handler: this.handleOutOfView(element, pinnedClass).bind(this),
    });
  }

  getOffset (offset, element) {
    if (isNumber(offset) || isNumericString(offset)) {
      return parseInt(offset, 10);
    }

    const method = camelCase(offset);

    if (includes(OFFSET_METHODS, method)) {
      return this[method](element);
    }

    return 0;
  }

  handleScrollEvent () {
    const offset = getScrollOffset();
    const elementPinnedTo = this.parentElement.querySelector(
      this.getAttribute('pinned-to')
    );
    if (offset.y > this.lastPosition) {
      this.handleScrollDown(elementPinnedTo);
    } else {
      this.handleScrollUp(elementPinnedTo);
    }
    this.lastPosition = offset.y;
  }

  elementOutOfViewTop (element) {
    return element.getBoundingClientRect().height * -1;
  }

  elementOutOfViewBottom (element) {
    element.getBoundingClientRect().height;
  }

  handleScrollDown (elementPinnedTo) {
    if (this.pinnedParentTopInViewport(elementPinnedTo)) {
      // pin this to top of parent
      this.pinToParentTop();
    } else if (this.pinnedElementAtParentBottom(elementPinnedTo)) {
      // is pinned element at the bottom of the parent
      this.pinToParentBottom();
    } else {
      // pin that shit to the top of screen
      this.removePinnedClass();
    }
  }

  handleScrollUp (elementPinnedTo) {
    // is this  element at the top of elementPinnedTo?
    // y? pin to parent top
    // n? is it at the bottom of element?
    // y? do nothing
    // is it in between? fix to top
  }

  pinnedParentTopInViewport (el) {
    if(!el) { return; } // delete me
    let elementTop = $(el).offset().top;
    let windowTop = window.pageYOffset;
    let windowBottom = windowTop + window.innerHeight;
    console.log(elementTop > windowTop && elementTop < windowBottom);
    return elementTop > windowTop && elementTop < windowBottom;
  }

  pinnedElementAtParentBottom (el) {
    if(!el) { return; } // delete me
    let elBottom = el.getBoundingClientRect().bottom;
    let pinnedBottom = this.getBoundingClientRect().bottom;
    return pinnedBottom >= elBottom;
  }

  pinToParentTop() {
    this.classList.remove('pinned-bottom');
    this.classList.add('pinned-top');
    this.classList.add('pinned');
  }

  pinToParentBottom() {
    this.classList.remove('pinned-top');
    this.classList.add('pinned-bottom');
    this.classList.add('pinned');
  }

  removePinnedClass() {
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
