const isElementInViewport = (el, rect, options = {}) => {
  return viewStats(el, rect, options).inView;
};

const viewStats = (el, rect, options = {}) => {
  if (!document.contains(el)) {
    return false;
  }

  if (!rect) {
    rect = el.getBoundingClientRect();
  }

  // There is an edge case here where elements with 0-height at the top of the viewport
  //  are not considered in view.
  //
  //  { top: 0, height: 1 } => in view
  //  { top: 1, height: 0 } => in view
  //  { top: 0, height: 0 } => NOT in view
  //
  //  In practice this is rarely an issue because headers/nav/ads are at the top of
  //   the page and lazy loaded items are further down, nested in content.
  let inView = rect.bottom >= (options.distanceFromTop || 0) &&
    rect.right > 0 &&
    rect.left < (window.innerWidth || document.documentElement.clientWidth) &&
    rect.top < (window.innerHeight || document.documentElement.clientHeight) + (options.distanceFromBottom || 0)
  ;

  let percentage = 0;
  let start = 50;
  let height = Math.abs(Math.floor(rect.height));
  let top = rect.top;

  if (rect.top <= start && height > 0) {
    let position = top;
    if (position < 0) {
      position = position * -1;
    }
    percentage = position / height * 100;
  }
  let scrollPercent = Math.min(Math.abs(Math.floor(percentage)), 100);

  let loadDistanceThreshold = options.loadDistanceThreshold || 400;
  let loadDistance = window.innerHeight + loadDistanceThreshold;
  let approachingViewport = top < loadDistance;

  return {
    inView,
    scrollPercent,
    approachingViewport,
  };
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
  let { inView, scrollPercent, approachingViewport } = viewStats(
    monitoredItem.element,
    monitoredItem.latestRect,
    monitoredItem.options
  );
  let previousScroll = monitoredItem.scrollPercent;

  if (scrollPercent > 0 && previousScroll === 0) {
    let event = new CustomEvent('pagestart');
    monitoredItem.element.dispatchEvent(event);
  }
  if (scrollPercent < 100 && previousScroll === 100) {
    let event = new CustomEvent('pagestart');
    monitoredItem.element.dispatchEvent(event);
  }

  if (scrollPercent === 100 && previousScroll < 100) {
    let event = new CustomEvent('pageend');
    monitoredItem.element.dispatchEvent(event);
  }
  if (scrollPercent === 0 && previousScroll > 0) {
    let event = new CustomEvent('pageend');
    monitoredItem.element.dispatchEvent(event);
  }

  if (inView) {
    let event = new CustomEvent('inviewrect', {
      detail: {
        boundingRect: monitoredItem.latestRect || monitoredItem.element.getBoundingClientRect(),
      },
    });
    monitoredItem.element.dispatchEvent(event);
  }

  if (scrollPercent !== previousScroll) {
    monitoredItem.scrollPercent = scrollPercent;
    let event = new CustomEvent('progresschange', {
      detail: {
        percent: scrollPercent,
      },
    });
    monitoredItem.element.dispatchEvent(event);
  }

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

  if(!inView && approachingViewport) {
    let event = new CustomEvent('approachingviewport');
    monitoredItem.element.dispatchEvent(event);
  }
};

function cacheBoundingClientRect (monitoredItem) {
  if(!document.body.contains(monitoredItem.element)) {
    inViewMonitor.remove(monitoredItem.element);
  }
  else {
    monitoredItem.latestRect = monitoredItem.element.getBoundingClientRect();
  }
}

function handleDisplayMutation () {
  if (!animationRequest) {
    animationRequest = requestAnimationFrame(() => {
      animationRequest = null;
      // This optimization gets all rects in one go to prevent
      // layout thrashing. If layout changes between calls to getBoundingClientRect
      // it can become a very slow api call.
      Object.keys(monitoredItems).forEach((key) => {
        cacheBoundingClientRect(monitoredItems[key]);
      });

      Object.keys(monitoredItems).forEach((key) => {
        if(monitoredItems[key]) {
          maybeEmitEvent(monitoredItems[key]);
        }
      });
    });
  }
}

const inViewMonitor = {
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
export default inViewMonitor;
