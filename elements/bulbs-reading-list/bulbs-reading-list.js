import {
  registerElement,
  BulbsHTMLElement,
} from 'bulbs-elements/register';

import {
  compact,
  each,
  find,
  first,
  isUndefined,
  map,
} from 'lodash';

import invariant from 'invariant';
import './components/reading-list-item';
import './components/reading-list-menu';
import './bulbs-reading-list.scss';

class BulbsReadingList extends BulbsHTMLElement {
  attachedCallback () {
    this.readingListMenu = first(document.getElementsByTagName('bulbs-reading-list-menu'));
    this.readingListItemElements = document.getElementsByTagName('bulbs-reading-list-item');
    this.readingListItems = this.buildReadingListItemsFromElements(this.readingListItemElements);
    this.currentListItem = this.listItemAtPosition(0);
    this.registerReadingListElementEvents();
  }

  buildReadingListItemsFromElements (elements) {
    invariant(elements, 'BulbsReadingList.buildReadingListItemsFromElements(elements): elements is undefined');
    return compact(map(elements, (element, i) => { // eslint-disable-line consistent-return
      let noIdMessage = `BulbsReadingList.buildReadingListItemsFromElements(elements): element has no id ${element}`;
      let noHrefMessage = `BulbsReadingList.buildReadingListItemsFromElements(elements): element has no data-href ${element}`; // eslint-disable-line max-len
      let noTitleMessage = `BulbsReadingList.buildReadingListItemsFromElements(elements): element has no data-title ${element}`; // eslint-disable-line max-len
      invariant(element.id, noIdMessage);
      invariant(element.dataset && element.dataset.href, noHrefMessage);
      invariant(element.dataset && element.dataset.title, noTitleMessage);

      return {
        element,
        href: element.dataset.href,
        id: element.id,
        position: i,
        title: element.dataset.title,
      };
    }));
  }

  listItemAtPosition (position) {
    invariant(!isUndefined(position), 'BulbsReadingList.listItemAtPosition(position): position is undefined');
    return find(this.readingListItems, (item) => item.position === position);
  }

  registerReadingListElementEvents () {
    let handleListItemClick = this.handleListItemClick.bind(this);
    each(this.readingListItemElements, (element) => {
      element.addEventListener('click', handleListItemClick);
    });
  }

  getListItemById (id) {
    invariant(id, 'BulbsReadingList.getListItemById(id): id is undefined');
    return find(this.readingListItems, (item) => item.id === id);
  }

  isNextListItem (listItem) {
    invariant(listItem, 'BulbsReadingList.isNextListItem(listItem): listItem is undefined');
    let nextItem = this.listItemAtPosition(this.currentListItem.position + 1);
    if (nextItem) {
      return listItem.position === nextItem.position;
    }
    return false;
  }

  isBeforeCurrentItem (listItem) {
    invariant(listItem, 'BulbsReadingList.isBeforeCurrentItem(listItem): listItem is undefined');
    return listItem.position < this.currentListItem.position;
  }

  isInsideReadingListMenu (element) {
    invariant(element, 'BulbsReadingList.isInsideReadingListMenu(element): element is undefined');
    return this.readingListMenu.contains(element);
  }

  handleListItemClick (event) {
    event.preventDefault();
  }
}

registerElement('bulbs-reading-list', BulbsReadingList);

export default BulbsReadingList;
