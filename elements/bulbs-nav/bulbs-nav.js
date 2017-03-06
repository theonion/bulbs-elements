import { registerElement, BulbsHTMLElement } from 'bulbs-elements/register';
import './bulbs-nav.scss';

const CLICK_TOGGLE = location.search === '?nav-toggle=click';

const NavStateManager = {
  state: {},

  requestClose (element) {
    this.state[element.getAttribute('nav-name')] = {
      element,
      frameRequest: requestAnimationFrame(() => {
        delete this.state[element.getAttribute('nav-name')];
        element.close();
      }),
    };
  },

  cancelClose (element) {
    const stateInfo = this.state[element.getAttribute('nav-name')];
    if (stateInfo) {
      cancelAnimationFrame(stateInfo.frameRequest);
      delete this.state[element.getAttribute('nav-name')];
    }
  },
};

class BulbsNavToggle extends BulbsHTMLElement {
  createdCallback () {
    if (CLICK_TOGGLE) {
      this.addEventListener('click', () => this.toggleNavPanel());
    }
    else {
      this.addEventListener('mouseenter', () => this.openNavPanel());
    }
  }

  get navPanel () {
    const navName = this.getAttribute('nav-name');
    return document.querySelector(`bulbs-nav-panel[nav-name='${navName}']`);
  }

  openNavPanel () {
    NavStateManager.cancelClose(this.navPanel);
    this.navPanel.open();
  }

  toggleNavPanel () {
    this.navPanel.toggle();
  }
}

class BulbsNavPanel extends BulbsHTMLElement {
  createdCallback () {
    if (CLICK_TOGGLE) {
      // no-op
    }
    else {
      this.addEventListener('mouseleave', () => {
        NavStateManager.requestClose(this);
      });
    }
    this.scrollHandler = this.scrollHandler.bind(this);
  }

  get tabGroup () {
    return this.querySelector('bulbs-tabs');
  }

  get navToggle () {
    const navName = this.getAttribute('nav-name');
    return document.querySelector(`bulbs-nav-toggle[nav-name='${navName}']`);
  }

  get otherPanels () {
    return [].filter.call(
      this.parentNode.querySelectorAll('bulbs-nav-panel'),
      child => child !== this
    );
  }

  scrollHandler () {
    if (this.getBoundingClientRect().top < -100) {
      this.close();
    }
  }

  open () {
    if (!this.classList.contains('bulbs-nav-panel-active')) {
      [].forEach.call(this.otherPanels, otherPanel => otherPanel.close());
      this.classList.add('bulbs-nav-panel-active');
      this.navToggle.classList.add('bulbs-nav-toggle-active');
      if (this.tabGroup) {
        this.tabGroup.resetSelection();
      }
      if (window.picturefill) {
        window.picturefill();
      }
      window.addEventListener('scroll', this.scrollHandler);
    }
  }

  close () {
    this.classList.remove('bulbs-nav-panel-active');
    this.navToggle.classList.remove('bulbs-nav-toggle-active');
    window.removeEventListener('scroll', this.scrollHandler);
  }

  toggle () {
    if (this.classList.contains('bulbs-nav-panel-active')) {
      this.close();
    }
    else {
      this.open();
    }
  }
}

registerElement('bulbs-nav-toggle', BulbsNavToggle);
registerElement('bulbs-nav-panel', BulbsNavPanel);
