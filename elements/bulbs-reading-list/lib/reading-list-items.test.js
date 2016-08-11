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

  it('has a currentListItem', () => {
    expect(subject.currentListItem).to.equal(subject.readingListItems[0]);
  });

  describe('listItemAtPosition', () => {
    it('throws an error if no position is given', () => {
      expect(() => {
        subject.listItemAtPosition();
      }).to.throw('ReadingListItems.listItemAtPosition(position): position is undefined');
    });

    it('returns the list item with the given position', () => {
      let listItem = subject.listItemAtPosition(1);
      expect(listItem.position).to.equal(1);
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

  describe('setCurrentListItemByAttribute', () => {
    it('throws an error if no attribute is provided', () => {
      expect(() => {
        subject.setCurrentListItemByAttribute();
      }).to.throw('ReadingListItems.setCurrentListItemByAttribute(attribute, value): attribute is undefined');
    });

    it('throws an error if no value is provided', () => {
      expect(() => {
        subject.setCurrentListItemByAttribute('position');
      }).to.throw('ReadingListItems.setCurrentListItemByAttribute(attribute, value): value is undefined');
    });

    it('sets the current item to the item with the given attribute value', () => {
      subject.currentListItem = subject.readingListItems[0];
      subject.setCurrentListItemByAttribute('position', 2);
      expect(subject.currentListItem.position).to.equal(2);
    });

    it('sets the item as current', () => {
      subject.currentListItem = subject.readingListItems[0];
      subject.setCurrentListItemByAttribute('position', 2);
      expect(subject.currentListItem.isCurrent()).to.equal(true);
    });

    it('sets other items as NOT current', () => {
      subject.readingListItems.forEach((i) => i.setAsCurrent());
      subject.currentListItem = subject.readingListItems[0];
      subject.setCurrentListItemByAttribute('position', 2);
      expect(subject.listItemAtPosition(0).isCurrent()).to.equal(false);
      expect(subject.listItemAtPosition(1).isCurrent()).to.equal(false);
      expect(subject.listItemAtPosition(2).isCurrent()).to.equal(true);
      expect(subject.listItemAtPosition(3).isCurrent()).to.equal(false);
    });
  });

  describe('setCurrentListItemByPosition', () => {
    it('throws an error if no position is provided', () => {
      expect(() => {
        subject.setCurrentListItemByPosition();
      }).to.throw('ReadingListItems.setCurrentListItemByPosition(position): position is undefined');
    });

    it('throws an error if no list item exists with the position', () => {
      expect(() => {
        subject.setCurrentListItemByPosition(99);
      }).to.throw('ReadingListItems.setCurrentListItemByPosition(position): no item with the position value of 99');
    });

    it('sets the current item to the item with the given position', () => {
      subject.currentListItem = subject.readingListItems[0];
      subject.setCurrentListItemByPosition(2);
      expect(subject.currentListItem.position).to.equal(2);
    });

    it('sets the item as current', () => {
      subject.currentListItem = subject.readingListItems[0];
      subject.setCurrentListItemByPosition(2);
      expect(subject.currentListItem.isCurrent()).to.equal(true);
    });

    it('sets other items as NOT current', () => {
      subject.readingListItems.forEach((i) => i.setAsCurrent());
      subject.currentListItem = subject.readingListItems[0];
      subject.setCurrentListItemByPosition(2);
      expect(subject.listItemAtPosition(0).isCurrent()).to.equal(false);
      expect(subject.listItemAtPosition(1).isCurrent()).to.equal(false);
      expect(subject.listItemAtPosition(2).isCurrent()).to.equal(true);
      expect(subject.listItemAtPosition(3).isCurrent()).to.equal(false);
    });
  });

  describe('setCurrentListItemById', () => {
    it('throws an error if no position is provided', () => {
      expect(() => {
        subject.setCurrentListItemById();
      }).to.throw('ReadingListItems.setCurrentListItemById(id): id is undefined');
    });

    it('throws an error if no list item exists with the id', () => {
      expect(() => {
        subject.setCurrentListItemById('non-existent-id');
      }).to.throw('ReadingListItems.setCurrentListItemById(id): no item with the id value of "non-existent-id"');
    });

    it('sets the current item to the item with the given id', () => {
      subject.currentListItem = subject.readingListItems[0];
      subject.setCurrentListItemById('test-article-2');
      expect(subject.currentListItem.id).to.equal('test-article-2');
    });
  });

  describe('isNextListItem', () => {
    it('throws an error if no list item is given', () => {
      expect(() => {
        subject.isNextListItem();
      }).to.throw('ReadingListItems.isNextListItem(listItem): listItem is undefined');
    });

    it('returns true if the given item is the next item', () => {
      subject.currentListItem = subject.listItemAtPosition(2);
      expect(subject.isNextListItem(subject.listItemAtPosition(3))).to.equal(true);
    });

    it('returns false if the given item is not the next item', () => {
      subject.currentListItem = subject.listItemAtPosition(2);
      expect(subject.isNextListItem(subject.listItemAtPosition(1))).to.equal(false);
      subject.currentListItem = subject.listItemAtPosition(1);
      expect(subject.isNextListItem(subject.listItemAtPosition(3))).to.equal(false);
    });
  });

  describe('isBeforeCurrentItem', () => {
    it('throws an error if no list item is given', () => {
      expect(() => {
        subject.isBeforeCurrentItem();
      }).to.throw('BulbsReadingList.isBeforeCurrentItem(listItem): listItem is undefined');
    });

    it('returns true if the item is before the given item', () => {
      subject.currentListItem = subject.listItemAtPosition(3);
      expect(subject.isBeforeCurrentItem(subject.listItemAtPosition(2))).to.equal(true);
      expect(subject.isBeforeCurrentItem(subject.listItemAtPosition(1))).to.equal(true);
      expect(subject.isBeforeCurrentItem(subject.listItemAtPosition(0))).to.equal(true);
    });

    it('returns false if the item is after the given item', () => {
      subject.currentListItem = subject.listItemAtPosition(0);
      expect(subject.isBeforeCurrentItem(subject.listItemAtPosition(1))).to.equal(false);
      expect(subject.isBeforeCurrentItem(subject.listItemAtPosition(2))).to.equal(false);
      expect(subject.isBeforeCurrentItem(subject.listItemAtPosition(3))).to.equal(false);
    });
  });
});
