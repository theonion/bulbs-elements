/* It is useful to to track when The Human has done certain things in the lifecyle
 * of a browser session.
 *
 * This module tracks when The Human has interacted with The Computer.
 *
 * Clicking, tapping, scrolling etc.
 *
 * It is useful to know when The Human has interacted with The Computer. Once The
 * Human has started clicking/scrolling/typing they will be surprised and upset
 * if The Computer rejects their control.
 *
 * A specific example is in locking the page scroll state on page load. We have
 * specific way-points on the page that correspand to certain urls. We want to
 * lock the page scroll position to that element UNTIL The Human has done any
 * of their own scrolling/etc. Images and widgets would break the positional
 * lock unless we keep updating it.
 */
const HUMAN_EVENTS = [
  'scroll', 'mousedown', 'wheel', 'DOMMouseScroll', 'mousewheel', 'keyup',
  'touchstart', 'touchend', 'touchmove',
];

let state = {
  hasInteracted: false,
};

HUMAN_EVENTS.forEach((eventName) => {
  window.addEventListener(eventName, handleHumanEvent);
});

function handleHumanEvent ({ type }) {
  if(type === 'DOMMouseScroll'
     || type === 'mousewheel'
     || type === 'wheel'
     || type === 'mousedown'
     || type === 'keyup'
    ) {
    state.hasInteracted = true;
    HUMAN_EVENTS.forEach((eventName) => {
      window.removeEventListener(eventName, handleHumanEvent);
    });
  }
}

export default state;
