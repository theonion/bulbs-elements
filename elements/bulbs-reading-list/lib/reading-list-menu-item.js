import invariant from 'invariant';
import { isUndefined } from 'lodash';

export default class ReadingListMenuItem {
  constructor (element, dispatcher, index) {
    invariant(element, 'new ReadingListMenuItem(element, dispatcher, index): element is undefined');
    invariant(dispatcher, 'new ReadingListMenuItem(element, dispatcher, index): dispatcher is undefined');
    invariant(!isUndefined(index), 'new ReadingListMenuItem(element, dispatcher, index): index is undefined');

    this.index = index;
    this.element = element;
    this.dispatcher = dispatcher;
    this.id = parseInt(element.dataset.id, 10);
    this.href = element.dataset.href;
    this.partialUrl = element.dataset.partialUrl;
    this.title = element.dataset.title;
    this.progressBar = element.getElementsByTagName('progress-bar')[0];
    this.registerEvents();
  }

  registerEvents () {
    let clickableArea = this.element.querySelector('bulbs-reading-list-menu-item-clickable-area');
    if (!clickableArea) {
      clickableArea = this.element;
    }

    clickableArea.addEventListener('click', this.handleClick.bind(this));
    this.dispatcher.on('reading-list-item-progress-update', this.updateProgress.bind(this));
  }

  handleClick (evnt) {
    evnt.preventDefault();
    this.dispatcher.emit('reading-list-item-clicked', this, evnt);
  }

  isCurrent () {
    return this.element.classList.contains('current');
  }

  setAsCurrent () {
    this.element.classList.add('current');
    this.isCurrent = true;
  }

  setAsNotCurrent () {
    this.element.classList.remove('current');
    this.isCurrent = false;
  }

  updateProgress (article) {
    if (!this.progressBar) { return; }
    if (article.id === this.id) {
      this.progressBar.setAttribute('progress', article.progress);
    }
  }
}
