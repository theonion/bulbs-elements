/* eslint no-new: 0 */
import '../components/bulbs-reading-list-item';
import ReadingItemList from './reading-item-list';
import ReadingListItem from './reading-list-item';
import { take } from 'lodash';

describe('ReadingItemList', () => {
  let subject;
  let menu;
  let articles;
  let sandbox;

  beforeEach(() => {
    sandbox = sinon.sandbox.create();
    fixture.load('bulbs-reading-list.html');
    menu = fixture.el.getElementsByTagName('bulbs-reading-list-menu')[0];
    articles = fixture.el.getElementsByTagName('bulbs-reading-list-articles')[0];
    subject = new ReadingItemList(menu, articles);
  });

  it('throws an error if no menu element is given', () => {
    expect(() => {
      new ReadingItemList();
    }).to.throw('ReadingItemList(menu, articles): menu is undefined');
  });

  it('throws an error if no articles element is given', () => {
    expect(() => {
      new ReadingItemList(menu);
    }).to.throw('ReadingItemList(menu, articles): articles is undefined');
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

  it('has an isFetchingNextArticle flag', () => {
    expect(subject.isFetchingNextArticle).to.equal(false);
  });

  describe('getReadingListElementPairs', () => {
    it('returns a list of menu and article element objects', () => {
      let pairs = subject.getReadingListElementPairs(menu, articles);
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
      }).to.throw(`ReadingItemList.findArticleElementForMenuItemElement(articles, menuItem): menu item element with data-id="${mismatchedMenuItem.dataset.id}" has no corresponding article`);
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
      }).to.throw('ReadingItemList.itemAtIndex(index): index is undefined');
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
      }).to.throw('ReadingItemList.getListItemById(id): id is undefined');
    });

    it('returns the item with the given id', () => {
      let item = subject.getListItemById('2');
      expect(item.id).to.equal('2');
    });
  });

  describe('setCurrentItemByAttribute', () => {
    it('throws an error if no attribute is provided', () => {
      expect(() => {
        subject.setCurrentItemByAttribute();
      }).to.throw('ReadingItemList.setCurrentItemByAttribute(attribute, value): attribute is undefined');
    });

    it('throws an error if no value is provided', () => {
      expect(() => {
        subject.setCurrentItemByAttribute('index');
      }).to.throw('ReadingItemList.setCurrentItemByAttribute(attribute, value): value is undefined');
    });

    it('sets the current item to the item with the given attribute value', () => {
      subject.currentItem = subject.items[0];
      subject.setCurrentItemByAttribute('index', 2);
      expect(subject.currentItem.index).to.equal(2);
    });
  });

  describe('setCurrentItem', () => {
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

  describe('setCurrentItemByIndex', () => {
    it('throws an error if no index is provided', () => {
      expect(() => {
        subject.setCurrentItemByIndex();
      }).to.throw('ReadingItemList.setCurrentItemByIndex(index): index is undefined');
    });

    it('throws an error if no list item exists with the index', () => {
      expect(() => {
        subject.setCurrentItemByIndex(99);
      }).to.throw('ReadingItemList.setCurrentItemByIndex(index): no item with the index value of 99');
    });

    it('sets the current item to the item with the given index', () => {
      subject.currentItem = subject.items[0];
      subject.setCurrentItemByIndex(2);
      expect(subject.currentItem.index).to.equal(2);
    });

    it('sets the item as current', () => {
      subject.currentItem = subject.items[0];
      subject.setCurrentItemByIndex(2);
      expect(subject.currentItem.isCurrent).to.equal(true);
    });

    it('sets other items as NOT current', () => {
      subject.items.forEach((i) => i.setAsCurrent());
      subject.currentItem = subject.items[0];
      subject.setCurrentItemByIndex(2);
      expect(subject.itemAtIndex(0).isCurrent).to.equal(false);
      expect(subject.itemAtIndex(1).isCurrent).to.equal(false);
      expect(subject.itemAtIndex(2).isCurrent).to.equal(true);
      expect(subject.itemAtIndex(3).isCurrent).to.equal(false);
    });
  });

  describe('setCurrentItemById', () => {
    it('throws an error if no index is provided', () => {
      expect(() => {
        subject.setCurrentItemById();
      }).to.throw('ReadingItemList.setCurrentItemById(id): id is undefined');
    });

    it('throws an error if no list item exists with the id', () => {
      expect(() => {
        subject.setCurrentItemById('non-existent-id');
      }).to.throw('ReadingItemList.setCurrentItemById(id): no item with the id value of "non-existent-id"');
    });

    it('sets the current item to the item with the given id', () => {
      subject.currentItem = subject.items[0];
      subject.setCurrentItemById('2');
      expect(subject.currentItem.id).to.equal('2');
    });
  });

  describe('isNextItem', () => {
    it('throws an error if no list item is given', () => {
      expect(() => {
        subject.isNextItem();
      }).to.throw('ReadingItemList.isNextItem(listItem): listItem is undefined');
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

  describe('isBeforeCurrentItem', () => {
    it('throws an error if no list item is given', () => {
      expect(() => {
        subject.isBeforeCurrentItem();
      }).to.throw('BulbsReadingList.isBeforeCurrentItem(listItem): listItem is undefined');
    });

    it('returns true if the item is before the given item', () => {
      subject.currentItem = subject.itemAtIndex(3);
      expect(subject.isBeforeCurrentItem(subject.itemAtIndex(2))).to.equal(true);
      expect(subject.isBeforeCurrentItem(subject.itemAtIndex(1))).to.equal(true);
      expect(subject.isBeforeCurrentItem(subject.itemAtIndex(0))).to.equal(true);
    });

    it('returns false if the item is after the given item', () => {
      subject.currentItem = subject.itemAtIndex(0);
      expect(subject.isBeforeCurrentItem(subject.itemAtIndex(1))).to.equal(false);
      expect(subject.isBeforeCurrentItem(subject.itemAtIndex(2))).to.equal(false);
      expect(subject.isBeforeCurrentItem(subject.itemAtIndex(3))).to.equal(false);
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

  describe('shouldLoadNextArticle', () => {
    let nextArticle;
    beforeEach(() => {
      nextArticle = subject.itemAtIndex(1);
    });

    it('returns false if the reading list has an article with a pending fetch', () => {
      sandbox.stub(subject, 'hasPendingFetch').returns(true);
      expect(subject.shouldLoadNextArticle(nextArticle)).to.equal(false);
    });

    it('returns true when the next article is within the viewport threshold', () => {
      sandbox.stub(nextArticle, 'isWithinViewThreshold').returns(true);
      expect(subject.shouldLoadNextArticle(nextArticle)).to.equal(true);
    });

    it('returns false when there is no next item', () => {
      sandbox.stub(nextArticle, 'isWithinViewThreshold').returns(true);
      expect(subject.shouldLoadNextArticle()).to.equal(false);
    });

    it('returns false when the next item is not within the view threshold', () => {
      sandbox.stub(nextArticle, 'isWithinViewThreshold').returns(false);
      expect(subject.shouldLoadNextArticle(nextArticle)).to.equal(false);
    });
  });

  describe('loadNextArticle', () => {
    context('when there is a next item', () => {
      let nextArticle;
      beforeEach(() => {
        nextArticle = subject.itemAtIndex(1);
        sandbox.stub(nextArticle, 'loadContent').returns(Promise.resolve(nextArticle));
        sandbox.stub(subject, 'nextItem').returns(nextArticle);
      });

      it('sets the isFetchingNextArticle flag to true', () => {
        sandbox.stub(subject, 'handleLoadNextArticleComplete');
        subject.loadNextArticle();
        expect(subject.isFetchingNextArticle).to.equal(true);
      });

      it('does nothing if the article is not within the view threshold', () => {
        sandbox.stub(nextArticle, 'isWithinViewThreshold').returns(false);
        subject.loadNextArticle();
        expect(nextArticle.loadContent).to.not.have.been.called;
      });

      it('loads the article if within view threshold', () => {
        sandbox.stub(nextArticle, 'isWithinViewThreshold').returns(true);
        subject.loadNextArticle();
        expect(nextArticle.loadContent).to.have.been.called;
      });
    });

    context('when the content should not be loaded', () => {
      it('sets the isFetchingNextArticle flag to false', () => {
        sandbox.stub(subject, 'shouldLoadNextArticle').returns(false);
        subject.loadNextArticle();
        expect(subject.isFetchingNextArticle).to.equal(false);
      });
    });
  });

  describe('handleLoadNextArticleComplete', () => {
    let article;
    beforeEach(() => {
      article = subject.itemAtIndex(2);
    });

    it('sets the current readingItemList item by id', () => {
      subject.handleLoadNextArticleComplete(article);
      expect(subject.currentItem).to.equal(article);
    });

    it('sets the isFetchingNextArticle flag to false', () => {
      subject.isFetchingNextArticle = true;
      subject.handleLoadNextArticleComplete(article);
      expect(subject.isFetchingNextArticle).to.equal(false);
    });
  });
});
