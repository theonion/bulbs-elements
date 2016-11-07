/* This module locks the page scroll to a specific element.
 * This is useful for pages that use the pushState api.
 * When we come in on a URL we want to scroll to the content connected to that URL.
 * But images and other widgets will continue to load in and alter the page height.
 *
 * This module uses a requestAnimationFrame loop to keep the scroll position
 * locked to one element. it respects Human input and ends the loop once we have
 * detected Human interaction with the browser
 */

import Human from './human';
import scrollingElement from './scrolling-element';

let state = {};
let LockScroll = {};

// eslint-disable-next-line consistent-return
function animationLoop (element) {
  let offset;
  let selector;
  let offsetElement;

  if (!Human.hasInteracted) {
    try {
      offset;
      selector = element.getAttribute('scroll-offset-selector');
      offsetElement;
      offsetElement = document.querySelector(selector);
      if (offsetElement) {
        offset = offsetElement.offsetHeight;
      }
      else {
        offset = 0;
      }
      scrollingElement.scrollTop = element.offsetTop + offset;
    }
    catch (error) {
      console.warn(error);
    }
    return requestAnimationFrame(LockScroll.animationLoop.bind(null, element));
  }
}

Object.assign(LockScroll, {
  lockToElement (element) {
    if (state.lockedElement) {
      console.warn(`
        Attempted to lock scroll to more than one element. Only one element can be
        the subject of scroll locking at a time. Original target is:
      `, state.lockedElement, 'The second target is:', element);
    }
    else {
      state.lockedElement = element;
      LockScroll.animationLoop(element);
    }
  },

  resetState () {
    delete state.lockedElement;
  },

  animationLoop,
});

export default LockScroll;
