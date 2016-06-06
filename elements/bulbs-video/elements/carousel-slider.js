import { BulbsHTMLElement, registerElement } from 'bulbs-elements/register';

import './carousel-slider.scss';

export const calculatesTransform = (() => {
  let div = document.createElement('div');
  div.style.transform = 'translateX(calc(100% - 10px))';
  return div.style.transform !== '';
})();

export default class CarouselSlider extends BulbsHTMLElement {
  createdCallback () {
    this.currentIndex = 0;
    this.track = document.createElement('bulbs-video-carousel-track');
    while (this.firstChild) {
      this.track.appendChild(this.firstChild);
    }
    this.appendChild(this.track);
  }

  attachedCallback () {
    this.slideItems();
  }

  get carouselItems () {
    return this.track.children;
  }

  getGridRatio () {
    if (this.carouselItems[0]) {
      return (this.getItemWidth() / this.offsetWidth) || 0;
    }
    else {
      return 0;
    }
  }

  getItemMargin () {
    let child = this.carouselItems[0];
    if (child) {
      let { style } = child;
      return (parseInt(style.marginLeft, 10) || 0) + (parseInt(style.marginRight, 10) || 0);
    }
    else {
      return 0;
    }
  }

  getItemWidth () {
    let child = this.carouselItems[0];
    if (child) {
      return this.getItemMargin() + child.offsetWidth;
    }
    else {
      return 0;
    }
  }

  getChildrenPerPage () {
    let child = (this.carouselItems[0]);
    if (child) {
      return Math.round(1 / this.getGridRatio());
    }
    else {
      return 0;
    }
  }

  getCurrentPage () {
    let child = (this.carouselItems[0]);
    if (child) {
      let perPage = this.getChildrenPerPage();
      let page = Math.floor(this.currentIndex / perPage);
      if (this.currentIndex === this.carouselItems.length && this.currentIndex % perPage === 0) {
        return page - 1;
      }
      else {
        return page;
      }
    }
    else {
      return 0;
    }
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

  slideToNext () {
    this.updateCurrentIndex(this.getChildrenPerPage());
    this.slideItems();
  }

  slideToPrevious () {
    this.updateCurrentIndex(-this.getChildrenPerPage());
    this.slideItems();
  }

  slideItems () {
    let page = this.getCurrentPage();
    let translate = -100 * page;
    let marginCorrection = this.getItemMargin() * page;

    if (calculatesTransform) {
      this.track.style.transform = `translateX(calc(${translate}% - ${marginCorrection}px))`;
    }
    else {
      this.track.style.transform = `translateX(${translate}%) translateX(-${marginCorrection}px)`;
    }
    let event = new CustomEvent('slide-items', {
      detail: {
        currentIndex: this.currentIndex,
        carouselItems: this.carouselItems,
        perPage: this.getChildrenPerPage(),
      },
    });
    this.dispatchEvent(event);
  }

  pageToCarouselItem (item) {
    let index = Array.prototype.indexOf.call(this.carouselItems, item);

    if (index > -1) {
      this.currentIndex = index;
    }

    this.slideItems();
  }
}

registerElement('bulbs-video-carousel-slider', CarouselSlider);
