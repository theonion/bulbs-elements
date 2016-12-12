/* eslint no-new: 0*/
import { createElement, appendFixtureContainer } from 'bulbs-elements/test/fixtures';
import '../components/bulbs-reading-list-menu';
import '../components/bulbs-reading-list-item';
import '../components/bulbs-reading-list-articles';
import EventEmitter from 'events';
import ReadingListMenu from './reading-list-menu';
import ReadingListMenuItem from './reading-list-menu-item';

describe('ReadingListMenu', () => {
  let subject;
  let menuElement;
  let menuContainer;
  let dispatcher;
  let fixtures;
  let itemElement;
  let readingListId;
  let articlesElement;

  beforeEach(() => {
    readingListId = 1;
    fixtures = appendFixtureContainer();
    dispatcher = new EventEmitter();
    articlesElement = createElement('bulbs-reading-list-articles', {
      'reading-list-id': readingListId,
    });
    itemElement = createElement('bulbs-reading-list-item', {
      data: {
        id: 0,
        href: 'http://example.com',
        partialUrl: 'http://example.com?partial=True',
        title: 'Example Title',
      },
    });
    menuContainer = createElement('div', { id: 'menu-container' });
    menuElement = createElement('bulb-reading-list-menu', {
      'fixed-menu-min-width': 768,
      'pinned-container-selector': '#menu-container',
      'reading-list-id': readingListId,
    });
    fixtures.appendChild(articlesElement);
    fixtures.appendChild(menuContainer);
    menuElement.appendChild(itemElement);
    fixtures.appendChild(menuElement);
    subject = new ReadingListMenu(menuElement, dispatcher);
  });

  it('requires an element', () => {
    expect(() => {
      new ReadingListMenu();
    }).to.throw('new ReadingListMenu(element, dispatcher): element is undefined');
  });

  it('requires a dispatcher', () => {
    expect(() => {
      new ReadingListMenu(menuElement);
    }).to.throw('new ReadingListMenu(element, dispatcher): dispatcher is undefined');
  });

  it('saves a reference to the element', () => {
    expect(subject.element).to.equal(menuElement);
  });

  it('saves a reference to the dispatcher', () => {
    expect(subject.dispatcher).to.equal(dispatcher);
  });

  it('saves a reference to the reading list id', () => {
    expect(subject.readingListId).to.equal(readingListId);
  });

  it('saves a reference to the pinned container element', () => {
    expect(subject.pinnedContainer).to.equal(menuContainer);
  });

  it('saves a reference to the articles container element with a matching readingListId', () => {
    expect(subject.articlesContainer).to.equal(articlesElement);
  });

  describe('findPinnedContainer', () => {
    it('requires a selector', () => {
      expect(() => {
        subject.findPinnedContainer();
      }).to.throw('ReadingListMenu.findPinnedContainer(selector): selector is undefined');
    });

    it('requires the pinned-container to exist in the DOM', () => {
      expect(() => {
        subject.findPinnedContainer('.non-existent');
      }).to.throw('ReadingListMenu.findPinnedContainer(selector): there is no DOM element found with selector .non-existent');
    });

    it('returns the found element', () => {
      expect(subject.findPinnedContainer('#menu-container')).to.equal(menuContainer);
    });
  });

  describe('createMenuItems', () => {
    it('creates a list of ReadingListMenuItems', () => {
    });
  });

  describe('createMenuItem', () => {
    it('requires an itemElement', () => {
      expect(() => {
        subject.createMenuItem();
      }).to.throw('ReadingListMenu.createMenuItem(itemElement, index): itemElement is undefined');
    });

    it('requires an index', () => {
      expect(() => {
        subject.createMenuItem(itemElement);
      }).to.throw('ReadingListMenu.createMenuItem(itemElement, index): index is undefined');
    });

    it('returns a ReadingListMenuItem', () => {
      const menuItem = subject.createMenuItem(itemElement, 0);
      expect(menuItem).to.be.an.instanceof(ReadingListMenuItem);
    });

    it('passes the element to the ReadingListMenuItem', () => {
      const menuItem = subject.createMenuItem(itemElement, 0);
      expect(menuItem.element).to.equal(itemElement);
    });

    it('passes the dispatcher to the ReadingListMenuItem', () => {
      const menuItem = subject.createMenuItem(itemElement, 0);
      expect(menuItem.dispatcher).to.equal(dispatcher);
    });
  });
});
