export function SplitPic (element) {
  let el = $(element);
  let leftPane = $('.splitpic-left-image', el);
  let bar = $('.splitpic-bar', el);
  let infoHidden = false;
  let isMoving = false;
  let lastX = 0;
  let lastY = 0;
  let startPercentage = el.find('.splitpic-images').eq(0).data('start-percent');

  // split the image at the cursor
  function updateSplit (x, isRelative) {
    let relativeX;

    if (!isRelative) {
      let elOffset = el.offset();
      relativeX = x - elOffset.left;
    }
    else {
      relativeX = x;
    }

    leftPane.css('clip', 'rect(0px, ' + relativeX + 'px, auto, 0px)');
    bar.css('left', relativeX - bar.width() / 2 + 'px');
  }

  // how much of the left image should we show at start? 50% if not specified
  if (isNaN(startPercentage)) {
    startPercentage = 50;
  }

  startPercentage /= 100;
  updateSplit(el.width() * startPercentage, true);

  el.on('touchmove touchstart', function (event) {
    let touches;

    if (!infoHidden) {
      $('.splitpic-info', el).fadeOut(200);
      infoHidden = true;
    }

    if (event.touches) {
      touches = event.touches;
    }
    else if (event.originalEvent && event.originalEvent.touches) {
      touches = event.originalEvent.touches;
    }

    if (touches) {
      let touch = touches[0];
      let dx = 0;
      let dy = 0;

      if (isMoving) {
        dx = touch.pageX - lastX;
        dy = touch.pageY - lastY;
      }
      else {
        isMoving = true;
      }

      // if we move a bit and it's laterally
      if (Math.abs(dx) > Math.abs(dy)) {
        event.preventDefault();
        updateSplit(touches[0].pageX);
      }

      lastX = touch.pageX;
      lastY = touch.pageY;
    }
  });

  el.on('touchend', function () {
    isMoving = false;
  });

  el.on('mouseenter mousemove mouseleave', function (event) {
    if (!infoHidden) {
      $('.splitpic-info', el).fadeOut(200);
      infoHidden = true;
    }
    updateSplit(event.pageX);
  });
}

export function SplitPicVertical (element) {
  let el = $(element);
  let overPane = $('.splitpic-left-image', el);
  let bar = $('.splitpic-bar', el);
  let infoHidden = false;
  let img = $('.splitpic-left-image img', element);
  let isMoving = false;
  let lastX = 0;
  let lastY = 0;

  // split the image at the cursor
  function updateSplit (y, isRelative) {
    let relativeY;
    if (!isRelative) {
      let elOffset = el.offset();
      relativeY = y - elOffset.top;
    }
    else {
      relativeY = y;
    }

    overPane.css('clip', 'rect(' + relativeY + 'px, auto, auto, 0px)');
    bar.css('top', relativeY - bar.height() / 2 + 'px');
  }

  // this is necessary since we're using original crops and therefore the
  // image height won't be known until it's loaded.
  function setInitialPosition () {
    // how much of the left image should we show at start? 50% if not specified
    let startPercentage = parseInt(el.attr('data-start-percent'), 10);

    if (isNaN(startPercentage)) {
      startPercentage = 50;
    }

    startPercentage /= 100;
    updateSplit(el.height() * startPercentage, true);
  }

  if (img[0].complete) {
    setInitialPosition();
  }
  else {
    $( document ).ready(setInitialPosition.bind(this));
  }

  el.on('touchmove touchstart', function (event) {
    let touches;

    if (!infoHidden) {
      $('.splitpic-info', el).fadeOut(200);
      infoHidden = true;
    }

    if (event.touches) {
      touches = event.touches;
    }
    else if (event.originalEvent && event.originalEvent.touches) {
      touches = event.originalEvent.touches;
    }

    if (touches) {
      let touch = touches[0];
      let dx = 0;
      let dy = 0;

      if (isMoving) {
        dx = touch.pageX - lastX;
        dy = touch.pageY - lastY;
      }
      else {
        dy = 0.001; // HACK: so it's not equal to dx and immediately updates
        isMoving = true;
      }
      // if we move a bit and it's vertically and not too fast
      if (Math.abs(dy) > Math.abs(dx) && Math.abs(dy) < 10) {
        event.preventDefault();
        updateSplit(touch.pageY);
      }

      lastX = touch.pageX;
      lastY = touch.pageY;
    }
  });

  el.on('touchend', function () {
    isMoving = false;
  });

  el.on('mouseenter mousemove mouseleave', function (event) {
    if (!infoHidden) {
      $('.splitpic-info', el).fadeOut(200);
      infoHidden = true;
    }

    updateSplit(event.pageY);
  });
}
