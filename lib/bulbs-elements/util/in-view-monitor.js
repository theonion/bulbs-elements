const isElementInViewport = (el) => {
  let rect = el.getBoundingClientRect();

  return rect.bottom > 0 &&
    rect.right > 0 &&
    rect.left < (window.innerWidth || document.documentElement.clientWidth) &&
    rect.top < (window.innerHeight || document.documentElement.clientHeight)
  ;
};

let inViewId = 0;
let initialized = false;
let animationRequest;
let monitoredItems = {};

const init = () => {
  if (initialized === false) {
    initialized = true;
    window.addEventListener('scroll', handleDisplayMutation);
    window.addEventListener('resize', handleDisplayMutation);
  }
};

const maybeEmitEvent = (monitoredItem) => {
  let inView = isElementInViewport(monitoredItem.element);
  if (inView && monitoredItem.state === 'init' || monitoredItem.state === 'out') {
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

const handleDisplayMutation = () => {
  if (!animationRequest) {
    animationRequest = requestAnimationFrame(() => {
      animationRequest = null;
      Object.keys(monitoredItems).forEach((key) => {
        maybeEmitEvent(monitoredItems[key]);
      });
    });
  }
};

export default {
  add (element) {
    init();
    if (!element._bulbsInView) {
      element._bulbsInView = ++inViewId;
    }
    monitoredItems[element._bulbsInView] = {
      element,
      state: 'init',
    };
    maybeEmitEvent(monitoredItems[element._bulbsInView]);
  },

  remove (element) {
    delete monitoredItems[element._bulbsInView];
  },
};
