import { registerElement, BulbsHTMLElement } from 'bulbs-elements/register';
import './bulbs-nav.scss';

class BulbsNavToggle extends BulbsHTMLElement {
  createdCallback () {
    this.addEventListener('click', this.toggleNavPanel.bind(this));
  }

  get navPanels () {
    const navName = this.getAttribute('nav-name');
    return document.querySelectorAll(`bulbs-nav-panel[nav-name='${navName}']`);
  }

  toggleNavPanel () {
    [].forEach.call(this.navPanels, navPanel => navPanel.toggle());
  }
}

class BulbsNavPanel extends BulbsHTMLElement {
  get tabGroup () {
    return this.querySelector('bulbs-tabs');
  }

  get navToggles () {
    const navName = this.getAttribute('nav-name');
    return document.querySelectorAll(`bulbs-nav-toggle[nav-name='${navName}']`);
  }

  get otherPanels () {
    return [].filter.call(
      document.querySelectorAll('bulbs-nav-panel'),
      child => child !== this
    );
  }

  open () {
    if (!this.classList.contains('bulbs-nav-panel-active')) {
      [].forEach.call(this.otherPanels, otherPanel => otherPanel.close());
      this.classList.add('bulbs-nav-panel-active');

      [].forEach.call(this.navToggles, navToggle => navToggle.classList.add('bulbs-nav-toggle-active'));
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
    [].forEach.call(this.navToggles, navToggle => navToggle.classList.remove('bulbs-nav-toggle-active'));
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
