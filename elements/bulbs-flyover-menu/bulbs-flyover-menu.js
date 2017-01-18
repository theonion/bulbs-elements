import { BulbsHTMLElement, registerElement } from 'bulbs-elements/register';
import './bulbs-flyover-menu.scss';
import invariant from 'invariant';

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

  connectedCallback () {
    invariant(this.hasAttribute('menu-name'),
      '<bulbs-flyover-menu> MUST have a `menu-name` attribute;');
    this.flyoverState.menu = this;
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

class FlyoverClose extends HTMLButtonElement {
  get flyoverState () {
    return flyoverRegistry.get(this.getAttribute('menu-name'));
  }

  connectedCallback () {
    invariant(this.hasAttribute('menu-name'),
      '<button is="bulbs-flyover-close"> MUST have a `menu-name` attribute;');
    this.addEventListener('click', () => this.flyoverState.menu.closeFlyover());
  }
}

class FlyoverOpen extends HTMLButtonElement {
  get flyoverState () {
    return flyoverRegistry.get(this.getAttribute('menu-name'));
  }

  connectedCallback () {
    invariant(this.hasAttribute('menu-name'),
      '<button is="bulbs-flyover-open"> MUST have a `menu-name` attribute;');
    this.flyoverState.openButtons.push(this);
    this.setAttribute('aria-haspopup', 'true');
    this.setAttribute('aria-expanded', 'false');
    this.addEventListener('click', () => this.flyoverState.menu.openFlyover());
  }
}

registerElement('bulbs-flyover-menu', FlyoverMenu);
registerElement('bulbs-flyover-open', FlyoverOpen, { extends: 'button' });
registerElement('bulbs-flyover-close', FlyoverClose, { extends: 'button' });
