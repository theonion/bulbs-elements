/* eslint no-new: 0 */
import '../components/bulbs-reading-list-item';
import '../components/bulbs-reading-list-items';
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
});
