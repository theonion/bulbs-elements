// Resize a (Kinja) parent frame, using Kinja's parent notification support.

export default function resizeParentFrame (height) {
  if (window.parent) {
    // We're in a child frame (e.g. an embed)

    // Remove any anchor tags
    let sourceUrl = window.location.href.split('#')[0];

    window.parent.postMessage({
      kinja: {
        sourceUrl,
        resizeFrame: {
          height,
        },
      },
    }, '*');
  }
}
