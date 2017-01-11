import { registerElement, BulbsHTMLElement } from 'bulbs-elements/register';
import './components/bulbs-reading-list-item';
import './components/bulbs-reading-list-articles';
import './components/bulbs-reading-list-menu';
import ReadingListMenu from './lib/reading-list-menu';
import ReadingListArticles from './lib/reading-list-articles';
import invariant from 'invariant';
import EventEmitter from 'events';
import {
  getScrollOffset,
  getWindowDimensions,
} from 'bulbs-elements/util';
import map from 'lodash/map';

class BulbsReadingList extends BulbsHTMLElement {
  connectedCallback () {
    this.lastPosition = 0;
    this.visitedInLooking = {};
    this.visitedInLooking[window.location.pathname] = true;
    this.dispatcher = new EventEmitter();
    window.addEventListener('scroll', this.handleDocumentScrolled.bind(this));
    window.addEventListener('resize', this.handleDocumentResized.bind(this));
    this.dispatcher.on('reading-list-item-url-changed', this.handleDocumentUrlChanged.bind(this));

    const menus = this.querySelectorAll(`bulbs-reading-list-menu`);
    const articles = this.querySelectorAll(`bulbs-reading-list-articles`);
    this.readingListMenus = this.createReadingListMenus(menus);
    this.readingListArticles = this.createReadingListArticles(articles);
  }

  handleDocumentScrolled () {
    window.requestAnimationFrame(this.emitScrollEvent.bind(this));
  }

  handleDocumentResized () {
    window.requestAnimationFrame(this.emitResizeEvent.bind(this));
  }

  handleDocumentUrlChanged (readingListArticle) {
    if (!this.visitedInLooking[readingListArticle.href]) {
      readingListArticle.gaTrackerWrapper(
        'send', 'event',
        'reading_list',
        'scroll_view_unique',
        readingListArticle.href,
      );
      this.visitedInLooking[readingListArticle.href] = true;
    }
  }

  emitScrollEvent () {
    const offset = getScrollOffset();
    const direction = offset.y > this.lastPosition ? 'down' : 'up';
    this.dispatcher.emit(`scroll`, offset, this.lastPosition);
    this.dispatcher.emit(`scroll-${direction}`, offset, this.lastPosition);
    this.lastPosition = offset.y;
  }

  emitResizeEvent () {
    this.dispatcher.emit('window-resize', getWindowDimensions());
  }

  createReadingListMenus (menuElements) {
    invariant(menuElements, 'BulbsReadingList.createReadingListMenus(menuElements): menuElements is undefined');
    return map(menuElements, this.createReadingListMenu.bind(this));
  }

  createReadingListMenu (menuElement) {
    invariant(menuElement, 'BulbsReadingList.createReadingListMenu(menuElement): menuElement is undefined');
    return new ReadingListMenu(menuElement, this.dispatcher);
  }

  createReadingListArticles (articlesElements) {
    invariant(articlesElements, 'BulbsReadingList.createReadingListArticles(articlesElements): articlesElements is undefined');
    return map(articlesElements, this.createReadingListArticle.bind(this));
  }

  createReadingListArticle (articlesElement) {
    invariant(articlesElement, 'BulbsReadingList.createReadingListArticle(articlesElement): articlesElement is undefined');
    return new ReadingListArticles(articlesElement, this.dispatcher);
  }
}

registerElement('bulbs-reading-list', BulbsReadingList);

export default BulbsReadingList;
