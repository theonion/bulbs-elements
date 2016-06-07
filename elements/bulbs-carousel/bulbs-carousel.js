import { BulbsHTMLElement, registerElement } from 'bulbs-elements/register';
import invariant from 'invariant';

import './bulbs-carousel.scss';

export const calculatesTransform = (() => {
  let div = document.createElement('div');
  div.style.transform = 'translateX(calc(100% - 10px))';
  return div.style.transform !== '';
})();

class CarouselState {
  constructor(props) {
    this.track = props.track;
    this.currentIndex = 0;
  }

  getGridRatio() {
    if (this.carouselItems[0]) {
      return (this.getItemWidth() / this.offsetWidth) || 0;
    }
    return 0;
  }

  getItemMargin() {
    let child = this.carouselItems[0];
    if (child) {
      let style = getComputedStyle(child);
      return (parseInt(style.marginLeft, 10) || 0) + (parseInt(style.marginRight, 10) || 0);
    }
    return 0;
  }

  getItemWidth() {
    let child = this.carouselItems[0];
    if (child) {
      return this.getItemMargin() + child.offsetWidth;
    }
    return 0;
  }

  getChildrenPerPage() {
    let child = (this.carouselItems[0]);
    if (child) {
      return Math.round(1 / this.getGridRatio());
    }
    return 0;
  }

  getCurrentPage() {
    let child = (this.carouselItems[0]);
    if (child) {
      let perPage = this.getChildrenPerPage();
      let page = Math.floor(this.currentIndex / perPage);
      if (this.currentIndex === this.carouselItems.length && this.currentIndex % perPage === 0) {
        return page - 1;
      }
      return page;
    }
    return 0;
  }

  updateCurrentIndex(magnitude) {
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

  pageToCarouselItem(item) {
    let index = Array.prototype.indexOf.call(this.carouselItems, item);

    if (index > -1) {
      this.currentIndex = index;
    }
  }

  slideToNext() {
    this.updateCurrentIndex(this.getChildrenPerPage());
  }

  slideToPrevious() {
    this.updateCurrentIndex(-this.getChildrenPerPage());
  }

  isOnfirstPage() {
    return this.currentIndex === 0;
  }

  isOnLastPage() {
    return this.currentIndex + this.getChildrenPerPage() >= this.carouselItems.length;
  }
}

export default class BulbsCarousel extends BulbsHTMLElement {
  getAnchors() {
    return this.querySelectorAll('bulbs-carousel-item a');
  }

  getActiveCarouselItem() {
    return this.querySelector(
      `bulbs-carousel-item[href='${window.location.pathname}']`
    );
  }

  applyState() {
    let currentPage = this.state.getCurrentPage();
    let perPage = this.state.getChildrenPerPage();
    let onFirstPage = this.state.isOnfirstPage();
    let onLastPage = this.state.isOnLastPage();
    let translate = -100 * currentPage;
    let marginCorrection = this.state.getItemMargin() * currentPage;

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

  createdCallback() {
    this.handleClick = this.handleClick.bind(this);
    this.addEventListener('click', this.handleClick);

    invariant(
      this.slider = this.querySelector('bulbs-carousel-slider'),
      '<bulbs-carousel> MUST contain a <bulbs-carousel-slider> element.'
    );

    this.track = document.createElement('bulbs-carousel-track');

    Array.prototype.forEach.call(
      this.slider.childNodes, child => this.track.appendChild(child)
    );

    this.appendChild(this.track);

    this.state = new CarouselState({
      track: this.track,
      element: this,
    });
  }

  handleClick(event) {
    if (event.target.closest('bulbs-carousel-next')) {
      this.state.slideToNext();
      this.applyState();
    }

    if (event.target.closest('bulbs-carousel-previous')) {
      this.state.slideToPrevious();
      this.applyState();
    }

  }

  // TODO: MOVE THIS TO HIGHER LEVEL COMPONENT
  //attachedCallback () {
  //  if (this.videoPlayer) {
  //    // This event MUST pass false in as the third argument,
  //    //  video events do not bubble, so we have to listen to the
  //    //  catpure phase.
  //    this.videoPlayer.addEventListener('ended', this.playerEnded, true);
  //    let activeCarouselItem = this.getActiveCarouselItem();
  //    if (activeCarouselItem) {
  //      if (this.slider) {
  //        this.slider.pageToCarouselItem(activeCarouselItem);
  //      }
  //    }
  //  }
  //}

  //detachedCallback () {
  //  if (this.videoPlayer) {
  //    this.videoPlayer.removeEventListener('ended', this.playerEnded);
  //  }
  //}

  //playerEnded () {
  //  let items = this.getAnchors();
  //  let current = this.querySelector('bulbs-carousel-item[now-playing] a');
  //  let currentIndex = [].indexOf.call(items, current);
  //  let nextIndex = (currentIndex + 1) % (items.length);
  //  if (currentIndex !== nextIndex) {
  //    let nextItem = items[nextIndex];
  //    nextItem.click();
  //  }
  //}

}

registerElement('bulbs-carousel', BulbsCarousel);
