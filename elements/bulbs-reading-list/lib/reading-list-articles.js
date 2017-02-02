import invariant from 'invariant';
import { map, isUndefined, find, some } from 'lodash';
import ReadingListArticle from './reading-list-article';

export default class ReadingListArticles {
  constructor (element, dispatcher) {
    invariant(element, 'new ReadingListArticles(element, dispatcher): element is undefined');
    invariant(dispatcher, 'new ReadingListArticles(element, dispatcher): dispatcher is undefined');

    this.element = element;
    this.dispatcher = dispatcher;
    this.readingListId = parseInt(element.getAttribute('reading-list-id'), 10);
    this.isFetchingItem = false;
    const itemElements = this.element.querySelectorAll('bulbs-reading-list-item');
    this.articles = this.createArticleItems(itemElements);
    if (this.readingListId < 1) { this.initializeFirstArticle(); }
    this.registerEvents();
  }

  createArticleItems (itemElements) {
    return map(itemElements, this.createArticleItem.bind(this));
  }

  createArticleItem (itemElement, index) {
    invariant(itemElement, 'ReadingListArticles.createArticleItem(itemElement, index): itemElement is undefined');
    invariant(!isUndefined(index), 'ReadingListArticles.createArticleItem(itemElement, index): index is undefined');
    return new ReadingListArticle(itemElement, this.dispatcher, index);
  }

  initializeFirstArticle () {
    const firstArticle = this.articles[0];
    firstArticle.isLoaded = true;
    this.currentArticle = firstArticle;
  }

  registerEvents () {
    this.handleListItemClicked = this.handleListItemClicked.bind(this)
    this.setCurrentArticle = this.setCurrentArticle.bind(this)

    this.dispatcher.on('reading-list-item-clicked', this.handleListItemClicked);
    this.dispatcher.on('reading-list-item-url-changed', this.setCurrentArticle);
  }

  handleListItemClicked (menuItem) {
    const article = this.getArticleById(menuItem.id);

    if (article.isLoaded) {
      article.scrollIntoView();
    }
    else if (this.shouldLoadNextArticle(article)) {
      this.loadArticle(article)
        .then(this.handleLoadNextArticleComplete.bind(this));
    }
  }

  getArticleById (id) {
    invariant(!isUndefined(id), 'ReadingListArticles.getArticleById(id): id is undefined');
    return find(this.articles, ['id', id]);
  }

  isNextArticle (article) {
    invariant(article, 'ReadingListArticles.isNextArticle(article): article is undefined');
    let nextArticle = this.articleAtIndex(this.currentArticle.index + 1);
    return nextArticle ? (article.index === nextArticle.index) : false;
  }

  articleAtIndex (index) {
    invariant(!isUndefined(index), 'ReadingListArticles.articleAtIndex(index): index is undefined');
    return find(this.articles, ['index', index]);
  }

  shouldLoadNextArticle (nextArticle) {
    return !!(
      nextArticle &&
      !this.hasPendingFetch() &&
      !nextArticle.isLoaded
    );
  }

  hasPendingFetch () {
    return some(this.articles, (article) => article.fetchPending);
  }

  nextArticle () {
    return this.itemAtIndex(this.currentArticle.index + 1);
  }

  loadArticle (article) {
    invariant(article, 'ReadingListArticles.loadArticle(article): article is undefined');
    this.isFetchingItem = true;
    let promise = article.loadContent();
    promise.then(this.handleLoadArticleComplete.bind(this));
    return promise;
  }

  handleLoadArticleComplete () {
    this.isFetchingItem = false;
  }

  setCurrentArticle (article) {
    this.currentArticle = article;
  }

  handleLoadNextArticleComplete (article) {
    this.isFetchingItem = false;
    article.scrollIntoView();
    this.setCurrentArticle(article);
  }

  redirectToArticle (article) {
    window.location.href = article.href;
  }
}
