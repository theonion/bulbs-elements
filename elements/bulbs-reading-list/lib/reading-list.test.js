/* eslint no-new: 0 */
import '../components/bulbs-reading-list-item';
import '../components/bulbs-reading-list-articles';
import ReadingList from './reading-list';
import ReadingListItem from './reading-list-item';
import { take } from 'lodash';
import buildReadingListFixture from './reading-list-test-helper';
import {
  appendFixtureContainer,
  removeFixtures,
  createElement,
} from 'bulbs-elements/test/fixtures';

describe('ReadingList', () => {
  let subject;
  let menu;
  let articles;
  let sandbox;
  let readingListElement;
  beforeEach(() => {
    let stickyContainer = createElement('div', { 'class': 'sticky-container' });
    let pinnedContainer = createElement('div', { 'class': 'pinned-container' });
    let pinnedTether = createElement('div', { 'class': 'article-detail-content' });
    let menuOnButton = createElement('div', { 'class': 'reading-list-menu-toggle-on' });
    readingListElement = buildReadingListFixture({
      'sticky-nav-tether': '.sticky-container',
      'pinned-tether': '.article-detail-content',
      'pinned-container': '.pinned-container',
      'pinned-container-min-width': 768,
    });
    let fixtureContainer = appendFixtureContainer();
    fixtureContainer.appendChild(stickyContainer);
    fixtureContainer.appendChild(pinnedTether);
    fixtureContainer.appendChild(pinnedContainer);
    fixtureContainer.appendChild(menuOnButton);
    fixtureContainer.appendChild(readingListElement);
    sandbox = sinon.sandbox.create();
    sandbox.stub(window, 'addEventListener');
    menu = readingListElement.getElementsByTagName('bulbs-reading-list-menu')[0];
    articles = readingListElement.getElementsByTagName('bulbs-reading-list-articles')[0];
    subject = new ReadingList(menu, articles);
  });

  afterEach(() => {
    sandbox.restore();
    removeFixtures();
    window.location.hash = '#';
  });

  it('throws an error if no menu element is given', () => {
    expect(() => {
      new ReadingList();
    }).to.throw('ReadingList(menu, articles): menu is undefined');
  });

  it('throws an error if no articles element is given', () => {
    expect(() => {
      new ReadingList(menu);
    }).to.throw('ReadingList(menu, articles): articles is undefined');
  });

  it('creates a ReadingListItem for each item element', () => {
    expect(subject.items).to.be.an('array');
    subject.items.forEach((item) => {
      expect(item).to.be.an.instanceof(ReadingListItem);
    });
  });

  it('has a currentItem', () => {
    expect(subject.currentItem).to.equal(subject.items[0]);
  });

  it('has an isFetchingItem flag', () => {
    expect(subject.isFetchingItem).to.equal(false);
  });

  describe('getReadingListElementPairs', () => {
    it('returns a list of menu and article element objects', () => {
      let menuItems = menu.getElementsByTagName('bulbs-reading-list-item');
      let articleItems = articles.getElementsByTagName('bulbs-reading-list-item');
      let pairs = subject.getReadingListElementPairs(menuItems, articleItems);
      expect(pairs[0].menuItem).to.equal(menu.children[0]);
      expect(pairs[0].article).to.equal(articles.children[0]);

      expect(pairs[1].menuItem).to.equal(menu.children[1]);
      expect(pairs[1].article).to.equal(articles.children[1]);

      expect(pairs[2].menuItem).to.equal(menu.children[2]);
      expect(pairs[2].article).to.equal(articles.children[2]);

      expect(pairs[3].menuItem).to.equal(menu.children[3]);
      expect(pairs[3].article).to.equal(articles.children[3]);
    });
  });

  describe('getArticleElementForMenuItemElement', () => {
    it('returns a function that closes over the articles variable, and returns an element object', () => {
      let iterator = subject.getArticleElementForMenuItemElement(articles.children);
      expect(iterator(menu.children[0])).to.eql({
        menuItem: menu.children[0],
        article: articles.children[0],
      });
    });
  });

  describe('createReadingListItem', () => {
    it('returns a ReadingListItem object for each element object', () => {
      let elements = {
        menuItem: menu.children[0],
        article: articles.children[0],
      };
      let index = 1;
      let readingListItem = subject.createReadingListItem(elements, index);
      expect(readingListItem.menuElement).to.equal(elements.menuItem);
    });
  });

  describe('findArticleElementForMenuItemElement', () => {
    it('throws an error if no article for the given menu item', () => {
      let mismatchedArticles = take(articles.children, 3);
      let mismatchedMenuItem = menu.children[3];
      expect(() => {
        subject.findArticleElementForMenuItemElement(mismatchedArticles, mismatchedMenuItem);
      }).to.throw(`ReadingList.findArticleElementForMenuItemElement(articles, menuItem): menu item element with data-id="${mismatchedMenuItem.dataset.id}" has no corresponding article`);
    });

    it('returns the article element matching the menu element data-id', () => {
      let menuItemElement = menu.children[3];
      let expectedArticleElement = articles.children[3];
      expect(subject.findArticleElementForMenuItemElement(articles.children, menuItemElement)).to.equal(expectedArticleElement);
    });
  });

  describe('itemAtIndex', () => {
    it('throws an error if no index is given', () => {
      expect(() => {
        subject.itemAtIndex();
      }).to.throw('ReadingList.itemAtIndex(index): index is undefined');
    });

    it('returns the list item with the given index', () => {
      let listItem = subject.itemAtIndex(1);
      expect(listItem.index).to.equal(1);
    });
  });

  describe('getListItemById', () => {
    it('throws an error if no id is provided', () => {
      expect(() => {
        subject.getListItemById();
      }).to.throw('ReadingList.getListItemById(id): id is undefined');
    });

    it('returns the item with the given id', () => {
      let item = subject.getListItemById('2');
      expect(item.id).to.equal('2');
    });
  });

  describe('setCurrentItem', () => {
    it('throws an error if no item is given', () => {
      expect(() => {
        subject.setCurrentItem();
      }).to.throw('ReadingList.setCurrentItem(item): item is undefined');
    });

    it('throws an error if the item does not exist in the list', () => {
      let menuElement = document.createElement('bulbs-reading-list-item');
      let articleElement = document.createElement('bulbs-reading-list-item');
      menuElement.dataset.id = '1';
      menuElement.dataset.href = 'test-url';
      menuElement.dataset.partialUrl = 'test-url?partial=true';
      menuElement.dataset.title = 'Test Article';
      articleElement.dataset.id = '1';
      articleElement.dataset.href = 'test-url';
      articleElement.dataset.title = 'Test Article';
      let foreignItem = new ReadingListItem(menuElement, articleElement, 0);
      expect(() => {
        subject.setCurrentItem(foreignItem);
      }).to.throw('ReadingList.setCurrentItem(item): item is not in reading list');
    });

    it('sets the item as current, and all others as not current', () => {
      let newCurrentItem = subject.items[2];
      subject.setCurrentItem(newCurrentItem);
      expect(subject.currentItem).to.equal(subject.itemAtIndex(2));
      expect(subject.itemAtIndex(0).isCurrent).to.equal(false);
      expect(subject.itemAtIndex(1).isCurrent).to.equal(false);
      expect(subject.itemAtIndex(2).isCurrent).to.equal(true);
      expect(subject.itemAtIndex(3).isCurrent).to.equal(false);
    });
  });

  describe('isNextItem', () => {
    it('throws an error if no list item is given', () => {
      expect(() => {
        subject.isNextItem();
      }).to.throw('ReadingList.isNextItem(listItem): listItem is undefined');
    });

    it('returns true if the given item is the next item', () => {
      subject.currentItem = subject.itemAtIndex(2);
      expect(subject.isNextItem(subject.itemAtIndex(3))).to.equal(true);
    });

    it('returns false if the given item is not the next item', () => {
      subject.currentItem = subject.itemAtIndex(2);
      expect(subject.isNextItem(subject.itemAtIndex(1))).to.equal(false);
      subject.currentItem = subject.itemAtIndex(1);
      expect(subject.isNextItem(subject.itemAtIndex(3))).to.equal(false);
    });
  });

  describe('nextItem', () => {
    it('returns the next item in the list', () => {
      subject.currentItem = subject.itemAtIndex(0);
      let nextItem = subject.itemAtIndex(1);
      expect(subject.nextItem()).to.equal(nextItem);
    });
  });

  describe('lastItem', () => {
    it('returns the item with the largest index', () => {
      expect(subject.lastItem()).to.equal(subject.itemAtIndex(3));
    });
  });

  describe('firstItem', () => {
    it('returns the item with the largest index', () => {
      expect(subject.firstItem()).to.equal(subject.itemAtIndex(0));
    });
  });

  describe('isAtTheEnd', () => {
    it('returns false when the current item is not the last', () => {
      subject.currentItem = subject.firstItem();
      expect(subject.isAtTheEnd()).to.equal(false);
    });

    it('returns true when the current item is the last item', () => {
      subject.currentItem = subject.lastItem();
      expect(subject.isAtTheEnd()).to.equal(true);
    });
  });

  describe('hasMoreItems', () => {
    it('returns true when the current item is not the last', () => {
      subject.currentItem = subject.firstItem();
      expect(subject.hasMoreItems()).to.equal(true);
    });

    it('returns false when the current item is the last item', () => {
      subject.currentItem = subject.lastItem();
      expect(subject.hasMoreItems()).to.equal(false);
    });
  });

  describe('hasPendingFetch', () => {
    it('returns true when there is an article in the list with a pending fetch', () => {
      let item = subject.itemAtIndex(0);
      item.fetchPending = true;
      expect(subject.hasPendingFetch()).to.equal(true);
    });
  });

  describe('shouldLoadNextItem', () => {
    let nextArticle;
    beforeEach(() => {
      nextArticle = subject.itemAtIndex(1);
    });

    it('returns false if the reading list has an article with a pending fetch', () => {
      sandbox.stub(subject, 'hasPendingFetch').returns(true);
      expect(subject.shouldLoadNextItem(nextArticle)).to.equal(false);
    });

    it('returns false when there is no next item', () => {
      sandbox.stub(nextArticle, 'isNearlyInView').returns(true);
      expect(subject.shouldLoadNextItem()).to.equal(false);
    });

    it('returns false if the nextItem is already loaded', () => {
      nextArticle.isLoaded = true;
      sandbox.stub(subject, 'hasPendingFetch').returns(false);
      sandbox.stub(nextArticle, 'isNearlyInView').returns(true);
      expect(subject.shouldLoadNextItem()).to.equal(false);
    });

    it('returns true when there are no pending fetches, and the item is not loaded', () => {
      nextArticle.isLoaded = false;
      sandbox.stub(subject, 'hasPendingFetch').returns(false);
      sandbox.stub(nextArticle, 'isNearlyInView').returns(true);
      expect(subject.shouldLoadNextItem(nextArticle)).to.equal(true);
    });
  });

  describe('loadNextItem', () => {
    let nextItem;
    beforeEach(() => {
      nextItem = subject.itemAtIndex(1);
      sandbox.stub(subject, 'nextItem').returns(nextItem);
    });

    it('loads the next item', () => {
      sandbox.stub(subject, 'loadItem');
      subject.loadNextItem();
      expect(subject.loadItem).to.have.been.calledWith(nextItem);
    });

    it('returns the promise', () => {
      expect(subject.loadNextItem()).to.be.an.instanceof(Promise);
    });
  });

  describe('loadItem', () => {
    let item;
    beforeEach(() => {
      item = subject.itemAtIndex(1);
      sandbox.stub(item, 'loadContent').returns(Promise.resolve(item));
    });

    it('requires an item', () => {
      expect(() => subject.loadItem()).to.throw('ReadingList.loadItem(item): item is undefined');
    });

    it('sets the isFetchingItem flag to true', () => {
      subject.loadItem(item);
      expect(subject.isFetchingItem).to.equal(true);
    });

    it('loads the content of the item', () => {
      subject.loadItem(item);
      expect(item.loadContent).to.have.been.called;
    });

    it('returns a promise', () => {
      expect(subject.loadItem(item)).to.be.an.instanceof(Promise);
    });

    it('sets the isFetchingItem flag to false when complete', () => {
      sandbox.stub(subject, 'handleLoadArticleComplete');
      subject.loadItem(item);
      expect(subject.isFetchingItem).to.equal(true);
    });
  });

  describe('navigateToItem', () => {
    let item;
    beforeEach(() => {
      sandbox.stub(subject, 'updateItemProgress');
      item = subject.itemAtIndex(1);
    });

    it('sets the given item as current', () => {
      subject.navigateToItem(item);
      expect(subject.currentItem).to.equal(item);
      expect(item.isCurrent).to.equal(true);
    });

    it('scrolls the article into view', () => {
      sandbox.stub(item, 'scrollIntoView');
      subject.navigateToItem(item);
      expect(item.scrollIntoView).to.have.been.called;
    });

    it('sets the push state to the scrubbed article url', () => {
      subject.navigateToItem(item);
      expect(window.location.href).to.match(new RegExp(item.href));
      expect(window.location.href).to.not.match(/partial=true/);
    });
  });

  describe('redirectToItem', () => {
    it('redirects to the scrubbed url of the given item', () => {
      let item = subject.itemAtIndex(3);
      subject.redirectToItem(item);
      expect(window.location.href).to.match(new RegExp(item.href));
      expect(window.location.href).to.not.match(/partial=true/);
    });
  });

  describe('isMoreThanOneAhead', () => {
    it('returns false when the given item is the current item', () => {
      let item = subject.currentItem;
      expect(subject.isMoreThanOneAhead(item)).to.equal(false);
    });

    it('returns false if the given item is before the current item', () => {
      subject.currentItem = subject.itemAtIndex(2);
      let item = subject.itemAtIndex(1);
      expect(subject.isMoreThanOneAhead(item)).to.equal(false);
    });

    it('returns true if the given item is more than one ahead', () => {
      subject.currentItem = subject.itemAtIndex(0);
      let item = subject.itemAtIndex(2);
      expect(subject.isMoreThanOneAhead(item)).to.equal(true);
    });
  });
});
