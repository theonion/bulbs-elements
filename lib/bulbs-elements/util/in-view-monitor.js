const isElementInViewport = (el, options = {}) => {
  let rect = el.getBoundingClientRect();

  return rect.bottom > (options.distanceFromTop || 0) &&
    rect.right > 0 &&
    rect.left < (window.innerWidth || document.documentElement.clientWidth) &&
    rect.top < (window.innerHeight || document.documentElement.clientHeight) + (options.distanceFromBottom || 0)
  ;
};

let inViewId = 0;
let initialized = false;
let animationRequest;
let monitoredItems = {};

function init () {
  if (initialized === false) {
    initialized = true;
    window.addEventListener('scroll', handleDisplayMutation, true);
    window.addEventListener('resize', handleDisplayMutation);
  }
}

const maybeEmitEvent = (monitoredItem) => {
  let inView = isElementInViewport(monitoredItem.element, monitoredItem.options);
  if (inView && monitoredItem.state === 'out') {
    monitoredItem.state = 'in';
    let event = new CustomEvent('enterviewport');
    monitoredItem.element.dispatchEvent(event);
  }
  else if (!inView && monitoredItem.state === 'in') {
    monitoredItem.state = 'out';
    let event = new CustomEvent('exitviewport');
    monitoredItem.element.dispatchEvent(event);
  }
};

function handleDisplayMutation () {
  if (!animationRequest) {
    animationRequest = requestAnimationFrame(() => {
      animationRequest = null;
      Object.keys(monitoredItems).forEach((key) => {
        maybeEmitEvent(monitoredItems[key]);
      });
    });
  }
}

export default {
  add (element, options = {}) {
    init();
    if (!element._bulbsInView) {
      element._bulbsInView = ++inViewId;
    }
    monitoredItems[element._bulbsInView] = {
      element,
      state: 'out',
      options,
    };
    maybeEmitEvent(monitoredItems[element._bulbsInView]);
  },

  remove (element) {
    delete monitoredItems[element._bulbsInView];
  },

  checkElement (element) {
    maybeEmitEvent(monitoredItems[element._bulbsInView]);
  },

  isElementInViewport,
};
