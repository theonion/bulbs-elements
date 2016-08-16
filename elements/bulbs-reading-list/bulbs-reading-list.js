import { registerElement, BulbsHTMLElement } from 'bulbs-elements/register';
import invariant from 'invariant';
import { map } from 'lodash';
import './bulbs-reading-list.scss';
import './components/bulbs-reading-list-item';
import './components/bulbs-reading-list-articles';
import './components/bulbs-reading-list-menu';
import ReadingItemList from './lib/reading-item-list';

class BulbsReadingList extends BulbsHTMLElement {
  attachedCallback () {
    let menu = this.getElementsByTagName('bulbs-reading-list-menu')[0];
    let articles = this.getElementsByTagName('bulbs-reading-list-articles')[0];

    this.scrollCalculationIsIdle = true;
    this.readingItemList = new ReadingItemList(menu, articles);
    this.addEventListener('click', this.handleMenuItemClick.bind(this));
    this.isFetchingNextArticle = false;
    window.addEventListener('scroll', this.handleDocumentScrolled.bind(this));
  }

  handleMenuItemClick (evnt) {
    if (this.elementIsInsideMenu(evnt.target)) {
      evnt.preventDefault();
      let item = this.getClickedMenuItem(evnt.target);
      this.readingItemList.setCurrentItemById(item.id);
    }
  }

  getClickedMenuItem (element) {
    let id = element.closest('bulbs-reading-list-item').dataset.id;
    return this.readingItemList.getListItemById(id);
  }

  elementIsInsideMenu (element) {
    invariant(element, 'BulbsReadingList.elementIsInsideMenu(element): element is undefined');
    return !!element.closest('bulbs-reading-list-menu');
  }

  handleDocumentScrolled () {
    if (!this.isFetchingNextArticle) {
      window.requestAnimationFrame(this.processScrollPosition.bind(this));
    }
  }

  processScrollPosition () {
    if (this.readingItemList.hasMoreItems()) {
      this.loadNextArticle();
    }
    else {
      this.loadNewArticleList();
    }
  }

  shouldLoadNextArticle (nextArticle) {
    return !!(
      !this.readingItemList.hasPendingFetch() &&
      nextArticle &&
      nextArticle.isWithinViewThreshold(window.scrollY)
    );
  }

  loadNextArticle () {
    let nextArticle = this.readingItemList.nextItem();
    if (this.shouldLoadNextArticle(nextArticle)) {
      this.isFetchingNextArticle = true;
      nextArticle.loadContent()
        .then(this.handleLoadNextArticleComplete.bind(this));
    }
    else {
      this.isFetchingNextArticle = false;
      console.log('not ready to load');
    }
  }

  handleLoadNextArticleComplete (article) {
    this.isFetchingNextArticle = false;
    this.readingItemList.setCurrentItemById(article.id);
  }

  loadNewArticleList () {

  }
}

registerElement('bulbs-reading-list', BulbsReadingList);

export default BulbsReadingList;
