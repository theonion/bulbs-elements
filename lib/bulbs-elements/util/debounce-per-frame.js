export default function debouncePerFrame () {
  let governer;

  return function (callback) {
    if (governer) {
      window.cancelAnimationFrame(governer);
    }
    governer = window.requestAnimationFrame(() => {
      callback();
      governer = null;
    });
  };
}
