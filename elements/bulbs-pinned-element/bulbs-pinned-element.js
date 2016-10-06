import { registerElement, BulbsHTMLElement } from 'bulbs-elements/register';
import invariant from 'invariant';
import { camelCase, isNumber, includes } from 'lodash';
import { isNumericString } from 'bulbs-elements/util';
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

    invariant(element, `<bulbs-pinned-element pinned-to=".selector">: no element with the selector "${selector}" is in the DOM`);

    const offset = this.getOffset(this.getAttribute('offset'), element);

    const pinnedClass = this.hasAttribute('pinned-class') ? this.getAttribute('pinned-class') : 'pinned';
    this.outOfViewWaypoint = this.createOutOfViewWaypoint(element, offset, pinnedClass);
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

  elementOutOfViewTop (element) {
    return element.getBoundingClientRect().height * -1;
  }

  elementOutOfViewBottom (element) {
    element.getBoundingClientRect().height;
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
