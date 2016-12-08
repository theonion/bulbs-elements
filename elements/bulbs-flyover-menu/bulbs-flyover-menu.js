import { BulbsHTMLElement, registerElement } from 'bulbs-elements/register';
import './bulbs-flyover-menu.scss';
import invariant from 'invariant';

// We have to do this little dance to properly subclass elements in Safari
function BulbsHTMLButtonElement () {}
BulbsHTMLButtonElement.prototype = HTMLButtonElement.prototype;

const flyoverRegistry = {
  menus: {},
  get: (menuName) => {
    let flyover = flyoverRegistry.menus[menuName];
    if (flyover) {
      return flyover;
    }
    flyover = { openButtons: [], menu: null };
    flyoverRegistry.menus[menuName] = flyover;
    return flyover;
  },
};

class FlyoverMenu extends BulbsHTMLElement {
  get flyoverState () {
    return flyoverRegistry.get(this.getAttribute('menu-name'));
  }

  createdCallback () {
    this.flyoverState.menu = this;
  }

  attachedCallback () {
    invariant(this.hasAttribute('menu-name'),
      '<bulbs-flyover-menu> MUST have a `menu-name` attribute;');
    this.addEventListener('click', this.closeFlyover.bind(this));
  }

  openFlyover () {
    this.classList.add('bulbs-flyover-open');
    if (this.hasAttribute('no-body-scroll')) {
      document.body.classList.add('noscroll-flyout-active');
    }
    this.flyoverState.openButtons.forEach((button) => {
      button.setAttribute('aria-expanded', 'true');
    });
  }

  closeFlyover () {
    this.classList.remove('bulbs-flyover-open');
    if (this.hasAttribute('no-body-scroll')) {
      document.body.classList.remove('noscroll-flyout-active');
    }
    this.flyoverState.openButtons.forEach((button) => {
      button.setAttribute('aria-expanded', 'false');
      button.classList.remove('bulbs-flyover-open');
    });
  }
}

class FlyoverClose extends BulbsHTMLButtonElement {
  get flyoverState () {
    return flyoverRegistry.get(this.getAttribute('menu-name'));
  }

  createdCallback () {
    invariant(this.hasAttribute('menu-name'),
      '<button is="bulbs-flyover-close"> MUST have a `menu-name` attribute;');
  }

  attachedCallback () {
    this.addEventListener('click', () => this.flyoverState.menu.closeFlyover());
  }
}

FlyoverClose.extends = 'button';

class FlyoverOpen extends BulbsHTMLButtonElement {
  get flyoverState () {
    return flyoverRegistry.get(this.getAttribute('menu-name'));
  }

  createdCallback () {
    invariant(this.hasAttribute('menu-name'),
      '<button is="bulbs-flyover-open"> MUST have a `menu-name` attribute;');
  }

  attachedCallback () {
    this.flyoverState.openButtons.push(this);
    this.setAttribute('aria-haspopup', 'true');
    this.setAttribute('aria-expanded', 'false');
    this.addEventListener('click', () => this.flyoverState.menu.openFlyover());
  }
}

FlyoverOpen.extends = 'button';

registerElement('bulbs-flyover-menu', FlyoverMenu);
registerElement('bulbs-flyover-open', FlyoverOpen);
registerElement('bulbs-flyover-close', FlyoverClose);
