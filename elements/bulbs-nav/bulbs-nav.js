import { registerElement, BulbsHTMLElement } from 'bulbs-elements/register';
import './bulbs-nav.scss';

class BulbsNavToggle extends BulbsHTMLElement {
  createdCallback () {
    this.addEventListener('mouseover', () => this.openNavPanel());
  }

  get navPanel () {
    const navName = this.getAttribute('nav-name');
    return document.querySelector(`bulbs-nav-panel[nav-name='${navName}']`);
  }

  openNavPanel () {
    this.navPanel.open();
  }
}

class BulbsNavPanel extends BulbsHTMLElement {
  createdCallback () {
    this.addEventListener('mouseleave', () => this.close());
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
    [].forEach.call(this.otherPanels, otherPanel => otherPanel.close());
    this.classList.add('bulbs-nav-panel-active');
    this.navToggle.classList.add('bulbs-nav-toggle-active');
    if (window.picturefill) {
      window.picturefill();
    }
  }

  close () {
    this.classList.remove('bulbs-nav-panel-active');
    this.navToggle.classList.remove('bulbs-nav-toggle-active');
  }
}

registerElement('bulbs-nav-toggle', BulbsNavToggle);
registerElement('bulbs-nav-panel', BulbsNavPanel);
