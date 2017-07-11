import onReadyOrNow from './on-ready-or-now';

let isAdBlocked;

export function detectAdBlock (callback) {
  if(typeof isAdBlocked === 'undefined') {
    let adBlockCheckElement = document.createElement('img');
    let adBlockCheckContainer = document.createElement('div');
    adBlockCheckElement.src = '//assets2.onionstatic.com/onion/static/images/ad-block-check.jpg';
    adBlockCheckContainer.id = 'ad-block-check';
    adBlockCheckContainer.appendChild(adBlockCheckElement);
    document.body.appendChild(adBlockCheckContainer);
    onReadyOrNow(function () {
      // Necessary to detect completed AdBlock events
      setTimeout(function () {
        isAdBlocked = adBlockCheckElement.style.display.includes('none');
        callback(isAdBlocked);
      }, 300);
    });
  }
  else {
    callback(isAdBlocked);
  }
}

export function adBlockerOn () {
  if (typeof window.isBlockerOn !== 'function') {
    return 'None';
  }

  return window.isBlockerOn() ? 'on' : 'off';
}
