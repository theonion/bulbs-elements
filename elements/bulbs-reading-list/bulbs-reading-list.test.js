import { assert } from 'chai';
import { first } from 'lodash'
import BulbsReadingList from './bulbs-reading-list';

describe('<bulbs-reading-list>', () => {
  let subject;
  let readingListMenu;
  let readingListItemElements;
  let sandbox;

  beforeEach(function () {
    sandbox = sinon.sandbox.create();
    fixture.load('bulbs-reading-list.html');
    subject = fixture.el.firstChild;
    readingListMenu = subject.getElementsByTagName('bulbs-reading-list-menu')[0];
    readingListItemElements = subject.getElementsByTagName('bulbs-reading-list-item');
  });

  it('renders an <bulbs-reading-list>', () => {
    expect(subject.tagName.toLowerCase()).to.equal('bulbs-reading-list');
  });

  it('saves a reference to the reading list menu', () => {
    expect(subject.readingListMenu).to.equal(readingListMenu);
  });

  it('saves a reference to the reading list elements', () => {
    expect(subject.readingListItemElements).to.eql(readingListItemElements);
  });

  it('sets the current list item', () => {
    expect(subject.currentListItem).to.equal(subject.readingListItems[0]);
  });

  describe('isInsideReadingListMenu', () => {
    it('throws an error if no element is given', () => {
      expect(() => {
        subject.isInsideReadingListMenu();
      }).to.throw('BulbsReadingList.isInsideReadingListMenu(element): element is undefined');
    });

    it('determines if the given element is inside the reading list', () => {
      expect(subject.isInsideReadingListMenu(readingListItemElements[0])).to.equal(true);
      expect(subject.isInsideReadingListMenu(fixture.el)).to.equal(false);
    });
  });

  describe('buildReadingListItemsFromElements', () => {
    it('throws an error if no elements are given', () => {
      expect(() => {
        subject.buildReadingListItemsFromElements();
      }).to.throw('BulbsReadingList.buildReadingListItemsFromElements(elements): elements is undefined');
    });

    it('throws an error if the given elements do not have an id', () => {
      let element = document.createElement('div');
      let elements = [element];
      expect(() => {
        subject.buildReadingListItemsFromElements(elements);
      }).to.throw(`BulbsReadingList.buildReadingListItemsFromElements(elements): element has no id ${element}`);
    });

    it('throws an error if the given elements do not have a data-href attribute', () => {
      let element = document.createElement('div');
      element.id = 'an-id';
      let elements = [element];
      expect(() => {
        subject.buildReadingListItemsFromElements(elements);
      }).to.throw(`BulbsReadingList.buildReadingListItemsFromElements(elements): element has no data-href ${element}`);
    });

    it('throws an error if the given elements do not have a data-title attribute', () => {
      let element = document.createElement('div');
      element.id = 'an-id';
      element.dataset.href = 'some-url';
      let elements = [element];
      expect(() => {
        subject.buildReadingListItemsFromElements(elements);
      }).to.throw(`BulbsReadingList.buildReadingListItemsFromElements(elements): element has no data-title ${element}`);
    });

    it('creates an array of reading list item objects', () => {
      subject.readingListItems.forEach((listItem) => {
        expect(listItem).to.be.an('object');
        expect(listItem.id).to.be.a('string');
        expect(listItem.position).to.be.a('number');
        expect(listItem.href).to.be.a('string');
        expect(listItem.title).to.be.a('string');
        expect(listItem.element).to.be.an.instanceof(HTMLElement);
      });

      let element = readingListItemElements[0];
      let item = subject.readingListItems[0];

      expect(item.title).to.equal(element.dataset.title);
      expect(item.href).to.equal(element.dataset.href);
      expect(item.position).to.equal(0);
      expect(item.element).to.equal(element);
    });
  });

  describe('listItemAtPosition', () => {
    it('throws an error if no position is given', () => {
      expect(() => {
        subject.listItemAtPosition();
      }).to.throw('BulbsReadingList.listItemAtPosition(position): position is undefined');
    });

    it('sets the current list item by a given position', () => {
      let listItem = subject.listItemAtPosition(2);
      expect(listItem).to.equal(subject.readingListItems[2]);
    });
  });

  describe('isNextListItem', () => {
    it('throws an error if no list item is given', () => {
      expect(() => {
        subject.isNextListItem();
      }).to.throw('BulbsReadingList.isNextListItem(listItem): listItem is undefined');
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

  describe('getListItemById', () => {
    it('throws an error if there is no id given', () => {
      expect(() => {
        subject.getListItemById();
      }).to.throw('BulbsReadingList.getListItemById(id): id is undefined');
    });

    it('returns the list item with the given id', () => {
      let item = subject.listItemAtPosition(0);
      expect(subject.getListItemById('test-article-1')).to.equal(item);
    });
  });
});
