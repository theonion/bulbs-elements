/* eslint no-var: 0, vars-on-top: 0 */
// Polyfill lifted from https://gist.github.com/joelambert/1002116
// requestAnimationFrame() shim by Paul Irish
// http://paulirish.com/2011/requestanimationframe-for-smart-animating/

const requestAnimFrame = (function () {
  return window.requestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.oRequestAnimationFrame ||
      window.msRequestAnimationFrame ||
      function (callback) {
        window.setTimeout(callback, 1000 / 60);
      };
})();

const requestInterval = function (fn, delay) {
  if (!window.requestAnimationFrame &&
    !window.webkitRequestAnimationFrame &&
    !(window.mozRequestAnimationFrame && window.mozCancelRequestAnimationFrame) &&
    !window.oRequestAnimationFrame &&
    !window.msRequestAnimationFrame) {

    return window.setInterval(fn, delay);
  }

  var start = new Date().getTime();
  var handle = {};

  function loop () {
    var current = new Date().getTime();
    var delta = current - start;

    if (delta >= delay) {
      fn.call();
      start = new Date().getTime();
    }

    handle.value = requestAnimFrame(loop);
  }
  handle.value = requestAnimFrame(loop);

  return handle;
};

const clearRequestInterval = function (handle) {
  window.cancelAnimationFrame ? window.cancelAnimationFrame(handle.value) :
  window.webkitCancelAnimationFrame ? window.webkitCancelAnimationFrame(handle.value) :
  window.webkitCancelRequestAnimationFrame ? window.webkitCancelRequestAnimationFrame(handle.value) :
  window.mozCancelRequestAnimationFrame ? window.mozCancelRequestAnimationFrame(handle.value) :
  window.oCancelRequestAnimationFrame ? window.oCancelRequestAnimationFrame(handle.value) :
  window.msCancelRequestAnimationFrame ? window.msCancelRequestAnimationFrame(handle.value) :
  clearInterval(handle);
};

export default {
  requestAnimFrame,
  requestInterval,
  clearRequestInterval,
};
