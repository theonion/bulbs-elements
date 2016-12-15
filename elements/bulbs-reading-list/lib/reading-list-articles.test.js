/* eslint no-new: 0*/
import { createElement, appendFixtureContainer } from 'bulbs-elements/test/fixtures';
import '../components/bulbs-reading-list-item';
import '../components/bulbs-reading-list-articles';
import EventEmitter from 'events';
import ReadingListArticles from './reading-list-articles';
import ReadingListArticle from './reading-list-article';

describe('ReadingListArticles', () => {
  let subject;
  let articlesElement;
  let itemElement;
  let dispatcher;
  let fixtures;
  let readingListId;
  let href;
  let partialUrl;
  let title;
  let id;
  let contentAnalyticsDimensions;

  beforeEach(() => {
    window.GA_ID = 'funky';
    readingListId = 1;
    id = 0;
    href = 'http://example.com';
    partialUrl = 'http://example.com?partial=True';
    title = 'Example Title';
    fixtures = appendFixtureContainer();
    dispatcher = new EventEmitter();
    contentAnalyticsDimensions = JSON.stringify({ 'dimension1': 'frogs' });
    articlesElement = createElement('bulbs-reading-list-articles', {
      'reading-list-id': readingListId,
    });
    itemElement = createElement('bulbs-reading-list-item', {
      data: {
        id,
        href,
        partialUrl,
        title,
        contentAnalyticsDimensions,
      },
    });
    articlesElement.appendChild(itemElement);
    fixtures.appendChild(articlesElement);
    subject = new ReadingListArticles(articlesElement, dispatcher);
  });

  it('requires an element', () => {
    expect(() => {
      new ReadingListArticles();
    }).to.throw('new ReadingListArticles(element, dispatcher): element is undefined');
  });

  it('requires a dispatcher', () => {
    expect(() => {
      new ReadingListArticles(itemElement);
    }).to.throw('new ReadingListArticles(element, dispatcher): dispatcher is undefined');
  });

  it('saves a reference to the element', () => {
    expect(subject.element).to.equal(articlesElement);
  });

  it('saves a reference to the dispatcher', () => {
    expect(subject.dispatcher).to.equal(dispatcher);
  });

  it('saves a reference to the reading list id', () => {
    expect(subject.readingListId).to.equal(readingListId);
  });

  describe('createArticleItem', () => {
    it('requires an itemElement', () => {
      expect(() => {
        subject.createArticleItem();
      }).to.throw('ReadingListArticles.createArticleItem(itemElement, index): itemElement is undefined');
    });

    it('requires an index', () => {
      expect(() => {
        subject.createArticleItem(itemElement);
      }).to.throw('ReadingListArticles.createArticleItem(itemElement, index): index is undefined');
    });

    it('returns a ReadingListArticle', () => {
      const articleItem = subject.createArticleItem(itemElement, 0);
      expect(articleItem).to.be.an.instanceof(ReadingListArticle);
    });

    it('passes the element to the ReadingListArticlesItem', () => {
      const articleItem = subject.createArticleItem(itemElement, 0);
      expect(articleItem.element).to.equal(itemElement);
    });

    it('passes the dispatcher to the ReadingListArticlesItem', () => {
      const articleItem = subject.createArticleItem(itemElement, 0);
      expect(articleItem.dispatcher).to.equal(dispatcher);
    });
  });

  describe('getArticleById', () => {
    it('requires an id', () => {
      expect(() => {
        subject.getArticleById();
      }).to.throw('ReadingListArticles.getArticleById(id): id is undefined');
    });

    it('returns the article of the given id', () => {
      let article = new ReadingListArticle(itemElement, dispatcher, 0);
      subject.articles = [article];
      expect(subject.getArticleById(article.id)).to.equal(article);
    });
  });
});

