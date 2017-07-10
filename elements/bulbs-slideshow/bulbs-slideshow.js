import {
  registerElement,
  BulbsHTMLElement,
} from 'bulbs-elements/register-element';
import { prepReadingListAnalytics } from 'bulbs-elements/util';
import './bulbs-slideshow.scss';

function getInitialSlideIndex (hash) {
  let index = 0;
  if (hash.length > 1) {
    index = parseInt(hash.match(/(\d+)/)[1], 10) - 1;
  }
  return index;
}

class BulbsSlideshow extends BulbsHTMLElement {
  attachedCallback () {
    this.slidesClicked = 0;
    let $element = $(this);
    this.$slideshow = $element.find('.slideshow');
    this.$navigation = $element.find('nav');
    this.$navigationLinks = this.$navigation.find('a');
    this.$restartLink = $element.find('.slides-restart a');
    this.$slideCount = $element.find('.slidecount');
    this.$navigationLinks.filter('.next').on('click', this.createNavigationLinkClickHandler('next'));
    this.$navigationLinks.filter('.prev').on('click', this.createNavigationLinkClickHandler('prev'));
    this.$restartLink.on('click', this.handleRestartLinkClick.bind(this));
    this.$slideshow.flexslider({
      animation: 'fade',
      animationLoop: false,
      animationSpeed: 0,
      controlNav: false,
      directionNav: false,
      keyboard: true,
      namespace: 'slides-',
      slideshow: false,
      startAt: getInitialSlideIndex(window.location.hash),
      smoothHeight: true,
      start: this.render.bind(this),
      after: this.afterSlideTransition.bind(this),
    });
    this.flexSlider = this.$slideshow.data('flexslider');
  }

  createNavigationLinkClickHandler (direction) {
    return function (event) {
      let $element = $(event.currentTarget);
      event.preventDefault();
      if (!$element.hasClass('slides-disabled')) {
        this.flexSlider.flexAnimate(this.flexSlider.getTarget(direction));
      }
    }.bind(this);
  }

  handleRestartLinkClick (event) {
    event.preventDefault();
    this.flexSlider.flexslider(0);
  }

  render () {
    this.displayCurrentSlideNumber();
    this.updateNavigationState();
    this.fillPictures();
  }

  displayCurrentSlideNumber () {
    let count = this.flexSlider.count;
    let currentSlide = this.currentSlideNumber();
    this.$slideCount.text(`${currentSlide} of ${count}`);
  }

  currentSlideNumber () {
    return this.flexSlider.currentSlide + 1;
  }

  updateNavigationState () {
    this.$navigationLinks.removeClass('slides-disabled');

    if (this.isOnLastSlide()) {
      this.disableNextLinks();
    }

    if (this.isOnFirstSlide()) {
      this.disablePreviousLinks();
    }
  }

  isOnLastSlide () {
    return this.currentSlideNumber() === this.flexSlider.count;
  }

  isOnFirstSlide () {
    return this.currentSlideNumber() === 1;
  }

  disableNextLinks () {
    this.$navigationLinks.filter('.next').addClass('slides-disabled');
  }

  disablePreviousLinks () {
    this.$navigationLinks.filter('.prev').addClass('slides-disabled');
  }

  fillPictures () {
    window.picturefill('.slides li, .endcard .summary');
  }

  afterSlideTransition () {
    this.render();
    this.navigateToNextSlide();
    this.sendPageView();
  }

  setupGA () {
    const readingListProps = prepReadingListAnalytics(this.$slideshow, { dimension12: 'slideshow' });
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

  navigateToNextSlide () {
    window.location.hash = `slide${this.currentSlideNumber()}`;
  }
}

registerElement('bulbs-slideshow', BulbsSlideshow);

export default BulbsSlideshow;
