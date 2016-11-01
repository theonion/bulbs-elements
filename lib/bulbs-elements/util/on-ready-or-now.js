function onReadyOrNow (callback) {
  if (onReadyOrNow.getDocumentReadyState() !== 'loading') {
    callback();
  }
  else {
    window.addEventListener('DOMContentLoaded', callback);
  }
}

onReadyOrNow.getDocumentReadyState = () => document.readyState;

export default onReadyOrNow;
