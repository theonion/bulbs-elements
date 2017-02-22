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
    this.addEventListener('mouseout', () => this.close());
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
    this.style.display = 'block';
    this.navToggle.classList.add('bulbs-nav-toggle-open');
  }

  close () {
    this.style.display = '';
    this.navToggle.classList.remove('bulbs-nav-toggle-open');
  }
}

registerElement('bulbs-nav-toggle', BulbsNavToggle);
registerElement('bulbs-nav-panel', BulbsNavPanel);
