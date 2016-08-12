import './bulbs-reading-list';
import ReadingListItems from './lib/reading-list-items';
import ReadingListArticles from 'reading-list-articles';

describe('<bulbs-reading-list>', () => {
  let subject;
  let sandbox;

  beforeEach(() => {
    sandbox = sinon.sandbox.create();
    fixture.load('bulbs-reading-list.html');
    subject = fixture.el.firstChild;
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('renders an <bulbs-reading-list>', () => {
    expect(subject.tagName.toLowerCase()).to.equal('bulbs-reading-list');
  });

  it('has a reading list menu', () => {
    expect(subject.readingListMenu).to.be.an.instanceof(ReadingListItems);
  });

  it('has an article list', () => {
    expect(subject.articleList).to.be.an.instanceof(ReadingListArticles);
  });

  it('has a lastKnownScrollPosition', () => {
    expect(subject.lastKnownScrollPosition).to.equal(0);
  });

  it('has an scrollCalculationIsIdle flag', () => {
    expect(subject.scrollCalculationIsIdle).to.equal(true);
  });

  describe('handleMenuItemClick', () => {
    let eventStub;

    beforeEach(() => {
      eventStub = {
        target: document.createElement('a'),
        preventDefault: sandbox.spy(),
      };
    });

    it('does not prevent default behavior if the clicked element is not in the menu', () => {
      subject.handleMenuItemClick(eventStub);
      expect(eventStub.preventDefault).to.not.have.been.called;
    });

    it('prevents the default behavior if the target is inside a bulbs-reading-list-item', () => {
      let itemElement = subject.readingListMenu.listItemAtPosition(0).element;
      eventStub.target = itemElement.getElementsByTagName('a')[0];
      subject.handleMenuItemClick(eventStub);
      expect(eventStub.preventDefault).to.have.been.called;
    });

    it('sets the clicked item as current', () => {
      let item = subject.readingListMenu.listItemAtPosition(1);
      let itemElement = item.element;
      eventStub.target = itemElement.getElementsByTagName('a')[0];
      subject.handleMenuItemClick(eventStub);
      expect(item.isCurrent()).to.equal(true);
    });
  });

  describe('elementIsInsideMenu', () => {
    it('throws an error when no element is given', () => {
      expect(() => {
        subject.elementIsInsideMenu();
      }).to.throw('BulbsReadingList.elementIsInsideMenu(element): element is undefined');
    });

    it('returns false if the given element is not inside the menu', () => {
      let element = document.createElement('a');
      document.body.appendChild(element);
      expect(subject.elementIsInsideMenu(element)).to.equal(false);
    });

    it('returns true when the given element is inside the menu', () => {
      let element = subject.readingListMenu.listItemAtPosition(0).element;
      expect(subject.elementIsInsideMenu(element)).to.equal(true);
    });
  });

  describe('getClickedMenuItem', () => {
    it('returns the list item that was clicked', () => {
      let item = subject.readingListMenu.listItemAtPosition(1);
      let itemElement = item.element;
      let el = itemElement.getElementsByTagName('a')[0];

      expect(subject.getClickedMenuItem(el)).to.equal(item);
    });
  });

  describe('handleDocumentScrolled', () => {
  });
});
