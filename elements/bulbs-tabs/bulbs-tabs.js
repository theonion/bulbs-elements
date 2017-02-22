import { registerElement, BulbsHTMLElement } from 'bulbs-elements/register';
import './bulbs-tabs.scss';

class BulbsTabs extends BulbsHTMLElement {
  attachedCallback () {
    this.querySelector('bulbs-tab-item').select();
  }
}

class BulbsTabStrip extends BulbsHTMLElement {

}

class BulbsTabItem extends BulbsHTMLElement {
  createdCallback () {
    this.addEventListener('click', () => this.select());
  }

  select () {
    [].forEach.call(this.tabsInGroup, otherTab => otherTab.deselect());
    this.classList.add('bulbs-tab-item-active');
    this.tabContent.classList.add('bulbs-tab-content-active');
  }

  deselect () {
    this.classList.remove('bulbs-tab-item-active');
    this.tabContent.classList.remove('bulbs-tab-content-active');
  }

  get tabsInGroup () {
    return this.closest('bulbs-tabs').querySelectorAll('bulbs-tab-item');
  }

  get tabContent () {
    return this.closest('bulbs-tabs').querySelector(`bulbs-tab-content[tab-name='${this.tabName}']`);
  }

  get tabName () {
    return this.getAttribute('tab-name');
  }
}

class BulbsTabContent extends BulbsHTMLElement {

}

registerElement('bulbs-tabs', BulbsTabs);
registerElement('bulbs-tab-strip', BulbsTabStrip);
registerElement('bulbs-tab-item', BulbsTabItem);
registerElement('bulbs-tab-content', BulbsTabContent);
