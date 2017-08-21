import onReadyOrNow from './on-ready-or-now';

let isAdBlocked;

function _createDelayedBait (callback) {
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

export function detectAdBlock (callback) {
  if(typeof isAdBlocked === 'undefined') {
    if (typeof window.isBlockerOn !== 'function') {
      _createDelayedBait(callback);
    }
    else {
      isAdBlocked = window.isBlockerOn();
      callback(isAdBlocked);
    }
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
