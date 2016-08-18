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
let all = {};

const init = () => {
  if (initialized === false) {
    initialized = true;
    window.addEventListener('scroll', handleDisplayMutation);
    window.addEventListener('resize', handleDisplayMutation);
  }
};

const maybeEmitEvent = (one) => {
  let inView = isElementInViewport(one.element);
  if (inView && one.state === 'init' || one.state === 'out') {
    one.state = 'in';
    let event = new Event('enterviewport');
    one.element.dispatchEvent(event);
  }
  else if (!inView && one.state === 'in') {
    one.state = 'out';
    let event = new Event('exitviewport');
    one.element.dispatchEvent(event);
  }
};

const handleDisplayMutation = () => {
  if (!animationRequest) {
    animationRequest = requestAnimationFrame(() => {
      animationRequest = null;
      Object.keys(all).forEach((key) => {
        maybeEmitEvent(all[key]);
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
    all[element._bulbsInView] = {
      element,
      state: 'init',
    };
    maybeEmitEvent(all[element._bulbsInView]);
  },

  remove (element) {
    delete all[element._bulbsInView];
  },
};
