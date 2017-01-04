import invariant from 'invariant';
import { isUndefined } from 'lodash';
import scrollIntoView from 'scroll-into-view';
import {
  filterBadResponse,
  getResponseText,
  getWindowDimensions,
  getAnalyticsManager,
  prepGaEventTracker,
} from 'bulbs-elements/util';

export default class ReadingListArticle {
  constructor (element, dispatcher, index) {
    invariant(element, 'new ReadingListArticle(element, dispatcher, index): element is undefined');
    invariant(dispatcher, 'new ReadingListArticle(element, dispatcher, index): dispatcher is undefined');
    invariant(!isUndefined(index), 'new ReadingListArticle(element, dispatcher, index): index is undefined');
    invariant(!isUndefined(window.GA_ID), 'new ReadingListArticle, GA_ID must be set on window');
    element.requireAttribute('data-content-analytics-dimensions');

    this.element = element;
    this.dispatcher = dispatcher;
    this.index = index;
    this.progress = 0;
    this.id = parseInt(element.dataset.id, 10);
    this.href = element.dataset.href;
    this.partialUrl = element.dataset.partialUrl;
    this.title = element.dataset.title;
    this.loadDistanceThreshold = 400;
    this.readDistanceOffset = 250;
    this.isLoaded = false;
    this.loadingTemplate = '<p><i class="fa fa-spinner fa-spin"></i> Loading...</p>';
    this.fetchPending = false;
    this.dimensions = this.getGaDimensions();
    this.registerEvents();
  }

  registerEvents () {
    this.dispatcher.on('scroll-down', this.handleScrollDown.bind(this));
    this.dispatcher.on('scroll', this.handleScroll.bind(this));
  }

  getGaDimensions () {
    let targeting = JSON.parse(
      this.element.dataset.contentAnalyticsDimensions
    );
    return {
      'dimension1': targeting.dimension1 || 'None',
      'dimension2': targeting.dimension2 || 'None',
      'dimension3': targeting.dimension3 || 'None',
      'dimension4': targeting.dimension4 || 'None',
      'dimension5': targeting.dimension5 || 'None',
      'dimension6': targeting.dimension6 || 'None',
      'dimension7': targeting.dimension7 || 'None',
      'dimension8': targeting.dimension8 || 'None',
      'dimension9': targeting.dimension9 || 'None',
      'dimension10': targeting.dimension10 || 'None',
      'dimension11': targeting.dimension11 || 'None',
    };
  }

  prepGaTracker () {
    return prepGaEventTracker(
      'pageview',
      window.GA_ID,
      this.dimensions,
    );
  }

  scrollIntoView () {
    scrollIntoView(this.element, {
      align: {
        top: 1,
        left: 0,
      },
    });
  }

  loadContent () {
    return new Promise((resolve, reject) => {
      if (this.shouldLoad()) {
        this.fetchPending = true;
        this.fillContent(this.loadingTemplate);
        fetch(this.partialUrl, {
          credentials: 'same-origin',
        })
          .then(filterBadResponse)
          .then(getResponseText)
          .then((response) => {
            this.handleLoadContentComplete(response);
            resolve(this);
          })
          .catch((response) => {
            this.handleLoadContentError(response);
            reject(this);
          });
      }
    });
  }

  shouldLoad () {
    return !(this.isLoaded || this.fetchPending);
  }

  fillContent (content) {
    this.element.innerHTML = content;
    this.element.dataset.loadStatus = 'loading';
  }

  setupTaboola () {
    let taboola = window._taboola || [];
    let taboolaContainer = document.createElement('div');
    taboolaContainer.className = 'taboola-container';
    taboolaContainer.id = 'taboola-below-article-text-links-' + (new Date()).getTime();
    this.element.appendChild(taboolaContainer);
    taboola.push({
      mode: 'organic-text-links-c',
      container: taboolaContainer.id,
      placement: 'Below Article Text Links',
      target_type: 'mix',
    });
    let taboolaItem = {
      url: this.element.dataset.href,
    };
    if (this.element.dataset.isGraphic) {
      taboolaItem.photo = 'auto';
    } 
    else if (this.element.dataset.isVideo) {
      taboolaItem.video = 'auto';
    } 
    else {
      taboolaItem.article = 'auto';
    }
    taboola.push(taboolaItem);
    taboola.push({
      flush: true,
    });
  }

  handleLoadContentComplete (content) {
    this.fillContent(content);
    this.setupTaboola();
    this.isLoaded = true;
    this.fetchPending = false;
    this.element.dataset.loadStatus = 'loaded';
  }

  handleLoadContentError (response) {
    this.fetchPending = false;
    return new Promise((resolve, reject) => reject(`ReadingListArticle.loadContent(): fetch failed "${response.status} ${response.statusText}"`));
  }

  handleScrollDown () {
    if (!this.isLoaded && this.isNearlyInView()) {
      this.loadContent();
    }
  }

  handleScroll (offset) {
    const newProgress = this.calculateProgress(offset);
    this.pushStateIfStartedReading(this.progress, newProgress);
    this.progress = newProgress;
    this.dispatcher.emit('reading-list-item-progress-update', this);
  }

  calculateProgress () {
    let articleDimensions = this.element.getBoundingClientRect();
    let percentage = 0;
    let start = 0;
    let height = Math.abs(Math.floor(articleDimensions.height)) - this.readDistanceOffset;

    let top = articleDimensions.top;

    if (articleDimensions.top <= start && height > 0) {
      let position = top;
      if (position < 0) {
        position = position * -1;
      }
      percentage = position / height * 100;
    }
    const progress = Math.abs(Math.floor(percentage));

    return progress > 100 ? 100 : progress;
  }

  prepareAnalytics () {
    let targeting = this.dimensions;
    // need to update these to match correct implementation - scook
    ga('set', 'dimension2', targeting.dfp_campaign_id);
    ga('set', 'dimension4', targeting.dfp_feature);
    ga('set', 'dimension5', targeting.dfp_tag);
    ga('set', 'dimension6', targeting.dfp_pagetype);
    ga('set', 'dimension7', targeting.dfp_contentid);
    ga('set', 'dimension8', targeting.dfp_publishdate);
    ga('set', 'dimension9', targeting.dfp_evergreen);
    ga('set', 'dimension10', targeting.dfp_title);
  }

  pushStateIfStartedReading (oldProgress, newProgress) {
    if (this.startedReading(oldProgress, newProgress)) {
      if (this.href !== window.location.pathname) {
        this.pushToHistory();
        if (!this.gaTrackerWrapper) {
          this.gaTrackerWrapper = this.prepGaTracker();
        }

        getAnalyticsManager().trackPageView(
          this.href,
          this.title,
          this.gaTrackerWrapper,
        );
        this.sendAnalyticsEvent();
        this.dispatcher.emit('reading-list-item-url-changed', this);
      }
    }
  }

  sendAnalyticsEvent () {
    this.gaTrackerWrapper(
      'send', 'event',
      'reading_list',
      'scroll_view',
      this.href,
    );
  }

  startedReading (oldProgress, newProgress) {
    return (oldProgress === 0 && newProgress > 0) || (oldProgress === 100 && newProgress < 100);
  }

  pushToHistory () {
    window.history.replaceState(null, this.title, this.href);
  }

  isNearlyInView () {
    let { bottom } = this.element.getBoundingClientRect();
    let distance = getWindowDimensions().height + this.loadDistanceThreshold;

    return bottom < distance;
  }
}
