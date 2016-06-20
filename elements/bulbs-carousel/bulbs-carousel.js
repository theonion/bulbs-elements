import invariant from 'invariant';
import { BulbsHTMLElement, registerElement } from 'bulbs-elements/register';
import { moveChildren, supportsCalcInTransform } from 'bulbs-elements/util';
import BulbsCarouselState from './bulbs-carousel-state';

import './bulbs-carousel.scss';

export default class BulbsCarousel extends BulbsHTMLElement {
  createdCallback () {
    invariant(
      this.slider = this.querySelector('bulbs-carousel-slider'),
      '<bulbs-carousel> MUST contain a <bulbs-carousel-slider> element.'
    );

    this.handleClick = this.handleClick.bind(this);
    this.addEventListener('click', this.handleClick);

    this.track = document.createElement('bulbs-carousel-track');
    moveChildren(this.slider, this.track);
    this.slider.appendChild(this.track);

    this.previousButtons = this.getElementsByTagName('bulbs-carousel-previous');
    this.nextButtons = this.getElementsByTagName('bulbs-carousel-next');

    this.state = new BulbsCarouselState({
      carousel: this,
      carouselItems: this.track.children,
      currentIndex: 0,
    });
  }

  attachedCallback () {
    this.state.pageToCarouselItem(this.state.getActiveCarouselItem());
    this.applyState();
  }

  handleClick (event) {
    if (event.target.closest('bulbs-carousel-previous')) {
      this.state.slideToPrevious();
      this.applyState();
    }

    if (event.target.closest('bulbs-carousel-next')) {
      this.state.slideToNext();
      this.applyState();
    }
  }

  applyState () {
    let currentPage = this.state.getCurrentPage();
    let onFirstPage = this.state.isOnfirstPage();
    let onLastPage = this.state.isOnLastPage();
    let translate = -100 * currentPage;
    let itemMargin = this.state.getItemMargin();
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
}

import './item';
import './buttons';

registerElement('bulbs-carousel', BulbsCarousel);
registerElement('bulbs-carousel-slider', class BulbsCarouselSlider extends BulbsHTMLElement {});
registerElement('bulbs-carousel-track', class BulbsCarouselTrack extends BulbsHTMLElement {});
