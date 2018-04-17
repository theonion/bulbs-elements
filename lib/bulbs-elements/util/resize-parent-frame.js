import inIframe from './in-iframe';

// Resize a (Kinja) parent frame, using Kinja's parent notification support.

function sendResizeMessage (scrollIntoView) {

  // Remove any anchor tags
  let sourceUrl = window.location.href.split('#')[0];

  let height = document.body.clientHeight;

  window.parent.postMessage({
    kinja: {
      scrollIntoView,
      sourceUrl,
      resizeFrame: {
        height,
      },
    },
  }, '*');
}

export default function resizeParentFrame (scrollIntoView = false) {

  if (inIframe()) {
    // We're in a child frame (e.g. an embed)

    // Fire immediately. Only first call would potentially scroll.
    sendResizeMessage(scrollIntoView);
    // This is a hack to ensure that parent frame correctly resizes after responsive images are loaded.
    setTimeout(sendResizeMessage, 1500, false);
    // And one catch-all for slower connections
    setTimeout(sendResizeMessage, 10000, false);
  }
}
