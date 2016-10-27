export default function (callback) {
  if (document.readyState !== 'loading') {
    callback();
  }
  else {
    window.addEventListener('DOMContentLoaded', callback);
  }
}
