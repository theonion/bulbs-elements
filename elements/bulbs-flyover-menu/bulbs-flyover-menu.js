import { BulbsHTMLElement, registerElement } from 'bulbs-elements/register';
import './bulbs-flyover-menu.scss';

// We have to do this little dance to properly subclass elements in Safari
function BulbsHTMLButtonElement () {}
BulbsHTMLButtonElement.prototype = HTMLButtonElement.prototype;

class FlyoverMenu extends BulbsHTMLElement {
  createdCallback () {
    this.openers = [];
  }

  attachedCallback () {
    this.addEventListener('click', this.closeFlyover.bind(this));
  }

  openFlyover () {
    this.classList.add('bulbs-flyover-open');
    this.openers.forEach((opener) => {
      opener.setAttribute('aria-expanded', 'true');
    });
  }

  closeFlyover () {
    this.classList.remove('bulbs-flyover-open');

    this.openers.forEach((opener) => {
      opener.setAttribute('aria-expanded', 'false');
    });
  }

  registerOpenButton (openButton) {
    this.openers.push(openButton);
  }
}

function invokeOnTarget (element, methodToInvoke) {
  let targetQuery = element.getAttribute('target');
  if (targetQuery) {
    let targets = document.querySelectorAll(targetQuery);
    Array.prototype.forEach.call(targets, (target) => {
      target[methodToInvoke](element);
    });
  }
}

class FlyoverClose extends BulbsHTMLButtonElement {
  attachedCallback () {
    this.addEventListener('click', invokeOnTarget.bind(null, this, 'closeFlyover'));
  }
}

FlyoverClose.extends = 'button';

class FlyoverOpen extends BulbsHTMLButtonElement {
  attachedCallback () {
    this.setAttribute('aria-haspopup', 'true');
    this.setAttribute('aria-expanded', 'false');
    this.addEventListener('click', invokeOnTarget.bind(null, this, 'openFlyover'));
    invokeOnTarget(this, 'registerOpenButton');
  }
}

FlyoverOpen.extends = 'button';

registerElement('bulbs-flyover-menu', FlyoverMenu);
registerElement('bulbs-flyover-open', FlyoverOpen);
registerElement('bulbs-flyover-close', FlyoverClose);
