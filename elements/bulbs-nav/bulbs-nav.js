import { registerElement, BulbsHTMLElement } from 'bulbs-elements/register';
import './bulbs-nav.scss';

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
    this.addEventListener('mouseenter', () => this.openNavPanel());
  }

  get navPanel () {
    const navName = this.getAttribute('nav-name');
    return document.querySelector(`bulbs-nav-panel[nav-name='${navName}']`);
  }

  openNavPanel () {
    NavStateManager.cancelClose(this.navPanel);
    this.navPanel.open();
  }
}

class BulbsNavPanel extends BulbsHTMLElement {
  createdCallback () {
    this.addEventListener('mouseleave', () => {
      NavStateManager.requestClose(this);
    });
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
    }
  }

  close () {
    this.classList.remove('bulbs-nav-panel-active');
    this.navToggle.classList.remove('bulbs-nav-toggle-active');
  }
}

registerElement('bulbs-nav-toggle', BulbsNavToggle);
registerElement('bulbs-nav-panel', BulbsNavPanel);
