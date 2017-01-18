export function getWindowDimensions () {
  let width = 0;
  let height = 0;

  if (hasInnerWidth()) {
    width = window.innerWidth;
    height = window.innerHeight;
  }
  else if (hasDocumentElementDimensions()) {
    width = document.documentElement.clientWidth;
    height = document.documentElement.clientHeight;
  }
  else if (hasBodyDimensions()) {
    width = document.body.clientWidth;
    height = document.body.clientHeight;
  }

  return { width, height };
}

export function getScrollOffset () {
  let x = 0;
  let y = 0;

  if (hasPageOffset()) {
    y = window.pageYOffset;
    x = window.pageXOffset;
  }
  else if (hasBodyOffset()) {
    y = document.body.scrollTop;
    x = document.body.scrollLeft;
  }
  else if (hasDocumentElementOffset()) {
    y = document.documentElement.scrollTop;
    x = document.documentElement.scrollLeft;
  }

  return { x, y };
}

export function getRoundedBoundingClientRect (element) {
  // firefox has too much precision and will create unexpected behavior when
  //  comparing bounding rect pixel values. ensure the math always works out the
  //  same by rounding. who's rendering 10000ths of a pixel anyways?
  let rect = element.getBoundingClientRect();

  // NOTE: cannot copy ClientRect in a normal way because it's a special object
  return [
    'bottom',
    'height',
    'left',
    'right',
    'top',
    'width',
  ].reduce((rectCopy, k) => {
    rectCopy[k] = Math.ceil(rect[k]);
    return rectCopy;
  }, {});
}

function hasInnerWidth () {
  return typeof window.innerWidth === 'number';
}

function hasDocumentElementDimensions () {
  return document.documentElement && (document.documentElement.clientWidth && document.documentElement.clientHeight);
}

function hasBodyDimensions () {
  return document.body && (document.body.clientWidth && document.body.clientHeight);
}

function hasPageOffset () {
  return typeof window.pageYOffset === 'number';
}

function hasBodyOffset () {
  return document.body && (document.body.scrollLeft && document.body.scrollTop);
}

function hasDocumentElementOffset () {
  return document.documentElement && (document.documentElement.scrollLeft && document.documentElement.scrollTop);
}
