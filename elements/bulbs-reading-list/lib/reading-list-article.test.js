/* eslint no-new: 0*/
import { createElement, appendFixtureContainer } from 'bulbs-elements/test/fixtures';
import '../components/bulbs-reading-list-item';
import EventEmitter from 'events';
import ReadingListArticle from './reading-list-article';

describe('ReadingListArticle', () => {
  let subject;
  let id;
  let href;
  let partialUrl;
  let title;
  let dispatcher;
  let fixtures;
  let element;
  let index;

  beforeEach(() => {
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
    subject = new ReadingListArticle(element, dispatcher, index);
  });

  it('requires an element', () => {
    expect(() => {
      new ReadingListArticle();
    }).to.throw('new ReadingListArticle(element, dispatcher, index): element is undefined');
  });

  it('requires a dispatcher', () => {
    expect(() => {
      new ReadingListArticle(element);
    }).to.throw('new ReadingListArticle(element, dispatcher, index): dispatcher is undefined');
  });

  it('requires an index', () => {
    expect(() => {
      new ReadingListArticle(element, dispatcher);
    }).to.throw('new ReadingListArticle(element, dispatcher, index): index is undefined');
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
});
