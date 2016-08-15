/* eslint no-new: 0 */
import '../components/bulbs-reading-list-item';
import ReadingListItems from './reading-list-items';
import ReadingListItem from './reading-list-item';

describe('ReadingListItems', () => {
  let subject;
  let element;

  beforeEach(() => {
    fixture.load('reading-list-items.html');
    element = fixture.el.firstChild;
    subject = new ReadingListItems(element);
  });

  it('throws an error if no element is given', () => {
    expect(() => {
      new ReadingListItems();
    }).to.throw('ReadingListItems(element): element is undefined');
  });

  it('saves a reference to the element', () => {
    expect(subject.element).to.equal(element);
  });

  it('saves a reference to the reading list item elements', () => {
    subject.readingListItemElements.forEach((el) => {
      expect(el).to.be.an.instanceof(HTMLElement);
    });
  });

  it('creates a ReadingListItem for each item element', () => {
    expect(subject.readingListItems).to.be.an('array');
    subject.readingListItems.forEach((item) => {
      expect(item).to.be.an.instanceof(ReadingListItem);
    });
  });

  it('has a currentItem', () => {
    expect(subject.currentItem).to.equal(subject.readingListItems[0]);
  });

  describe('itemAtIndex', () => {
    it('throws an error if no index is given', () => {
      expect(() => {
        subject.itemAtIndex();
      }).to.throw('ReadingListItems.itemAtIndex(index): index is undefined');
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
      }).to.throw('ReadingListItems.getListItemById(id): id is undefined');
    });

    it('returns the item with the given id', () => {
      let item = subject.getListItemById('test-article-2');
      expect(item.id).to.equal('test-article-2');
    });
  });

  describe('setCurrentItemByAttribute', () => {
    it('throws an error if no attribute is provided', () => {
      expect(() => {
        subject.setCurrentItemByAttribute();
      }).to.throw('ReadingListItems.setCurrentItemByAttribute(attribute, value): attribute is undefined');
    });

    it('throws an error if no value is provided', () => {
      expect(() => {
        subject.setCurrentItemByAttribute('index');
      }).to.throw('ReadingListItems.setCurrentItemByAttribute(attribute, value): value is undefined');
    });

    it('sets the current item to the item with the given attribute value', () => {
      subject.currentItem = subject.readingListItems[0];
      subject.setCurrentItemByAttribute('index', 2);
      expect(subject.currentItem.index).to.equal(2);
    });

    it('sets the item as current', () => {
      subject.currentItem = subject.readingListItems[0];
      subject.setCurrentItemByAttribute('index', 2);
      expect(subject.currentItem.isCurrent()).to.equal(true);
    });

    it('sets other items as NOT current', () => {
      subject.readingListItems.forEach((i) => i.setAsCurrent());
      subject.currentItem = subject.readingListItems[0];
      subject.setCurrentItemByAttribute('index', 2);
      expect(subject.itemAtIndex(0).isCurrent()).to.equal(false);
      expect(subject.itemAtIndex(1).isCurrent()).to.equal(false);
      expect(subject.itemAtIndex(2).isCurrent()).to.equal(true);
      expect(subject.itemAtIndex(3).isCurrent()).to.equal(false);
    });
  });

  describe('setCurrentItemByIndex', () => {
    it('throws an error if no index is provided', () => {
      expect(() => {
        subject.setCurrentItemByIndex();
      }).to.throw('ReadingListItems.setCurrentItemByIndex(index): index is undefined');
    });

    it('throws an error if no list item exists with the index', () => {
      expect(() => {
        subject.setCurrentItemByIndex(99);
      }).to.throw('ReadingListItems.setCurrentItemByIndex(index): no item with the index value of 99');
    });

    it('sets the current item to the item with the given index', () => {
      subject.currentItem = subject.readingListItems[0];
      subject.setCurrentItemByIndex(2);
      expect(subject.currentItem.index).to.equal(2);
    });

    it('sets the item as current', () => {
      subject.currentItem = subject.readingListItems[0];
      subject.setCurrentItemByIndex(2);
      expect(subject.currentItem.isCurrent()).to.equal(true);
    });

    it('sets other items as NOT current', () => {
      subject.readingListItems.forEach((i) => i.setAsCurrent());
      subject.currentItem = subject.readingListItems[0];
      subject.setCurrentItemByIndex(2);
      expect(subject.itemAtIndex(0).isCurrent()).to.equal(false);
      expect(subject.itemAtIndex(1).isCurrent()).to.equal(false);
      expect(subject.itemAtIndex(2).isCurrent()).to.equal(true);
      expect(subject.itemAtIndex(3).isCurrent()).to.equal(false);
    });
  });

  describe('setCurrentItemById', () => {
    it('throws an error if no index is provided', () => {
      expect(() => {
        subject.setCurrentItemById();
      }).to.throw('ReadingListItems.setCurrentItemById(id): id is undefined');
    });

    it('throws an error if no list item exists with the id', () => {
      expect(() => {
        subject.setCurrentItemById('non-existent-id');
      }).to.throw('ReadingListItems.setCurrentItemById(id): no item with the id value of "non-existent-id"');
    });

    it('sets the current item to the item with the given id', () => {
      subject.currentItem = subject.readingListItems[0];
      subject.setCurrentItemById('test-article-2');
      expect(subject.currentItem.id).to.equal('test-article-2');
    });
  });

  describe('isNextItem', () => {
    it('throws an error if no list item is given', () => {
      expect(() => {
        subject.isNextItem();
      }).to.throw('ReadingListItems.isNextItem(listItem): listItem is undefined');
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
});
