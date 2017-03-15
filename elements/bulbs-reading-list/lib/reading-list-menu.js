import invariant from 'invariant';
import { map, isUndefined } from 'lodash';
import ReadingListMenuItem from './reading-list-menu-item';

export default class ReadingListMenu {
  constructor (element, dispatcher) {
    invariant(element, 'new ReadingListMenu(element, dispatcher): element is undefined');
    invariant(dispatcher, 'new ReadingListMenu(element, dispatcher): dispatcher is undefined');

    this.dispatcher = dispatcher;
    const itemElements = element.querySelectorAll('bulbs-reading-list-item');
    this.menuItems = this.createMenuItems(itemElements);
    if (this.firstItem()) {
      this.firstItem().setAsCurrent();
    }
    this.registerEvents();
  }

  createMenuItems (itemElements) {
    invariant(itemElements, 'ReadingListMenu.createMenuItems(itemElements): itemElements is undefined');
    return map(itemElements, this.createMenuItem.bind(this));
  }

  createMenuItem (itemElement, index) {
    invariant(itemElement, 'ReadingListMenu.createMenuItem(itemElement, index): itemElement is undefined');
    invariant(!isUndefined(index), 'ReadingListMenu.createMenuItem(itemElement, index): index is undefined');
    return new ReadingListMenuItem(itemElement, this.dispatcher, index);
  }

  firstItem () {
    return this.menuItems[0];
  }

  registerEvents () {
    this.dispatcher.on('reading-list-item-clicked', this.handleMenuItemClicked.bind(this));
  }

  handleMenuItemClicked (menuItem) {
    this.menuItems.forEach((item) => {
      (item === menuItem) ? item.setAsCurrent() : item.setAsNotCurrent();
    });
  }
}
