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

function cancelTouchmove (event) {
  event.preventDefault();
}

class FlyoverMenu extends BulbsHTMLElement {
  get flyoverState () {
    return flyoverRegistry.get(this.getAttribute('menu-name'));
  }

  createdCallback () {
    this.flyoverState.menu = this;
    this.handleTouchstart = this.handleTouchstart.bind(this);
    this.handleTouchmove = this.handleTouchmove.bind(this);

    this.addEventListener('touchstart', this.handleTouchstart);
  }

  attachedCallback () {
    invariant(this.hasAttribute('menu-name'),
      '<bulbs-flyover-menu> MUST have a `menu-name` attribute;');
  }

  openFlyover () {
    this.classList.add('bulbs-flyover-open');
    if (this.hasAttribute('no-body-scroll')) {
      document.body.classList.add('noscroll-flyout-active');
      document.body.addEventListener('touchmove', this.handleTouchmove);
      document.addEventListener('touchmove', cancelTouchmove);
    }
    this.flyoverState.openButtons.forEach((button) => {
      button.setAttribute('aria-expanded', 'true');
    });
  }

  closeFlyover () {
    this.classList.remove('bulbs-flyover-open');
    if (this.hasAttribute('no-body-scroll')) {
      document.body.classList.remove('noscroll-flyout-active');
      document.body.removeEventListener('touchmove', this.handleTouchmove);
      document.body.removeEventListener('touchmove', cancelTouchmove);
    }
    this.flyoverState.openButtons.forEach((button) => {
      button.setAttribute('aria-expanded', 'false');
      button.classList.remove('bulbs-flyover-open');
    });
  }

  handleTouchstart (event) {
    // If the element is scrollable (content overflows), then...
    if (this.scrollHeight !== this.clientHeight) {
      // If we're at the top, scroll down one pixel to allow scrolling up
      if (this.scrollTop === 0) {
        this.scrollTop = 1;
      }
      // If we're at the bottom, scroll up one pixel to allow scrolling down
      if (this.scrollTop === this.scrollHeight - this.clientHeight) {
        this.scrollTop = this.scrollHeight - this.clientHeight - 1;
      }
    }
    // Check if we can scroll
    this.allowUp = this.scrollTop > 0;
    this.allowDown = this.scrollTop < (this.scrollHeight - this.clientHeight);
    this.lastY = event.pageY;
  }

  handleTouchmove (event) {
    const up = event.pageY > this.lastY;
    const down = !up;
    this.lastY = event.pageY;

    console.log('touchmove', 'up:', up);
    console.log('touchmove', 'down:', down);
    console.log('touchmove', 'allowUp', this.allowUp);
    console.log('touchmove', 'allowDown', this.allowDown);

    if ((up && this.allowUp) || (down && this.allowDown)) {
      event.stopPropagation();
    }
    else if (event.target.contains(this)) {
      event.preventDefault();
    }
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
