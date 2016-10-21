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

let state = {};

function animationLoop (element) {
  if (!Human.hasInteracted) {
    element.offsetParent.scrollTop = element.offsetTop;
    requestAnimationFrame(animationLoop.bind(element));
  }
}

export default {
  lockToElement (element) {
    if (state.lockedElement) {
      console.warn(`
        Atempted to lock scroll to more than one element. Only one element can be
        the subject of scroll locking at a time. Original target is:
      `, state.lockedElement, 'The second target is:', element);
    }
    else {
      state.lockedElement = element;
      animationLoop(element);
    }
  },

  resetState () {
    delete state.lockedElement;
  },
};
