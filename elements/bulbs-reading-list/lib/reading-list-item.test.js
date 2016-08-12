/* eslint no-new: 0, max-len: 0 */
import '../components/bulbs-reading-list-item';
import ReadingListItem from './reading-list-item';

describe('ReadingListItem', () => {
  let sandbox;
  let subject;

  beforeEach(() => {
    let element;
    sandbox = sinon.sandbox.create();
    element = document.createElement('bulbs-reading-list-item');
    element.id = 'test-article';
    element.dataset.href = 'test-url';
    element.dataset.title = 'Test Article';
    subject = new ReadingListItem(element, 0);
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('throws an error when no element is provided', () => {
    expect(() => {
      new ReadingListItem();
    }).to.throw('ReadingListItem(element, position): element is undefined');
  });

  it('throws an error if no position is given', () => {
    expect(() => {
      let element = document.createElement('bulbs-reading-list-item');
      element.id = 'an-id';
      element.dataset.href = 'a-url';
      element.dataset.title = 'Test Article';
      new ReadingListItem(element);
    }).to.throw('ReadingListItem(element, position): position is undefined');
  });

  it('throws an error if the position is not a number', () => {
    expect(() => {
      let element = document.createElement('bulbs-reading-list-item');
      element.id = 'an-id';
      element.dataset.href = 'a-url';
      element.dataset.title = 'Test Article';
      new ReadingListItem(element, 'string');
    }).to.throw('ReadingListItem(element, position): position is not a number');
  });

  it('throws an error if the element has no id', () => {
    expect(() => {
      let element = document.createElement('div');
      new ReadingListItem(element);
    }).to.throw('ReadingListItem(element, position): element has no id');
  });

  it('throws an error if the element has no data-href', () => {
    expect(() => {
      let element = document.createElement('div');
      element.id = 'an-id';
      element.dataset.title = 'a title';
      new ReadingListItem(element);
    }).to.throw('ReadingListItem(element, position): element has no data-href');
  });

  it('throws an error if the element has no data-title', () => {
    expect(() => {
      let element = document.createElement('div');
      element.id = 'an-id';
      element.dataset.href = 'a-url';
      new ReadingListItem(element);
    }).to.throw('ReadingListItem(element, position): element has no data-title');
  });

  it('throws an error if the element is not a reading list item', () => {
    let element = document.createElement('div');
    element.id = 'an-id';
    element.dataset.href = 'a-url';
    element.dataset.title = 'Test Article';
    expect(() => {
      new ReadingListItem(element);
    }).to.throw('ReadingListItem(element, position): element must be a bulbs-reading-list-item or have a reading-list-item class');
  });

  it('has an id', () => {
    expect(subject.id).to.equal('test-article');
  });

  it('has an href', () => {
    expect(subject.href).to.equal('test-url');
  });

  it('has a title', () => {
    expect(subject.title).to.equal('Test Article');
  });

  it('saves a reference to the element', () => {
    expect(subject.element).to.be.an.instanceof(HTMLElement);
  });

  it('has a position', () => {
    expect(subject.position).to.equal(0);
  });

  describe('elementIsReadingListItem', () => {
    it('throws an error if no element is given', () => {
      expect(() => {
        subject.elementIsReadingListItem();
      }).to.throw('ReadingListItem.elementIsReadingListItem(element, position): element is undefined');
    });

    it('returns false if the given element is not a bulbs-reading-list-item', () => {
      let element = document.createElement('div');
      element.id = 'an-id';
      element.dataset.href = 'a-url';
      element.dataset.title = 'Test Article';
      expect(subject.elementIsReadingListItem(element)).to.equal(false);
    });

    it('returns false if the given element does not have a reading-list-item class', () => {
      let element = document.createElement('div');
      element.id = 'an-id';
      element.dataset.href = 'a-url';
      element.dataset.title = 'Test Article';
      expect(subject.elementIsReadingListItem(element)).to.equal(false);
    });

    it('returns true if the given element is a bulbs-reading-list-item', () => {
      let element = document.createElement('bulbs-reading-list-item');
      element.id = 'an-id';
      element.dataset.href = 'a-url';
      element.dataset.title = 'Test Article';
      expect(subject.elementIsReadingListItem(element)).to.equal(true);
    });

    it('returns true if the given element has a reading-list-item class', () => {
      let element = document.createElement('div');
      element.id = 'an-id';
      element.classList.add('reading-list-item');
      element.dataset.href = 'a-url';
      element.dataset.title = 'Test Article';
      expect(subject.elementIsReadingListItem(element)).to.equal(true);
    });
  });

  describe('isCurrent', () => {
    it('returns true when the element has a current class', () => {
      subject.element.classList.add('current');
      expect(subject.isCurrent()).to.equal(true);
    });

    it('returns false when the element does not have a current class', () => {
      expect(subject.isCurrent()).to.equal(false);
    });
  });

  describe('setAsCurrent', () => {
    it('adds the current class to the element', () => {
      subject.setAsCurrent();
      expect(subject.element.classList.contains('current')).to.equal(true);
    });
  });

  describe('setAsNotCurrent', () => {
    it('removes the current class on the element', () => {
      subject.element.classList.add('current');
      subject.setAsNotCurrent();
      expect(subject.element.classList.contains('current')).to.equal(false);
    });
  });
});
