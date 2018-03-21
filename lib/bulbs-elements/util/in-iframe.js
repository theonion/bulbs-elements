// Cross-browser check to determine if we're embedded inside an Iframe
export default function inIframe () {
  try {
    return window.self !== window.top;
  }
  catch (e) {
    return true;
  }
}
