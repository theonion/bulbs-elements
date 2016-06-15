import invariant from 'invariant';
import { BulbsHTMLElement, registerElement } from 'bulbs-elements/register';
import { moveChildren, supportsCalcInTransform } from 'bulbs-elements/util';

import './bulbs-carousel.scss';

export default class BulbsCarousel extends BulbsHTMLElement {
  createdCallback () {
    invariant(
      this.slider = this.querySelector('bulbs-carousel-slider'),
      '<bulbs-carousel> MUST contain a <bulbs-carousel-slider> element.'
    );

    this.currentIndex = 0;

    this.handleClick = this.handleClick.bind(this);
    this.addEventListener('click', this.handleClick);

    this.track = document.createElement('bulbs-carousel-track');

    moveChildren(this.slider, this.track);

    this.slider.appendChild(this.track);

    this.previousButtons = this.getElementsByTagName('bulbs-carousel-previous');
    this.nextButtons = this.getElementsByTagName('bulbs-carousel-next');
  }

  attachedCallback () {
    this.pageToCarouselItem(this.getActiveCarouselItem());
    this.applyState();
  }

  handleClick (event) {
    if (event.target.closest('bulbs-carousel-previous')) {
      this.slideToPrevious();
      this.applyState();
    }

    if (event.target.closest('bulbs-carousel-next')) {
      this.slideToNext();
      this.applyState();
    }
  }

  applyState () {
    let currentPage = this.getCurrentPage();
    let onFirstPage = this.isOnfirstPage();
    let onLastPage = this.isOnLastPage();
    let translate = -100 * currentPage;
    let itemMargin = this.getItemMargin();
    let marginCorrection = itemMargin * currentPage;

    // some IE browsers do not support css calc() in the transform property.
    // For those browsers one uses multiple translateX() declarations.
    //      Be sad.
    if (supportsCalcInTransform) {
      this.track.style.transform = `translateX(calc(${translate}% - ${marginCorrection}px))`;
    }
    else {
      this.track.style.transform = `translateX(${translate}%) translateX(-${marginCorrection}px)`;
    }

    function toggleAttribute (collection, attribute, toggle) {
      Array.prototype.forEach.call(collection, (item) => {
        toggle ? item.setAttribute(attribute, '') : item.removeAttribute(attribute);
      });
    }

    toggleAttribute(this.previousButtons, 'disabled', onFirstPage);
    toggleAttribute(this.nextButtons, 'disabled', onLastPage);
  }

  get carouselItems () {
    return this.track.children;
  }

  get firstItem () {
    return this.carouselItems[0];
  }

  getActiveCarouselItem () {
    return this.track.querySelector(
      `bulbs-carousel-item[href='${window.location.pathname}']`
    );
  }

  getGridRatio () {
    if (this.firstItem) {
      return (this.getItemWidth() / this.offsetWidth) || 0;
    }
    return 0;
  }

  getItemMargin () {
    if (this.firstItem) {
      let style = getComputedStyle(this.firstItem);
      return (parseInt(style.marginLeft, 10) || 0) + (parseInt(style.marginRight, 10) || 0);
    }
    return 0;
  }

  getItemWidth () {
    if (this.firstItem) {
      return this.getItemMargin() + this.firstItem.offsetWidth;
    }
    return 0;
  }

  getChildrenPerPage () {
    if (this.firstItem) {
      return Math.round(1 / this.getGridRatio());
    }
    return 0;
  }

  getCurrentPage () {
    if (this.firstItem) {
      let perPage = this.getChildrenPerPage();
      let page = Math.floor(this.currentIndex / perPage);
      if (this.currentIndex === this.carouselItems.length && this.currentIndex % perPage === 0) {
        return page - 1;
      }
      return page;
    }
    return 0;
  }

  updateCurrentIndex (magnitude) {
    let perPage = this.getChildrenPerPage();
    let maxPage = parseInt(this.carouselItems.length / perPage, 10) - 1;
    this.currentIndex = Math.max(0, this.currentIndex + parseInt(magnitude, 10));
    if (this.currentIndex >= this.carouselItems.length) {
      this.currentIndex -= perPage;
    }
    if(this.getCurrentPage() > maxPage) {
      this.currentIndex = maxPage * perPage;
    }
  }

  pageToCarouselItem (item) {
    let index = Array.prototype.indexOf.call(this.carouselItems, item);

    if (index > -1) {
      this.currentIndex = index;
    }
  }

  slideToNext () {
    this.updateCurrentIndex(this.getChildrenPerPage());
  }

  slideToPrevious () {
    this.updateCurrentIndex(-this.getChildrenPerPage());
  }

  isOnfirstPage () {
    return this.currentIndex === 0;
  }

  isOnLastPage () {
    return this.currentIndex + this.getChildrenPerPage() >= this.carouselItems.length;
  }
}

import './item';
import './buttons';

registerElement('bulbs-carousel', BulbsCarousel);
registerElement('bulbs-carousel-slider', class BulbsCarouselSlider extends BulbsHTMLElement {});
registerElement('bulbs-carousel-track', class BulbsCarouselTrack extends BulbsHTMLElement {});
