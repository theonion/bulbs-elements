// Resize a (Kinja) parent frame, using Kinja's parent notification support.

function sendResizeMessage () {

  // Remove any anchor tags
  let sourceUrl = window.location.href.split('#')[0];

  window.parent.postMessage({
    kinja: {
      sourceUrl,
      resizeFrame: {
        height: document.body.clientHeight,
      },
    },
  }, '*');
}

export default function resizeParentFrame() {

  if (window.parent) {
    // We're in a child frame (e.g. an embed)

    // Fire immediately
    sendResizeMessage();
    // This is a hack to ensure that parent frame correctly resizes after responsive images are loaded.
    setTimeout(sendResizeMessage, 1500);
    // And one catch-all for slower connections
    setTimeout(sendResizeMessage, 10000);
  }
}
