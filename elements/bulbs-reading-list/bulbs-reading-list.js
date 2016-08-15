import { registerElement, BulbsHTMLElement } from 'bulbs-elements/register';
import invariant from 'invariant';
import './bulbs-reading-list.scss';
import './components/bulbs-reading-list-item';
import './components/bulbs-reading-item-list';
import './components/bulbs-reading-list-menu';
import ReadingItemList from './lib/reading-item-list';

class BulbsReadingList extends BulbsHTMLElement {
  attachedCallback () {
    let menu = this.getElementsByTagName('bulbs-reading-list-menu')[0];
    let articles = this.getElementsByTagName('bulbs-reading-item-list')[0];

    this.scrollCalculationIsIdle = true;
    this.lastKnownScrollPosition = 0;
    this.readingListMenu = new ReadingItemList(menu);
    this.articleList = new ReadingItemList(articles);
    this.addEventListener('click', this.handleMenuItemClick.bind(this));
    window.addEventListener('scroll', this.handleDocumentScrolled.bind(this));
  }

  handleMenuItemClick (evnt) {
    if (this.elementIsInsideMenu(evnt.target)) {
      evnt.preventDefault();
      let item = this.getClickedMenuItem(evnt.target);
      this.readingListMenu.setCurrentItemById(item.id);
    }
  }

  getClickedMenuItem (element) {
    let id = element.closest('bulbs-reading-list-item').id;
    return this.readingListMenu.getListItemById(id);
  }

  elementIsInsideMenu (element) {
    invariant(element, 'BulbsReadingList.elementIsInsideMenu(element): element is undefined');
    return !!element.closest('bulbs-reading-list-menu');
  }

  handleDocumentScrolled () {
    if (this.isScrollingDown()) {
      window.requestAnimationFrame(this.processScrollPosition.bind(this));
    }
  }

  processScrollPosition () {
    if (this.articleList.hasMoreItems()) {
      this.loadNextArticle();
    }
    else {
      this.loadNewArticleList();
    }
  }

  shouldLoadNextArticle (nextArticle) {
    return !!(nextArticle && nextArticle.isWithinViewThreshold(window.scrollY));
  }

  loadNextArticle () {
    let nextArticle = this.articleList.nextItem();
    if (this.shouldLoadNextArticle(nextArticle)) {
      nextArticle.loadContent();
      this.articleList.setCurrentItemById(nextArticle.id);
    }
    else {
      console.log('not ready to load');
    }
  }

  loadNewArticleList () {

  }

  isScrollingDown (scrollPosition = window.scrollY) {
    return scrollPosition > this.lastKnownScrollPosition;
  }

  isScrollingUp (scrollPosition = window.scrollY) {
    return scrollPosition < this.lastKnownScrollPosition;
  }
}

registerElement('bulbs-reading-list', BulbsReadingList);

export default BulbsReadingList;
