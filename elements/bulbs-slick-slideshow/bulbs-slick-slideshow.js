import {
  registerElement,
  BulbsHTMLElement,
} from 'bulbs-elements/register-element';
import $ from 'jquery';
import {
  InViewMonitor,
  prepReadingListAnalytics,
} from 'bulbs-elements/util';

import './bulbs-slick-slideshow.scss';

require('slick-carousel');

class BulbsSlickSlideshow extends BulbsHTMLElement {
  attachedCallback () {
    this.slideshow = $('.slider').last();

    // set variables
    this.initialSlide = 0;
    this.windowHash = window.location.hash;
    this.navLinks = this.slideshow.siblings('.slider-nav');
    this.slideshowAdContainer = this.slideshow.siblings('.slide-ad');
    this.slideshowAd = this.slideshowAdContainer.find('.dfp');
    this.navNext = this.navLinks.find('.slider-next');
    this.navPrev = this.navLinks.find('.slider-prev');
    this.restart = this.slideshow.find('a.restart');

    this.init();
  }

  init () {
    // if url has existing hash, get & set it
    if (this.windowHash) {
      this.initialSlide = parseInt(/\d+/.exec(this.windowHash)[0], 10);
    }

    // initializes the slider
    this.slideshow.slick({
      infinite: false,
      arrows: false,
      dots: true,
      initialSlide: this.initialSlide,
      appendDots: this.navLinks,
      customPaging: this.customPaging,
    });

    // cant get this until slick is initiated
    this.slides = this.slideshow.slick('getSlick').$slides;
    this.currentSlide = this.slideshow.slick('slickCurrentSlide');

    this.setupEventHandlers();
  }

  customPaging (slideshow, initialSlide) {
    return `<div class="paging">
      ${initialSlide + 1} of ${slideshow.slideCount}
    </div>`;
  }

  enableDisableNav (slides, currentSlide) {
    // remove all disabled states
    this.navLinks.find('a').removeClass('disabled');
    // if last slide, disable last
    if (currentSlide === slides.length) {
      this.navNext.addClass('disabled');
    }
    // if first slide, disable first
    if (currentSlide === 0) {
      this.navPrev.addClass('disabled');
    }
  }

  navNextClicked (event) {
    event.preventDefault();
    this.slideshow.slick('slickNext');
  }

  navPrevClicked (event) {
    event.preventDefault();
    this.slideshow.slick('slickPrev');
  }

  restartShow (event) {
    event.preventDefault();
    this.slideshow.slick('slickGoTo', 0);
  }

  isInViewport () {
    return InViewMonitor.isElementInViewport(this.slideshow[0]);
  }

  bodyKeyDown (event) {
    const isVisible = this.isInViewport();
    if(event.keyCode === 37 && isVisible) { // left
      this.slideshow.slick('slickPrev');
    }
    else if(event.keyCode === 39 && isVisible) { // right
      this.slideshow.slick('slickNext');
    }
  }

  slideshowInit () {
    this.enableDisableNav(this.slides, this.currentSlide);
  }

  slideshowChanged (event, slickObject, currentSlide) {
    window.location.hash = currentSlide;
    this.sendPageView.bind(this).call();
    this.enableDisableNav(this.slides, currentSlide);
    this.currentSlide = currentSlide;
    this.maybeShowAd();
  }

  maybeShowAd () {
    if (window.ads && (this.currentSlide > 1) && (this.currentSlide % 4 === 0)) {
      this.slideshowAdContainer.addClass('active');
      window.ads.reloadAds(this);
      window.ads.refreshSlot(this.slideshowAd[0]);
    }
  }

  closeAd () {
    this.slideshowAdContainer.removeClass('active');
  }

  setupGA () {
    const readingListProps = prepReadingListAnalytics(this.slideshow, { dimension12: 'slideshow' });
    const { analyticsManager, analyticsWrapper, title } = readingListProps;

    this.analyticsManager = analyticsManager;
    this.analyticsWrapper = analyticsWrapper;
    this.title = title;
  }

  sendPageView () {
    if (!this.analyticsManager) {
      this.setupGA();
    }

    this.analyticsManager.trackPageView(
      false,
      this.title,
      this.analyticsWrapper
    );
  }

  bindContext () {
    this.bodyKeyDown = this.bodyKeyDown.bind(this);
    this.navNextClicked = this.navNextClicked.bind(this);
    this.navPrevClicked = this.navPrevClicked.bind(this);
    this.restartShow = this.restartShow.bind(this);
    this.sendPageView = this.sendPageView.bind(this);
    this.slideshowInit = this.slideshowInit.bind(this);
    this.slideshowChanged = this.slideshowChanged.bind(this);
    this.closeAd = this.closeAd.bind(this);
  }

  setupEventHandlers () {
    this.bindContext();

    this.navNext.click(this.navNextClicked);
    this.navPrev.click(this.navPrevClicked);

    // keyboard nav
    $('body').keydown(this.bodyKeyDown);

    // restart on restart link click
    this.restart.on('click', this.restartShow);

    // run on document init
    // determines active slide and # of total slides
    this.slideshow.on('init', this.slideshowInit);

    // can only get currentSlide on before/afterChange
    this.slideshow.on('afterChange', this.slideshowChanged);
    this.slideshowAdContainer.find('.fa-close').on('click', this.closeAd);
  }
}

registerElement('bulbs-slick-slideshow', BulbsSlickSlideshow);

export default BulbsSlickSlideshow;
