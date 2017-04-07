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

  toggleNavPanel (event) {
    event.stopPropagation();
    [].forEach.call(this.navPanels, navPanel => navPanel.toggle());
  }
}

class BulbsNavPanel extends BulbsHTMLElement {
  createdCallback () {
    this.documentClickHandler = this.documentClickHandler.bind(this);
  }

  get tabGroup () {
    return this.querySelector('bulbs-tabs');
  }

  get navToggles () {
    const navName = this.getAttribute('nav-name');
    return document.querySelectorAll(`bulbs-nav-toggle[nav-name='${navName}']`);
  }

  get otherPanels () {
    const navName = this.getAttribute('nav-name');
    return [].filter.call(
      document.querySelectorAll('bulbs-nav-panel'),
      child => child.getAttribute('nav-name') !== navName
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

      document.body.addEventListener('click', this.documentClickHandler);
    }
  }

  close () {
    this.classList.remove('bulbs-nav-panel-active');
    [].forEach.call(this.navToggles, navToggle => navToggle.classList.remove('bulbs-nav-toggle-active'));
    document.body.removeEventListener('click', this.documentClickHandler);
  }

  toggle () {
    if (this.classList.contains('bulbs-nav-panel-active')) {
      this.close();
    }
    else {
      this.open();
    }
  }

  documentClickHandler (event) {
    if (event.target.matches('bulbs-nav-toggle, bulbs-nav-toggle *')) {
      return;
    }

    if (!this.contains(event.target)) {
      this.close();
    }
  }
}

registerElement('bulbs-nav-toggle', BulbsNavToggle);
registerElement('bulbs-nav-panel', BulbsNavPanel);
