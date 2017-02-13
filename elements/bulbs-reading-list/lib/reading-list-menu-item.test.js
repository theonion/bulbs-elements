/* eslint no-new: 0*/
import { createElement, appendFixtureContainer } from 'bulbs-elements/test/fixtures';
import '../components/bulbs-reading-list-item';
import EventEmitter from 'events';
import ReadingListMenuItem from './reading-list-menu-item';

describe('ReadingListMenuItem', () => {
  let subject;
  let id;
  let href;
  let partialUrl;
  let title;
  let dispatcher;
  let fixtures;
  let element;
  let sandbox;
  let index;

  beforeEach(() => {
    sandbox = sinon.sandbox.create();
    id = 1;
    index = 0;
    href = 'http://example.com';
    partialUrl = 'http://example.com?partial=True';
    title = 'Example Title';
    fixtures = appendFixtureContainer();
    dispatcher = new EventEmitter();
    element = createElement('bulbs-reading-list-item', {
      data: {
        id,
        href,
        partialUrl,
        title,
      },
    });
    fixtures.appendChild(element);
    subject = new ReadingListMenuItem(element, dispatcher, index);
  });

  it('requires an element', () => {
    expect(() => {
      new ReadingListMenuItem();
    }).to.throw('new ReadingListMenuItem(element, dispatcher, index): element is undefined');
  });

  it('requires a dispatcher', () => {
    expect(() => {
      new ReadingListMenuItem(element);
    }).to.throw('new ReadingListMenuItem(element, dispatcher, index): dispatcher is undefined');
  });

  it('requires an index', () => {
    expect(() => {
      new ReadingListMenuItem(element, dispatcher);
    }).to.throw('new ReadingListMenuItem(element, dispatcher, index): index is undefined');
  });

  it('saves a reference to the element', () => {
    expect(subject.element).to.equal(element);
  });

  it('saves a reference to the dispatcher', () => {
    expect(subject.dispatcher).to.equal(dispatcher);
  });

  it('saves a reference to the id', () => {
    expect(subject.id).to.equal(id);
  });

  it('saves a reference to the href', () => {
    expect(subject.href).to.equal(href);
  });

  it('saves a reference to the partialUrl', () => {
    expect(subject.partialUrl).to.equal(partialUrl);
  });

  it('saves a reference to the title', () => {
    expect(subject.title).to.equal(title);
  });

  describe('handleClick', () => {

    it('triggers an item click event', () => {
      let evnt = { preventDefault: sandbox.spy() };
      sandbox.stub(subject.dispatcher, 'emit');
      subject.handleClick(evnt);
      expect(subject.dispatcher.emit).to.have.been.calledWith('reading-list-item-clicked', subject, evnt);
    });

    it('should check for the presence of a bulbs-reading-list-menu-item-cickable-area to attach click event to', () => {
      const clickableArea = $('<bulbs-reading-list-menu-item-clickable-area>');
      element.appendChild(clickableArea[0]);
      subject.registerEvents();
      sandbox.stub(subject.dispatcher, 'emit');

      clickableArea.trigger('click');

      expect(subject.dispatcher.emit).to.have.been.calledWith('reading-list-item-clicked', subject);
    });
  });
});
