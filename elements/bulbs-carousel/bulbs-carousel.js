import { BulbsHTMLElement, registerElement } from 'bulbs-elements/register';

import './bulbs-carousel.scss';

export default class BulbsCarousel extends BulbsHTMLElement {
  getAnchors () {
    return this.querySelectorAll('bulbs-carousel-item a');
  }

  getActiveCarouselItem () {
    return this.querySelector(
      `bulbs-carousel-item[href='${window.location.pathname}']`
    );
  }

  createdCallback () {
    this.playerEnded = this.playerEnded.bind(this);
    this.handleClick = this.handleClick.bind(this);

    this.videoPlayer = this.querySelector('bulbs-video');
    this.slider = this.querySelector('bulbs-carousel-slider');
    this.addEventListener('click', this.handleClick);
  }

  attachedCallback () {
    if (this.videoPlayer) {
      // This event MUST pass false in as the third argument,
      //  video events do not bubble, so we have to listen to the
      //  catpure phase.
      this.videoPlayer.addEventListener('ended', this.playerEnded, true);
      let activeCarouselItem = this.getActiveCarouselItem();
      if (activeCarouselItem) {
        if (this.slider) {
          this.slider.pageToCarouselItem(activeCarouselItem);
        }
      }
    }
  }

  detachedCallback () {
    if (this.videoPlayer) {
      this.videoPlayer.removeEventListener('ended', this.playerEnded);
    }
  }

  playerEnded () {
    let items = this.getAnchors();
    let current = this.querySelector('bulbs-carousel-item[now-playing] a');
    let currentIndex = [].indexOf.call(items, current);
    let nextIndex = (currentIndex + 1) % (items.length);
    if (currentIndex !== nextIndex) {
      let nextItem = items[nextIndex];
      nextItem.click();
    }
  }

  handleClick (event) {
    if (event.target.closest('bulbs-carousel-next')) {
      if (this.slider) {
        this.slider.slideToNext();
      }
    }

    if (event.target.closest('bulbs-carousel-previous')) {
      if (this.slider) {
        this.slider.slideToPrevious();
      }
    }
  }
}

registerElement('bulbs-carousel', BulbsCarousel);
